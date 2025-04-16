import api from '../api/axios';

const adminService = {
  
  getAllUsers: async () => {
    try {
      const response = await api.get('admin/getUsers.php');
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


  updateLoanStatus: async (payload) => {
    try {
      const response = await api.post('payment/approveLoan.php', payload);     
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

  updateWithdrawal: async (payload) => {
    try {
      const response = await api.post('payment/approveWithdrawal.php', payload);
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

  login: async (credentials) => {
    try {
      const response = await api.post('admin/login.php', credentials);
      
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

export { api, adminService };