import React, { createContext, useCallback } from "react";

import { api } from "../services/api";

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

interface SignInCredentials {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("sessions", { email, password });

    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: "Vitor", signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
