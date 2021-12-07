import React, { useRef, useCallback } from "react";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { Link } from "react-router-dom";
import { FormHandles } from "@unform/core";
import { FiLogIn, FiMail } from "react-icons/fi";

import LogoImg from "../../assets/logo.svg";

import { useToast } from "../../hooks/toast";

import getValidationErrors from "../../utils/getValidationsErrors";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background, AnimationContainer } from "./styles";

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Email obrigatório")
            .email("Digite um email válido"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na recuperação de senha.",
          description:
            "Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.",
        });
      }
    },
    [addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="Logo GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              onChange={() => formRef.current?.setFieldError("email", "")}
            />
            <Button type="submit">Recuperar</Button>
          </Form>

          <Link to="/signin">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ForgotPassword;
