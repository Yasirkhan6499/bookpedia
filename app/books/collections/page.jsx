"use client";

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useToast } from '@/context/ToastContext';
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const page = () => {
    const [inputText, setInputText] = useState("");
    const [collection, setCollection] = useState("");
    const [totalCollections, setTotalCollections] = useState(0);

    // toast
    const { triggerToast } = useToast();

    const inputRef = useRef(null); // Add this reference

    useEffect( ()=>{
        const getTotalCollections = async ()=>{
            try{
            const response = await axios.get("/api/books/collections/getTotalCollections");
            setTotalCollections(response.data.totalCollections);
            } catch(error){
                console.log("Getting total collections failed", error.message);
            }
        }
        getTotalCollections();
    }, [collection]);

    const handleAddCollection = async (e)=>{
        e.preventDefault();

        setCollection(inputRef.current.value);

        try{
        const res = await axios.post("/api/books/collections",{name: inputRef.current.value});

        if(res.data.success){
            triggerToast("Collection Added!", "success");
        }
        else{
            triggerToast(res.data.message, "error");
        }
        }catch (error) {
            if (error.response && error.response.status === 409) {
                // Handle the conflict case
                triggerToast(error.response.data.message, "error");
            } else {
                // Handle other errors
                triggerToast("An error occured!", "error");
                console.log("Collection adding Error:", error);
            }
    }
}

  return (
    <section className='collection-section '>
        <h2 className='page-title text-4xl font-bold pb-6 mb-9 pt-10 md:pt-0'>Add Collection</h2>
        <p className="mb-7">
            There are currently ({totalCollections} of 100) collections.
        </p>

        <form onSubmit={handleAddCollection}>
            <label className='page-label  mt-4 md:mt-0' htmlFor="title">Collection Title</label>
            {/* <input className="page-input" onChange={(e)=>setCollection(e.target.value)} type="text" /> */}
            <Input
            type="text"
            id="collection-title"
            placeholder="Collection Title"
            onChange={(e)=>setInputText(e.target.value)}
            value={inputText}
            className="page-input mb-3  md:mb-4"
            ref={inputRef} // Use the ref here
            />
            <p>Limit 40 characters. e.g. (My Books, Action Books, Politics, Fiction).</p>
            <Button 
            width="w-auto"
            title={"Add Collection"}
            className="page-btn mt-6 md:mt-[1.2rem]"
            />
        </form>

    </section>
  )
}

export default page