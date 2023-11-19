"use client";

import React, { useState, useEffect } from 'react'
import Select from '@/components/Select';
import Input from './Input';
import { DateInput } from './DateInput';

const ManualEntry = ({collections, onChange}) => {
    const [collection, setCollection] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [publisher,setPublisher] = useState("");
    const [isbn13, setIsbn13] = useState("");
    const [isbn10, setIsbn10] = useState("");
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    
    // useEffect(()=>{
    //     console.log("manual collection : ",collection);
    // },[collection])
    // Function to check if a date is in the past
const isPastDate = (year, month, day) => {
    const today = new Date();
    const inputDate = new Date(year, month - 1, day);
    return inputDate < today;
  };
  
  // Function to check if the date is valid (not in the future, correct day range)
  const validateDate = () => {
    const monthDays = [31, (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const monthInt = parseInt(month, 10);
    const dayInt = parseInt(day, 10);
  
    // Validate the month range
    if (monthInt < 1 || monthInt > 12) {
      // Handle invalid month
      alert("Invalid month");
    }
  
    // Validate the day range based on the month
    if (dayInt < 1 || dayInt > monthDays[monthInt - 1]) {
      // Handle invalid day
      alert("Invalid Date");
    }
  
    // Validate the date is not in the future
    if (!isPastDate(year, month, day)) {
      // Handle future date
      alert("The date should not be in the future!")
    }
  };

  return (
    <form>
         <label className='page-label ' htmlFor="collections">
          Item Details</label>
          {/* {console.log(collections)} */}
         <Select
          arr={collections}
          classes= "page-select "
          onChange={(e)=>setCollection(e.target.value)}
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
          className={"m-0 mb-5 max-w-[48rem]"}
        />
        {/* author */}
        <label className='manual-label' htmlFor="authors">Author</label>
        <Input
          id="authors"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.currentTarget.value)}
          className={"m-0 max-w-[48rem] mb-5"}
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
        <label className='manual-label' htmlFor="publisher">Author</label>
        <Input
          id="publisher"
          type="text"
          placeholder="Publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.currentTarget.value)}
          className={"m-0 max-w-[48rem] mb-5"}
        />   
         {/* Date inputs */}
      <div className="date-inputs">
        <label className='manual-label' htmlFor="publish-date">Publish Date</label>
        <div className="flex space-x-2">
          <DateInput label="YYYY" value={year} setValue={setYear} maxDigits={4} validate={validateDate} />
          <DateInput label="MM" value={month} setValue={setMonth} maxDigits={2} validate={validateDate} />
          <DateInput label="DD" value={day} setValue={setDay} maxDigits={2} validate={validateDate} />
        </div>
      </div>

      {/* ISBN's */}
        <div className="isbnCont flex flex-row gap-6 justify-center items-center">
        {/* isbn 13 */}
        <div>
         <label className='manual-label' htmlFor="isbn13">ISBN 13</label>
        <Input
          id="isbn13"
          type="text"
          placeholder=""
          value={isbn13}
          onChange={(e) => setIsbn13(e.currentTarget.value)}
          className={"m-0 w-full mb-5 max-w-[100rem]"}
        />   
        </div>
        {/* isbn 10 */}
        <div>
         <label className='manual-label' htmlFor="isbn10">ISBN 10</label>
        <Input
          id="isbn10"
          type="text"
          placeholder=""
          value={isbn10}
          onChange={(e) => setIsbn10(e.currentTarget.value)}
          className={"m-0 w-full max-w-[100rem]  mb-5"}
        />   
        </div>
      </div>
    </form>
  )
}

export default ManualEntry