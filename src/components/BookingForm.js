import React, { useEffect, useState } from 'react';
import { 
  TextField, 
  Button, 
  MenuItem, 
  Paper, 
  Typography,
  Grid,
  CircularProgress
} from '@mui/material';
import API from '../api';

export default function BookingForm({ fetchBookings, selectedBooking, clearSelection }) {
  const [form, setForm] = useState({
    customer_name: '',
    address: '',
    date_time: '',
    service_id: ''
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load services on mount
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await API.get('/services');
        setServices(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Populate form if editing
  useEffect(() => {
    if (selectedBooking) {
      setForm({
        customer_name: selectedBooking.customer_name,
        address: selectedBooking.address,
        date_time: selectedBooking.date_time.slice(0, 16),
        service_id: selectedBooking.service_id._id
      });
    }
  }, [selectedBooking]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (selectedBooking) {
        await API.put(`/bookings/${selectedBooking._id}`, form);
      } else {
        await API.post('/bookings', form);
      }
      fetchBookings();
      clearForm();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setForm({ customer_name: '', address: '', date_time: '', service_id: '' });
    clearSelection();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {selectedBooking ? 'Edit Booking' : 'New Booking'}
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="customer_name"
              label="Customer Name"
              fullWidth
              value={form.customer_name}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="address"
              label="Address"
              fullWidth
              value={form.address}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              name="date_time"
              label="Date & Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.date_time}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              name="service_id"
              select
              label="Service Type"
              style={{ minWidth: '150px' }}
              value={form.service_id}
              onChange={handleChange}
              required
              disabled={loading || !services.length}
            >
              {services.map(s => (
                <MenuItem key={s._id} value={s._id}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        
        <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
          {selectedBooking && (
            <Grid item>
              <Button 
                variant="outlined" 
                onClick={clearForm}
                disabled={loading}
              >
                Cancel
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {selectedBooking ? 'Update' : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}