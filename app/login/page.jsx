"use client";

import React, { useState } from 'react'
import Input from '@/components/Input';
import FormHeader from '@/components/FormHeader';
import Button from '@/components/Button';
import SwitchAccount from '@/components/SwitchAccount';
import { useAuthContext } from '@/context/authContext';
import { getCookie } from "cookies-next";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';


const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [user,setUser] = useState({
    email: "",
    password: ""
});
const [disabledValue, setDisabledValue] = useState(false);  
// Context API (in simple words, its a global state. when we set a new "userid" to it when user logsin, then the user will have a different interface)
const {userToken, setUserToken} = useAuthContext(); 
const router = useRouter();
    
// toast
const { triggerToast } = useToast();

  const handleLogin = async (e)=>{
    e.preventDefault();
    
    try{
      setLoading(true);

      const response = await fetch("/api/users/login",{
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        password: user.password
      }),
      // credentials: 'include' // This includes cookies in the request
    });
    const responseData = await response.json();

    if(response.ok){
      // const token = response.headers.get('Set-Cookie');
      // const token = getCookie("token");
     setDisabledValue(true);
      triggerToast("Successfully Logged in!", "success");
     
      const res = await axios.get("/api/users/myprofile");
      // const resData = await res.json();
      setUserToken(res.data.data._id);
      console.log(res.data.data._id)
      // alert("Login", res.data); // cookie is null, why??
      // console.log(resData);
      router.push("/library");
    }
    else{
      triggerToast(`Login Failed,  ${responseData}`,"error");
      console.log(responseData);
    }
  }
  catch(error){
    console.log("Login failed ", error.message);
  } finally{
    setLoading(false);
  }


  }

  return (
    <section className="login-section">
    <div className="loginContainer">
      
        <form onSubmit={handleLogin} className='form relative'> 
          <FormHeader title="Member Login"/>
          
          <div className="form-body">
              
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
               forgotPass = {true}
              />
              <Button 
              
              title={!loading?"Login":"Processing..."}
              type={"submit"}
              disabled={disabledValue}
              />
          </div>
          {/* forgot password */}
          <p className='switch-acc-link border-b border-gray-400 w-[80%] text-center
          pb-4 mb-4'><Link href="/forgotPassword/emailSubmit">Forgotten Password?</Link></p>
          <div className="form-footer">

                <SwitchAccount 
                text={"Don't"}
                src={"/signup"}
                linkText="Signup"
                />
            </div>
        </form>
      </div>
  </section>
  )
}

export default LoginPage;

// export async function getServerSideProps({ req }) {
//   const token = req.getCookie("token")?.value|| ""; // Retrieve the token from cookies
//   console.log("serverProps :", token)
//   return {
//     props: {
//       token,
//     },
//   };
// }