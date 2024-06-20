"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEmail, MdLock } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NavBar from "@/components/navbar/page";

// Define validation schema using yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onLogin = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/login", data);
      toast.success(response.data.message);
      if (response.data.user === "seller") {
        router.push("/propertyform");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An error occurred while logging in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-ebonyClay">
      <NavBar />
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-full max-w-md p-6 bg-gallery border-2 border-gulfStream rounded-lg shadow-lg mt-10 md:mt-0">
        <h2 className="text-4xl font-bold text-gulfStream text-center mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit(onLogin)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-tuna mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                {...register("email")}
                className="w-full px-3 py-2 text-tuna bg-gallery border border-tuna rounded-md shadow-sm focus:outline-none focus:ring-gulfStream focus:border-gulfStream"
                placeholder="Email"
              />
              <MdEmail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tuna opacity-70" />
            </div>
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-tuna mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                {...register("password")}
                className="w-full px-3 py-2 text-tuna bg-gallery border border-tuna rounded-md shadow-sm focus:outline-none focus:ring-gulfStream focus:border-gulfStream"
                placeholder="Password"
              />
              <MdLock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tuna opacity-70" />
            </div>
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          <div className="flex flex-col justify-between text-left mb-6">
            <Link
              href="/register"
              className="text-sm text-gulfStream hover:underline"
            >
              Not Registered?
            </Link>
            {/* <Link
              href="/register"
              className="text-sm text-gulfStream hover:underline"
            >
              Forgot Password?
            </Link> */}
          </div>

          <div className="text-center">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="loader border-t-transparent border-4 border-gulfStream rounded-full w-8 h-8 animate-spin"></div>
              </div>
            ) : (
              <button
                type="submit"
                className={`w-full px-4 py-2 font-semibold text-gallery bg-gulfStream rounded-md shadow-sm hover:bg-tuna focus:outline-none focus:ring-2 focus:ring-gulfStream ${
                  !errors.email && !errors.password
                    ? ""
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
