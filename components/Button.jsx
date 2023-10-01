import React from 'react'

const Button = ({title,onClick, type, width,className,addedAlready}) => {

  const setClasses = ()=>{
    let classes = `bg-cyan-500 p-2 px-4 m-4 
    text-2xl ${width?width:"w-full"} font-semibold 
    text-white rounded-md
    hover:bg-cyan-600 ${className}`;

    return classes;
  }
  
  return (
    <button className={setClasses()}
        onClick={onClick?e=>onClick(e):()=>{}}
        
        type={type?type:""}
        >
          {addedAlready?
          <div className='text-xs'>Already in Collection.</div>:""}
            {title}{addedAlready?"?":""}
    </button>
  )
}

export default Button