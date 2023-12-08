"use client";

import { useToast } from '@/context/ToastContext'
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

const Menu = () => {

    const {userToken, setUserToken} = useAuthContext();
    const router = useRouter();
    const [activeItem, setActiveItem] = useState("library");

    const handleMenuItemClick = (itemName) => {
        setActiveItem(itemName);
        Cookies.set('activeMenuItem', itemName, { expires: 1 }); // Set the cookie to expire in 1 day
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
        const response = await fetch("/api/users/logout");
        if(response.ok){

            Cookies.remove('activeMenuItem'); // Remove the cookie on logout
            await fetch("/api/users/myprofile");
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
  return (
    <div className='menu-section w-1/6 min-w-[250px]'>
        {/* logo */}
        <div className="logo-container">
        <div className='flex gap-2 '>
        <h1 className='text-3xl font-normal'>Booklib</h1>
        <FontAwesomeIcon className='logo-icon w-10' icon={faBook} />
        </div>
        </div>
        {/* main menu */}
        <ul className='main-menu'>

            {/* Library */}
            <Link href="/library"> 
            <div className={activeItem==="library"?"active-item":'item-container'} 
            onClick={()=>handleMenuItemClick("library")}>
            <MdLibraryBooks className='item-icon'/> 
            <li className="main-menu-item"
            >Library</li>
            </div>
            </Link>

            {/* add items */}
            <Link href="/books/additem"> 
            <div className={activeItem==="additem"?"active-item":'item-container'} 
            onClick={()=>handleMenuItemClick("additem")}>
            <FaPlus className='item-icon'/>
           <li className="main-menu-item"> 
           Add Items</li>
           </div>
            </Link>
            
            {/* add collection */}

           <Link href="/books/collections">
           <div className={activeItem==="addcollection"?"active-item":'item-container'} 
           onClick={()=>handleMenuItemClick("addcollection")}>
            <MdCollectionsBookmark className='item-icon'/> 
           <li className={"main-menu-item"}> 
           Add Collection</li>
           </div>
           </Link>
           
           {/* support */}
           <div className={activeItem==="support"?"active-item":'item-container'}  
           onClick={()=>handleMenuItemClick("support")}>
            <FaLifeRing className='item-icon'/> 
            <li className={"main-menu-item"}>
                Support</li>
            </div>

            {/* logout */}
            <div className={activeItem==="logout"?"active-item":'item-container'}  
            onClick={()=>setActiveItem("logout")}>
            <FaSignOutAlt className='item-icon'/> 
            <li className={"main-menu-item"}
             onClick={handleLogout}>Logout</li>
            </div>
        </ul>
    </div>
  )
}

export default Menu