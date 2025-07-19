import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper,
  Link,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { Lock, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.username || !form.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);

      const userRes = await API.get('/auth/me');
      localStorage.setItem('userRole', userRes.data.role);

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box textAlign="center" mb={4}>
          <Lock color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h5" component="h1" mt={1}>
            Sign In
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Person color="action" sx={{ mr: 1 }} />
            }}
            disabled={loading}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Lock color="action" sx={{ mr: 1 }} />
            }}
            disabled={loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" textAlign="center">
          Don't have an account?{' '}
          <Link 
            component="button" 
            onClick={() => navigate('/register')}
            sx={{ fontWeight: 500 }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}