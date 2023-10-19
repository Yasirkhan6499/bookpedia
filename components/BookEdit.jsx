"use client";

import { useState } from 'react';
import BookEditingOptions from './BookEditingOptions';
import BookResult from './BookResult';
import CloseButton from './CloseButton';
import EditBookForm from './EditBookForm';


  const BookEdit = ({book, collection}) => {
  
    const [showEditForm, setShowEditForm] = useState(null);

    // const [bookDate, setBookDate] = useState();
  // useEffect(()=>{
  //   console.log("colleciton: ",collection);
  // })
    // useEffect(()=>{
    //   console.log("BookEdit :", book);
    //  const getBookDate = async()=>{
    //   try {
    //     const response = await axios.post("/api/books/getBookDate",{
    //       book
    //     })
    //     setBookDate(response.data.bookDate);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }
    // getBookDate();
    // },[]);
   const handleEditBook = ()=>{
    setShowEditForm(true);
   }

   const handleCancelForm = ()=>{
    setShowEditForm(false);
   }

  return (
    <div>

      <div className='flex justify-between sticky xl:w-[126.79%] top-0 p-4 pl-14 
      -ml-[4.4rem] -mt-7 shadow-md bg-white/100 z-50'>
      <BookEditingOptions 
       bookid={book.bookid}
       collectionid = {book.collectionId}
       handleEditBook={handleEditBook}
      />
      <CloseButton
      url={"/books/additem"}
      />
      </div>

      <div className='-ml-14'>
      {!showEditForm && <BookResult 
      book={book}
      collection={collection}
      titleCss={"!text-4xl"}
      authorCss={"!text-2xl"}
      descCss={"!text-[1rem]"}

      />}

      {/* Edit book */}
    {showEditForm && <EditBookForm 
     book={book}
     handleCancleForm = {handleCancelForm}
    />}
      </div>
      
    </div>
  )
}

export default BookEdit