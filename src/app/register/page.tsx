'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Register = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        password: "",
        type: "",
      });
    const [buttonDisabled, SetButtonDisabled] = useState(false);

    const [ loading, SetLoading] = useState(false);

    const OnSignUp = async () => {
        try {
          SetLoading(true);
          console.log("Frontend -->",user);
          const response = await axios.post("/api/register", user);
          console.log("Success", response.data);
          toast.success(response.data.message);
          router.push("login")
          
        } catch (error: any) {
          toast.error(error.message);
        } finally {
          SetLoading(false)
        }
      }
    
      useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
          SetButtonDisabled(false);
        } else{
          SetButtonDisabled(true);
        }
      }, [user]);
      
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto w-full max-w-md p-4 md:-mt-32 border-2 border-purple-700 rounded-md">
                <h2 className=' text-6xl font-bold text-purple-700 text-center my-10'>Register</h2>
                <label className="input input-bordered flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" onChange={(e) => setUser({...user, fname: e.target.value})} className="grow" placeholder="First Name" />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" onChange={(e) => setUser({...user, lname: e.target.value})} className="grow" placeholder="Last Name" />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" onChange={(e) => setUser({...user, email: e.target.value})} className="grow" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-2">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#dcdbdb" className="w-4 h-4 opacity-70">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z" fill="#d5d6d7"/>
                        </g>
                    </svg>
                    <input type="text" onChange={(e) => setUser({...user, mobile: e.target.value})} className="grow" placeholder="Mobile No." />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                        <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                    </svg>
                    <input type="password" onChange={(e) => setUser({...user, password: e.target.value})} className="grow" placeholder="Password" />
                </label>
                <select onChange={(e) => setUser({...user, type:e.target.value})} className="select select-bordered w-full mb-2 p-2 text-lg">
                    <option disabled selected>Select User Type</option>
                    <option value="seller" className='p-2 '>Seller</option>
                    <option value="buyer" className='p-2'>Buyer</option>
                </select>
                <Link href="/login">Login</Link>
            <div className="form-control mt-6">
              {loading ? <span className="loading loading-spinner text-primary self-center"></span> : 
              <button onClick={OnSignUp} className="btn btn-primary">{buttonDisabled ? "Enter Details" : "Register"}</button>}
            </div>
            </div>
        </main>
    );
}

export default Register;