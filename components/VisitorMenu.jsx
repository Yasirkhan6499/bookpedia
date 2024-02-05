"use client";

import React, { useEffect, useState } from 'react';
import { useVisitor } from "@/context/visitorContext";
import axios from 'axios';


const VisitorMenu = () => {
    const [publishCollections, setPublishCollections] = useState();
    const [books, setBooks] = useState();

    const { viewedUserId, setViewedUserBooks, setVisitorSelectedCol } = useVisitor();

   useEffect(()=>{
      const getPublicCollections = async ()=>{
        try{
          const res = await axios.post("/api/books/collections/getPublicCollections",{
            viewedUserId
          });

          if(res.data.success){
               setPublishCollections(res.data.publicCollections);
              console.log("publicCollections : ",res.data.publicCollections)
          }
          }
          catch(error){
              console.log("Error getting the public collections ",error);
          }
      }
      getPublicCollections();

   },[]);

  //  get the books
  useEffect(()=>{

    const getUserBooks = async ()=>{
      try{
        const res = await axios.post("/api/books/getBooks",{
          userId: viewedUserId
        })

        if(res.data.success){
          setViewedUserBooks(res.data.books);
          console.log("books: ",res.data.books);
        }
      }catch(error){
        console.log("Couldn't Fetch the Published Books: ",error);
      }
    }

    getUserBooks();

  },[publishCollections])

  return (
    <div className='mt-16 '>
        <h3>Collections</h3>
        <div>
           
        </div>
    </div>
  )
}

export default VisitorMenu;