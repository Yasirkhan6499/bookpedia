import React from 'react'

const Button = ({title,onClick, type, width,className,addedAlready, disabled}) => {

  const setClasses = ()=>{
    let classes = `bg-cyan-500 p-2 px-4 mt-4
    text-2xl ${width?width:"w-full"} font-semibold 
    text-white rounded-md
    hover:bg-cyan-600 ${className}`;

       // Add a class for disabled state if needed
       if (disabled) {
        classes += ' opacity-50 cursor-not-allowed'; // Example styling for disabled state
      }

    return classes;
  }

  

  
  return (
    <button className={setClasses()}
        onClick={onClick?e=>onClick(e):()=>{}}
        disabled={disabled}
        type={type?type:""}
        >
          {addedAlready?
          <div className='text-xs'>Already in Collection.</div>:""}
            {title}{addedAlready?"?":""}
    </button>
  )
}

export default Button