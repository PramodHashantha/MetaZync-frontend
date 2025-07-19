import React from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Box
} from '@mui/material';
import { 
  Logout,
  AdminPanelSettings,
  Menu as MenuIcon,
  AccountCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
    handleClose();
  };

  return (
    <AppBar position="sticky" sx={{ 
      background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
      boxShadow: 'none'
    }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Cleaning Service
        </Typography>

        {/* Desktop View */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {userRole === 'admin' && (
            <Button
              color="inherit"
              startIcon={<AdminPanelSettings />}
              onClick={() => navigate('/admin')}
              sx={{ textTransform: 'none' }}
            >
              Admin
            </Button>
          )}
          
          <IconButton
            color="inherit"
            onClick={handleMenu}
            size="large"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
        </Box>

        {/* Mobile View */}
        <IconButton
          color="inherit"
          onClick={handleMenu}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Common Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 200
            }
          }}
        >
          <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
            <AccountCircle sx={{ mr: 1 }} /> Profile
          </MenuItem>
          
          {userRole === 'admin' && (
            <MenuItem onClick={() => { navigate('/admin'); handleClose(); }}>
              <AdminPanelSettings sx={{ mr: 1 }} /> Admin
            </MenuItem>
          )}
          
          <Divider />
          
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}