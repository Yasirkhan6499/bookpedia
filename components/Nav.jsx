"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBars } from '@fortawesome/free-solid-svg-icons'; // faBars is for the menu icon
import Link from 'next/link';
import { useState } from 'react';

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const borderBottom = "border-b-4 border-cyan-300";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className='nav-section relative'>
      <div className="flex justify-between sm:justify-around items-center ml-5 mt-3">
        <Link href={'/login'} onClick={()=>setActiveItem("")}>
        <div className='flex gap-2 cursor-pointer'>
          <h1 className='text-2xl sm:text-4xl font-normal'>Booklib</h1>
          <FontAwesomeIcon className='logo-icon w-5 sm:w-10' icon={faBook} />
        </div>
        </Link>
        
        <FontAwesomeIcon className='sm:hidden w-6 h-6 mr-5' icon={faBars} onClick={toggleMenu} />

        <div className={`sm:block ${isMenuOpen ? 'block absolute top-10 right-0 bg-white  cursor-pointer'
         : 'hidden'}`}>
          <ul className='nav-items flex flex-col sm:flex-row gap-3'> 
            {/* <li className='nav-item'> <Link href='/support'> Support </Link></li> */}
            <li className={`nav-item ${activeItem==="contact"?borderBottom:""}`}>
               <Link href='/contact' onClick={()=>setActiveItem("contact")}> Contact </Link></li>
            <li className={`nav-item ${activeItem==="about"?borderBottom:""}`}> 
            <Link href='/about' onClick={()=>setActiveItem("about")}> About </Link></li>
          </ul>
        </div>
      </div>
    </section>
  );
};
