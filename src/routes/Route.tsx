import React from "react";
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from "react-router-dom"; /*
  ReactDOMRoute: rota em si
  RouteProps: as propriedades que uma rota tem
  */

import { useAuth } from "../hooks/auth";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType; // sobrescrevendo a tipagem, para receber só o nome do componente, ex: component={Dashboard} e não component={<Dashboard />};
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  /* regrinha das rotas:
    true/true | false/false = OK;
      - se a rota for privada e o usuário tiver autenticado/logado, redireciono para o dashboard.
    true/false = Redirect;
      - se a rota for privada e o usuário não tiver autenticado/logado, redireciono para o login.
    false/true = Redirect;
      - a rota não é privada e o usuário está autenticado/logado, redireciono para o dashboard.
      */

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "Dashboard",
              state: { from: location }, // pra não perder o histórico de rota
            }}
          />
        );
      }}
    />
  );
};

export default Route;
