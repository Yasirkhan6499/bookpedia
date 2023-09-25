"use client";

import { createContext, useContext, useState } from "react"

const BooksContext = createContext();

export const useBooks = () =>{
    const context = useContext(BooksContext);
    if (!context) {
        throw new Error("useBooks must be used within a BooksProvider");
      }
      return context;
};

export const BooksProvider = ({children})=>{
    const [addBookIdArr, setAddBookIdArr] = useState([]);

    return(
        <BooksContext.Provider value={{addBookIdArr, setAddBookIdArr}}>
            {children}
        </BooksContext.Provider>
    );
}
