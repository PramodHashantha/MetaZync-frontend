import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Paper, 
  Typography,
  Chip,
  Divider,
  CircularProgress
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Edit as EditIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import API from '../api';

export default function BookingList({ bookings, fetchBookings, onEdit, isLoading }) {
  const [deletingId, setDeletingId] = React.useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await API.delete(`/bookings/${id}`);
      fetchBookings();
    } finally {
      setDeletingId(null);
    }
  };

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'PPpp');
  };

  if (isLoading && !bookings.length) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (!bookings.length && !isLoading) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography>No bookings found</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Bookings</Typography>
      <List>
        {bookings.map((booking) => (
          <React.Fragment key={booking._id}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton onClick={() => onEdit(booking)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(booking._id)}
                    disabled={deletingId === booking._id}
                  >
                    {deletingId === booking._id ? (
                      <CircularProgress size={24} />
                    ) : (
                      <DeleteIcon color="error" />
                    )}
                  </IconButton>
                </>
              }
              sx={{
                '&:hover': { backgroundColor: 'action.hover' },
                alignItems: 'flex-start'
              }}
            >
              <ListItemText
                primary={
                  <>
                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                      {booking.customer_name}
                    </Typography>
                    <Chip 
                      label={booking.service_id.name} 
                      size="small" 
                      sx={{ ml: 1 }} 
                    />
                  </>
                }
                secondary={
                  <>
                    <Typography variant="body2" display="block">
                      {formatDateTime(booking.date_time)}
                    </Typography>
                    <Typography variant="body2">
                      {booking.address}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}