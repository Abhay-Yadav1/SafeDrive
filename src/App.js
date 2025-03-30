import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';

function App() {
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;

  useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userObj ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={userObj ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
