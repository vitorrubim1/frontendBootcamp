import React, { ButtonHTMLAttributes } from "react";

import { ButtonContainer } from "./styles";

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement>; // como não vou definir nada e nem sobrescrever é um type

const Button: React.FC<PropsButton> = ({ children, ...props }) => {
  return (
    <ButtonContainer type="button" {...props}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
