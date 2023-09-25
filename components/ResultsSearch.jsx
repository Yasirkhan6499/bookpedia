"use client";

import Image from 'next/image';
import React from 'react'
import BookResult from './BookResult';
import Button from './Button';
import axios from 'axios';
import { useBooks } from '@/context/booksContext';


const ResultsSearch = ({booksList, onClick, itemAddIdArr}) => {


  const { addBookIdArr,setAddBookIdArr } = useBooks();  // Use the context

  // console.log("itemAddedIdArr: ",itemAddIdArr);
   // handling delete
   const handleDelete = async (bookId)=>{
    try{
      console.log(addBookIdArr)
      // alert(isbn13)
      const response = await axios.post("/api/books/delete",{
        bookid: bookId
      })
      alert("Book deleted!")
    console.log(response.data.book," Book deleted!");

    setAddBookIdArr(prevArr => prevArr.filter(id => id !== bookId));
    
    }catch(error){
      console.log(error);
    } 
  } 
  console.log("addedBookIdArr :",addBookIdArr);
  return (
    <div className='results'>
        {booksList.map((book, index)=>{
          
           const bookId = book.id;
          //  console.log("bookId",bookId);
          
            // console.log("book info :",book.volumeInfo.imageLinks)

            return (
                
                <div className='pic-content-cont' key={book.id || index}>
                <BookResult 
                book={book}
                />
                {addBookIdArr?.includes(bookId)?
                <div className='flex flex-col gap-5'>
                <Button 
                title={`Delete`}
                width={"w-fit "}
                className={" bg-red-500 hover:bg-red-700 ml-16 px-8 -translate-y-8 text-base"}
                onClick={()=>handleDelete(bookId)}
                />
                <Button 
                title={"View/Edit"}
                width={"w-fit "}
                className={"ml-[3.2rem] px-8 -mt-6 -translate-y-8 text-base  "}
                />
               </div>
                
                :<Button 
                title={"Add Item"}
                onClick={(e)=>onClick(e,book)}
                width={"w-30"}
                className={"ml-16 -mt-6 -translate-y-8 text-base"}
                />
              }
               
             </div>
            );
        })}
    </div>
  )
}

export default ResultsSearch;