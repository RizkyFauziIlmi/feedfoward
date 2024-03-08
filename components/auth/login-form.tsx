"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FaDiscord, FaGithub, FaGoogle, FaLock } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { GrIntegration, GrSecure } from "react-icons/gr";
import { Separator } from "../ui/separator";

export const LoginForm = () => {
  const login = async (provider: "github" | "google" | "discord") => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex h-full justify-center">
      <div className="flex flex-col items-center w-full mt-10 md:mt-16">
        <div className="md:w-1/3 text-center">
          <h2 className="scroll-m-20 pb-2 text-xl md:text-3xl font-semibold tracking-tight first:mt-0">
            Login to Your Account
          </h2>
          <p className="text-md md:text-lg text-muted-foreground">
            Login to your account to access all features.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-16 my-6 md:mt-12">
          <div className="flex flex-col gap-8">
            <Button size={"lg"} variant={"secondary"} disabled>
              <GrSecure className="h-4 w-4 mr-3" />
              Secure Data Managment
            </Button>
            <Button size={"lg"} variant={"secondary"} disabled>
              <GrIntegration className="h-4 w-4 mr-3" />
              Third Application Integration
            </Button>
            <Button size={"lg"} variant={"secondary"} disabled>
              <GiClick className="h-4 w-4 mr-3" />
              Just One Click Login
            </Button>
          </div>
          <Separator orientation="vertical" className="h-12 md:h-full" />
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => login("github")}
              variant={"outline"}
              size={"lg"}
            >
              <FaGithub className="h-4 w-4 mr-3" />
              Sign in with Github
            </Button>
            <Button
              onClick={() => login("google")}
              variant={"outline"}
              size={"lg"}
            >
              <FaGoogle className="h-4 w-4 mr-3" />
              Sign in with Google
            </Button>
            <Button
              onClick={() => login("discord")}
              variant={"outline"}
              size={"lg"}
            >
              <FaDiscord className="h-4 w-4 mr-3" />
              Sign in with Discord
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
