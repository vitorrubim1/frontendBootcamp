import styled from "styled-components";

export const InputWrapper = styled.div`
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
