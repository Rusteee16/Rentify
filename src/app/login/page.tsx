'use client';

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Login(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
      });
    const [buttonDisabled, SetButtonDisabled] = useState(false);

    const [ loading, SetLoading] = useState(false);

    const OnLogin = async () => {
        try {
          SetLoading(true);
          console.log(user);
          const response = await axios.post("/api/login", user);
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
                <h2 className=' text-6xl font-bold text-purple-700 text-center my-10'>Login</h2>
                
                <label className="input input-bordered flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" onChange={(e) => setUser({...user, email: e.target.value})} className="grow" placeholder="Email" />
                </label>
                
                <label className="input input-bordered flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                        <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                    </svg>
                    <input type="password" onChange={(e) => setUser({...user, password: e.target.value})} className="grow" placeholder="Password" />
                </label>
                
                <Link href="/register">Not Registered?</Link>
            <div className="form-control mt-6">
              {loading ? <span className="loading loading-spinner text-primary self-center"></span> : 
              <button onClick={OnLogin} className="btn bg-purple-700 text-white hover:text-purple-700">{buttonDisabled ? "Enter Details" : "Login"}</button>}
            </div>
            </div>
        </main>
    )
}