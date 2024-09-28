// src/components/Header.tsx
import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #6200ea;
  padding: 1rem;
  color: white;
  text-align: center;
`;

export const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <h1>Chat Application Dashboard</h1>
    </HeaderWrapper>
  );
};
