"use client";

import Button from '@/components/Button';
import Input from '@/components/Input';
import ResultsSearch from '@/components/ResultsSearch';
import Select from '@/components/Select';
import { useBookListContext } from '@/context/BookListContext';
// import { useBookListContext } from '@/context/BookListContext';
import { useBooks } from '@/context/booksContext';
import { isOnlyNumbers } from '@/helpers/helperMethods';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useBodyContainerContext } from '@/context/bodyContainerContext';
import ManualEntry from '@/components/ManualEntry';
import { useToast } from '@/context/ToastContext';

const AddItem = () => {

    const [searchTitle,setSearchTitle] = useState("");
    const [collections, setCollections] = useState([]);
    const [activeTab, setActiveTab] = useState("search");
    // const [collection, setCollection] = useState("");
    // const [booksList, setBooksList] = useState(undefined);
    // const [addedBookIdArr, setAddedBookIdArr] = useState([]);
    const {addBookIdArr, setAddBookIdArr} = useBooks();
    const { booksList, setBooksList, collection, setCollection } = useBookListContext(); 
   
    // we will set the bodyContainer css to set the layout of "addItem"=>"page.jsx"
    const {setBodyContainerCss} = useBodyContainerContext();

    // toast
    const { triggerToast } = useToast();

    // Change the bodyContainerCss here for Library layout
    useEffect(() => {
      setBodyContainerCss("xl:right-2");
    }, []);

  //    custom css
  // let pageSelectCss = booksList?"page-select min-w-full w-[80vh]":"page-select";
   
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
                setBooksList(books.items || undefined);
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

    const isItemAlreadyExistsInDb = async (bookId)=>{
      try{
        // const bookIsbn13 = bookData.volumeInfo.industryIdentifiers[0].identifier; 
        // console.log("bookdataaa",bookIsbn13)
        const response = await axios.post("/api/books/isItemExist",{
          bookid: bookId
        });
        // console.log("response.data.success", response.data.message);
        console.log("response for exisiting book: ",response.data)
        if(response.data.success)
        return true;
        else return false;
      }catch(error){
        console.log(error);
      } 
    
    }

    // add a book to the library
    const handleAddIem= async (e,bookData)=>{
        e.preventDefault();

        if(collection && collection!==0){
        console.log("book:",bookData)
        const bookId = bookData.id;
        if(await isItemAlreadyExistsInDb(bookId)){
          alert("item already exists in database")
          
          setAddBookIdArr(prevArr=>[...prevArr, {bookId, addedAlready:true}])

          
        }
        else{
        console.log("searched book : ", bookData)
        const {volumeInfo:book} = bookData;
        console.log("book: ",book);
        
        try{
        const response = await axios.post("/api/books/additem",{
          bookid: bookId,
          title: book.title || "",
          collectionId: collection,
          author: book.authors[0] || "",
          publishedDate: book?.publishedDate.split('-')[0] || 0,
          pages: book.pageCount || 0,
          publisher: book.publisher || "",
          isbn13: book?.industryIdentifiers[0]?.identifier || 0,
          isbn10: book?.industryIdentifiers[1]?.identifier || 0,
          addedDate: new Date(),
          description: book.description || "",
          image: book?.imageLinks?.thumbnail || "",
          copies: 1,
          price:""
          
        })
        if(response.status===200){
          // console.log(response.data.newBook.isbn13)
          // const newIsbn13 = book.industryIdentifiers[0].identifier || 0;
          setAddBookIdArr(prevArr=>[...prevArr, {bookId, addedAlready:false}]);
          triggerToast("Item Added To Your Collection","success");
          return;
        }
        console.log("bookIdarr222 ",addBookIdArr);
      }catch(error){
       console.log(error.message);
      }
    } 

  } //if(collection !==0)
  triggerToast("Please select a collection!","error");
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
      <div className='page-title'>
        <h2 className='text-4xl font-bold' >Add Item</h2>
        {/* Add item options */}
        <div className='flex gap-10 mt-9'>
          <h3 onClick={()=>setActiveTab("search")}
          className={activeTab === 'search' ? 'border-b-2 text-black border-cyan-500 pb-4 cursor-pointer':" cursor-pointer"}>
            Search</h3>
          <h3 
           className={activeTab === 'manual' ? 'border-b-2 text-black border-cyan-500 pb-4  cursor-pointer':" cursor-pointer"} 
          onClick={()=>setActiveTab("manual")}
          >Manual Entry</h3>
        </div>
      </div>
        <p className="mb-8"></p>

        {/* Add item form */}
        {activeTab==="search"?
        <React.Fragment>
        <form onSubmit={handleSearch}>

        <label className='page-label ' htmlFor="title">
             Collections</label>
            {/* {console.log(collections)} */}
            <Select 
            arr={collections}
            classes= "page-select"
            onChange={handleCollectionChange}
            defaultValue={collection}
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
        </React.Fragment> 
        :<ManualEntry 
        collections={collections}
        handleAddIem={handleAddIem}
        />}

       
       

    </section>
  )
}

export default AddItem