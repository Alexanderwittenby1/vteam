"use client";
import LoginForm from "./LoginForm";
import Navbar from '@/components/Navbar';
import "bootstrap/dist/css/bootstrap.css";

export default function register() {
  return (
    <div>
      <Navbar />
    <div>
      <LoginForm />
    </div>
    </div>
  );
}
