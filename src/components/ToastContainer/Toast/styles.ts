import styled, { css } from "styled-components";

interface ContainerProps {
  type?: "info" | "success" | "error";
  hasDescription: boolean;
}

const toastColorsVariations = {
  info: css`
    background: #ffe9cc;
    color: #804800;
  `,
  success: css`
    background: #ccffdd;
    color: #00802b;
  `,
  error: css`
    background: #ffcccc;
    color: #800000;
  `,
};

export const Container = styled.div<ContainerProps>`
  width: 360px;

  position: relative;

  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${(props) => toastColorsVariations[props.type || "info"]};

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    top: 19px;
    right: 15px;

    opacity: 0.6;

    border: 0;
    background: transparent;
    color: inherit;

    transition: all 200ms;
  }

  button:hover {
    opacity: 1;
    transform: scale(1.2);
  }

  ${(props) =>
    !props.hasDescription &&
    css`
      align-items: center;

      > svg {
        margin-top: 0;
      }
    `};
`;
