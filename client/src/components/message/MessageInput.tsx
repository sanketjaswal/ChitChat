import * as React from 'react';
import { useState, FormEvent } from 'react';
import { styled } from 'styled-components';

// Styled Components
const Form = styled.form`
  padding: 1rem;
  margin: 1rem 0;
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  border: 1px solid #4b5563;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.625rem;
  background-color: #374151;
  color: white;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!message) return;
    setMessage('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          type="text"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SubmitButton>Send</SubmitButton>
      </InputContainer>
    </Form>
  );
};

export default MessageInput;
