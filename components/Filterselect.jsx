import React from 'react'
import Select from './Select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

const Filterselect = ({onChange,value}) => {
    const filterArr = [{_id:1,name:"Title"},{_id:2,name:"Creator"},{_id:3,name:"Added"},{_id:4,name:"Published"},{_id:5,name:"Rating"}];

  return (
    <React.Fragment>
    <p className='absolute left-3 top-[0.37rem] cursor-pointer'>
    <FontAwesomeIcon icon={faFilter} />
    </p>
    <Select 
    arr={filterArr}
    classes={"p-1 px-10 pl-8 border-2 rounded-md appearance-none cursor-pointer"}
    onChange={onChange}
    defaultValue={value}
    />
    </React.Fragment>
  )
}

export default Filterselect