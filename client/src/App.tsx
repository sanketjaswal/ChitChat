import * as React from 'react';
import './App.css';
import GlobalStyles from './styles/GlobalStyles';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Home } from './pages/Home';
import { useAuthContext } from './context/Auth_context';

function App(): JSX.Element {
  const { authUser } = useAuthContext() || {};

  // console.log(authUser);

  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route
          path="/*"
          element={authUser ? <Home /> : <Navigate to="login" />}
        />
        <Route
          path="login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
