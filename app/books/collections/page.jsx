"use client";

import Button from '@/components/Button';
import Input from '@/components/Input';
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const page = () => {
    const [inputText, setInputText] = useState("");
    const [collection, setCollection] = useState("");
    const [totalCollections, setTotalCollections] = useState(0);

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

        if(res.data){
            alert("New Collection Added");
        }
        }catch(error){
            console.log("Collection adding Error:",error);
        }
    }

  return (
    <section className='collection-section'>
        <h2 className='page-title'>Add Collection</h2>
        <p className="mb-8">
            There are currently ({totalCollections} of 100) collections.
        </p>

        <form onSubmit={handleAddCollection}>
            <label className='page-label' htmlFor="title">Collection Title</label>
            {/* <input className="page-input" onChange={(e)=>setCollection(e.target.value)} type="text" /> */}
            <Input
            type="text"
            id="collection-title"
            placeholder="Collection Title"
            onChange={(e)=>setInputText(e.target.value)}
            value={inputText}
            className="page-input"
            ref={inputRef} // Use the ref here
            />
            <p>Limit 40 characters. e.g. (My Books, Movie Wishlist, Console Games, Family CD Collection).</p>
            <Button 
            width="w-auto"
            title={"Add Collection"}
            className="page-btn"
            />
        </form>

    </section>
  )
}

export default page