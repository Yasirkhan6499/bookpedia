"use client";

import { createContext, useState, useContext } from 'react';

const VisitorContext = createContext();

export const useVisitor = () => useContext(VisitorContext);

export const VisitorProvider = ({ children }) => {
  const [isVisitor, setIsVisitor] = useState(false);

  return (
    <VisitorContext.Provider value={{ isVisitor, setIsVisitor }}>
      {children}
    </VisitorContext.Provider>
  );
};