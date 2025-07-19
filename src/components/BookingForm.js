import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import API from '../api';
import '../css/BookingForm.css';

export default function BookingForm({ fetchBookings, selectedBooking, clearSelection }) {
  const [form, setForm] = useState({
    customer_name: '',
    address: '',
    date_time: '',
    service_id: ''
  });
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      const res = await API.get('/services');
      setServices(res.data);
    };
    loadServices();
  }, []);

  useEffect(() => {
    if (selectedBooking) {
      setForm({
        customer_name: selectedBooking.customer_name,
        address: selectedBooking.address,
        date_time: selectedBooking.date_time.slice(0, 16), // Format for datetime-local
        service_id: selectedBooking.service_id._id
      });
    }
  }, [selectedBooking]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedBooking) {
      // Edit mode
      await API.put(`/bookings/${selectedBooking._id}`, form);
    } else {
      // Create mode
      await API.post('/bookings', form);
    }

    fetchBookings();
    clearSelection();
    setForm({ customer_name: '', address: '', date_time: '', service_id: '' });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <TextField label="Customer Name" fullWidth margin="dense" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} />
      <TextField label="Address" fullWidth margin="dense" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <TextField label="Date & Time" type="datetime-local" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={form.date_time} onChange={(e) => setForm({ ...form, date_time: e.target.value })} />
      <TextField select label="Service Type" fullWidth margin="dense" value={form.service_id} onChange={(e) => setForm({ ...form, service_id: e.target.value })}>
        {services.map(s => <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>)}
      </TextField>
      <Button variant="contained" type="submit">{selectedBooking ? 'Update Booking' : 'Add Booking'}</Button>
    </form>
  );
}
