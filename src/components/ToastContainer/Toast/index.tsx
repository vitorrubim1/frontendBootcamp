import React, { useEffect } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from "react-icons/fi";

import { useToast, ToastProps } from "../../../hooks/toast";

import { Container } from "./styles";

interface ToastPropsData {
  toast: ToastProps;
  // eslint-disable-next-line @typescript-eslint/ban-types
  style: object;
}

const icons = {
  success: <FiCheckCircle size={20} />,
  error: <FiAlertCircle size={20} />,
  info: <FiInfo size={20} />,
};

const Toast: React.FC<ToastPropsData> = ({ toast, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(
      () => {
        removeToast(toast.id);
      },
      3000,
      []
    ); // pro toast sumir em 3s

    return () => {
      /*
        se no useEffect tivermos o retorno de uma hero function, assim que esse componente deixar de existir por qualquer natureza, essa função é executada.
        eu preciso desse return aqui por causa do timeOut criado acima, ele tem 3s pra executar e fechar o toast;
        mas se o user fechar antes dos 3s essa função é executada e cancela o timer, justamente é esse o motivo da existência da variável
      */
      clearTimeout(timer);
    };
  }, [removeToast, toast.id]);

  return (
    <Container
      type={toast.type}
      hasDescription={!!toast.description}
      style={style}
    >
      {icons[toast.type || "info"]} {/* icon dinâmico */}
      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(toast.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
