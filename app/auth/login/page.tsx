import { LoginForm } from "@/components/auth/login-form";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="h-screen w-screen">
      <LandingNavbar />
      <LoginForm />
    </div>
  );
}
