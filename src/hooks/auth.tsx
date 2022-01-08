import React, { createContext, useCallback, useContext, useState } from "react";

import User from "../dtos/IUser";

import { api } from "../services/api";

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(userData: User): void;
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
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post<{ token: string; user: User }>("sessions", {
      email,
      password,
    });

    const { token, user } = response.data; // desacoplando informações que vem da api

    console.log(user);

    localStorage.setItem("@GoBarber:token", token);
    localStorage.setItem("@GoBarber:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@GoBarber:token");
    localStorage.removeItem("@GoBarber:user");

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (userData) => {
      if (!userData) return;

      localStorage.setItem("@GoBarber:user", JSON.stringify(userData));

      setData({
        token: data.token,
        user: userData,
      });
    },
    [data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an authProvider");

  return context;
}

export { AuthProvider, useAuth };
