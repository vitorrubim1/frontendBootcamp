import styled, { css } from "styled-components";

interface InputWrapperProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #233129;
  padding: 16px;
  width: 100%;

  color: #666630;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000; //icon
    `}

  // se o input tiver preenchido e perder o foco
  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000; //icon
    `}

  input {
    color: #f4ede8;

    flex: 1;
    border: 0;
    background: transparent;

    &::placeholder {
      color: #666630;
    }
  }

  svg {
    margin-right: 8px;
  }
`;
