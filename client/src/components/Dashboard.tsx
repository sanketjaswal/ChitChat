// src/components/Dashboard.tsx
import * as React from 'react';
import { styled } from 'styled-components';
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
`;
