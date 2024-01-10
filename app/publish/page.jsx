"use client";

import Input from '@/components/Input';
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react'

const PublishCollection = () => {
    const [collections, setCollections] = useState([]);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [urlInput,setUrlInput] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [userId, setUserId] = useState("");
    const [fullUrl, setFullUrl] = useState("");
    const [CollectionSearch, setCollectionSearch] = useState("");

    const collectionsListRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
          if (collectionsListRef.current && !collectionsListRef.current.contains(event.target)) {
            setIsInputFocused(false);
          }
        }
      
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [collectionsListRef]);

    useEffect(()=>{
    //   Fetch collections from database 
        const getCollectionsArr = async ()=>{
          try{
          const response = await axios.get("/api/books/collections/getCollectionsArray");
          setCollections(response.data.collections);
          }catch(error){
            console.log("Couldnt get the collections Array", error.message);
          }
        }
        getCollectionsArr();
        // setting full url
        setFullUrl(`http://localhost:3000/publish/${userId}/`);
      },[userId]);
    //   Get user ID
        useEffect(()=>{
            const getUserId = async ()=>{
                const response = await axios.get("/api/user/getusername");
                if(response.data.success) 
                    setUserId(response.data.userId);
            }

            getUserId();
            
        },[])

        // Handling collection selection
        const handleCollectionSelection = (value)=>{
            setCollectionSearch(value);
        }

    function handleSelectCollection(collectionId) {
        console.log('Collection clicked:', collectionId); // Debugging
        setSelectedCollections(prevSelected => {
            const isSelected = prevSelected.includes(collectionId);
            if (isSelected) {
                return prevSelected.filter(id => id !== collectionId);
            } else {
                return [...prevSelected, collectionId];
            }
        });
        // hide the collections list 
        setIsInputFocused(false);
    }

    async function handlePublish() {
        try{
            // alert("publish")
        const response = await axios.post("/api/publish",{
            collections: selectedCollections
        });
        // const response = await fetch('/api/publish', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ collections: selectedCollections }),
        // });

        if (response.data.success) {
           
            
            console.log("public urls:",response.data.publicUrls);
            // TODO: Do something with the public URLs, such as displaying them
        }
        

    }catch(error){
        console.log("Error: ",error)
    }
    }

   
//   Handling URL Input
        const handleUrlInput = (userUrl)=>{
            setFullUrl(`http://localhost:3000/publish/${userId}/${userUrl}`);
            setUrlInput(userUrl);
        }

    return (
        <section className="publish-section">
            
        <div className='page-title' >
        <h2 className='text-4xl font-bold pt-10 md:pt-0' >Publish</h2>
        {/* Add item options */}
        <div className='flex gap-10 mt-9'>
          <h3 onClick={()=>setActiveTab("search")}
          className='border-b-2 text-black border-cyan-500 pb-4 cursor-pointer'>
            Site</h3>

        </div>
        </div>

        {/* -----Publish Site URL------------ */}

        <h2 className="text-2xl">Your Public Site URL</h2>
        <div className="flex flex-wrap mt-3">
             <p className="italic text-base">View or share your published library URL : </p>
            <Link className="text-cyan-700" href={fullUrl} target='_blank' rel="noopener noreferrer">
                {` http://localhost:3000/publish/${userId}/${urlInput}`} 
            </Link>
        </div>
            
        <div className='flex flex-wrap items-center gap-0'>     
            <div className='border-2 p-2 rounded-mds bg-slate-200'>
             <p>{`http://localhost:3000/publish/${userId}/`}</p>   
            </div>
            <Input 
            type="text" 
            id="userUrl" 
            onChange={(e)=>handleUrlInput(e.target.value)}
            value={urlInput}
            className={"w-fit -ml-2 font-bold"}
        
            />
        </div>
        {/* ---------------------------------------------- */}

        {/*--------------- Select Collections---------------*/}
        <h2 className="text-2xl mt-3">Select Collections to Publish</h2>
        <label htmlFor='collections-input' className="mt-2 -mb-2 block w-fit">Publish Collections</label>
        
        {/* input for collections and collections list */}
        <ul className="relative">
            {/* dynamic collections list */}
           {selectedCollections && selectedCollections.map((col)=>{
                return(<li>{col}</li>)
           })} 
         <li>
        <Input 
            ref={collectionsListRef}
            type="text" 
            id="collections-input" 
            onChange={(e)=>handleCollectionSelection(e.target.value)}
            value={CollectionSearch}
            className={"w-[70%] ml-0"}
            onFocus={()=>setIsInputFocused(true)}
            
        />
        </li>
            {/* if input is clicked, then show the collections below it */}
            {isInputFocused &&
            <div ref={collectionsListRef}
            className='shadow-xl -mt-4  w-[70%] border-2 absolute bg-white z-20 rounded-sm'
            >  
                {collections.map(collection => {
                  if(!selectedCollections.includes(collection._id)){
                    return(
                    <div key={collection._id}>
                        <p
                        className="cursor-pointer py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                        onClick={()=> handleSelectCollection(collection._id)}
                        >
                            {collection.name}
                        </p>
                    </div>
                    )
                    }
                })}
                </div>
            }
            </ul>
            
            <button onClick={handlePublish}>Publish Selected</button>
        </section>
    );

}

export default PublishCollection