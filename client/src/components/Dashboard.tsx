// src/components/Dashboard.tsx
import * as React from 'react';
import { keyframes, styled } from 'styled-components';
import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';
import { Navbar } from './Navbar';

interface DashboardProps {
  connected: boolean | undefined;
}

const Dashboard: React.FC<DashboardProps> = ({ connected }) => {
  return (
    <DashboardWrapper>
      <Navbar connected={connected} />
      <MainContent>
        <Sidebar />
        <ChatArea />
      </MainContent>
    </DashboardWrapper>
  );
};

export default Dashboard;

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

const DashboardWrapper = styled.div`
  display: flex;
  background-color: #131313;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  border-radius: 30px;
  overflow: hidden;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out 0.7s forwards;
`;
