import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { MdMenu } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import logoImage from "@/public/logo.png";
import { SidebarContent } from "./sidebar-content";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SidebarProfile } from "./sidebar-profile";

export const MobileSidebar = async () => {
  const user = await useCurrentUser();

  return (
    <div className="w-full flex justify-between p-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <MdMenu className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="h-full flex flex-col justify-between w-fit pr-12"
        >
          <SidebarContent />
          <SidebarProfile user={user} />
        </SheetContent>
      </Sheet>
      <Link href={"/"} className="cursor-point flex items-center gap-2">
        <Image src={logoImage} alt="logo" width={30} height={30} />
        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Feedfoward
        </h4>
      </Link>
    </div>
  );
};
