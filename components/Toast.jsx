
import React from 'react';
import styles from './Toast.module.css';  // Import your CSS module here
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ message, type, showToast, setShowToast }) => {
  if (!showToast) return null;

  // Automatically hide the toast after 3 seconds
  setTimeout(() => setShowToast(false), 3000);
   // Determine the color and icon of the toast based on the type
   const Icon = type === 'success' ? FaCheckCircle : FaExclamationCircle;

  // Determine the color of the toast based on the type
  const toastStyle = type === 'success' ? styles.success : styles.error;

  return (
    <div className={`${styles.toast} ${toastStyle}`}>
      <div className='flex gap-1 pt-1 pr-2'>
       <Icon className="toast-icon mt-2 " />
       <p className='text-white text-xl'>
      {message}
      </p>
      </div>
      <FaTimes className="top-1 right-1 absolute" onClick={() => setShowToast(false)} />
    </div>
  );
};

export default Toast;