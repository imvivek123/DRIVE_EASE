import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Cars API
export const getAllCars = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.type) params.append('type', filters.type);
  if (filters.min_price) params.append('min_price', filters.min_price);
  if (filters.max_price) params.append('max_price', filters.max_price);
  if (filters.available !== undefined) params.append('available', filters.available);
  
  return api.get(`/api/cars${params.toString() ? '?' + params.toString() : ''}`);
};

export const getCarById = (id) => api.get(`/api/cars/${id}`);

// Auth API
export const loginUser = (email, password) =>
  api.post('/api/auth/login', { email, password });

export const registerUser = (name, email, password) =>
  api.post('/api/auth/register', { name, email, password });

export const getCurrentUser = () => api.get('/api/auth/me');

// Booking API
export const createBooking = (carId, startDate, endDate) =>
  api.post('/api/bookings', { car_id: carId, start_date: startDate, end_date: endDate });

export const getMyBookings = () => api.get('/api/bookings/me');

export const getAllBookings = () => api.get('/api/bookings');

export const updateBookingStatus = (id, status) =>
  api.put(`/api/bookings/${id}/status`, { status });

// Admin Car API
export const addCar = (carData) => api.post('/api/cars', carData);

export const updateCar = (id, carData) => api.put(`/api/cars/${id}`, carData);

export const deleteCar = (id) => api.delete(`/api/cars/${id}`);

export default api;
