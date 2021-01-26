import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    padding: 8px;

    background: #c53030;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;

    opacity: 0;
    visibility: hidden;

    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      //flecha
      content: "";

      position: absolute;

      border-style: solid;
      border-color: #c53030 transparent;
      border-width: 6px 6px 0 6px; //fazer o triângulo
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
