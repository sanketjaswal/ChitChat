// src/components/Sidebar.tsx
import * as React from 'react';
import { styled } from 'styled-components';
import { Conversation } from './sidebar/Conversation';

const SidebarWrapper = styled.aside`
  width: 300px;
  background-color: #202329;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <Conversation />
      <Conversation />
    </SidebarWrapper>
  );
};
