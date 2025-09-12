import React, { createContext, useContext, useState, useCallback } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

const NotificationItem = ({ notification, onRemove }) => {
  const { id, type, title, message, duration } = notification;
  
  const getIcon = () => {
    switch (type) {
      case 'success': return <FaCheckCircle className="text-green-400" />;
      case 'error': return <FaExclamationCircle className="text-red-400" />;
      case 'info': return <FaInfoCircle className="text-blue-400" />;
      default: return <FaInfoCircle className="text-blue-400" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success': return 'border-green-400 bg-green-900 bg-opacity-20';
      case 'error': return 'border-red-400 bg-red-900 bg-opacity-20';
      case 'info': return 'border-blue-400 bg-blue-900 bg-opacity-20';
      default: return 'border-blue-400 bg-blue-900 bg-opacity-20';
    }
  };

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onRemove(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onRemove]);

  return (
    <div className={`glass-card p-4 mb-3 rounded-lg border ${getStyles()} animate-slideInLeft`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          <div className="flex-1">
            {title && (
              <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
            )}
            <p className="text-gray-300 text-sm">{message}</p>
          </div>
        </div>
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-white transition-colors duration-200 ml-4"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>
    </div>
  );
};

const NotificationContainer = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-w-full">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback((message, title = 'Success') => {
    return addNotification({ type: 'success', title, message });
  }, [addNotification]);

  const showError = useCallback((message, title = 'Error') => {
    return addNotification({ type: 'error', title, message, duration: 7000 });
  }, [addNotification]);

  const showInfo = useCallback((message, title = 'Info') => {
    return addNotification({ type: 'info', title, message });
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
