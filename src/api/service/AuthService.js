import api from '../axios';

const authService = {
  
  register: async (userData) => {
    try {
      const response = await api.post('auth/register.php', userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        throw error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        // Something happened in setting up the request
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },


  login: async (credentials) => {
    try {
      const response = await api.post('auth/login.php', credentials);
      
      // If login is successful, store the token
      if (response.data.token) {
         localStorage.setItem('auth_token', response.data.token);
        
        // Optionally store user data
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },

  recover: async (data) => {
    try {
      const response = await api.post('auth/recover.php', data);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },

  changePassword: async (payload) => {
    try {
      const response = await api.post('auth/changePassword.php', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },
  updateProfile: async (payload) => {
    try {
      const response = await api.post('auth/updateProfile.php', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'No response from server. Please check your connection.' };
      } else {
        throw { error: 'Failed to send request. Please try again.' };
      }
    }
  },

  
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return localStorage.getItem('auth_token') !== null;
  },

  // Get current user data
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export { api, authService };