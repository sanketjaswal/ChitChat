import * as React from 'react';
import './App.css';
import GlobalStyles from './styles/GlobalStyles';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Home } from './pages/Home';
import { useAuthContext } from './context/Auth_context';
import { socket } from './socket';

function App(): JSX.Element {
  const { authUser } = useAuthContext() || {};

  const [isConnected, setIsConnected] = React.useState(socket.connected);

  React.useEffect(() => {
    function onConnect(): void {
      setIsConnected(true);
    }

    function onDisconnect(): void {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  React.useEffect(() => {
    console.log('isConnected:', isConnected);
  }, [isConnected]);

  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route
          path="/*"
          element={
            authUser ? (
              <Home connected={isConnected} />
            ) : (
              <Navigate to="login" />
            )
          }
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
