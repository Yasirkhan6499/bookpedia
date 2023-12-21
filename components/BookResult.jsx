"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings';
import Copies from './Copies';

const BookResult = ({book,collection,titleCss,authorCss,descCss, imgCss,
  starSize,descReviewCss,isBookEdit,handleEditIcon, isListStyle, isCoverStyle, bookContainerCss
,starContainerCss, setIsbnPresent, isMobileMenu}) => {

  const [activeTab, setActiveTab] = useState('Description');

  let volumeInfo = book?.volumeInfo || book;
    // const {volumeInfo} = book;
    // author
  let author = Array.isArray(volumeInfo?.authors)?volumeInfo?.authors[0]:volumeInfo.author;  
  // published date
  let publishDate = (typeof (volumeInfo.publishedDate) === 'string')?
  volumeInfo.publishedDate?.split('-')[0] : volumeInfo.publishedDate;
  // isbn 13
  let isbn13 = Array.isArray(volumeInfo?.industryIdentifiers)
  ?volumeInfo?.industryIdentifiers[1]?.identifier:book.isbn13;
  // isbn 10
  let isbn10 = Array.isArray(volumeInfo?.industryIdentifiers)
  ?volumeInfo?.industryIdentifiers[0]?.identifier:book.isbn10;
  // image
  let image = volumeInfo.imageLinks?.thumbnail || book.image;
// ------------extra Css-----------------
let title_css =  `book-title ${titleCss} ${isMobileMenu?"mt-3 ":""}`;
let author_css = `book-author ${authorCss}`;
let desc_css = `book-desc ${descCss}`;
let img_css = `rounded-md object-cover ${imgCss}` 
let descReview_css = `flex gap-8 text-stone-400  font-bold mb-4 mt-9 cursor-pointer 
border-b-2 xl:w-[120%] ${descReviewCss}`;
let bookContainer_css = `book-container z-0 ${bookContainerCss}`;
let starCont_css = ` mt-3 ${starContainerCss}`;

    // Helper function to truncate the description
    const truncateDescription = (description, length = 600) => {
      if (!description) return '';
      if (description.length > length) {
          return description.slice(0, length) + '...';
      } else {
          return description;
      }
  }

  useEffect(()=>{
   
    // if(!isbn10 || !isbn13)
    // setIsbnPresent(false);
    // if (isbn10 && isbn10.includes(':')) {
    //   isbn10 = isbn10.split(':')[1];
    // }
    // if(isbn10===undefined)
    // isbn10="0";
    // if(isbn13===undefined)
    // isbn13="0";
    // console.log("isbn10 :",isbn10," isbn13 :",isbn13);
    // else if (isbn13 && isbn13.includes(':')) {
    //   isbn13 = isbn13.split(':')[1];
    // } 
  },[]);

  // if its book editing then the text will be a bit large
  //  if its books displaying in the Library, then the text will be small


  return (
    <React.Fragment>
      
    <div className={bookContainer_css}>
      
    <div className={`book-pic`}>
    
        {/* image */}
        {!isListStyle?<Image 
        className={img_css}
        onClick={handleEditIcon?()=>handleEditIcon(volumeInfo.bookid):()=>{}}
         src={image}
         width={2400}
         height={2400}
         alt='Book Icon'
        /> :""}
        

     {/* stars */}
     {!isListStyle?  <div className={starCont_css}>
        {volumeInfo.rating && 
        <StarRatings
          rating={volumeInfo.rating}
          starRatedColor="gold" // Color of filled stars
          starEmptyColor="lightgray" // Color of empty stars
          starDimension={starSize} // Size of stars
          starSpacing="2px" // Spacing between stars
          numberOfStars={5} // Total number of stars
          name="rating"
        />}
        </div>:""}
    


    </div>
    

    {/* book content container */}
    
    {/* added these classes for mobile optimization */}
    <div className={`book-content ${isMobileMenu?"flex flex-wrap":""}`}>
      {/* book collection */}
      {(collection && isBookEdit) ? (
    <div className="flex items-center">
      <FontAwesomeIcon icon={faLayerGroup} className="text-blue-300 mr-2 pb-3" />
      <p className='book-collection'>{collection.name}</p>
    </div>
      ) : (
        ""
      )}
        {/* added this new div for mobile optimization */}
        <div className={`${isMobileMenu?" float-right":""}`}> 
      {/* Title & Author */}
       <h3 className={title_css}
       onClick={handleEditIcon?()=>handleEditIcon(volumeInfo.bookid):()=>{}}
       >
         {volumeInfo.title}
       </h3>
       <p className={author_css}>{author}</p>
       </div>
       
        {/* publishing info */}

        {/* added this new div for mobile optimization */}
        <div className="">
        {!isCoverStyle? <> {/* start of isCoverStyle Condition */}
        <div className='book-publish-info'>
        <p className='book-publishDate'>{publishDate}</p>
        <p className='book-pageCount'><span className='text-black font-semibold text-base'>
          </span> 
        {volumeInfo.pages} Pages</p>
        <p className='book-publisher'>{volumeInfo.publisher?`(${volumeInfo.publisher})`:""}</p>
        </div>
 
         {/* ISBN info */}
        <div className='book-isbn-info'>
         <p className='isbn-13'><span className='text-black font-semibold text-base'>
           ISBN13: </span> 
          {isbn13 || 0}
         </p>
         <p className='isbn-10'><span className='text-black font-semibold text-base'>
           ISBN10: </span>
          {isbn10 || 0}
         </p>
         </div>
 
         {/* price */}
         {(titleCss&&volumeInfo.price)?<p className='book-addedDate mb-4 -mt-6'><span className='text-black font-semibold text-base'>
           Price: </span>
          <span className="bg-green-100 p-1 rounded-sm">${volumeInfo.price+".00"}</span>
         </p>:""}
 
         {/* added date */}
         {titleCss?<p className='book-addedDate mb-4 -mt-2'><span className='text-black font-semibold text-base'>
           Added: </span>
          {volumeInfo.addedDate.split("T")[0]}
         </p>:""}
 
         {/* number of copies */}
         {titleCss?<p className='book-addedDate mb-4 -mt-2'><span className='text-black font-semibold text-base'>
           Copies: </span>
          {volumeInfo.copies}
         </p>:""}
       
         
         
         {/* description */}
         {(titleCss && !isListStyle)? 
         <>
        {/* Tab navigation */}
        <ul className={descReview_css}>
           <li 
             onClick={() => setActiveTab('Description')}
             className={activeTab === 'Description' ? 'border-b-2 text-black border-cyan-500 pb-4' : 'hover:text-black'}
           >
             Description
           </li>
           {(volumeInfo?.rating || volumeInfo?.review) && <li 
             onClick={() => setActiveTab('Review')}
             className={activeTab === 'Review' ? 'border-b-2 text-black border-cyan-500 pb-4' : 'hover:text-black'}
           >
             Review
           </li>}
           
         </ul>
 
         {/* Conditional rendering based on active tab */}
         {activeTab === 'Description' && (
           <p className={desc_css}>{
             (isBookEdit)?volumeInfo.description:truncateDescription(volumeInfo.description)}</p>
         )}
         {activeTab === 'Review' && (
           <p className={desc_css}> {/* Replace with your review content */}
             {(isBookEdit)?volumeInfo.review:truncateDescription(volumeInfo.review)}
           </p>
         )}
         </>
         :(!isListStyle)?truncateDescription(volumeInfo.description):"" }

        </>:""} {/* end of the !isCoverStyle condition */}
        </div>
       
       {/* add copies section */}
       {/* {isBookEdit && <Copies /> } */}
       
    </div>   
  </div>
  </React.Fragment>
  )
}

export default BookResult;