import React from 'react'
import Select from './Select'

const LayoutStyles = ({onChange, value, isMobileMenu}) => {
    const layoutArr = [{_id:1,name:"List"},{_id:2,name:"Cover"},{_id:3,name:"Summary"}];
  return (
    <Select 
    arr={layoutArr}
    classes={`p-1  border-2 rounded-md appearance-none cursor-pointer
     ${isMobileMenu?"px-6 pl-6 mb-2":"px-10 pl-8"}`}
    onChange={onChange}
    defaultValue={value}
    
    />
  )
}

export default LayoutStyles