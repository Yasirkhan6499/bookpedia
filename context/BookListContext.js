"use client";

const { createContext, useContext, useState } = require("react");


const BookListContext = createContext();

export const useBookListContext = ()=>{
    return useContext(BookListContext);
};

export const BookListProvider = ({children}) =>{
    const [booksList, setBooksList] = useState(undefined);
    const [collection, setCollection] = useState('');
    const value = {
        booksList,
        setBooksList,
        collection, 
        setCollection 
    };

    return <BookListContext.Provider value={value}>
        {children}
    </BookListContext.Provider>
}

