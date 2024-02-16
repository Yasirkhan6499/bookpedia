"use client";

import React, { useEffect, useState } from 'react';
import { useVisitor } from "@/context/visitorContext";
import axios from 'axios';


const VisitorMenu = ({onMenuItemClick}) => {
    const [publishCollections, setPublishCollections] = useState();
    // const [books, setBooks] = useState();
    // const [selectedCollectionId,setSelectedCollectionId] = useState("");

    const { viewedUserId, setViewedUserBooks, setVisitorSelectedCol, visitorSelectedCol } = useVisitor();

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
          // set the first collection to the Visitor-selected-collection
          setVisitorSelectedCol(publishCollections[0]._id);

          console.log("books: ",res.data.books);
        }
      }catch(error){
        console.log("Couldn't Fetch the Published Books: ",error);
      }
    }

    getUserBooks();

  },[publishCollections])

  // handleCollectionClick

  const handleCollectionClick = (collectionId)=>{
    setVisitorSelectedCol(collectionId);

    if(onMenuItemClick) //it is for mobile menu
    onMenuItemClick(); // Call the function passed as a prop

    console.log("selected col",collectionId);
  }

  return (
    <div className='mt-16 '>
        <h3>Collections</h3>
        <div className="mt-5">
           {publishCollections?.map((col, index)=>{
            let bg_color="";
              let borderClass = `cursor-pointer hover:bg-gray-300
               transitiona-all duration-500 border-t-2 border-slate-300 py-2`; // Apply only top border to all elements
              if (index === publishCollections.length - 1) {
                borderClass += " border-b-2"; // Add bottom border for the last element
              }
              // setting bg color on selected collection
              if(col._id===visitorSelectedCol)
              bg_color="bg-gray-300";
              else bg_color=""; 

              return(
                <div onClick={()=>handleCollectionClick(col._id)} 
                className={`${borderClass} ${bg_color} flex justify-between`}>
                  {/* collection name */}
                <p>{col.name}</p>
                  {/* total number of books in collection */}
                <p>({col.totalBooks})</p>  
                </div>
              );
           })}
        </div>
    </div>
  )
}

export default VisitorMenu;