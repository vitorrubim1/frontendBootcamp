import React, { createContext, useContext, useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

import ToastContainer from "../components/ToastContainer";

export interface ToastProps {
  id: string; // o state de toast terá um map, esse id será a key
  type?: "success" | "error" | "info";
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast({ title, description, type }: Omit<ToastProps, "id">): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastProps[]>([]); // informações dos toasts

  const addToast = useCallback(
    ({ title, description, type }: Omit<ToastProps, "id">) => {
      // Omit<ToastProps, 'id': omitindo o id da interface já que será gerado dinâmicamente
      const id = uuid();

      const toast = {
        id,
        title,
        description,
        type,
      }; // informações que terá no toast

      setMessages([...messages, toast]);
    },
    [messages]
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id)); // função que recebe todos os itens do estado, e filtra todos que não tenham o id igual ao que é passado pelo parâmetro
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

export { useToast, ToastProvider };
