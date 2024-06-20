"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "@/helpers/registerSchema";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdPerson, MdEmail, MdLock, MdPhone } from "react-icons/md";
import NavBar from "@/components/navbar/page";

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/register", data);
      toast.success(response.data.message, { position: "top-center" });
      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred during registration.",
        { position: "top-center" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-ebonyClay">
      <NavBar />
      <ToastContainer />
      <div className="relative font-rajdhani mx-auto w-full max-w-md p-6 bg-gallery border-2 border-gulfStream rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gulfStream text-center my-8">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-tuna mb-2">
            <div className="relative">
              <MdPerson className="absolute left-2 top-2 w-6 h-6 text-tuna opacity-70" />
              <input
                type="text"
                {...register("fname")}
                className="w-full pl-10 pr-3 py-2 text-tuna bg-gallery border border-tuna rounded-md focus:outline-none focus:ring-gulfStream focus:border-gulfStream"
                placeholder="First Name"
              />
            </div>
            <p className="text-red-500 text-sm mt-1">{errors.fname?.message}</p>
          </label>

          <label className="block text-tuna mb-2">
            <div className="relative">
              <MdPerson className="absolute left-2 top-2 w-6 h-6 text-tuna opacity-70" />
              <input
                type="text"
                {...register("lname")}
                className="w-full pl-10 pr-3 py-2 text-tuna bg-gallery border border-tuna rounded-md focus:outline-none focus:ring-gulfStream focus:border-gulfStream"
                placeholder="Last Name"
              />
            </div>
            <p className="text-red-500 text-sm mt-1">{errors.lname?.message}</p>
          </label>

          <label className="block text-tuna mb-2">
            <div className="relative">
              <MdEmail className="absolute left-2 top-2 w-6 h-6 text-tuna opacity-70" />
              <input
                type="text"
                {...register("email")}
                className="w-full pl-10 pr-3 py-2 text-tuna bg-gallery border border-tuna rounded-md focus:outline-none focus:ring-gulfStream focus:border-gulfStream"
                placeholder="Email"
              />
            </div>
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </label>

          <label className="block text-tuna mb-2">
            <div className="relative">
              <MdPhone className="absolute left-2 top-2 w-6 h-6 text-tuna opacity-70" />
              <input
                type="text"
                {...register("mobile")}
                className="w-full pl-10 pr-3 py-2 text-tuna bg-gallery border border-tuna rounded-md focus:outline-none focus:ring-gulfStream focus:border-gulfStream"
                placeholder="Mobile No."
              />
            </div>
            <p className="text-red-500 text-sm mt-1">
              {errors.mobile?.message}
            </p>
          </label>

          <label className="block text-tuna mb-4">
            <div className="relative">
              <MdLock className="absolute left-2 top-2 w-6 h-6 text-tuna opacity-70" />
              <input
                type="password"
                {...register("password")}
                className="w-full pl-10 pr-3 py-2 text-tuna bg-gallery border border-tuna rounded-md focus:outline-none focus:ring-gulfStream focus:border-gulfStream"
                placeholder="Password"
              />
            </div>
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </label>

          <label className="block text-tuna mb-4">
            <select
              {...register("type")}
              className="w-full px-3 py-2 text-tuna bg-gallery border border-tuna rounded-md focus:outline-none focus:ring-gulfStream focus:border-gulfStream"
            >
              <option value="" disabled selected>
                Select User Type
              </option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            <p className="text-red-500 text-sm mt-1">{errors.type?.message}</p>
          </label>

          <Link
            href="/login"
            className="text-sm text-gulfStream hover:underline block text-center mb-4"
          >
            Already have an account? Login
          </Link>

          <div className="text-center">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="loader border-t-transparent border-4 border-gulfStream rounded-full w-8 h-8 animate-spin"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-gallery bg-gulfStream rounded-md shadow-sm hover:bg-tuna focus:outline-none focus:ring-2 focus:ring-gulfStream"
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
