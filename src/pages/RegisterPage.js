import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper,
  Link,
  CircularProgress,
  Alert
} from '@mui/material';
import { Person, Lock, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function RegisterPage() {
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
      await API.post('/auth/register', form);
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h5" component="h1">
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Join our cleaning service platform
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
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </Box>

        <Box mt={3} textAlign="center">
          <Link 
            component="button"
            onClick={() => navigate('/login')}
            sx={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <ArrowBack fontSize="small" sx={{ mr: 0.5 }} />
            Back to Login
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}