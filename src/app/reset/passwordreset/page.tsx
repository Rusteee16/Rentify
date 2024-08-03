"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { toast } from "react-toastify";

export default function PasswordReset() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    token: "",
  });
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/passwordreset", user);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setUser({ ...user, token: urlToken || "" });
  }, []);

  return (
    <div className="w-full max-w-md p-6 bg-gallery border-2 border-gulfStream rounded-lg shadow-lg mt-52">
      <h2 className="text-4xl font-bold text-gulfStream text-center mb-8">
        Reset Password
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-tuna mb-2">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-3 py-2 text-tuna bg-gallery border border-tuna rounded-md shadow-sm focus:outline-none focus:ring-gulfStream focus:border-gulfStream"
            placeholder="Email"
          />
          <MdEmail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tuna opacity-70" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-tuna mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-3 py-2 text-tuna bg-gallery border border-tuna rounded-md shadow-sm focus:outline-none focus:ring-gulfStream focus:border-gulfStream"
            placeholder="Password"
          />
          <MdLock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tuna opacity-70" />
        </div>
      </div>

      <div className="text-center">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader border-t-transparent border-4 border-gulfStream rounded-full w-8 h-8 animate-spin"></div>
          </div>
        ) : (
          <button
            type="submit"
            onClick={() => resetPassword()}
            className={`w-full px-4 py-2 font-semibold text-gallery bg-gulfStream rounded-md shadow-sm hover:bg-tuna focus:outline-none focus:ring-2 focus:ring-gulfStream`}
          >
            Reset Password
          </button>
        )}
      </div>
    </div>
  );
}
