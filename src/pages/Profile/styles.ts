import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  > header {
    display: flex;
    align-items: center;

    height: 144px;
    background-color: #28262e;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 25px;
        height: 25px;

        transition: color 200ms;

        &:hover {
          color: #ff9000;
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: -175px auto 0;

  width: 100%;

  form {
    display: flex;
    flex-direction: column;

    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
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
`;

export const AvatarInput = styled.div`
  position: relative;

  align-self: center;

  margin-bottom: 32px;

  img {
    width: 186px;
    height: 186px;

    border-radius: 50%;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    position: absolute;

    width: 48px;
    height: 48px;

    background-color: #ff9000;

    border: 0;
    border-radius: 50%;

    bottom: 0;
    right: 0;

    transition: all 200ms;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background-color: ${shade(0.2, "#ff9000")};
    }
  }
`;
