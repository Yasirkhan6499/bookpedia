"use client";

import Toast from '@/components/Toast';
import React, { createContext, useState, useContext } from 'react';


const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');

  const triggerToast = (msg, type = 'success') => {
    setMessage(msg);
    setType(type);
    setShowToast(true);
  };

  return (
    <ToastContext.Provider value={{ triggerToast }}>
       
      <Toast message={message} type={type} showToast={showToast} setShowToast={setShowToast} />
      {children}
    </ToastContext.Provider>
  );
};