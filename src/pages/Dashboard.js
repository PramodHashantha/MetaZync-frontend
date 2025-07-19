import React, { useEffect, useState } from 'react';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';
import Navbar from '../components/Navbar';
import API from '../api';
import { Container, Typography } from '@mui/material';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get('/bookings');
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
    <Navbar />
    <Container>
      <Typography variant="h4" gutterBottom>My Bookings</Typography>
      <BookingForm fetchBookings={fetchBookings} />
      <BookingList bookings={bookings} fetchBookings={fetchBookings} />
    </Container>
    </>
  );
}
