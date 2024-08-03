"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/sendverifymail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="w-full max-w-md p-6 bg-gallery border-2 border-gulfStream rounded-lg shadow-lg mt-52">
      <h2 className="text-4xl font-bold text-gulfStream text-center mb-8">
        Verify Email
      </h2>
      <h3 className="text-violet-600 text-center mb-4 overflow-hidden overflow-ellipsis">
        {token ? `${token}` : "No Token"}
      </h3>
      {verified && (
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-emerald-500 mr-2">Email Verified</h3>
          <Link href="/login" className="text-gulfStream underline">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div className="text-center">
          <h2 className="text-rose-600">Error</h2>
        </div>
      )}
    </div>
  );
}
