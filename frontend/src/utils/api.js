import axios from 'axios';

// Update this URL when you deploy backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Submit contact form
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact/submit', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error. Please try again.' };
  }
};

// Fetch all messages (public - with masked emails)
export const fetchMessages = async () => {
  try {
    const response = await api.get('/contact/messages');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch messages.' };
  }
};

// Fetch admin messages (full data - requires token)
export const fetchAdminMessages = async (token) => {
  try {
    const response = await api.get('/contact/messages/admin', {
      params: { token }
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unauthorized or network error.' };
  }
};

export default api;