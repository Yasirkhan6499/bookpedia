"use client";

import Image from 'next/image';
import React, { useState } from 'react'
import BookResult from './BookResult';
import Button from './Button';
import axios from 'axios';
import { useBooks } from '@/context/booksContext';
import BookEdit from './BookEdit';
import { useRouter } from 'next/navigation';


const ResultsSearch = ({booksList, onClick}) => {

  const router = useRouter();

  const { addBookIdArr,setAddBookIdArr } = useBooks();  // Use the context
  const [bookEditId, setbookEditId] = useState();
  

  // console.log("itemAddedIdArr: ",itemAddIdArr);
   // handling delete
   const handleDelete = async (bookId)=>{
    try{
      // console.log(addBookIdArr)
      // alert(isbn13)
      const response = await axios.post("/api/books/delete",{
        bookid: bookId
      })
      alert("Book deleted!")
    console.log(response.data.book," Book deleted!");

    // setAddBookIdArr(prevArr => prevArr.filter(id => id !== bookId));
    setAddBookIdArr(prevArr => prevArr.filter(entry => entry.bookId !== bookId));

    
    }catch(error){
      console.log(error);
    } 
  } 
  // Book edit 

  const handleBookEdit = (bookId)=>{
    // setbookEditId(bookId);
    router.push(`/books/additem/${bookId}`);
  }

  console.log("addedBookIdArr :",addBookIdArr);
  return (
    <div className='results'>
        {booksList.map((book, index)=>{
          
           const bookId = book.id;
          //  console.log("bookId",bookId);
          
            // console.log("book info :",book.volumeInfo.imageLinks)
            let addedAlready;
            const isBookAdded = addBookIdArr?.some(entry => {
              addedAlready = entry.addedAlready;
             return entry.bookId === bookId;
            
            });

           
            
            return (
                
                <div className='pic-content-cont' key={book.id || index}>
                <BookResult 
                book={book}
                imgCss={"w-full min-w-[12rem] h-[250px]"}
                />
                {isBookAdded?
                <div className='flex flex-col gap-5'>
                <Button 
                title={"Delete Item"}
                width={"w-fit "}
                className={" bg-red-500 hover:bg-red-700 px-8 -translate-y-8 text-base"
              +` ${addedAlready?" ml-[2.9rem]":" ml-[3.9rem]"}`}
                onClick={()=>handleDelete(bookId)}
                addedAlready={addedAlready}
                />
                <Button 
                title={"View/Edit Item"}
                width={"w-fit "}
                className={"ml-[3.2rem] px-8 -mt-6 -translate-y-8 text-base  "}
                onClick={()=>handleBookEdit(bookId)}
                />
               </div>
                
                :<Button 
                title={"Add Item"}
                onClick={(e)=>onClick(e,book)}
                width={"w-30"}
                className={"ml-16 -mt-6 -translate-y-8 text-base"}
                />
              }
              {/* show Book Edit Screen */}
            {/* {bookEditId===bookId?(
              <div className='bookEdit-container'>
                < BookEdit 
                bookId = {bookId}
                />
              </div>
              ): "" } */}
               
             </div>
            );
        })}
    </div>
  )
}

export default ResultsSearch;