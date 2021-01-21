import styled from "styled-components";
import { shade } from "polished";

export const ButtonContainer = styled.button`
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
`;
