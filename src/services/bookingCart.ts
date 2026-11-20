import type { BookingItem } from '../types/booking';

const STORAGE_KEY = 'travelua-bookings';

export function getBookings(): BookingItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as BookingItem[];
  } catch {
    return [];
  }
}

export function saveBookings(items: BookingItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('bookings:updated'));
}

export function addBooking(item: BookingItem) {
  const bookings = getBookings();
  const existing = bookings.find((booking) => booking.id === item.id);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    bookings.push(item);
  }

  saveBookings(bookings);
}

export function removeBooking(id: string) {
  saveBookings(getBookings().filter((item) => item.id !== id));
}

export function clearBookings() {
  saveBookings([]);
}

export function getBookingsCount() {
  return getBookings().reduce((sum, item) => sum + item.quantity, 0);
}

export function getBookingsTotal() {
  return getBookings().reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
}
