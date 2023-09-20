import React from 'react'

const Search = ({handleSearchBar, handleSearchBtn}) => {
  return (
   <form>
    <input
    className='outline-pink-500 caret-pink-500 p-2' 
    type='text' 
    placeholder='Search a Book'
    onChange={handleSearchBar}
    />
    <button onClick={handleSearchBtn} type='submit'>Search</button>
   </form>
  )
}

export default Search