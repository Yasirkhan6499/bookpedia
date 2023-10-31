"use client";

import { useState, useEffect } from 'react';
import BookEditingOptions from './BookEditingOptions';
import BookResult from './BookResult';
import CloseButton from './CloseButton';
import EditBookForm from './EditBookForm';
import ReviewBookForm from './ReviewBookForm';
import { useBodyContainerContext } from '@/context/bodyContainerContext';

  const BookEdit = ({book, collection, cancelBtnUrl}) => {
  
    const [showEditForm, setShowEditForm] = useState(null);
    const [showBookReviewForm, setShowBookReviewForm] = useState(null);

     // we will set the bodyContainer css to set the layout for <BookEdit.jsx>
     const {setBodyContainerCss} = useBodyContainerContext();

     // Change the bodyContainerCss for <BookEdit.jsx>
     useEffect(() => {
       setBodyContainerCss("xl:right-48");
     }, []);

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
    setShowBookReviewForm(false);
    setShowEditForm(true);
   }

   const handleBookReview = ()=>{
    setShowEditForm(false);
    setShowBookReviewForm(true);
   }

   const handleCancelForm = ()=>{
    setShowEditForm(false);
    setShowBookReviewForm(false);
   }

  return (
    <div className="relative h-[100vh]">

      <div className='flex justify-between sticky xl:w-[126.79%] top-0 p-4 pl-14 
      -ml-[4.4rem] -mt-7 shadow-md bg-white/100 z-50'>
      <BookEditingOptions 
       bookid={book.bookid}
       collectionid = {book.collectionId}
       handleEditBook={handleEditBook}
       handleBookReview = {handleBookReview}
       cancelBtnUrl = {cancelBtnUrl}
      />
      <CloseButton
      url={cancelBtnUrl}
      />
      </div>

      <div className='-ml-14'>
      {(!showEditForm && !showBookReviewForm) && <BookResult 
      book={book}
      collection={collection}
      titleCss={"!text-4xl"}
      authorCss={"!text-2xl"}
      descCss={"!text-[1rem]"}
      imgCss={"w-full min-w-[12rem] h-[250px]"}
      starSize={"30px"}
      descReviewCss={"text-2xl"}
      isBookEdit={true}
      />}

      {/* Edit book */}
    {showEditForm && <EditBookForm 
     book={book}
     handleCancleForm = {handleCancelForm}
    />}

    {/* Book Review form */}
    {showBookReviewForm && <ReviewBookForm 
    book={book}
    handleCancleForm = {handleCancelForm}
    />}
      </div>
      
    </div>
  )
}

export default BookEdit