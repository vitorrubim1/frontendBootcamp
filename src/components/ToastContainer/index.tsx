import React from "react";

import Toast from "./Toast";

import { ToastProps } from "../../hooks/toast";

import { Container } from "./styles";

interface ToastContainerProps {
  messages: ToastProps[]; // ToastProps: tipagem dos toast
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </Container>
  );
};

export default ToastContainer;
