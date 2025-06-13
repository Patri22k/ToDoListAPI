import axios from 'axios';

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:3000/auth';

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/register`, {
      name,
      email,
      password
    });

    return { success: true, data: response.data};
  } catch (error: any) {
    const errors = error?.response?.data || error || { message: 'An error occurred during registration' };

    return { success: false, error: errors};
  }
}

export const loginUser = async (email: string, password: string)  => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/login`, {
      email,
      password
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    const errors = error?.response?.data || error || 'An error occurred during login';

    return { success: false, error: errors };
  }
}