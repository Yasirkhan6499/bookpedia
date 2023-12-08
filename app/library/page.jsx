"use client";

import BookResult from '@/components/BookResult';
import { useBodyContainerContext } from '@/context/bodyContainerContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import Search from '@/components/search';
import Select from '@/components/Select';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import LayoutStyles from '@/components/LayoutStyles';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTableCells } from '@fortawesome/free-solid-svg-icons';
import { faTablet } from '@fortawesome/free-solid-svg-icons';
import Filterselect from '@/components/Filterselect';
import FilterUpDown from '@/components/FilterUpDown';
import { sortBooks } from '@/helpers/sortBooks';
import Profile from '@/components/Profile';

const Library = () => {

const [isLoading, setIsLoading] = useState(true);

const router = useRouter();

const [allBooks, setAllBooks] = useState([]);
const [books, setBooks] = useState([]);
const [booksUpdated, setBooksUpdated] = useState(undefined); 
const [collections, setCollections] = useState([]);
const [selectedCollection, setSelectedCollection] = useState();
const [searchTerm, setSearchTerm] = useState("");
const [layoutStyle, setLayoutStyle] = useState([]);
const [filter, setFilter] = useState("1");
const [arrowFilter, setArrowFilter] = useState("up");

// body container Context :=> to change the css of bodyContainer
const {bodyContainerCss, setBodyContainerCss} = useBodyContainerContext();
// Change the bodyContainerCss here for Library layout
useEffect(() => {
   setBodyContainerCss("xl:right-12");

   // setting defa"ult layout style
   setLayoutStyle("3");
   
}, []);

// fetching books
useEffect(() => {
  
  const fetchBooksArr = async () => {
    const response = await axios.post("/api/books/getBooks");
    if (response.data.success){
      // alert("Data fetched!")
      setAllBooks(response.data.books);
      console.log("booksArr",response.data.books );

      
    }
  };
  fetchBooksArr();
}, []);

// fetching collections
useEffect(()=>{
  
  const fetchCollectionsArr = async ()=>{
    try{
      
    const response = await axios.get("/api/books/collections/getCollectionsArray");
    const CollectionsList = response.data.collections;
    setCollections(CollectionsList);
    // setting a default collection
    if(CollectionsList)
    setSelectedCollection(CollectionsList[0]._id)
    
    }catch(error){
      console.log(error.message);
    }
  }
  fetchCollectionsArr();
},[])

  // Filter books based on selectedCollection
  // useEffect(() => {
  //  alert("reached1")
  //     const filterBooks = () => {
  //       const filteredBooks = books.filter(book => book.collectionId === selectedCollection);
  //       if (filteredBooks.length > 0) {
  //         setBooksUpdated(filteredBooks);
  //       } else {
  //         setBooksUpdated([]);
  //         // Optionally you can show the message here or handle it in the rendering logic
  //         console.log("No books available in this collection!");
  //       }
  //     };

  //     filterBooks();
   
  // }, [selectedCollection, books]);

  // update the books array with those books which are 
  //avalaible in the selected collection
  useEffect(()=>{
    // alert("col chang")
    const newBooks = allBooks.filter(book=>{
      console.log(book.collectionId," === ",selectedCollection)
    return(book.collectionId===selectedCollection)
    }
      );
    console.log("newBooks :",newBooks);

    if(newBooks.length<=0){
    setBooks(undefined);   
    setBooksUpdated(undefined);  
    }
    else{
    setBooks(newBooks);
    setBooksUpdated(newBooks);
    }
    
    // search input empty
    setSearchTerm("");

  },[selectedCollection, allBooks])

   // useEffect hook for sorting based on filter
  useEffect(() => {
    if (books && books.length > 0) {
      const sortedBooks = sortBooks([...booksUpdated], filter, arrowFilter);
      setBooksUpdated(sortedBooks);
    }
  }, [filter, arrowFilter, books]);

    // handling edit icon
    const handleEditIcon = (bookid)=>{
      const currentUrl = window.location.href; // Gets the current path
      router.push(`/books/additem/${bookid}?returnUrl=${currentUrl}`);
    }

    // handle Search update
    const handleSearchWriting = (searchedValue)=>{
      setSearchTerm(searchedValue);
    }

    // handle book searching
    // This search algorithm works in a way that if there are more search words
    // like "Price harry is a good", then first the algorithm will check 
    // the title of the book, then author and then description. so suppose the title
    // and author does not have these keywords, and description has, so the descrtipion
    // will be split into keyowrds and will be saved in the array. Now when a word
    // in the array matches the first search keyword, then the next words will be
    // searched as well to check whether all the search keywords are available in
    //  the description, and will return that book in the search result.
    const handleBooksSearch = (searchedValue) => {
      const searchWords = searchedValue.toLowerCase().split(" ");
      const booksSearched = [];
      const bookIds = new Set(); // To keep track of unique book IDs
    
      books.forEach((book) => {
        const bookInfo = [book.title.toLowerCase(), book.author.toLowerCase(), book.description.toLowerCase()];
    
        let allWordsMatch = true;
    
        searchWords.forEach((searchWord, index) => {
          let wordMatches = false;
    
          for (let info of bookInfo) {
            const words = info.split(" ");
            for (let word of words) {
              if (index === 0) { //if first search word
                if (word.startsWith(searchWord)) {
                  wordMatches = true;
                  break;
                }
              } else {
                if (word.startsWith(searchWord)) {
                  wordMatches = true;
                  break;
                }
              }
            }
    
            if (wordMatches) {
              break;
            }
          }
    
          if (!wordMatches) {
            allWordsMatch = false;
            return;
          }
        });
    
        if (allWordsMatch && !bookIds.has(book.bookid)) { //so if all search words matched and bookId is not present in the set
          bookIds.add(book.bookid);
          booksSearched.push(book);
        }
      });
    
      console.log("books searched:", booksSearched);
    // show result
     if(booksSearched.length===0)
     setBooksUpdated(undefined); //so that the "No books avaliable msg is render"
    else
     setBooksUpdated(booksSearched);
    };


const getBooksList = (booksList) =>{
 
  console.log("selectedddd Col:",selectedCollection);
  return booksList.map((book)=>
    <div className='border rounded-md mb-10 hover:shadow-xl relative'>
       {/* {console.log(book)} */}
       <FontAwesomeIcon
       className="absolute right-10 top-10 border-2 p-3 rounded-full 
       cursor-pointer hover:bg-slate-100 transition duration-300"
       onClick={()=>handleEditIcon(book.bookid)}
       icon={faPen} />
       {(layoutStyle==="3")? //-------------Summary Layout Style-------------
      <BookResult 
      book={book}
      collection={selectedCollection}
      titleCss={"!text-2xl border-black hover:border-b-[3px] w-fit cursor-pointer"}
      imgCss={"w-[8rem] min-w-[4rem] h-[140px] cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:brightness-75 transition duration-300 ease-in-out "}
      starSize={"20px"}
      descReviewCss={"!-mt-[0.3rem] font-semibold"}
      isBookEdit={false}
      handleEditIcon={handleEditIcon}
      starContainerCss={"ml-2"}
      />:(layoutStyle==="1")? //------------List Layout Style-----------------
      <BookResult 
      book={book}
      collection={selectedCollection}
      titleCss={"!text-2xl border-black hover:border-b-[3px] w-fit cursor-pointer"}
      imgCss={"w-[8rem] min-w-[4rem] h-[140px] cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:brightness-75 transition duration-300 ease-in-out "}
      starSize={"20px"}
      descReviewCss={"!-mt-[0.3rem] font-semibold"}
      isBookEdit={false}
      handleEditIcon={handleEditIcon}
      isListStyle={true}
      />:
      <BookResult //------------Cover Layout Style------------------------
      book={book}
      collection={selectedCollection}
      titleCss={"!text-base border-none w-fit text-slate-500 -mb-2 mt-3 "}
      imgCss={"w-[8rem] -mb-9 min-w-[7rem] h-[190px] cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:brightness-75 transition duration-300 ease-in-out "}
      starSize={"20px"}
      descReviewCss={"!-mt-[0.3rem] font-semibold"}
      isBookEdit={false}
      handleEditIcon={handleEditIcon}
      isListStyle={false}
      isCoverStyle={true}
      bookContainerCss={"!flex-col "}
      authorCss={"text-xs"}
      starContainerCss={"hidden"}
      />}
      
    </div>
    )
}

// get layout style icon for the dropdown
const getLayoutStyleIcon = ()=>{
  console.log(layoutStyle)
  if(layoutStyle==="1"){
  return <FontAwesomeIcon icon={faBars} />
  }
  else if(layoutStyle==="2")
  return <FontAwesomeIcon icon={faTableCells} />
  else 
  return  <FontAwesomeIcon icon={faTablet} />

}




  return (
    // className='relative'
    <div >
      <div className="flex justify-between align-center items-center">
      
      {/* search tab */}
      <Search 
      handleSearchWriting={handleSearchWriting}
      handleBooksSearch={handleBooksSearch}
      value={searchTerm}
      />

      <Profile />

      </div>
      {/* Collection, layouts and filtering features */}
      {/* collection selecting */}
      <div className='flex place-items-baseline w-full space-x-4'>
        <div className="selectDropdown relative w-full">
        <FontAwesomeIcon 
          icon={faCaretDown} 
          className='text-black absolute right-5 text-2xl top-5 cursor-pointer'
        />
        <Select 
        arr={collections}
        onChange= {(e)=>setSelectedCollection(e.target.value)}
        classes= {"p-5 w-full  bg-gray-100 mb-8 rounded-md text-2xl font-semibold cursor-pointer appearance-none"}
        defaultValue={selectedCollection}
        />
        </div>

        {/* Layouts */}
        <div className="w-auto flex-none relative cursor-pointer">
        <p className='absolute left-3 top-[0.37rem] cursor-pointer'>{getLayoutStyleIcon()}</p>
        <LayoutStyles 
        onChange={(e)=>setLayoutStyle(e.target.value)}
        value={layoutStyle}
        />
        </div>

        {/* --Filters-- */}
        <div className="w-auto flex-none relative cursor-pointer">
      
        <Filterselect
        onChange={(e)=>setFilter(e.target.value)}
        value={filter}
        />
        {/* filter up and down arrows */}
        <FilterUpDown 
        onArrowFilterClicked={(arrow)=>setArrowFilter(arrow)}
        />
        
        </div>

      </div>

      {/* books in library */}
      {(booksUpdated?getBooksList(booksUpdated):
      <p className='text-center font-semibold text-xl'>No Books Available!</p>
      )}
        
    </div>
  )
}

export default Library;