import React from 'react'

const Button = ({title,onClick, type, width,className}) => {

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
            {title}
    </button>
  )
}

export default Button