import React, { useEffect, useState } from 'react';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';
import API from '../api';
import { Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role === 'admin') {
      navigate('/admin'); // Redirect if admin
    }
  }, [navigate]);

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
