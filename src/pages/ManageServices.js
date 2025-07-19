import React, { useEffect, useState } from 'react';
import API from '../api';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import Navbar from '../components/Navbar';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState('');

  const fetchServices = async () => {
    const res = await API.get('/services');
    setServices(res.data);
  };

  const addService = async () => {
    if (!newService) return;
    await API.post('/services', { name: newService });
    setNewService('');
    fetchServices();
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" gutterBottom>Manage Services</Typography>
        <TextField
          label="New Service"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <Button variant="contained" onClick={addService}>Add Service</Button>
        <List>
          {services.map(service => (
            <ListItem key={service._id}>
              <ListItemText primary={service.name} />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}
