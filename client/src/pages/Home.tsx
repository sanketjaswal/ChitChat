import * as React from 'react';
import Dashboard from '../components/Dashboard';

// import { styled } from 'styled-components';

interface HomeProps {
  connected: boolean | undefined;
}

export const Home: React.FC<HomeProps> = ({ connected }) => {
  // console.log('connected', connected);
  return <Dashboard connected={connected} />;
};
