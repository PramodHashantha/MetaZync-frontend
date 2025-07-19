import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await API.post('/auth/login', { username, password });
    localStorage.setItem('token', res.data.token);

    // Fetch user role
    const userRes = await API.get('/auth/me');
    localStorage.setItem('userRole', userRes.data.role);  // <-- store role

    navigate('/dashboard');
  } catch (err) {
    alert('Invalid login');
  }
};

    const goToRegister = () => {
    navigate('/register');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      <br />
      <br />
      <Button variant="contained" onClick={goToRegister}>Go to Sign Up</Button>
    </Container>
  );
}
