import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { IconBaseProps } from "react-icons"; // propriedades que um icone pode ter
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";

import { InputWrapper, Error } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // pra que as props herdem todas as propriedades de um input comum
  name: string; // InputHTMLAttributes: por padrão o name não é obrigatório, na interface eu faço com que seja
  icon?: React.ComponentType<IconBaseProps>; // React.ComponentType: quando eu recebo um componente como propriedade <IconBaseProps> é as props do icon
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null); // HTMLInputElement: typando pra ter acesso a informação no callback, pra saber se está preenchido ou não

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false); // pra ver ser o input tá preenchido ou não

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

  const handleInputFocus = useCallback(() => {
    // tornando callback pra ser criada somente uma vez
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // pra ver se algum input que perdeu foco, foi preenchido, pra deixar a estilização diferente
    setIsFilled(!!inputRef.current?.value); // se tiver valor é true, se não é false
  }, []);

  return (
    <InputWrapper
      isErrored={Boolean(error)}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...props}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </InputWrapper>
  );
};

export default Input;
