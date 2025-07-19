import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import API from '../api';
import '../css/BookingForm.css';

export default function BookingForm({ fetchBookings }) {
  const [form, setForm] = useState({ customer_name: '', address: '', date_time: '', service_id: '' });
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      const res = await API.get('/services');
      setServices(res.data);
    };
    loadServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/bookings', form);
    setForm({ customer_name: '', address: '', date_time: '', service_id: '' });
    fetchBookings();
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <TextField label="Customer Name" fullWidth margin="dense" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} />
      <TextField label="Address" fullWidth margin="dense" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <TextField label="Date & Time" type="datetime-local" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={form.date_time} onChange={(e) => setForm({ ...form, date_time: e.target.value })} />
      <TextField select label="Service Type" fullWidth margin="dense" value={form.service_id} onChange={(e) => setForm({ ...form, service_id: e.target.value })}>
        {services.map(s => <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>)}
      </TextField>
      <Button variant="contained" type="submit">Book</Button>
    </form>
  );
}
