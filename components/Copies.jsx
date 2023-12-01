"use client";

import React, { useState } from 'react'
import Input from './Input';
import Button from './Button';

const Copies = () => {
    const [copiesAmount, setCopiesAmount] = useState("0");

    const handleAddCopy = ()=>{
        let copiesNum = Number(copiesAmount)+1;
        if(copiesNum>100) 
        copiesNum=100;

        setCopiesAmount(copiesNum.toString());
    }
    const handleDeleteCopy = ()=>{
      let copiesNum = Number(copiesAmount)-1;
      if(copiesNum<0) 
      copiesNum=0;

      setCopiesAmount(copiesNum.toString());
    }

    // handleSave
    const handleSave = ()=>{

    }

  return (
    <div className="flex flex-col justify-center items-start ">
        <h3 className="text-center">Copies</h3>
        {/* plus btn */}

        <div className="flex flex-row">
        <Button 
        title ="+"
        onClick={handleAddCopy} 
        width = "1rem"
        className={"w-10 h-10 !text-xl !px-0 !p-0"}
        />
        <Input 
        type="text"
        id="copies"
        // onChange={()=>set}
        value={copiesAmount} 
        className="w-10"
        maxLength={100}
        maxDigits={100} 
        />
        
        {/* minus btn */}
        <Button 
        title ="-"
        onClick={handleDeleteCopy} 
        width = "1rem"
        className={"w-10 h-10 !text-xl !px-0 !p-0"}
        />
        </div>
        {/* save btn */}
        <Button 
        title ="Save"
        onClick={handleSave} 
        width = "10rem"
        />
    </div>
  )
}

export default Copies;