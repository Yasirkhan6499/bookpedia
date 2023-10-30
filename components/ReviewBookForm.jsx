"use client";
import React, { useEffect, useState } from 'react'
import SaveAndCancelBtns from './SaveAndCancelBtns';
import Button from "./Button";
import axios from 'axios';

const ReviewBookForm = ({book,handleCancleForm}) => {
    const [rating, setRating] = useState('None');
    const [review, setReview] = useState('');


    useEffect(()=>{
      if(book.rating || book.review){
        setRating(book.rating);
        setReview(book.review);
      }
    },[]);

    const handleSaveEditForm = async ()=>{
        try {
          console.log(book);
          const response = await axios.post("/api/books/addreview",{
            bookId: book.bookid,
            rating,
            review
          })
          if(response.data.success){
          alert(response.data.message);
          handleCancleForm();
          window.location.reload();  
          }
          
        } catch (error) {
          console.log(error);
        }
    }
  
    return (
      <div >
        <h2 className='text-4xl m-6 mt-9'>User Details</h2>
        <div className='m-8'>
        <div className="mb-4 mt-8 flex gap-2 items-center">
          <label htmlFor="rating">Rating</label>
          <select 
            value={rating} 
            onChange={e => setRating(e.target.value)} 
            className="p-2 border rounded-md"
            id="rating"
          >
            <option value="None">None</option>
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
            <option value="3.5">3.5</option>
            <option value="4">4</option>
            <option value="4.5">4.5</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="review">Review</label>
          <textarea 
            value={review} 
            onChange={e => setReview(e.target.value)}
            className="w-full p-2 border rounded-md mt-1"
            id="review"
            rows="12"
            placeholder="Write your review here..."
          ></textarea>
        </div>
        <p className="text-xs italic text-gray-600 -mt-5">Reviews are public.</p>

      </div>

      <SaveAndCancelBtns 
        handleCancleForm={handleCancleForm}
        handleSaveEditForm = {handleSaveEditForm}
        />

      </div>
    );
  
}

export default ReviewBookForm;