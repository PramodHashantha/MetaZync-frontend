import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper, 
  Grid,
  Avatar,
  Divider
} from '@mui/material';
import { 
  CalendarToday,
  Build,
  AdminPanelSettings
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const actionItems = [
  {
    title: "Manage Bookings",
    path: "/admin/bookings",
    icon: <CalendarToday fontSize="large" />,
    color: "primary"
  },
  {
    title: "Manage Services",
    path: "/admin/services",
    icon: <Build fontSize="large" />,
    color: "secondary"
  }
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" mb={4} gap={2}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              <AdminPanelSettings fontSize="large" />
            </Avatar>
            <Typography variant="h4">Admin Dashboard</Typography>
          </Box>
          
          <Divider sx={{ mb: 4 }} />
          
          <Grid container spacing={3}>
            {actionItems.map((item) => (
              <Grid item xs={12} sm={6} key={item.title}>
                <Button
                  fullWidth
                  variant="contained"
                  color={item.color}
                  onClick={() => navigate(item.path)}
                  sx={{ 
                    py: 4,
                    borderRadius: 2,
                    flexDirection: 'column',
                    gap: 2
                  }}
                >
                  {item.icon}
                  <Typography variant="h6">{item.title}</Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
}