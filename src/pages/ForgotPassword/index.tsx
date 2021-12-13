import React, { useRef, useCallback, useState } from "react";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { Link } from "react-router-dom";
import { FormHandles } from "@unform/core";
import { FiLogIn, FiMail } from "react-icons/fi";

import LogoImg from "../../assets/logo.svg";

import { api } from "../../services/api";

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
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Email obrigatório")
            .email("Digite um email válido"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/password/forgot", { email: data.email });

        addToast({
          type: "success",
          title: "Email de recuperação enviado",
          description:
            "Enviamos um email para confirmar a recuperação de senha, cheque sua caixa de entrada.",
        });
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title:
            error.response?.data.message || "Erro na recuperação de senha.",
          description:
            "Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.",
        });
      } finally {
        setLoading(false);
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
            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/">
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
