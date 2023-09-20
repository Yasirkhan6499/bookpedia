"use client";

import Image from 'next/image';
import React from 'react'
import BookResult from './BookResult';
import Button from './Button';

const ResultsSearch = ({booksList, onClick}) => {
  return (
    <div className='results'>
        {booksList.map((book, index)=>{
            // console.log("book info :",book.volumeInfo.imageLinks)
            return (
                
              <div className='pic-content-cont' key={book.id || index}>
                <BookResult 
                book={book}
                />
               <Button 
               title={"Add Item"}
               onClick={(e)=>onClick(e,book)}
               width={"w-30"}
               className={"ml-16 -mt-6 -translate-y-8 text-base"}
               />
             </div>
            );
        })}
    </div>
  )
}

export default ResultsSearch;