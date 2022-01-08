import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useField } from "@unform/core";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";

import { InputWrapper, Error } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>; // React.ComponentType: quando eu recebo um componente como propriedade <IconBaseProps> é as props do icon
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // (hook unform) lógica de registo
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    // registerField: é o valor do input de fato, dentro do hook do unform
    registerField({
      name: fieldName, // fieldName: pq o unform manipula os nomes e retorna um especifico pra cada
      ref: inputRef.current,
      path: "value", // tendo o input, aonde de fato encontro o valor
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
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
