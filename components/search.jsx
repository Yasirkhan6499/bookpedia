import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Search = ({handleSearchWriting,handleBooksSearch, value}) => {

   // Function to handle Enter key press
   const handleEnterKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      handleBooksSearch(e.target.value);
    }
  };

  return (
   <div className='relative'>
    <FontAwesomeIcon
    className='absolute left-0 top-3 text-2xl' 
    icon={faMagnifyingGlass} 
    />
    <input
    className='border-none mx-0 outline-none pl-12 mt-0 text-xl' 
    type='text' 
    placeholder='Start Searching...'
    onChange={(e)=>handleSearchWriting(e.target.value)}
    onKeyDown={handleEnterKeyPress} // Listen for Enter key press here
    value={value}
    />
    {/* <button onClick={handleSearchBtn} type='submit'>Search</button> */}
   </div>
  )
}

export default Search