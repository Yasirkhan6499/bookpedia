"use client";

import React, { createContext, useState, useEffect } from 'react';

const WindowDimensionsContext = createContext(null);

export const WindowDimensionsProvider = ({ children }) => {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
         // Ensure window object is available (this means we're on the client side)
         if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
            
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <WindowDimensionsContext.Provider value={{ windowWidth, setWindowWidth }}>
            {children}
        </WindowDimensionsContext.Provider>
    );
};

export default WindowDimensionsContext;
