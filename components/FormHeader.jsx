import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const FormHeader = ({title}) => {
  return (
    <div className="login-header flex gap-3 mt-[-1rem]">
          <FontAwesomeIcon className='logo-icon w-14' icon={faBook} />
          <h2 className='custom-sm2:text-3xl mb-4 font-light '>
             {title}
          </h2>
    </div>
  )
}

export default FormHeader;