import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', { username, password });
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (err) {
      alert('Username already taken or error occurred.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleRegister}>Register</Button>
      <br /><br />
      <Button variant="text" onClick={() => navigate('/')}>Back to Login</Button>
    </Container>
  );
}
