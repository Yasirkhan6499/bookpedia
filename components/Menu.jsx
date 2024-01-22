"use client";


import { useAuthContext } from '@/context/authContext'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
// reaact icons 
import { FaBook, FaPlus, FaLayerGroup, FaLifeRing, FaSignOutAlt } from 'react-icons/fa';
import { MdLibraryBooks, MdCollectionsBookmark, MdExitToApp } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineQuestionCircle } from 'react-icons/ai';
import Cookies from 'js-cookie';
import Profile from './Profile';
import axios from 'axios';

const Menu = ({isMobileMenu, isMenuActive, onMenuItemClick}) => {

    const {userToken, setUserToken} = useAuthContext();
    const router = useRouter();
    const [activeItem, setActiveItem] = useState("library");

    const handleMenuItemClick = (itemName) => {
        setActiveItem(itemName);
        Cookies.set('activeMenuItem', itemName, { expires: 1 }); // Set the cookie to expire in 1 day

        if(onMenuItemClick) //it is for mobile menu
        onMenuItemClick(); // Call the function passed as a prop
      };
    
      useEffect(() => {
        // Check for the active item in the cookie when the component mounts
        const storedActiveItem = Cookies.get('activeMenuItem');
        if (storedActiveItem) {
          setActiveItem(storedActiveItem);
        }
      }, []);

    const handleLogout = async()=>{
        try{
          const response = await fetch("api/users/logout",{method: "POST"});
        if(response.ok){

            Cookies.remove('activeMenuItem'); // Remove the cookie on logout
           await fetch("/api/users/myprofile",{method: "POST"});

                setUserToken(null);
                router.push("/login");
          
            
            // alert("logout");

        }
        }catch(error){
            console.log("Logout Failed", error.message);
            alert("logout failed");
        }
    }
    useEffect(()=>{
        // get the cookie of the selected menu item and set it to
        //  to the activeItem
    },[])

    // css variables
    const menu_section = `menu-section ${!isMobileMenu ? "w-1/6 min-w-[250px]" : (isMenuActive)?"menu-slide-in w-full z-20 text-center ":"menu-slide-out w-full z-20 text-center"}`;

    const main_menu_item_css = (!isMobileMenu?"main-menu-item":"main-menu-item text-3xl ")
    const item_icon_css = (!isMobileMenu?"item-icon text-xl":"item-icon text-3xl") ;
  return (
    <div className={menu_section}>
      <div>
      {!isMobileMenu?<>
        {/* logo */}
        <div className="logo-container">
        <div className='flex gap-2 '>
        <h1 className='text-3xl font-normal'>Booklib</h1>
        <FontAwesomeIcon className='logo-icon w-10' icon={faBook} />
        </div>
        </div>
        </>:""}
        {/* main menu */}
        <ul className='main-menu'>

            {/* Library */}
            <div className={isMobileMenu?"-mt-[4rem]":""}>
            <Link href="/library"> 
            <div className={activeItem==="library"?"active-item":'item-container'} 
            onClick={()=>handleMenuItemClick("library")}>
            <MdLibraryBooks className={item_icon_css}/> 
            <li className={`${main_menu_item_css}`}
            >Library</li>
            </div>
            </Link>
            </div>

            {/* add items */}
            <Link href="/books/additem"> 
            <div className={activeItem==="additem"?"active-item":'item-container'} 
            onClick={()=>handleMenuItemClick("additem")}>
            <FaPlus className={item_icon_css}/>
           <li className={main_menu_item_css}> 
           Add Items</li>
           </div>
            </Link>
            
            {/* add collection */}

           <Link href="/books/collections">
           <div className={activeItem==="addcollection"?"active-item":'item-container'} 
           onClick={()=>handleMenuItemClick("addcollection")}>
            <MdCollectionsBookmark className={item_icon_css}/> 
           <li className={main_menu_item_css}> 
           Add Collection</li>
           </div>
           </Link>
           
           {/* support */}
           <div className={activeItem==="support"?"active-item":'item-container'}  
           onClick={()=>handleMenuItemClick("support")}>
            <FaLifeRing className={item_icon_css}/> 
            <li className={main_menu_item_css}>
                Support</li>
            </div>

            {/* logout */}
            {!isMobileMenu && 
            <div className={activeItem==="logout"?"active-item":'item-container'}  
            onClick={()=>setActiveItem("logout")}>
            <FaSignOutAlt className={item_icon_css}/> 
            <li className={main_menu_item_css}
             onClick={handleLogout}>Logout</li>
            </div>
            }

            {/* show profile on mobile */}
            {isMobileMenu?
            <Profile 
            isMobileMenu={isMobileMenu}
            />:""}
        </ul>
        </div>
         {/* all rights reserved */}
         <div className={isMobileMenu?"text-center -ml-8 mb-16":"text-center -ml-8 mb-10"}>
         <p>Copyright© 2023 Booklib.</p> 
         <p>All rights reserved.</p>
         </div>
    </div>
  )
}

export default Menu;