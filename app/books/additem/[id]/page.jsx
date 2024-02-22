"use client";

import BookEdit from "@/components/BookEdit";
import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'; // Importing useRouter
import { useToast } from "@/context/ToastContext";
import {ColorRing, Loader} from 'react-loader-spinner';
const page = ({params}) => {

  const router = useRouter(); // Initializing useRouter
  // Declare returnUrl using useState
  // const [returnUrl, setReturnUrl] = useState(null);

  // getting the return url
    const url = new URL(window.location.href);
    const paramss = new URLSearchParams(url.search);
    const returnUrl = paramss.get('returnUrl');
    

    // adding this code because the above code was making problem
    // useEffect(() => {
    //   if (typeof window !== 'undefined') {
    //     const url = new URL(window.location.href);
    //     const params = new URLSearchParams(url.search);
    //     const returnUrl = params.get('returnUrl');
    //     console.log('Return URL:', returnUrl);
  
    //     // Set returnUrl using the state
    //     setReturnUrl(returnUrl);
    //   }
    // }, []);

  const [book, setBook] = useState();
  const [collection, setCollection] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // taost
  const { triggerToast } = useToast();
  useEffect( ()=>{
    setIsLoading(true);

    try{
      // get the book
    const getBookData = async ()=>{
    const response = await axios.post(`/api/books/additem/${params.id}`,{
      bookId: params.id
    });
    // alert("book data")
    console.log("bookData :",response.data.bookData);
    if(response.data.success){
    setBook(response.data.bookData);

    // get the collection of the book
    const response2 = await axios.post(`/api/books/collections/getBookCollection`,{
      collectionId: response.data.bookData.collectionId
    })
    console.log("Single Book Collection:", response2.data.collection);

    setCollection(response2.data.collection);
  }else{
    setIsLoading(false);
  }
  }
  getBookData();
}catch(error){
  triggerToast("Couldn't Fetch The Book. Try Refreshing The Page!")
  console.log(error);
} finally{
  setIsLoading(false);
}
  },[])

  return (
    <div>
      {isLoading?<ColorRing
            visible={true}
            height="150"
            width="150"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#22d3ee', '#22d3ee', '#22d3ee', '#22d3ee', '#22d3ee']}
          />
        :book?<BookEdit 
          book={book}
          collection={collection}
          cancelBtnUrl={returnUrl?returnUrl:"/books/additem"}
          />:""}
      
    </div>
  )
}

export default page;