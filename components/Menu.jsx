import { useAuthContext } from '@/context/authContext'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Menu = () => {

    const {userToken, setUserToken} = useAuthContext();
    const router = useRouter();

    const handleLogout = async()=>{
        try{
        const response = await fetch("/api/users/logout");
        if(response.ok){
            
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
            <Link href="/library"> 
            <li className="main-menu-item">Library</li>
            </Link>

            <Link href="/books/additem"> 
           <li className="main-menu-item"> Add Items</li>
            </Link>

           <Link href="/books/collections"> 
           <li className="main-menu-item"> Add Collection</li>
           </Link>
           
            <li className="main-menu-item">Suppport</li>
            <li className="main-menu-item " onClick={handleLogout}>Logout</li>
        </ul>
    </div>
  )
}

export default Menu