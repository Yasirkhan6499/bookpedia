"use client";

import Button from '@/components/Button'
import FormHeader from '@/components/FormHeader'
import Input from '@/components/Input'
import { useToast } from '@/context/ToastContext';
import axios from 'axios';
import React, { useState } from 'react'


const Contact = () => {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const { triggerToast } = useToast(); 

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission

    const formData = {
      name,
      email,
      message: msg,
    };

    try{
      console.log(name,email,msg);
      const res = await axios.post("/api/contact", formData);

      if(res.data.success){
        triggerToast("Message Sent!","success")
        setName("");
        setEmail("");
        setMsg("");
      }
    } catch(error){
      triggerToast("Message Couldn't sent!","error");
      console.log("Contact Form couldnt sent",error);
    }

  }

  return (
    <section className="login-section">
      <div className="loginContainer">
        
          <form  className='form' onSubmit={handleSubmit}> 
            <FormHeader title="Contact Us"/>
            
            <div className="form-body">
                <Input
                 type="text"
                 name="username"
                 id="username"
                 placeholder="Your Name"
                 onChange = {(e)=>setName(e.currentTarget.value)}
                 value={name}
                />
                <Input
                 type="email"
                 name="email"
                 id="email"
                 placeholder="Email"
                 onChange = {(e)=>setEmail(e.currentTarget.value)}
                 value={email}
                />
                 <textarea
                  id="description"
                  placeholder="Comments/Questions"
                  className="p-2 mt-1 border rounded-md w-full"
                  rows="5"
                  onChange = {(e)=>setMsg(e.currentTarget.value)}
                  value={msg}
                ></textarea>

                <Button
                title= {"Contact"}
                // onClick = {handleSignup}
                type="submit"
                
                />
            </div>
            <div className="form-footer">
                {/* <SwitchAccount 
                text={"Already"}
                src={"/login"}
                linkText={"Login"}
                /> */}
            </div>
          </form>
            
        </div>
    </section>
  )
}

export default Contact