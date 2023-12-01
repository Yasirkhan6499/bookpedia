"use client";

import React, { useEffect, useState } from 'react'
import Input from './Input'
import Button from './Button'
import axios from 'axios';
import { uploadToS3 } from '@/aws-config';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import SaveAndCancelBtns from './SaveAndCancelBtns';
import { useToast } from '@/context/ToastContext';


const EditBookForm = ({ book, handleCancleForm }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  // toast
  const {triggerToast} = useToast();

  useEffect(() => {
    console.log("edit Book :", book);

    setTitle(book.title ? book.title : "");
    setAuthor(book.author ? book.author : "");
    setDescription(book.description ? book.description : "");
    setPrice(book.price ? book.price : 0);
  }, [])


  // save edit form
  const handleSaveEditForm = async () => {
    try {
      const response = await axios.post("/api/books/edititem", {
        bookid: book.bookid,
        title,
        author,
        description,
        price,
        image
      });

      if (response.data.success) {
        triggerToast("Item edited successfully!", "success")
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
        <label className='bookEdit-label mt-6' htmlFor="title">Title</label>
        <Input
          id="title"
          className="w-[98%]"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />

        <label className='bookEdit-label' htmlFor="authors">Authors</label>
        <Input
          id="authors"
          className="w-[98%]"
          type="text"
          placeholder="Authors"
          value={author}
          onChange={(e) => setAuthor(e.currentTarget.value)}
        />
        {/* description */}
        
        <label className="ml-4" htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Description..."
          className="p-2 mt-1 border rounded-md ml-4"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        ></textarea>
        

        {/* price */}
        <label className='bookEdit-label mt-6 -mb-3' htmlFor="price">Price</label>
        {/* price and cover image in flex */}
        <div className='flex gap-8 items-center mb-8'>
          <Input
            className="w-[20%] min-w-[130px]"
            id="price"
            type="number"
            placeholder="£0.00"
            value={(price)}
            onChange={(e) => setPrice(e.currentTarget.value)}
          />
          {/* cover image */}
        <div className="relative mb-4">
        <FontAwesomeIcon 
        className="absolute left-6 top-[0.26rem]"
        icon={faImage} />
          <label
            className='bookEdit-label bg-slate-200 p-2 px-8 rounded-md cursor-pointer'
            htmlFor="coverImage">Cover Image
          </label>
          <p className='mt-2 -mb-8 italic  text-xs'>Upload jpg, png or gif files. 20MB max.</p>
        </div>
          <Input
            id="coverImage"
            className="hidden-file-input"
            type="file"
            placeholder="Upload jpg, png or gif files. 20MB max."
            accept=".jpg,.jpeg,.png,.gif"
            onChange={async (e) => {
              const file = e.currentTarget.files[0];
              if (file) {
                const imageUrl = await uploadToS3(file);
                setImage(imageUrl);

              }
            }}
          />

          {/* // if image is selected from the browser then show it on the side */}
          {image && <Image
            className="rounded-md h-[6rem] object-fill"
            src={image}
            width={120}
            height={120}
            alt="Thumbnail"
          />}

        </div>

      <SaveAndCancelBtns 
        handleSaveEditForm={handleSaveEditForm}
        handleCancleForm={handleCancleForm}
        classes={"xl:w-[120.1%] sm:w-[101.7%] md:w-[101.26%]"}
      />
      </div>
    </div>
  )
}

export default EditBookForm;