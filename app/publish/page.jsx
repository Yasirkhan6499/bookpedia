"use client";

import Input from '@/components/Input';
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect, useRef, useContext } from 'react'
import { useToast } from '@/context/ToastContext';
import Button from '@/components/Button';
import Profile from '@/components/Profile';
import WindowDimensionsContext from '@/context/windowDimensionsContext';

const PublishCollection = () => {
    const [collections, setCollections] = useState([]);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [urlInput,setUrlInput] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [userId, setUserId] = useState("");
    const [fullUrl, setFullUrl] = useState("");
    const [CollectionSearch, setCollectionSearch] = useState("");
    const [inputSize, setInputSize] = useState(1);

    // refs
    const collectionsListRef = useRef(null);
    const inputRef = useRef(null);

    // toast
        const { triggerToast } = useToast();
    // secreen width
    const { windowWidth } = useContext(WindowDimensionsContext);

        // get the Public collections list
    useEffect(()=>{
        const getPublicCollections = async ()=>{
            try{
            const res = await axios.post("/api/books/collections/getPublicCollections",{
                viewedUserId: null
            });

            if(res.data.success){
                setSelectedCollections(res.data.publicCollections);
                console.log("publicCollections : ",res.data.publicCollections)
            }
            }
            catch(error){
                console.log("Error getting the public collections ",error);
            }
        }
        getPublicCollections();
        
    },[]);

    // get the Publish Collections title
    useEffect(()=>{
        const getPublishCollectionsTitle = async ()=>{
            try{
            const res = await axios.get("/api/publish/getPublishTitle");
            
            if(res.data.success){
                setUrlInput(res.data.publishTitle);
                // setFullUrl(fullUrl+res.data.publishTitle);
            }
        }catch(error){
            console.log("Error getting the publish title, ",error);
        }
        }

        getPublishCollectionsTitle();

    },[])

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
          const response = await axios.post("/api/books/collections/getCollectionsArray");
          setCollections(response.data.collections);
          }catch(error){
            console.log("Couldnt get the collections Array", error.message);
          }
        }
        getCollectionsArr();
        // setting full url
        setFullUrl(`https://booklib-rho.vercel.app/publish/${userId}/${urlInput?urlInput:""}`);
      },[userId,urlInput]);
    //   Get user ID
        useEffect(()=>{
            const getUserId = async ()=>{
                const response = await axios.post("/api/user/getusername");
                if(response.data.success) 
                    setUserId(response.data.userId);
            }

            getUserId();
            
        },[])

        // Handling collection selection
        const handleCollectionSelection = (value)=>{
            setCollectionSearch(value);
        }

   // Updated handleSelectCollection function
    function handleSelectCollection(collectionId, collectionName, event) {
        event.stopPropagation(); // Add this line to stop event propagation
        // alert("handleSelection")
        setSelectedCollections(prevSelected => {
        const index = prevSelected.findIndex(item => item._id === collectionId);
        if (index !== -1) {
            // Remove the collection if it's already selected
            return [...prevSelected.slice(0, index), ...prevSelected.slice(index + 1)];
        } else {
            // Add the new collection to the array
            return [...prevSelected, { _id: collectionId, name: collectionName }];
        }
    });
    // hide the collections list 
    setIsInputFocused(false);
}

    async function handlePublish() {
        if(!urlInput){
            triggerToast("Please input the url!","error");
            return;
        }
        try {
            // Map over selectedCollections to get just the IDs
            const selectedCollectionIds = selectedCollections.map(col => col._id);
    
            // Map over the collections to get the IDs for the remaining collections
            let remainingCollectionIds = collections
                .filter(col => !selectedCollectionIds.includes(col._id))
                .map(col => col._id);
    
            console.log("selected collection IDs: ", selectedCollectionIds);
            console.log("remaining collection IDs: ", remainingCollectionIds);
    
            const response = await axios.post("/api/publish", {
                selectedCollections: selectedCollectionIds,
                remainingCollections: remainingCollectionIds,
                publishCollectionsTitle: urlInput
            });
        // const response = await fetch('/api/publish', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ collections: selectedCollections }),
        // });

        if (response.data.success) {
           
            triggerToast("Collections published!","success");
            console.log("public urls:",response.data.publicUrls);
            // TODO: Do something with the public URLs, such as displaying them
        }
        

    }catch(error){
        console.log("Error: ",error)
    }
    }

    // setting the size of the input field containing "Public Collections name"
    useEffect(()=>{
        setInputSize(urlInput?.length > 0 ? urlInput.length + 1 : 1);
    },[urlInput]);
   
//   Handling URL Input
        const handleUrlInput = (userUrl)=>{
            setFullUrl(`https://booklib-rho.vercel.app/publish/${userId}/${userUrl}`);
            setUrlInput(userUrl);
            // alert(urlInput.length);
             
        }

        // handling ul clicked so that the collection list is shown and the input is focused
        const handleUlClick = () => {
            setIsInputFocused(true);
            inputRef.current?.focus(); // Focus the input
        };

          // Calculate the size based on the input length
         //  adjust the base size and the increment factor as needed
        

    return (
        <section className="publish-section">
            
        <div className='page-title' >
        <div>
        <h2 className='text-4xl font-bold pt-10 md:pt-0' >Publish</h2>
        {/* Add item options */}
        <div className='flex gap-10 mt-9'>
          <h3 onClick={()=>setActiveTab("search")}
          className='border-b-2 text-black border-cyan-500 pb-4 cursor-pointer'>
            Site</h3>

        </div>
        </div>
           {/* Profile icon and logout */}
           <div className="page-title-profile">
          {(windowWidth>768)?<Profile />:""}
          </div>
        </div>

        {/* -----Publish Site URL------------ */}

        <h2 className="text-2xl">Your Public Site URL</h2>
        <div className="flex flex-wrap mt-3 custom-sm:text-sm">
             <p className="italic text-sm sm:text-base ">View or share your published library URL : </p>
            <Link className="text-cyan-700 text-xs custom-sm4:text-sm sm:text-base" href={fullUrl} target='_blank' rel="noopener noreferrer">
                {` booklib-rho.vercel.app/publish/${userId}/${urlInput || ""}`} 
            </Link>
        </div>
            
        <div className='flex flex-wrap custom-sm3:flex-nowrap items-center gap-0 '>     
            <div className='border-2 p-2 rounded-mds bg-slate-200 '>
             <p className="text-sm sm:text-base">
                {`booklib-rho.vercel.app/publish/u/`}
            </p>   
            </div>
            <Input 
            type="text" 
            id="userUrl" 
            onChange={(e)=>handleUrlInput(e.target.value)}
            value={urlInput}
            className={`w-[120px] sm:w-fit text-sm sm:text-base -ml-2 font-bold mt-[1rem]`}
            maxLength={15}
            />
        </div>
        {/* ---------------------------------------------- */}

        {/*--------------- Select Collections---------------*/}
        <h2 className="text-2xl mt-3">Select Collections to Publish</h2>
        <label htmlFor='collections-input' className="mt-2  block w-fit">Publish Collections</label>
        
        {/* input for collections and collections list */}
        <ul onClick={handleUlClick}
        
        className="relative w-[70%] flex flex-wrap gap-2 items-center border-2 rounded-md ">
            {/* dynamic collections list */}
           {selectedCollections && selectedCollections.map((col)=>{
                return(
                <li className="border-2 bg-slate-200 px-1 cursor-default">
                <div className='flex w-fit'>
                <p>{col.name}</p>
                <p className="font-bold cursor-pointer text-slate-600 pl-1 pb-2"
                onClick={(event)=>handleSelectCollection(col._id,col.name,event)}
                ref={collectionsListRef}
                >X</p>
                </div>
                </li>
                )
           })} 
         <li className="w-full">
        <Input 
            ref={inputRef}
            type="text" 
            id="collections-input" 
            onChange={(e)=>handleCollectionSelection(e.target.value)}
            value={CollectionSearch}
            className={" ml-0 !my-0 border-none outline-none"}
            onFocus={()=>setIsInputFocused(true)}
            
        />
        </li>
            {/* if input is clicked, then show the collections below it */}
            {isInputFocused &&
            <div ref={collectionsListRef}
            className='shadow-xl w-full border-2 absolute top-[3rem] bg-white z-20 rounded-sm'
            >  
            {collections.map(collection => {
                // Check if the collection is already selected
                const isAlreadySelected = selectedCollections.some(selected => selected._id === collection._id);
                
                // Only render collections that are not already selected
                if (!isAlreadySelected) {
                    return (
                        <div key={collection._id}>
                        <p
                        className="cursor-pointer py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                        onClick={(event) => handleSelectCollection(collection._id, collection.name,event)}
                        >
                            {collection.name}
                        </p>
                        </div>
                    );
                }
            })}
                </div>
            }
            </ul>
            
            <Button
            width="w-auto"
            title={"Publish"}
            onClick={handlePublish}
            className="page-btn !mt-5"
            />
            {/* <button onClick={handlePublish}>Publish Selected</button> */}
        </section>
    );

}

export default PublishCollection;