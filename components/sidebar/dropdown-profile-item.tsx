"use client";

import { signOut } from "next-auth/react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { BsDoorOpen } from "react-icons/bs";
import { GoMoon, GoSun } from "react-icons/go";
import { useTheme } from "next-themes";

export const DropdownProfileItem = () => {
  const { setTheme, theme } = useTheme();

  const logout = async () => {
    await signOut();
  };

  const isDark = theme === "dark";

  return (
    <>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={() => setTheme(isDark ? "light" : "dark")}>
        {isDark ? (
          <GoMoon className="w-4 h-4 mr-2" />
        ) : (
          <GoSun className="w-4 h-4 mr-2" />
        )}
        {isDark ? "Dark" : "Light"}
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={logout}>
        <BsDoorOpen className="w-4 h-4 mr-2" /> Logout
      </DropdownMenuItem>
    </>
  );
};
