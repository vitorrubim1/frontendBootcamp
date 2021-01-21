import styled from "styled-components";
import { shade } from "polished";

import signInBackgroundImg from "../assets/sign-in-background.png";

export const Container = styled.div`
  display: flex;

  height: 100vh;
  align-items: stretch; //pra que o content e o background tenha 100vh tbm
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #233129;
      padding: 16px;
      width: 100%;

      color: #f4ede8;

      & + input {
        margin-top: 8px;
      }

      &::placeholder {
        color: #666630;
      }
    }

    button {
      background: #ff9000;
      color: #312e38;
      font-weight: 500;

      border-radius: 10px;
      border: 0;

      padding: 0 16px;
      width: 100%;
      height: 56px;

      margin-top: 16px;

      transition: background-color 200ms;

      &:hover {
        background: ${shade(0.2, "#ff9000")};
      }
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 20px;
      text-decoration: none;

      transition: color 200ms;

      &:hover {
        color: ${shade(0.2, "#f4ede8")};
      }
    }
  }

  > a {
    // ">": somente a tag em si, dentro do content, não estilizar os demais
    color: #ff9000;
    display: block;
    margin-top: 20px;
    text-decoration: none;

    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }

    &:hover {
      color: ${shade(0.2, "#ff9000")};
    }
  }
`;

export const Background = styled.div`
  flex: 1; //ocupar todo espaço disponivel
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover; //pra cobrir todo espaço disponivel com a imagem
`;
