import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';
import { useFormik } from 'formik';

import GenderCheckbox from './Gendercheckbox';
import { register } from '../apis/auth';
import { setToken } from '../storage';
import { registerSchema, User } from '../models';

interface FormInputs extends User {
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<FormInputs>({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    gender: '',
  });

  const handleCheckBoxChange = (gender: string): void => {
    setInputs({ ...inputs, gender });
  };

  const settingInput = (data: Partial<FormInputs>) => {
    setInputs({ ...inputs, ...data });
  };

  // form submit
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      console.log(inputs);

      if (
        !inputs.name ||
        !inputs.username ||
        !inputs.password ||
        !inputs.confirmPassword ||
        !inputs.email ||
        !inputs.gender
      ) {
        console.log('enter all values in form');
        return;
      }

      // if(Object.values(inputs))

      if (inputs.confirmPassword !== inputs.password) {
        return alert('passwords dont match');
      }

      const res = await register({
        name: inputs.name,
        username: inputs.username,
        password: inputs.password,
        gender: inputs.gender,
        email: inputs.email,
      });

      setToken(res.token);
      navigate('/');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      gender: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const res = await register(values); // Call your API
        setToken(res.token);
        navigate('/');
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
            Sign Up
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/chat-message--v1.png"
              alt="chat-message--v1"
            />
            <HighlightedText>ChitChat</HighlightedText>
          </Title>

          <Form onSubmit={formik.handleSubmit}>
            {/* Name Input */}
            <div>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={!!(formik.touched.name && !!formik.errors.name)}
              />
              {formik.touched.name && formik.errors.name && (
                <Msg>{formik.errors.name}</Msg>
              )}
            </div>

            {/* Username Input */}
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

            {/* Password Input */}
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

            {/* Confirm Password Input */}
            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={
                  !!(
                    formik.touched.confirmPassword &&
                    !!formik.errors.confirmPassword
                  )
                }
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <Msg>{formik.errors.confirmPassword}</Msg>
                )}
            </div>

            {/* Email Input */}
            <div>
              <Input
                type="text"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={!!(formik.touched.email && !!formik.errors.email)}
              />
              {formik.touched.email && formik.errors.email && (
                <Msg>{formik.errors.email}</Msg>
              )}
            </div>

            {/* Gender Input */}
            <div>
              <GenderCheckbox
                onCheckBoxChange={(gender: string) =>
                  formik.setFieldValue('gender', gender)
                }
                selectedGender={formik.values.gender}
              />
              {formik.touched.gender && formik.errors.gender && (
                <Msg>{formik.errors.gender}</Msg>
              )}
            </div>

            <StyledLink to="/">Already have an account?</StyledLink>

            <div>
              <FormButton type="submit">Register</FormButton>
            </div>
          </Form>
        </Card>
      </Container>
    </HomeContainer>
  );
};

export default Signup;

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

const Msg = styled.div`
  color: red;
  margin-top: 3px;
  font-size: 15px;
`;

const Card = styled.div`
  width: 100%;
  padding: 2rem;
  border-radius: 30px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.584);
  background-color: #202329;
  backdrop-filter: blur(10px);
  transition: 0.6s;

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
  /* border: 1px solid #d1d5db; */
  border: 2px solid ${({ isError }) => (isError ? 'red' : '#d1d5db')};
  border-radius: 0.375rem;
  padding: 0 0.5rem;
  outline: none;
  transition: all 0.5s;

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
    box-shadow: 0 0 2px white;
    transition: all.2s;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;
