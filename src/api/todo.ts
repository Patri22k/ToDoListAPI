import axios from "axios";

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchTodos = async () => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.get(`${API_BASE_URL}/todos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return {success: true, data: response.data};
  } catch (error: unknown) {
    let errorMessage = 'An error occurred while fetching todos';

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {success: false, error: errorMessage};
  }
}

export const createTodo = async (title: string, description: string) => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.post(`${API_BASE_URL}/todos`, {
        title,
        description,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

    return {success: true, data: response.data};
  } catch (error: unknown) {
    let errorMessage = 'An error occurred while creating todo';

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {success: false, error: errorMessage};
  }
};