import React, { useEffect, useState, useRef } from 'react'
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation'

const Profile = ({isMobileMenu}) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef();
    const {userToken, setUserToken} = useAuthContext();
    const router = useRouter();


    // css classes
    const profile_menu_css = (!isMobileMenu?"profile-menu absolute right-0 top-5 ":"profile-menu text-left w-full mt-20")
    const btn_css = (!isMobileMenu?"btn-logout":"btn-logout ml-5 px-6")

    useEffect(() => {
        const getUserName = async () => {
            const response = await axios.post("/api/user/getusername");
            
            if (response.data.success) {
                setUserName(response.data.username);
                setEmail(response.data.email);
            }
        };
        
        getUserName();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [profileMenuRef]);

    // handle logging out

    const handleLogout = async()=>{
        const response = await fetch("api/users/logout",{method: "POST"});
        if(response.ok){
            setUserToken(null);
            router.push("/login");
        }
    }

    return (
        <div className='relative z-30'>
            { (!showProfileMenu && !isMobileMenu ) && (
                <div className='bg-slate-200 p-2 rounded-2xl flex cursor-pointer hover:scale-105 transition duration-200'
                     onClick={() => setShowProfileMenu(true)}> 
                    <FaUser size={20} className="text-cyan-700 mt-2" />
                    <p className='p-2 font-bold '>{userName}</p>
                </div>
            )}

            { (showProfileMenu || isMobileMenu ) && (
                <div ref={profileMenuRef} className={profile_menu_css}>
                  <div className={(isMobileMenu?"flex gap-1":"")}>
                    {isMobileMenu && 
                    <FaUser size={20} className="text-cyan-700 mt-2 h-4" />
                    }
                  
                  <div>
                  <p className="font-bold text-lg">{userName}</p>
                  <p className="text-slate-500 -mt-1">{email}</p>
                  </div>
                  </div>
                    
                    
                    <button className={btn_css}
                    onClick={handleLogout}
                    >Logout</button>
                </div>
            )}
           
        </div>
    );
};

export default Profile;
