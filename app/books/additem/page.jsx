"use client";

import Button from '@/components/Button';
import Input from '@/components/Input';
import ResultsSearch from '@/components/ResultsSearch';
import Select from '@/components/Select';
import { isOnlyNumbers } from '@/helpers/helperMethods';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AddItem = () => {

    const [searchTitle,setSearchTitle] = useState("");
    const [collections, setCollections] = useState([]);
    const [collection, setCollection] = useState("");
    const [booksList, setBooksList] = useState(undefined);

    // search the books
    const handleSearch = async (e)=>{
      e.preventDefault();

      if (searchTitle) {
       
              try {
                let data;
                let books;
                //if searchTitle is string
                if(!isOnlyNumbers(searchTitle) ){
                  // alert(process.env.NEXT_PUBLIC_MY_API_KEY)
                 data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTitle)}&key=${process.env.NEXT_PUBLIC_MY_API_KEY}`);
                 books = await data.json();
                }
                // if searchTitle is numbers, meaning user might have enter the ISBN number then we will do another api call
                else{
                   data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(searchTitle)}&key=${process.env.NEXT_PUBLIC_MY_API_KEY}`);
                   books = await data.json();
                }
                console.log("books: ",books.items)
                setBooksList(books.items || []);
                // console.log(books)
              } catch (err) {
                  if(err.response && err.response.status === 429) {
                    alert('You have made too many requests. Please wait a while and try again.');
                    } else {
                        console.log(err.message);
                    }
              }
            }
    }

    // update the state when collection is change
    const handleCollectionChange = (e)=>{
      setCollection(e.target.value);
    }


    // add a book to the library
    const handleAddIem= async (e,bookData)=>{
        e.preventDefault();
        
        console.log("searched book : ", bookData)
        const {volumeInfo:book} = bookData;
        console.log(book);
        
        try{
        const response = await axios.post("/api/books/additem",{
          title: book.title || "",
          author: book.authors[0] || "",
          publishedDate: book.publishedDate.split('-')[0] || 0,
          pages: book.pageCount || 0,
          publisher: book.publisher || "",
          isbn13: book.industryIdentifiers[1].identifier || 0,
          isbn10: book.industryIdentifiers[0].identifier || 0,
          addedDate: new Date(),
          description: book.description || ""
          
        })
        console.log(response.data);
      }catch(error){
       console.log(error)
      }

    }

    useEffect(()=>{
      
      const getCollectionsArr = async ()=>{
        try{
        const response = await axios.get("/api/books/collections/getCollectionsArray");
        setCollections(response.data.collections);
        }catch(error){
          console.log("Couldnt get the collections Array", error.message);
        }
      }
      getCollectionsArr();
    },[]);
    
  return (
    
    <section className='addItem-section'>
         <h2 className='page-title'>Add Item</h2>
        <p className="mb-8"></p>

        {/* Add item form */}
        <form onSubmit={handleSearch}>

        <label className='page-label ' htmlFor="title">
             Select Collection</label>
            {/* {console.log(collections)} */}
            <Select 
            arr={collections}
            classes="page-select"
            onChange={handleCollectionChange}
            />
            
            <p className='mt-0 text-sm italic'>Choose the collection you're adding items to.</p>

            <label className='page-label block mt-4' htmlFor="title">
             Search For Books</label>
            {/* <input className="page-input" onChange={(e)=>setCollection(e.target.value)} type="text" /> */}
            <Input
            type="text"
            id="book-title"
            placeholder="Search"
            onChange={(e)=> setSearchTitle(e.target.value) }
            value={searchTitle}
            className="page-input"
            />
            <p className='feild-note'>Search by ISBN or keyword.</p>
            <Button 
            width="w-auto"
            title={"Search"}
            className="page-btn"
            />
        </form>
        {console.log(booksList)}
        {booksList?<div>
          <h2 className="border-t border-gray-200 pt-6 mt-6 text-5xl">Results</h2>


          <ResultsSearch
          booksList={booksList}
          onClick={handleAddIem}
          />

          </div>
      
        :""}

    </section>
  )
}

export default AddItem