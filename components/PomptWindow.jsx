"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from './Select';

const PromptWindow = ({ heading, action, handlePromptAction, handlePromptCancel, collectionId }) => {

  const [collectionsArr, setCollectionsArr] = useState(null);
  const [collection, setCollection] = useState();

  let actionBtnCss = "text-white rounded-md px-4 py-2 mr-2 ";
  actionBtnCss += action==="Delete"?"bg-red-400 hover:bg-red-500":"bg-blue-400 hover:bg-blue-500";

  useEffect(()=>{
    
    const getCollections =async ()=>{
      try {
        const response = await axios.get("/api/books/collections/getCollectionsArray");
        const collections = response.data.collections.filter((col)=>col._id!==collectionId);
        console.log("new collections ",collections); 
        setCollectionsArr(collections);
      } catch (error) {
        console.log(error);
      }
    }

    if(action==="Move")
    getCollections();

  },[]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">{heading}</h2>
        <div className="flex justify-end">
          {/* if the move option is selected */}
          {collectionsArr && 
          <Select 
          arr={collectionsArr}
          onChange = {(e)=>setCollection(e.target.value)}
          classes={"mr-6 shadow-lg pr-32"}
          />}
          <button onClick={(collectionsArr)?()=>handlePromptAction(collection)
            :handlePromptAction} className={actionBtnCss}>
            {action}
          </button>
          <button onClick={handlePromptCancel} className="bg-gray-300 hover:bg-gray-400 text-black rounded-md px-4 py-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptWindow;
