import React, { createContext, useCallback, useContext, useState } from "react";

import { api } from "../services/api";

import User from "../dtos/IUser";

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@GoBarber:token");
    const user = localStorage.getItem("@GoBarber:user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState; // se não achar nada no localStorage, retorna um objeto vazio
  }); // isso é vai funcionar quando der refresh na página, ou quando voltar página

  // função de login/autenticação
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("sessions", { email, password });

    const { userData: user, token } = response.data; // desacoplando informações que vem da api

    localStorage.setItem("@GoBarber:token", token);
    localStorage.setItem("@GoBarber:user", JSON.stringify(user));

    setData({ token, user });
  }, []);

  // função para deslogar o usuário
  const signOut = useCallback(() => {
    localStorage.removeItem("@GoBarber:token");
    localStorage.removeItem("@GoBarber:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  // pra não precisar importar o useContext toda vez, e passar o AuthContext
  const context = useContext(AuthContext);

  if (!context) {
    // se o contexto não tiver englobando as páginas vai retorna esse erro
    throw new Error("useAuth must be used within an authProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
