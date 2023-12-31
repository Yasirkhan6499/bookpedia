"use client";

import React, { useEffect, useState } from 'react'
import { faBook, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Menu from './Menu';
import Profile from './Profile';

const MenuMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [itemNotClicked, setItemNotClicked] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // setItemNotClicked(true);
  };

   // Function to be called when an item in the menu is clicked
  //  const handleMenuItemClick = () => {
  //   setItemNotClicked(false);
  //   setIsMenuOpen(!isMenuOpen);
  // };

  // useEffect(()=>{
  //   console.log("ItemNotClicked : ",itemNotClicked);
  //   console.log("isMenuOpen : ",isMenuOpen);
  // },[itemNotClicked]);

  return (
    <div>
      <div className='flex justify-between shadow-md py-4 p-2 fixed top-0 w-full z-30 bg-white'>
      <FontAwesomeIcon className='logo-icon w-8 h-8 ml-2 mt-1' icon={faBook} />
      <FontAwesomeIcon className='md:hidden w-8 h-8 mr-2 mt-1 cursor-pointer' icon={faBars} onClick={toggleMenu} />
      </div>
      
      <div>
       {/* menu  */}
        <Menu 
        isMobileMenu={true}
        isMenuActive = {isMenuOpen}
        onMenuItemClick={toggleMenu} // Pass the function as a prop 
        />
     
      </div>
      
    </div>
  )
}

export default MenuMobile