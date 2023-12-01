"use client";

import Input from '@/components/Input';
import FormHeader from '@/components/FormHeader';
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button';
import Link from 'next/link';
import SwitchAccount from '@/components/SwitchAccount';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/context/ToastContext';



const SignupPage = () => {
    const router = useRouter();
    const [user,setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    // const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // toast
    const { triggerToast } = useToast();

    const handleSignup = async (e)=>{
        console.log("submit2")
        e.preventDefault();
        console.log("submit")
        try {
            setLoading(true);
           const response = await fetch("/api/users/signup",{
            method: "POST",
            body: JSON.stringify({
                username: user.username,
                email: user.email,
                password: user.password
            }),
           });
           console.log("after processing...")
           console.log("Signup success", response);
           
           if(response.ok){
           triggerToast("Sign up complete","success");
            router.push("/login");
           
           }
        // i think going to login and coming back to signup page
        //  causes the problem of not registering another user
        } catch (error) {
            // toast.error(error.message);
            console.log("Signup failed, "+error);
        } finally{
            setLoading(false);
        }
    }

  return (
    <section className="login-section">
      <div className="loginContainer">
        
          <form onSubmit={handleSignup} className='form'> 
            <FormHeader title="Member Sign Up"/>
            
            <div className="form-body">
                <Input
                 type="text"
                 name="username"
                 id="username"
                 placeholder="User Name"
                 onChange = {(e)=>setUser({...user, username:e.target.value})}
                 value={user.username}
                />
                <Input
                 type="email"
                 name="email"
                 id="email"
                 placeholder="Email"
                 onChange = {(e)=>setUser({...user, email:e.target.value})}
                 value={user.email}
                />
                 <Input
                 type="password"
                 name="pass"
                 id="pass"
                 placeholder="Password"
                 onChange = {(e)=>setUser({...user, password:e.target.value})}
                 value={user.password}
                />
                <Button 
                
                title= {!loading?"Sign up":"Processing..."}
                // onClick = {handleSignup}
                type="submit"
                />
            </div>
            <div className="form-footer">
                <SwitchAccount 
                text={"Already"}
                src={"/login"}
                linkText={"Login"}
                />
            </div>
          </form>
            
        </div>
    </section>
  )
}

export default SignupPage