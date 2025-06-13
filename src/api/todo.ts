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
    let errorMessage = {message: 'An error occurred while deleting todo'};

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data || { message: error.message };
    } else if (error instanceof Error) {
      errorMessage = {message: error.message};
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
    let errorMessage = {message: 'An error occurred while deleting todo'};

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data || { message: error.message };
    } else if (error instanceof Error) {
      errorMessage = {message: error.message};
    }

    return {success: false, error: errorMessage};
  }
};

export const deleteTodo = async (id: number) => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.delete(`${API_BASE_URL}/todos/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return {success: true, message: response.data.message}

  } catch (error: unknown) {
    let errorMessage = {message: 'An error occurred while deleting todo'};

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data || { message: error.message };
    } else if (error instanceof Error) {
      errorMessage = {message: error.message};
    }

    return {success: false, error: errorMessage};
  }
};

export const editTodo = async (id: number, title: string, description: string) => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, {
      title,
      description,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return {success: true, data: response.data};
  } catch (error: unknown) {
    let errorMessage = {message: 'An error occurred while editing todo'};

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data || { message: error.message };
    } else if (error instanceof Error) {
      errorMessage = {message: error.message};
    }

    return {success: false, error: errorMessage};
  }
};