import React, { useEffect, useState } from 'react';
import API from '../api';
import { Container, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get('/bookings'); // Admin gets all
    setBookings(res.data);
  };

  const deleteBooking = async (id) => {
    await API.delete(`/bookings/${id}`);
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" gutterBottom>Manage All Bookings</Typography>
        <List>
          {bookings.map(booking => (
            <ListItem key={booking._id} divider>
              <ListItemText
                primary={`${booking.customer_name} - ${new Date(booking.date_time).toLocaleString()}`}
                secondary={`Service: ${booking.service_id?.name} | Address: ${booking.address} | User: ${booking.user_id?.username}`}
              />
              <IconButton onClick={() => deleteBooking(booking._id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}
