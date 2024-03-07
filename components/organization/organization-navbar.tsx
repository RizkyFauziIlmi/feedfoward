"use client";

import { MdOutlineAddBusiness } from "react-icons/md";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export const OrganizationNavbar = () => {
  const router = useRouter();

  return (
    <div className="p-6 flex gap-4">
      <Input placeholder="search organization" />
      <Button onClick={() => router.push("/organization/new-organization")}>
        <MdOutlineAddBusiness className="w-4 h-4 mr-2" />
        Add Organization
      </Button>
    </div>
  );
};
