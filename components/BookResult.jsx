import Image from 'next/image'
import React from 'react'

const BookResult = ({book}) => {
    const {volumeInfo} = book;

    // Helper function to truncate the description
    const truncateDescription = (description, length = 800) => {
      if (!description) return '';
      if (description.length > length) {
          return description.slice(0, length) + '...';
      } else {
          return description;
      }
  }

  return (
    <div className='book-container'>
    <div className='book-pic'>

        {/* image */}
        <Image 
        className='min-w-[12rem] w-full rounded-md'
         src={volumeInfo.imageLinks?.thumbnail}
         width={1150}
         height={1150}
         alt='Book Icon'
        /> 
    </div>

    {/* Title & Author */}
    <div className='book-content'>
       <h3 className='book-title'>
         {volumeInfo.title}
       </h3>
       <p className='book-author'>{volumeInfo.authors[0]}</p>

        {/* publishing info */}
       <div className='book-publish-info'>
       <p className='book-publishDate'>{volumeInfo.publishedDate.split('-')[0]}</p>
       <p className='book-pageCount'><span className='text-black font-semibold text-base'>
        Pages: </span> 
       {volumeInfo.pageCount}</p>
       <p className='book-publisher'>{volumeInfo.publisher?`(${volumeInfo.publisher})`:""}</p>
       </div>

        {/* ISBN info */}
       <div className='book-isbn-info'>
        <p className='isbn-13'><span className='text-black font-semibold text-base'>
          ISBN13:</span> 
         {volumeInfo.industryIdentifiers[1].identifier}
        </p>
        <p className='isbn-10'><span className='text-black font-semibold text-base'>
          ISBN10: </span>
         {volumeInfo.industryIdentifiers[0].identifier}
        </p>
        </div>
        {/* description */}
        <p className='book-desc'>{truncateDescription(volumeInfo.description)}</p>
       
    </div>   
  </div>
  )
}

export default BookResult