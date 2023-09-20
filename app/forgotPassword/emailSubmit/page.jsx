"use client";

import Button from '@/components/Button';
import FormHeader from '@/components/FormHeader'
import Input from '@/components/Input'
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'

const EmailSubmition = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/users/forgotPassword/emailSubmit", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                alert("Email Sent for Verification!", data);
            } else {
                const data = await response.json();
                console.log("Error:", data);
            }
        } catch (error) {
            console.log("Sending Email Failed, ", error.message);
        }
    }

  return (
    <section className="login-section">
    <div className="loginContainer">
   
      
        <form onSubmit={handleEmailSubmit} className='form relative'> 
          <FormHeader title="Enter email to search your account."/>
          
          <div className="form-body">
              
              <Input
               type="email"
               name="email"
               id="email"
               placeholder="Email"
               onChange = {(e)=>setEmail(e.target.value)}
               value={email}
              />
              <Button 
              
              title={!loading?"Search":"Processing..."}
              type={"submit"}
              />

              <Link  href="/login">
                <p className='switch-acc-link text-center ml-10'>
                {`Back To Login`}</p></Link>
            </div>
        </form>
    </div> 
    </section> 
  )
}

export default EmailSubmition