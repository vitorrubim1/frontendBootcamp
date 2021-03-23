import React, { useCallback, useRef } from "react";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { Link } from "react-router-dom";
import { FormHandles } from "@unform/core"; // typagem da referencia do formulario
import { FiArrowLeft, FiUser, FiMail, FiLock } from "react-icons/fi";
import getValidationErrors from "../../utils/getValidationsErrors";

import LogoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background, AnimationContainer } from "./styles";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({}); // zerando os erros

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("Email obrigatório")
          .email("Digite um email válido"),
        password: Yup.string().min(6, "Mínimo 6 digitos "),
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
      <Background />

      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="Logo GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Cadastro</h1>

            <Input
              name="name"
              icon={FiUser}
              placeholder="Nome"
              onChange={() => formRef.current?.setFieldError("name", "")}
            />
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
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para Login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
