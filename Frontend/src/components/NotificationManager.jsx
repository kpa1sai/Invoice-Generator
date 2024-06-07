import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NotificationManager() {
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulated delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock notifications
        const notifications = [
          { message: 'Invoice #123 is due in 3 days', type: 'warning' },
          { message: 'Payment received for Invoice #456', type: 'success' },
        ];

        notifications.forEach(notification => {
          toast(notification.message, {
            type: notification.type,
            autoClose: 5000,
          });
        });
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Fetch notifications periodically
    const interval = setInterval(fetchNotifications, 60000); // every 60 seconds

    // Initial fetch
    fetchNotifications();

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return <ToastContainer />;
}

export default NotificationManager;
