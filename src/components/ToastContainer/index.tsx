import React from "react";
import { useTransition } from "react-spring";

import Toast from "./Toast";

import { ToastProps } from "../../hooks/toast";

import { Container } from "./styles";

interface ToastContainerProps {
  messages: ToastProps[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      // Objeto de animações
      from: { right: "-120%" },
      enter: { right: "0%" },
      leave: { right: "-120%" },
    }
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} toast={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
