import Navbar from "../components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";

const inter = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Task Trek",
  description: "Pratik Lande",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/next.svg" />
      </head>
      <body className={`relative overflow-x-hidden ${inter.className}`}>
        <p className=" h-[100vh]  text-[90vh] flex justify-center bg-gradient-to-b from-purple-500 to-purple-100 bg-clip-text text-transparent items-center w-full -z-10 absolute">
          Task
        </p>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
