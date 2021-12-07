import React, { ButtonHTMLAttributes } from "react";
import { ClipLoader } from "react-spinners";

import { ButtonContainer } from "./styles";

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<PropsButton> = ({ children, loading, ...props }) => {
  return (
    <ButtonContainer type="button" {...props}>
      {loading ? <ClipLoader size={15} /> : children}
    </ButtonContainer>
  );
};

export default Button;
