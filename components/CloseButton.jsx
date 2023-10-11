import { useRouter } from 'next/navigation'
import React from 'react'

const CloseButton = ({url}) => {
    const router = useRouter();
    const closeEditting = ()=>{
        router.push(url);
    }

  return (
    <div className=" border-2 w-8 h-8 flex items-center justify-center 
    rounded-full cursor-pointer hover:bg-slate-100"
    onClick={closeEditting}>
        X
    </div>
  )
}

export default CloseButton