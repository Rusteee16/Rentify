import NavBar from "@/components/navbar/page";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col items-center justify-center min-h-screen bg-ebonyClay">
          <NavBar />
          <ToastContainer position="top-center" autoClose={3000} />
          {children}
          <footer className="bg-tuna text-gallery p-4 text-center mt-auto">
            <p className="font-rajdhani font-semibold text-lg">
              © 2024 Rentify. All rights reserved.
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
