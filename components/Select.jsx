import React from 'react'

const Select = ({arr, classes, onChange, defaultValue}) => {
  return (
    <select 
    className={classes} 
    onChange={onChange}
    value={defaultValue || 0}
    >

      <option value={0}>Select Collection:</option>
        {arr.map(item =>(
            <option  key={item._id} value={item._id}>
            {item.name}
            </option>
        ))}

    </select>
  )
}
export default Select;