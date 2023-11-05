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

const Library = () => {

const [isLoading, setIsLoading] = useState(true);

const router = useRouter();

const [books, setBooks] = useState([]);
const [booksUpdated, setBooksUpdated] = useState(undefined); 
const [collections, setCollections] = useState([]);
const [selectedCollection, setSelectedCollection] = useState();
const [searchTerm, setSearchTerm] = useState("");

// body container Context :=> to change the css of bodyContainer
const {bodyContainerCss, setBodyContainerCss} = useBodyContainerContext();
// Change the bodyContainerCss here for Library layout
useEffect(() => {
   setBodyContainerCss("xl:right-12");
}, []);

// fetching books
useEffect(() => {
  const fetchBooksArr = async () => {
    const response = await axios.post("/api/books/getBooks");
    if (response.data.success){
      // alert("Data fetched!")
      setBooks(response.data.books);
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
    const newBooks = books.filter(book=>{
      console.log(book.collectionId," === ",selectedCollection)
    return(book.collectionId===selectedCollection)
    }
      );
    console.log("newBooks :",newBooks);

    if(newBooks.length<=0)
    setBooksUpdated(undefined);
    else
    setBooksUpdated(newBooks);

  },[selectedCollection, books])

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
    
      booksUpdated.forEach((book) => {
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
      <BookResult 
      book={book}
      collection={selectedCollection}
      titleCss={"!text-2xl border-black hover:border-b-[3px] w-fit cursor-pointer"}
      imgCss={"w-[8rem] min-w-[4rem] h-[140px] cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:brightness-75 transition duration-300 ease-in-out "}
      starSize={"20px"}
      descReviewCss={"!-mt-[0.3rem] font-semibold"}
      isBookEdit={false}
      handleEditIcon={handleEditIcon}
      />
    </div>
    )
}


  return (
    <div>

      {/* search tab */}
      <Search 
      handleSearchWriting={handleSearchWriting}
      handleBooksSearch={handleBooksSearch}
      value={searchTerm}
      />
      {/* Collection, sorting and filtering features */}
      <div>
        <div className="selectDropdown relative">
        <FontAwesomeIcon 
          icon={faCaretDown} 
          className='text-black absolute right-5 text-2xl top-5 cursor-pointer'
        />
        <Select 
        arr={collections}
        onChange= {(e)=>setSelectedCollection(e.target.value)}
        classes= {"p-5 w-full bg-gray-100 mb-8 rounded-md text-2xl font-semibold cursor-pointer appearance-none"}
        defaultValue={selectedCollection}
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