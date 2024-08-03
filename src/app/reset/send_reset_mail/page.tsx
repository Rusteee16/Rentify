"use client";

import axios from "axios";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";

export default function SendVerifyMail() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const checkEmail = async (email: string) => {
    try {
      setLoading(true);
      console.log(email);

      const response = await axios.post("/api/sendresetmail", { email });
      toast.success(response.data.message);
      setEmail("");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-gallery border-2 border-gulfStream rounded-lg shadow-lg mt-52">
      <h2 className="text-4xl font-bold text-gulfStream text-center mb-8">
        Change Password
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-tuna mb-2">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-tuna bg-gallery border border-tuna rounded-md shadow-sm focus:outline-none focus:ring-gulfStream focus:border-gulfStream"
            placeholder="Email"
          />
          <MdEmail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tuna opacity-70" />
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
            onClick={() => checkEmail(email)}
            className={`w-full px-4 py-2 font-semibold text-gallery bg-gulfStream rounded-md shadow-sm hover:bg-tuna focus:outline-none focus:ring-2 focus:ring-gulfStream `}
          >
            Send Email
          </button>
        )}
      </div>
    </div>
  );
}
