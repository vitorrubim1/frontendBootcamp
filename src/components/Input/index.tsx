import React, { InputHTMLAttributes } from "react";
import { IconBaseProps } from "react-icons"; // propriedades que um icone pode ter
import { InputWrapper } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // pra que as props herdem todas as propriedades de um input comum
  name: string; // InputHTMLAttributes: por padrão o name não é obrigatório, na interface eu faço com que seja
  icon?: React.ComponentType<IconBaseProps>; // React.ComponentType: quando eu recebo um componente como propriedade <IconBaseProps> é os props do icon
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...props }) => {
  return (
    <InputWrapper>
      {Icon && <Icon size={20} />}
      <input {...props} />
    </InputWrapper>
  );
};

export default Input;
