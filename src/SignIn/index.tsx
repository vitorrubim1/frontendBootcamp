import React, { useRef, useCallback } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core"; // typagem da referencia do formulario

import getValidationErrors from "../utils/getValidationsErrors";

import LogoImg from "../assets/logo.svg";

import Input from "../components/Input";
import Button from "../components/Button";

import { Container, Content, Background } from "./styles";

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({}); // zerando os erros

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obrigatório")
          .email("Digite um email válido"),
        password: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false, // pra retornar todos os erros de uma vez
      }); // dados q recebi do input
    } catch (error) {
      const errors = getValidationErrors(error);

      formRef.current?.setErrors(errors); // formRef: referencia do formulario. current: valor das informações
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="Logo GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
