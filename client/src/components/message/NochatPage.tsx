import * as React from 'react';
import { styled } from 'styled-components';
import { useAuthContext } from '../../context/Auth_context';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MessageWrapper = styled.div`
  padding: 1rem;
  text-align: center;
  color: #e5e7eb;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 640px) {
    font-size: 1.125rem;
  }

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const NoChatMessage: React.FC = () => {
  const { authUser } = useAuthContext();

  return (
    <Container>
      <MessageWrapper>
        <p>Welcome 👋 {authUser?.name} ❄</p>
        <p>Select a chat to start messaging</p>
      </MessageWrapper>
    </Container>
  );
};

export default NoChatMessage;
