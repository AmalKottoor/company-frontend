import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [serviceVisibility, setServiceVisibility] = useState({});

  // Load admin state and service visibility from localStorage
  useEffect(() => {
    const savedAdminState = localStorage.getItem('optiautomata-admin');
    const savedVisibility = localStorage.getItem('optiautomata-service-visibility');
    
    if (savedAdminState === 'true') {
      setIsAdmin(true);
    }
    
    if (savedVisibility) {
      setServiceVisibility(JSON.parse(savedVisibility));
    }
  }, []);

  // Save service visibility to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('optiautomata-service-visibility', JSON.stringify(serviceVisibility));
  }, [serviceVisibility]);

  const login = (password) => {
    // Simple password check - in production, this would be more secure
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('optiautomata-admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('optiautomata-admin');
  };

  const toggleServiceVisibility = (serviceId) => {
    setServiceVisibility(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const isServiceVisible = (serviceId) => {
    return serviceVisibility[serviceId] !== false; // Default to true if not set
  };

  return (
    <AdminContext.Provider value={{
      isAdmin,
      login,
      logout,
      serviceVisibility,
      toggleServiceVisibility,
      isServiceVisible
    }}>
      {children}
    </AdminContext.Provider>
  );
};
