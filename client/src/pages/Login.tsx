import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { keyframes, styled } from 'styled-components';

import { setToken } from '../storage';
import { login } from '../apis';
import { useFormik } from 'formik';
import { loginSchema } from '../models';
import { useAuthContext } from '../context/Auth_context';
import { decodeJWTToken } from '../utils/decodeToken';

interface AuthUser {
  id: number;
  name: string;
  username: string;
  email: string;
  gender: string;
}

const Login: React.FC = () => {
  const { setAuthUser } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await login(values); // Call your API
        setToken(res.token);
        const tokenUser = decodeJWTToken(res.token) as AuthUser;
        setAuthUser(tokenUser);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <HomeContainer>
      <Container>
        <Card>
          <Title>
            Login
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/chat-message--v1.png"
              alt="chat-message--v1"
            />
            <HighlightedText> ChitChat</HighlightedText>
          </Title>
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <Input
                type="text"
                placeholder="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={
                  !!(formik.touched.username && !!formik.errors.username)
                }
              />
              {formik.touched.username && formik.errors.username && (
                <Msg>{formik.errors.username}</Msg>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={
                  !!(formik.touched.password && !!formik.errors.password)
                }
              />
              {formik.touched.password && formik.errors.password && (
                <Msg>{formik.errors.password}</Msg>
              )}
            </div>

            <StyledLink to="/signup">{"Don't"} have an account?</StyledLink>

            <div>
              <FormButton>Login</FormButton>
            </div>
          </Form>
        </Card>
      </Container>
    </HomeContainer>
  );
};

export default Login;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
  /* border-radius: 0.5rem; */
  overflow: hidden;
  background-color: #131313;
  background-clip: padding-box;
  box-shadow: 0px 4px 6px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);

  @media (min-width: 768px) {
    /* height: 550px; */
  }
`;

const Msg = styled.div`
  color: red;
  margin-top: 3px;
  font-size: 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 24rem;
  margin: auto;
  padding: 100px;
  /* background-color: #fff; */
`;

const Card = styled.div`
  width: 100%;
  padding: 2rem;
  border-radius: 30px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.584);
  background-color: #202329;
  backdrop-filter: blur(10px);
  transition: 0.6s;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out 0.5s forwards;

  &:hover {
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.545);
    transition: 0.5s;
    /* transform: scale(1.03); */
  }
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 500;
  text-align: center;
  color: #d1d5db;
  margin-block: 0px 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const HighlightedText = styled.span`
  color: #3b82f6;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input<{ isError: boolean }>`
  width: 90%;
  height: 2.5rem;
  border: 2px solid ${({ isError }) => (isError ? 'red' : '#d1d5db')};
  /* border: 1px solid #d1d5db; */
  border-radius: 0.375rem;
  padding: 0 0.5rem;
  outline: none;
  &:focus {
    border-color: ${({ isError }) => (isError ? 'red' : '#3b82f6')};
  }
`;

const StyledLink = styled(Link)`
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: inline-block;
  color: white;
  text-decoration: none;
  transition: 0.5s;
  &:hover {
    color: #3b82f6;
    transition: 0.1s;
  }
`;

const FormButton = styled.button`
  width: 94%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background-color: #3b82f6;
  border: none;
  border-radius: 0.375rem;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all.5s;

  &:hover {
    background-color: #0045b5;
    /* transform: scale(1.02); */
    box-shadow: 0 0 2px white;
    transition: all.2s;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;
