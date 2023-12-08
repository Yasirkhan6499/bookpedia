import React, { useEffect, useState, useRef } from 'react'
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation'

const Profile = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef();
    const {userToken, setUserToken} = useAuthContext();
    const router = useRouter();
    useEffect(() => {
        const getUserName = async () => {
            const response = await axios.get("/api/user/getusername");
            
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
        const response = await fetch("api/users/logout");
        if(response.ok){
            setUserToken(null);
            router.push("/login");
        }
    }

    return (
        <div className='relative'>
            { !showProfileMenu && (
                <div className='bg-slate-200 p-2 rounded-2xl flex cursor-pointer hover:scale-105 transition duration-200'
                     onClick={() => setShowProfileMenu(true)}> 
                    <FaUser size={20} className="text-cyan-700 mt-2" />
                    <p className='p-2 font-bold '>{userName}</p>
                </div>
            )}

            { showProfileMenu && (
                <div ref={profileMenuRef} className='bg-slate-200 p-4 rounded-2xl absolute right-0 top-5 -translate-y-14
                 z-10 px-6 '>
                    <p className="font-bold text-lg">{userName}</p>
                    <p className="text-slate-500 -mt-1">{email}</p>
                    <button className='bg-cyan-600 text-white p-2 rounded-lg hover:bg-cyan-700 font-bold mt-4'
                    onClick={handleLogout}
                    >Logout</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
