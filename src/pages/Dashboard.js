import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  CircularProgress,
  Alert
} from '@mui/material';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';
import API from '../api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [state, setState] = useState({
    bookings: [],
    selectedBooking: null,
    loading: true,
    error: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userRole') === 'admin') {
      navigate('/admin');
    }
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const res = await API.get('/bookings');
      setState(prev => ({ ...prev, bookings: res.data, loading: false }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: 'Failed to load bookings. Please try again.',
        loading: false
      }));
      console.error('Error fetching bookings:', err);
    }
  };

  const handleEdit = (booking) => {
    setState(prev => ({ ...prev, selectedBooking: booking }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSelection = () => {
    setState(prev => ({ ...prev, selectedBooking: null }));
  };

  const { bookings, selectedBooking, loading, error } = state;

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Booking Form Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {selectedBooking ? 'Edit Booking' : 'New Booking'}
          </Typography>
          <BookingForm
            fetchBookings={fetchBookings}
            selectedBooking={selectedBooking}
            clearSelection={clearSelection}
          />
        </Paper>

        {/* Booking List Section */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="bold">
              My Bookings
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <BookingList
              bookings={bookings}
              fetchBookings={fetchBookings}
              onEdit={handleEdit}
            />
          )}
        </Paper>
      </Container>
    </>
  );
}