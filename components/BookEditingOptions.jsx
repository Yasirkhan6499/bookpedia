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

const BookEditingOptions = ({bookid}) => {
    const router = useRouter();
    const { addBookIdArr,setAddBookIdArr } = useBooks();
    const [showPrompt, setShowPrompt] = useState();
    
    const handlePromptCancel = ()=>{
        setShowPrompt(false);
    }
   
    const handleDeleteOption = async ()=>{
        
        try {
            const response = await axios.post("/api/books/delete",{
                bookid
            })
            alert(response.data.message);
            setAddBookIdArr(prevArr => prevArr.filter(entry => entry.bookId!==bookid));
            router.push("/books/additem");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    
    <div>
        
        <ul className="editOptions flex gap-20  
             ">
            <li className="editOption"><FontAwesomeIcon className='mb-[0.1rem]' icon={faPen} /> Edit</li>
            <li className="editOption"><FontAwesomeIcon className='mb-[0.1rem]' icon={faStar} /> Details</li>
            <li className="editOption"><FontAwesomeIcon className='mb-[0.1rem]' icon={faRightLeft} /> Move</li>
            <li onClick={()=>setShowPrompt(true)} className="editOption text-red-400 hover:bg-red-100">
                <FontAwesomeIcon className='mb-[0.1rem]' icon={faTrash} /> 
                Delete</li>
        </ul>
        {showPrompt && <PomptWindow 
            heading="Delete this Item?"
            action={"Delete"}
            handlePromptAction={handleDeleteOption}
            handlePromptCancel = {handlePromptCancel}
                />}
    </div>
  )
}

export default BookEditingOptions