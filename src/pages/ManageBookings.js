import React, { useEffect, useState } from 'react';
import API from '../api';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import Navbar from '../components/Navbar';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get('/bookings'); // Admin gets all
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" gutterBottom>All Bookings</Typography>
        <List>
          {bookings.map(booking => (
            <ListItem key={booking._id} divider>
              <ListItemText
                primary={`${booking.customer_name} - ${new Date(booking.date_time).toLocaleString()}`}
                secondary={`Service: ${booking.service_id?.name} | Address: ${booking.address} | User: ${booking.user_id?.username}`}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}
