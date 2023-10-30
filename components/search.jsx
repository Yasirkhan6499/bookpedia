import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Search = ({handleSearchBar, value}) => {
  
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
    onChange={(e)=>handleSearchBar(e.target.value)}
    value={value}
    />
    {/* <button onClick={handleSearchBtn} type='submit'>Search</button> */}
   </div>
  )
}

export default Search