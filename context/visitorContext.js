"use client";

import { createContext, useState, useContext } from 'react';

const VisitorContext = createContext();

export const useVisitor = () => useContext(VisitorContext);

export const VisitorProvider = ({ children }) => {
  const [isVisitor, setIsVisitor] = useState(false);
  const [viewedUserId, setViewedUserId] = useState(null); // State for storing the ID of the viewed user
  const [viewedUserBooks, setViewedUserBooks] = useState(null);
  const [visitorSelectedCol, setVisitorSelectedCol] = useState(null);

  return (
    <VisitorContext.Provider value={{ isVisitor, setIsVisitor, 
    viewedUserId, setViewedUserId,viewedUserBooks, setViewedUserBooks, visitorSelectedCol, setVisitorSelectedCol  }}>
      {children}
    </VisitorContext.Provider>
  );
};