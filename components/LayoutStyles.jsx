import React from 'react'
import Select from './Select'

const LayoutStyles = ({onChange, value}) => {
    const layoutArr = [{_id:1,name:"List"},{_id:2,name:"Cover"},{_id:3,name:"Summary"}];
  return (
    <Select 
    arr={layoutArr}
    classes={"p-1 px-4 pl-8 border-2 rounded-md appearance-none cursor-pointer"}
    onChange={onChange}
    defaultValue={value}
    />
  )
}

export default LayoutStyles