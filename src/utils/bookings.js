// utils/bookings.js

// Group bookings by property ID
export function groupBookingsByPropertyId(bookings) {
  const grouped = {};
  bookings.forEach((booking) => {
    const propertyId = booking.propertyId || booking.property?.id;
    if (!grouped[propertyId]) {
      grouped[propertyId] = [];
    }
    grouped[propertyId].push(booking);
  });
  return grouped;
}

// Group bookings by user ID  
export function groupBookingsByUserId(bookings) {
  const grouped = {};
  bookings.forEach((booking) => {
    const userId = booking.userId || booking.guest?.id;
    if (!grouped[userId]) {
      grouped[userId] = [];
    }
    grouped[userId].push(booking);
  });
  return grouped;
}

// Calculate total nights for a booking
export function calculateBookingNights(checkInDate, checkOutDate) {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Calculate total cost for a booking
export function calculateBookingCost(checkInDate, checkOutDate, pricePerNight) {
  const nights = calculateBookingNights(checkInDate, checkOutDate);
  return nights * pricePerNight;
}

// Format booking date range
export function formatBookingDateRange(checkInDate, checkOutDate) {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  
  const options = { 
    month: 'short', 
    day: 'numeric',
    year: checkIn.getFullYear() !== checkOut.getFullYear() ? 'numeric' : undefined
  };
  
  return `${checkIn.toLocaleDateString('en-US', options)} - ${checkOut.toLocaleDateString('en-US', options)}`;
}

// Check if dates overlap with existing bookings
export function checkDateOverlap(newCheckIn, newCheckOut, existingBookings) {
  const newStart = new Date(newCheckIn);
  const newEnd = new Date(newCheckOut);
  
  return existingBookings.some(booking => {
    const existingStart = new Date(booking.checkInDate);
    const existingEnd = new Date(booking.checkOutDate);
    
    return (newStart < existingEnd && newEnd > existingStart);
  });
}

// Get booking status color
export function getBookingStatusColor(status) {
  switch (status) {
    case 'CONFIRMED':
      return 'green';
    case 'PENDING':
      return 'orange';
    case 'CANCELLED':
      return 'red';
    case 'COMPLETED':
      return 'blue';
    default:
      return 'gray';
  }
}

// Get booking status display text
export function getBookingStatusText(status) {
  switch (status) {
    case 'CONFIRMED':
      return 'Confirmed';
    case 'PENDING':
      return 'Pending';
    case 'CANCELLED':
      return 'Cancelled';
    case 'COMPLETED':
      return 'Completed';
    default:
      return 'Unknown';
  }
}

// Filter bookings by date range
export function filterBookingsByDateRange(bookings, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return bookings.filter(booking => {
    const bookingStart = new Date(booking.checkInDate);
    const bookingEnd = new Date(booking.checkOutDate);
    
    return bookingStart >= start && bookingEnd <= end;
  });
}

// Get upcoming bookings
export function getUpcomingBookings(bookings) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return bookings.filter(booking => {
    const checkInDate = new Date(booking.checkInDate);
    return checkInDate >= today && booking.status === 'CONFIRMED';
  }).sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate));
}

// Get past bookings
export function getPastBookings(bookings) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return bookings.filter(booking => {
    const checkOutDate = new Date(booking.checkOutDate);
    return checkOutDate < today;
  }).sort((a, b) => new Date(b.checkOutDate) - new Date(a.checkOutDate));
}