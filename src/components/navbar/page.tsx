import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
export default function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const checkAuth = async () => {
    const response = await axios.get("/api/authcheck");
    setIsAuthenticated(response.data.isAuthenticated);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <nav className="bg-ebonyClay text-gallery p-4 fixed w-full top-0 left-0 border-b border-b-tuna z-10">
      <div className="justify-between flex flex-row mx-48">
        <Link href={"/"} className="font-kavoon font-extrabold text-3xl">
          Rentify
        </Link>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-2 font-rajdhani font-semibold text-xl border-2 border-gulfStream rounded-md hover:bg-gulfStream hover:font-extrabold"
          >
            Logout
          </button>
        ) : (
          <Link
            href={"/login"}
            className="px-2 font-rajdhani font-semibold text-xl border-2 border-gulfStream rounded-md hover:bg-gulfStream hover:font-extrabold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
