// API service for backend communication
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData && errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (e) {
        // If we can't parse JSON, try text
        try {
          const textError = await response.text();
          if (textError) {
            errorMessage = textError;
          }
        } catch (e2) {
          // Use the default error message
        }
      }
      throw new Error(errorMessage);
    }

    // Check if response has content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text();
      if (text) {
        return JSON.parse(text);
      } else {
        return {}; // Return empty object for empty responses
      }
    } else {
      return {}; // Return empty object for non-JSON responses
    }
  } catch (error: any) {
    console.error('API call failed:', error);
    // Re-throw with a more user-friendly message if it's a network error
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please check if the backend is running.');
    }
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: (username: string, password: string) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
};

// Employee API
export const employeeAPI = {
  getAll: () => apiCall('/employees'),
  getById: (id: number) => apiCall(`/employees/${id}`),
  create: (employee: any) =>
    apiCall('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    }),
  update: (id: number, employee: any) =>
    apiCall(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employee),
    }),
  delete: (id: number) =>
    apiCall(`/employees/${id}`, {
      method: 'DELETE',
    }),
  clearAll: () =>
    apiCall('/employees/clear-all', {
      method: 'DELETE',
    }),
};

// Attendance API
export const attendanceAPI = {
  getAll: () => apiCall('/attendance'),
  getByEmployee: (employeeId: number) => apiCall(`/attendance/employee/${employeeId}`),
  create: (attendance: any) =>
    apiCall('/attendance', {
      method: 'POST',
      body: JSON.stringify(attendance),
    }),
  update: (id: number, attendance: any) =>
    apiCall(`/attendance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(attendance),
    }),
};

// Reports API
export const reportsAPI = {
  getEmployeeDirectory: () => apiCall('/reports/employee-directory'),
  getDepartments: () => apiCall('/reports/departments'),
  getAttendance: () => apiCall('/reports/attendance'),
  getSalary: () => apiCall('/reports/salary'),
};