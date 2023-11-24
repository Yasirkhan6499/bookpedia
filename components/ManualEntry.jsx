"use client";

import React, { useState, useEffect } from 'react'
import Select from '@/components/Select';
import Input from './Input';
import { DateInput } from './DateInput';
import Button from './Button';
import axios from 'axios';
import { uploadToS3 } from '@/aws-config';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const ManualEntry = ({collections, handleAddIem}) => {
    const [collection, setCollection] = useState(undefined);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [publisher,setPublisher] = useState("");
    const [isbn13, setIsbn13] = useState("");
    const [isbn10, setIsbn10] = useState("");
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [pages, setPages] = useState("");
    const [price, setPrice] = useState(undefined);
    const [image, setImage] = useState("");
     // Add a new state to track form errors
const [formErrors, setFormErrors] = useState({});
    
    // useEffect(()=>{
    //     console.log("manual collection : ",collection);
    // },[collection])
    // Function to check if a date is in the past
    // on Collection change
   const onCollectionChange=(e) => {
      console.log('Selected collection:', e.target.value);
      setCollection(e.target.value);
  }

const isPastDate = (year, month, day) => {
    const today = new Date();
    const inputDate = new Date(year, month - 1, day);
    return inputDate < today;
  };
  
  // Function to check if the date is valid (not in the future, correct day range)
  const validateDate = (inputType, newValue) => {
    let newYear = inputType === 'YYYY' ? newValue : year;
    let newMonth = inputType === 'MM' ? newValue : month;
    let newDay = inputType === 'DD' ? newValue : day;

    const updateFormErrors = {...formErrors};

    // Handling partial date inputs
    if (!newYear || !newMonth || !newDay) {
        if (!newYear) updateFormErrors.year = "Year is required.";
        if (!newMonth) updateFormErrors.month = "Month is required.";
        if (!newDay) updateFormErrors.day = "Day is required.";
    } else {
        const monthDays = [31, (newYear % 4 === 0 && (newYear % 100 !== 0 || newYear % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const monthInt = parseInt(newMonth, 10);
        const dayInt = parseInt(newDay, 10);
    
        // Validate the month range
        if (monthInt < 1 || monthInt > 12) {
            updateFormErrors.month = "Invalid Month.";
        } else {
            delete updateFormErrors.month;
        }
    
        // Validate the day range based on the month
        if (dayInt < 1 || dayInt > monthDays[monthInt - 1]) {
            updateFormErrors.day = "Invalid Day.";
        } else {
            delete updateFormErrors.day;
        }
    
        // Validate the date is not in the future
        if (isPastDate(newYear, newMonth, newDay)) {
            delete updateFormErrors.year;
        } else {
            updateFormErrors.year = "Date should not be in the future.";
        }
    }

    setFormErrors(updateFormErrors);
};


 

// Call this function when the ISBN inputs change
const handleIsbnChange = (e, type) => {
  const { value } = e.currentTarget;
  const updatedErrors = { ...formErrors };

  if (type === 'isbn13' && value.length !== 13) {
    updatedErrors.isbn13 = 'ISBN 13 must be exactly 13 digits';
  } if (type === 'isbn13' && value.length === 13) {
    delete updatedErrors.isbn13;
  }

  if (type === 'isbn10' && value.length !== 10) {
    updatedErrors.isbn10 = 'ISBN 10 must be exactly 10 characters';
  } if (type === 'isbn10' && value.length === 10) {
    delete updatedErrors.isbn10;
  }

  setFormErrors(updatedErrors);

  // Update the state for the corresponding ISBN
  if (type === 'isbn13') {
    setIsbn13(value);
  } else if (type === 'isbn10') {
    setIsbn10(value);
  }
};

// Update pages
const handlePagesChange = (e) => {

  const updatedErrors = { ...formErrors };
  const value = e.currentTarget.value;

  setPages(value);

  if (value.length > 6) {
    updatedErrors.pages="Pages number is too high."
  }
  else{
    delete updatedErrors.pages;
  }

  setFormErrors(updatedErrors);
};

// Update price
const handlePriceChange = (e) => {

  const updatedErrors = { ...formErrors };
  const value = e.currentTarget.value;

  setPrice(value);

  if (value.length > 6) {
    updatedErrors.price="Price value is unrealistic."
  }
  else{
    delete updatedErrors.price;
  }

  setFormErrors(updatedErrors);
};
// generate random ID
function generateRandomId(length = 10) {
  return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('');
}

// Call this function when the form is submitted
const handleSubmit = async (e) => {

  e.preventDefault();
  if (Object.keys(formErrors).length > 0) {
    // Handle the case where there are errors
    alert('Please correct the form errors before submitting!');
    return;
  }
  console.log("collectionnn", collection)
  if(!collection){
    alert("Please Select a collection",collection);
    return;
  }
  else if(!title){
    alert("Please Enter a title");
    return;
  } 
  else if(!isbn10 || !isbn13){
    alert("Both ISBN's are required");
    return;
  } 
  
  // No errors, proceed with form submission
  try{
    
    const response = await axios.post("/api/books/additem",{
      bookid: generateRandomId(),
      title: title || "",
      collectionId: collection,
      author: author || "",
      publishedDate: year || 0,
      pages: pages || "",
      publisher: publisher || "",
      isbn13: isbn13 || 0,
      isbn10: isbn10 || 0,
      addedDate: new Date(),
      description: description || "",
      image: image || "",
      copies: 1,
      price: price || ""
    })
  
    if(response.status===200){
      alert("New Book Added Manually!")
      // alert("price: ",price);
      resetAllFields();
    }
    else{
      alert("Book Not added")
    }
  }
  catch(error){
    console.log(error.message);
  }

};

const resetAllFields = ()=>{
  setTitle("");
  setAuthor("");
  setDescription("");
  setDay("");
  setMonth("");
  setYear("");
  setIsbn10("");
  setIsbn13("");
  setPages("");
  setPrice("");
  setPublisher("");
  setImage("");
}

  return (
    <form className='w-full max-w-[48rem]' >
         <label className='page-label ' htmlFor="collections">
          Item Details</label>
          {/* {console.log(collections)} */}
         <Select
          arr={collections}
          classes= "page-select"
          onChange={(e)=>onCollectionChange(e)}
          defaultValue={collection}
         />
         <p className='mt-0 mb-4 text-sm italic'>Choose the collection you're adding item to.</p>
         {/* title */}
         <label className='manual-label' htmlFor="title">Title</label>
        <Input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          className={"m-0 mb-5 "}
        />
        {/* author */}
        <label className='manual-label' htmlFor="authors">Author</label>
        <Input
          id="authors"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.currentTarget.value)}
          className={"m-0 mb-5"}
        />
        {/* description */}
        
        <label className="" htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Description..."
          className="p-2 mt-1 border rounded-md block w-100%"
          rows="6"
          cols="100"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        ></textarea>
            
          {/* publisher */}
        <label className='manual-label' htmlFor="publisher">Publisher</label>
        <Input
          id="publisher"
          type="text"
          placeholder="Publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.currentTarget.value)}
          className={"m-0 mb-5"}
        />   
         {/* Date inputs */}
      <div className="date-inputs">
        <label className='manual-label' htmlFor="publish-date">Publish Date</label>
        <div className="flex space-x-8">
          <DateInput label="YYYY" value={year} setValue={setYear} maxDigits={4} validate={validateDate} error={formErrors.year} />
          <DateInput label="MM" value={month} setValue={setMonth} maxDigits={2} validate={validateDate} error={formErrors.month}/>
          <DateInput label="DD" value={day} setValue={setDay} maxDigits={2} validate={validateDate} error={formErrors.day}/>
        </div>
      </div>

      {/* ISBN's */}
        <div className="isbnCont flex flex-row gap-8 justify-center">
        {/* isbn 13 */}
        <div className="flex-1">
         <label className='manual-label' htmlFor="isbn13">ISBN 13</label>
        <Input
          id="isbn13"
          type="text"
          placeholder="ISBN 13"
          value={isbn13}
          onChange={(e) => handleIsbnChange(e, 'isbn13')}
          className={"m-0 w-full mb-5"}
          maxLength={13}
        />
           {/* Display the error if there is one */}
        {formErrors.isbn13?<p className="text-red-500 text-sm italic -mt-5">{formErrors.isbn13}</p>
        :<p className='-mt-5 mb-4 text-xs italic'>Max 13 Digits.</p>} 
        </div>

        {/* isbn 10 */}
        <div className="flex-1">
         <label className='manual-label' htmlFor="isbn10">ISBN 10</label>
        <Input
          id="isbn10"
          type="text"
          placeholder="ISBN 10"
          value={isbn10}
          onChange={(e) => handleIsbnChange(e, 'isbn10')}
          className={"m-0 w-full mb-5"}
          maxLength={10}
        />   
          {/* Display the error if there is one */}
        {formErrors.isbn10?<p className="text-red-500 text-sm italic -mt-5">{formErrors.isbn10}</p>
        :<p className='-mt-5 mb-4 text-xs italic'>Max 10 Characters.</p>}
        </div>
      </div>

      {/* pages, price & image */}
      <div className="flex gap-8">
        {/* pages */}
        <div>
        <label className='manual-label' htmlFor="pages">Pages</label>
        <Input
          id="pages"
          type="number"
          placeholder="Pages"
          value={pages}
          onChange={(e) => handlePagesChange(e)}
          className={"m-0 mb-5"}
          
        />  
        {formErrors.pages && <p className="text-red-500 text-sm italic -mt-5">{formErrors.pages}</p>}
        </div>

        {/* price */}
        <div>
        <label className='manual-label' htmlFor="price">Price</label>
        <Input
          id="price"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => handlePriceChange(e)}
          className={"m-0 mb-5"}
          
        />  
        {formErrors.price && <p className="text-red-500 text-sm italic -mt-5">{formErrors.price}</p>}
        </div>

        {/* Image */}
        <div className='mt-8 -ml-4 flex flex-row'>
            {/* cover image */}
        <div className="relative ">
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
            className="rounded-md h-[6rem] object-fill -mt-8"
            src={image}
            width={120}
            height={120}
            alt="Thumbnail"
          />}

        </div>
      </div>

      {/* Submit Button */}
          <Button 
            width="w-auto"
            title={"Submit"}
            className="page-btn  mb-8"
            onClick={e=>handleSubmit(e)}
            type={"submit"}
          />
    </form>
  )
}

export default ManualEntry;