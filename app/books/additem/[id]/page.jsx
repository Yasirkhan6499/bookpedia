"use client";

import BookEdit from "@/components/BookEdit";
import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'; // Importing useRouter

const page = ({params}) => {

  const router = useRouter(); // Initializing useRouter

  // getting the return url
    const url = new URL(window.location.href);
    const paramss = new URLSearchParams(url.search);
    const returnUrl = paramss.get('returnUrl');

  const [book, setBook] = useState();
  const [collection, setCollection] = useState();

  useEffect( ()=>{
    try{
      // get the book
    const getBookData = async ()=>{
    const response = await axios.post(`/api/books/additem/${params.id}`,{
      bookId: params.id
    });
    // alert("book data")
    console.log("bookData :",response.data.bookData);
    setBook(response.data.bookData);

    // get the collection of the book
    const response2 = await axios.post(`/api/books/collections/getBookCollection`,{
      collectionId: response.data.bookData.collectionId
    })
    console.log("Single Book Collection:", response2.data.collection);

    setCollection(response2.data.collection);
  }
  getBookData();
}catch(error){
  console.log(error);
}
  },[])

  return (
    <div>
      {book?<BookEdit 
      book={book}
      collection={collection}
      cancelBtnUrl={returnUrl?returnUrl:"/books/additem"}
      />:""}
      
    </div>
  )
}

export default page