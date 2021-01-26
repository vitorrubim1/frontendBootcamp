import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import { IconBaseProps } from "react-icons"; // propriedades que um icone pode ter
import { useField } from "@unform/core";

import { InputWrapper } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // pra que as props herdem todas as propriedades de um input comum
  name: string; // InputHTMLAttributes: por padrão o name não é obrigatório, na interface eu faço com que seja
  icon?: React.ComponentType<IconBaseProps>; // React.ComponentType: quando eu recebo um componente como propriedade <IconBaseProps> é os props do icon
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...props }) => {
  const inputRef = useRef(null);

  // lógica de registo do unform
  const { fieldName, defaultValue, error, registerField } = useField(name); // hook do unform

  useEffect(() => {
    registerField({
      // registerField: é o valor do input de fato, dentro do hook do unform
      name: fieldName, // fieldName: pq o unform manipula os nomes e retorna um especifico pra cada
      ref: inputRef.current, // inputRef.current: referência na DOM
      path: "value", // tendo o input, aonde de fato encontro o valor
    });
  }, [fieldName, registerField]);

  return (
    <InputWrapper>
      {Icon && <Icon size={20} />}
      <input defaultValue={defaultValue} ref={inputRef} {...props} />
    </InputWrapper>
  );
};

export default Input;
