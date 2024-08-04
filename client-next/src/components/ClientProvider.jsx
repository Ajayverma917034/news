"use client"; 
import Navbar from "@/components/header/Navbar";

export default function ClientProvider({ children }) {
  return (
    <>
    <Navbar />
    
    {children}
    </>
  );
}
