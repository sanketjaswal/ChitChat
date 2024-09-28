import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GenderCheckbox from './Gendercheckbox';

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

const Input = styled.input`
  width: 90%;
  height: 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0 0.5rem;
  outline: none;
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

interface FormInputs {
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  gender: string;
}

const Signup: React.FC = () => {
  const [inputs, setInputs] = useState<FormInputs>({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    gender: '',
  });

  const handleCheckBoxChange = (gender: string): void => {
    setInputs({ ...inputs, gender });
    // console.log(gender);
  };

  // form submit
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      console.log(inputs);

      if (
        !inputs.fullname ||
        !inputs.username ||
        !inputs.password ||
        !inputs.confirmPassword ||
        !inputs.email ||
        !inputs.gender
      ) {
        console.log('enter all values in form');
        return;
      }

      if (inputs.confirmPassword !== inputs.password) {
        return alert('passwords dont match');
      }

      const res = await fetch(`${process.env.REACT_APP_API}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inputs.fullname,
          username: inputs.username,
          password: inputs.password,
          confirmPassword: inputs.confirmPassword,
          gender: inputs.gender,
          email: inputs.email,
        }),
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
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

          <Form onSubmit={handleSubmit}>
            <div>
              <Input
                type="text"
                placeholder="Name"
                value={inputs.fullname}
                onChange={(e) =>
                  setInputs({ ...inputs, fullname: e.target.value })
                }
              />
            </div>

            <div>
              <Input
                type="text"
                placeholder="Username"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Enter Password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>

            <div>
              <GenderCheckbox
                onCheckBoxChange={handleCheckBoxChange}
                selectedGender={inputs.gender}
              />
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
