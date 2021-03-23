import React from "react";
import { useTransition } from "react-spring";

import Toast from "./Toast";

import { ToastProps } from "../../hooks/toast";

import { Container } from "./styles";

interface ToastContainerProps {
  messages: ToastProps[]; // ToastProps: tipagem dos toast
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages, // oq ele vai animar, que são as mensagem em si que recebo por parâmetro
    (message) => message.id, // oq cada mensagem tem de única
    {
      // objeto de animações
      from: { right: "-120%" }, // sumir na direita, pra esconder
      enter: { right: "0%" }, // posição do elemento em tela
      leave: { right: "-120%" }, // quando sair de tela
    }
  );

  return (
    <Container>
      {messagesWithTransitions.map((
        { item, key, props } // item: as messages do parâmetro, props: a animação
      ) => (
        <Toast key={key} style={props} toast={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
