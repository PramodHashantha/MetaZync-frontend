import React, { useState, useEffect } from 'react';
import { 
  Container, TextField, Button, List, ListItem, ListItemText, 
  IconButton, Paper, Dialog, DialogActions, CircularProgress, Box
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import API from '../api';
import Navbar from '../components/Navbar';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [input, setInput] = useState('');
  const [action, setAction] = useState({ type: null, service: null });
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await API.get('/services');
      setServices(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!input.trim()) return;
    
    try {
      if (action.type === 'add') {
        await API.post('/services', { name: input });
      } else if (action.type === 'edit') {
        await API.put(`/services/${action.service._id}`, { name: input });
      }
      setInput('');
      setAction({ type: null, service: null });
      fetchServices();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/services/${action.service._id}`);
      setAction({ type: null, service: null });
      fetchServices();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        {/* Add Service */}
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Service name"
              value={action.type === 'edit' ? input : input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAction()}
            />
            <Button
              variant="contained"
              onClick={() => {
                if (input.trim()) {
                  action.type === 'edit' ? handleAction() : handleAction();
                }
              }}
              startIcon={<Add />}
            >
              {action.type === 'edit' ? 'Update' : 'Add'}
            </Button>
          </Box>
        </Paper>

        {/* Services List */}
        <Paper elevation={1} sx={{ p: 2 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {services.map(service => (
                <ListItem 
                  key={service._id}
                  secondaryAction={
                    <>
                      <IconButton onClick={() => {
                        setAction({ type: 'edit', service });
                        setInput(service.name);
                      }}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton onClick={() => setAction({ type: 'delete', service })}>
                        <Delete color="error" />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText primary={service.name} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>

        {/* Delete Confirmation */}
        <Dialog 
          open={action.type === 'delete'} 
          onClose={() => setAction({ type: null, service: null })}
        >
          <DialogActions>
            <Button onClick={() => setAction({ type: null, service: null })}>Cancel</Button>
            <Button onClick={handleDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}