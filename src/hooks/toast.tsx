import React, { createContext, useContext, useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

import ToastContainer from "../components/ToastContainer";

export interface ToastProps {
  id: string;
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
  const [messages, setMessages] = useState<ToastProps[]>([]);

  const addToast = useCallback(
    ({ title, description, type }: Omit<ToastProps, "id">) => {
      // Omit<ToastProps, 'id': omitindo o id da interface já que será gerado dinamicamente
      const id = uuid();

      const toast = {
        id,
        title,
        description,
        type,
      };

      setMessages([...messages, toast]);
    },
    [messages]
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
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

  if (!context) throw new Error("useToast must be used within a ToastProvider");

  return context;
}

export { useToast, ToastProvider };
