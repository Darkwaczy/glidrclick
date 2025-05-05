
import React from 'react';

const useAuth = () => {
  return {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    login: async () => {},
    logout: async () => {},
    register: async () => {}
  };
};

export default useAuth;
