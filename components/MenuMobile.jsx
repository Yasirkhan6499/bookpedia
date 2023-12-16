"use client";

import React, { useState } from 'react'
import { faBook, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Menu from './Menu';

const MenuMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className='flex justify-between shadow-md py-4 p-2 fixed top-0 w-full z-20 bg-white'>
      <FontAwesomeIcon className='logo-icon w-8 h-8 ml-2 mt-1' icon={faBook} />
      <FontAwesomeIcon className='md:hidden w-8 h-8 mr-2 mt-1 cursor-pointer' icon={faBars} onClick={toggleMenu} />
      </div>
      
      <div>
      <Menu 
      isMobileMenu={true}
      />
      </div>
    </div>
  )
}

export default MenuMobile