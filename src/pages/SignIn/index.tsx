import React, { useRef, useCallback } from "react";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";

import LogoImg from "../../assets/logo.svg";

import getValidationErrors from "../../utils/getValidationsErrors";

import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background, AnimationContainer } from "./styles";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Email obrigatório")
            .email("Digite um email válido"),
          password: Yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false, // pra retornar todos os erros de uma vez
        });

        await signIn({ email: data.email, password: data.password });
        history.push("/dashboard");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na autenticação",
          description:
            "Ocorreu um erro ao fazer login, verifique as credenciais",
        });
      }
    },
    [signIn, addToast, history]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="Logo GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              onChange={() => formRef.current?.setFieldError("email", "")}
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
              onChange={() => formRef.current?.setFieldError("password", "")}
            />
            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
