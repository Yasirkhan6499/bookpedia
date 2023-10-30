"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useBooks } from '@/context/booksContext';
import PomptWindow from './PomptWindow';


const BookEditingOptions = ({bookid, collectionid, handleEditBook, handleBookReview, cancelBtnUrl}) => {
    const router = useRouter();
    const { addBookIdArr,setAddBookIdArr } = useBooks();
    const [showPrompt, setShowPrompt] = useState(null);
    
    
    const handlePromptCancel = ()=>{
        setShowPrompt(null);
        // setShowEditPage(null);
    }

    // handle delete option
   
    const handleDeleteOption = async ()=>{
       
        try {
            const response = await axios.post("/api/books/delete",{
                bookid
            })
            alert(response.data.message);
            setAddBookIdArr(prevArr => prevArr.filter(entry => entry.bookId!==bookid));
            router.push(cancelBtnUrl);
        } catch (error) {
            console.log(error);
        }
    }

    // handle move option
    const handleMoveOption = async (collection)=>{
        // console.log("bookid ",bookid)
        // console.log("move to , ",collection);
        if(!collection || collection==="0")
        alert("please select a collection");
        else{
            try {
                const response = await axios.post("/api/books/collections/updateBookCollection",{
                    bookid,
                    collectionId: collection
                });
                if(response.data.success){
                    alert(response.data.message);
                    setShowPrompt(null);
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

  return (
    
    <div>
        
        <ul className="editOptions flex gap-20   
             ">
                {/* Edit page  */}
            <li onClick={handleEditBook}
             className="editOption"><FontAwesomeIcon className='mb-[0.1rem]' icon={faPen} /> Edit</li>
                {/* Details Page */}

            <li onClick={handleBookReview} 
            className="editOption"><FontAwesomeIcon className='mb-[0.1rem]' icon={faStar} /> Details</li>
 
            {/* move option */}
            <li onClick={()=>setShowPrompt({
                heading: "Move Item?",
                action:"Move",
                handlePromptAction:handleMoveOption,
                handlePromptCancel : handlePromptCancel
            })} className="editOption"><FontAwesomeIcon className='mb-[0.1rem]' icon={faRightLeft} /> Move</li>

            {/* delete option */}
            <li onClick={()=>setShowPrompt({
                heading: "Delete this Item?",
                action:"Delete",
                handlePromptAction:handleDeleteOption,
                handlePromptCancel : handlePromptCancel
            })} className="editOption text-red-400 hover:bg-red-100">
                <FontAwesomeIcon className='mb-[0.1rem]' icon={faTrash} /> 
                Delete</li>
        </ul>
        {/* prompt */}
        {showPrompt && <PomptWindow 
            heading={showPrompt.heading}
            action= {showPrompt.action}
            handlePromptAction={showPrompt.handlePromptAction}
            handlePromptCancel = {showPrompt.handlePromptCancel}
            collectionId = {collectionid}
                />}
        {/* Edit book page
        {showEditPage && <EditBookPage 
           
        />} */}
    </div>
  )
}

export default BookEditingOptions