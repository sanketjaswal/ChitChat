// src/components/Dashboard.tsx
import * as React from 'react';
import { styled } from 'styled-components';
// import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';
import { Navbar } from './Navbar';

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

const Dashboard: React.FC = () => {
  return (
    <DashboardWrapper>
      {/* <Header /> */}
      <Navbar />
      <MainContent>
        <Sidebar />
        <ChatArea />
      </MainContent>
    </DashboardWrapper>
  );
};

export default Dashboard;
