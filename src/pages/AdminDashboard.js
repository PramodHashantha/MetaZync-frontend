import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" gutterBottom>Admin Panel</Typography>
        <Button variant="contained" onClick={() => navigate('/admin/bookings')} style={{ marginRight: 10 }}>
          Manage Bookings
        </Button>
        <Button variant="contained" onClick={() => navigate('/admin/services')}>
          Manage Services
        </Button>
      </Container>
    </>
  );
}
