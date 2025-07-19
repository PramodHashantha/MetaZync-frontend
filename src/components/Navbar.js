import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="navbar-toolbar">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Cleaning Service App
        </Typography>

        {userRole === 'admin' && (
          <Button color="inherit" onClick={() => navigate('/admin')}>Admin Panel</Button>
        )}

        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
