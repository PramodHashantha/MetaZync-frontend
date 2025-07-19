import API from '../api';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../css/BookingList.css';

export default function BookingList({ bookings, fetchBookings }) {
  const handleDelete = async (id) => {
    await API.delete(`/bookings/${id}`);
    fetchBookings();
  };

  return (
    <List className="booking-list">
      {bookings.map((b) => (
        <ListItem key={b._id} divider>
          <ListItemText
            primary={`${b.customer_name} - ${new Date(b.date_time).toLocaleString()}`}
            secondary={`${b.service_id.name} | ${b.address}`}
          />
          <IconButton onClick={() => handleDelete(b._id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}
