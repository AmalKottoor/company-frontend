import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, EyeOff, LogOut, Settings, CheckCircle, XCircle } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import servicesData from '../config/services.json';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = onLogin(password);
    if (!success) {
      setError('Invalid password. Try "admin123"');
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700 max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-4">
          <Shield size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Admin Access
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Enter admin password to access control panel
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white"
            placeholder="Enter admin password"
            required
            data-testid="admin-password-input"
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          data-testid="admin-login-button"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Authenticating...</span>
            </div>
          ) : (
            'Access Admin Panel'
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-600 dark:text-blue-400">
          <strong>Demo Password:</strong> admin123
        </p>
      </div>
    </motion.div>
  );
};

const AdminDashboard = () => {
  const { logout, toggleServiceVisibility, isServiceVisible } = useAdmin();
  
  const visibleCount = servicesData.services.filter(service => isServiceVisible(service.id)).length;
  const totalCount = servicesData.services.length;

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
            Admin Dashboard
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Manage service visibility and website configuration
          </p>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          data-testid="admin-logout-button"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{visibleCount}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Visible Services</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <XCircle size={20} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{totalCount - visibleCount}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Hidden Services</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Settings size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{totalCount}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Management */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
            Service Visibility Control
          </h4>
          <p className="text-slate-600 dark:text-slate-400">
            Toggle individual services on/off to control what visitors see on the website
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servicesData.services.map((service) => (
              <motion.div
                key={service.id}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                whileHover={{ scale: 1.01 }}
                data-testid={`admin-service-toggle-${service.id}`}
              >
                <div className="flex-1">
                  <h5 className="font-medium text-slate-800 dark:text-white">
                    {service.title}
                  </h5>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {service.tools.join(', ')}
                  </p>
                </div>
                
                <button
                  onClick={() => toggleServiceVisibility(service.id)}
                  className={`ml-4 p-2 rounded-lg transition-colors ${
                    isServiceVisible(service.id)
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800'
                      : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800'
                  }`}
                  title={isServiceVisible(service.id) ? 'Hide service' : 'Show service'}
                >
                  {isServiceVisible(service.id) ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
          Quick Actions
        </h4>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              servicesData.services.forEach(service => {
                if (!isServiceVisible(service.id)) {
                  toggleServiceVisibility(service.id);
                }
              });
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            data-testid="admin-show-all-services"
          >
            Show All Services
          </button>
          <button
            onClick={() => {
              servicesData.services.forEach(service => {
                if (isServiceVisible(service.id)) {
                  toggleServiceVisibility(service.id);
                }
              });
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            data-testid="admin-hide-all-services"
          >
            Hide All Services
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const AdminPanel = () => {
  const { isAdmin, login } = useAdmin();

  return (
    <section id="admin" className="py-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6" data-testid="admin-panel-title">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isAdmin 
              ? 'Manage website content and service visibility' 
              : 'Secure admin area for website management'
            }
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto" data-testid="admin-panel-content">
          <AnimatePresence mode="wait">
            {isAdmin ? (
              <AdminDashboard key="dashboard" />
            ) : (
              <AdminLogin key="login" onLogin={login} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
