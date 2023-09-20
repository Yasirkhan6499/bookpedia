"use client";

import Button from '@/components/Button';
import FormHeader from '@/components/FormHeader';
import Input from '@/components/Input';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [loading, setLoading] = useState(false);
    const [newPass, setNewPass] = useState("");
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [passResseted, setPassResseted] = useState(false);  

    const handleForgotPass = async (e)=>{
      e.preventDefault();

      try{
        console.log("reachedd")
        const res = await axios.post("/api/users/forgotPassword",{
          password: newPass,
          token
          })
        
        // const data = await res.json();
        if(res.status===200){
          console.log("response ok",res.data);
          setPassResseted(true);
          setVerified(false);
        }
        else{
          console.log("Error changing password")
        }
        
      } catch(error){
        console.log("password resset failed", error);
      }
    }

    const verifyUserEmail = async () =>{
      try{
        await axios.post('/api/users/verifyemail',
          {token});
          setVerified(true);
      } catch(error){
          setError(true);
          console.log(error.response.data);
      }
  }

    useEffect(()=>{
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
  }, []);

  useEffect(()=>{
      if(token.length > 0){
          verifyUserEmail();
          console.log("token :",token);
      }
  }, [token]);

  return (
    
    <section className="login-section">
      {verified && (
    <div className="loginContainer">
      
        <form onSubmit={handleForgotPass}  className='form relative'> 
          <FormHeader title="Enter New Password"/>
          
          <div className="form-body">
              
            <Input
               type="password"
               name="pass"
               id="pass"
               placeholder="New Password"
               onChange = {(e)=>setNewPass(e.target.value)}
               value={newPass}
              
              />
              <Button 
              
              title={!loading?"Submit":"Processing..."}
              type={"submit"}
              
              />

              <Link  href="/login">
                <p className='switch-acc-link text-center ml-10'>
                {`Back To Login`}</p></Link>
               

            </div>
      </form>
    </div>
      )}

      {passResseted && 
          <div>
           <h2 className="text-2xl">Your Password Has Been Resetted</h2>
            <Link href="/login" className="switch-acc-link text-center ml-40 ">
                Login Now
            </Link>
          </div>}

            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">
                        Email not verified!</h2>
                </div>
            )}

    </section>
  

  )
}

export default page;