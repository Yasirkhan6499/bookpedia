"use client";

import React, { useEffect, useState } from 'react'
import Input from './Input'
import Button from './Button'
import axios from 'axios';
import { uploadToS3 } from '@/aws-config';

const EditBookForm = ({book, handleCancleForm}) => {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState();

  useEffect(()=>{
    console.log("edit Book :",book);

    setTitle(book.title?book.title:"");
    setAuthor(book.author?book.author:"");
    setDescription(book.description?book.description:"");
    setPrice(book.price?book.price:0);
  },[])


  // save edit form
  const handleSaveEditForm = async ()=>{
    try {
      const response = await axios.post("/api/books/edititem",{
        bookid: book.bookid,
        title,
        author,
        description,
        price,
        image
      });
      
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
    <div>
      <h2 className='ml-4 text-4xl mt-6'>Edit Item</h2>
    <div className='flex flex-col mt-4'>
    <label className='bookEdit-label' htmlFor="title">Title</label>
    <Input 
      id="title"
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e)=>setTitle(e.currentTarget.value)}
    />

    <label className='bookEdit-label' htmlFor="authors">Authors</label>
    <Input 
      id="authors"
      type="text"
      placeholder="Authors"
      value={author}
      onChange={(e)=>setAuthor(e.currentTarget.value)}
    />

    <label htmlFor="description">Description</label>
    <textarea
      id="description"
      placeholder="Description..."
      className="p-2 mt-1 border rounded-md"
      rows="4"
      value={description}
      onChange={(e)=>setDescription(e.currentTarget.value)}
    ></textarea>

        <label className='bookEdit-label' htmlFor="price">Price</label>
        <Input 
          id="price"
          type="number"
          placeholder="£0.00"
          value={(price)}
          onChange={(e)=>setPrice(e.currentTarget.value)}
        />

        <label className='bookEdit-label' htmlFor="coverImage">Cover Image</label>
        <Input 
          id="coverImage"
          type="file"
          placeholder="Upload jpg, png or gif files. 20MB max."
          accept=".jpg,.jpeg,.png,.gif"
          onChange={async (e)=>{
            const file = e.currentTarget.files[0];
            if (file) {
              const imageUrl = await uploadToS3(file);
              setImage(imageUrl);
  }
          }}
        />

        <div className='flex sticky  bottom-0 p-4  
            shadow-md bg-white/100 max-w-full '>
        <Button 
          title="Save"
          type="submit"
          className="max-w-[8rem] text-base"
          onClick={handleSaveEditForm}
        />
        <Button 
          title="Cancel"
          className="max-w-[8rem] text-base bg-slate-200 !text-black hover:bg-slate-300 hover:text-white"
          onClick={handleCancleForm}
        />
    </div>
  </div>     
  </div>
  )
}

export default EditBookForm;