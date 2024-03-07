"use client";

import { GoGear, GoOrganization } from "react-icons/go";
import { Button } from "../ui/button";
import { RxDashboard } from "react-icons/rx";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GiPayMoney } from "react-icons/gi";
import { CiCalendar, CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const SidebarContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const routeName = pathname.replace("/", "").split("/")[0];

  return (
    <div className="mt-6 px-3">
      <div>
        <p className="leading-7 uppercase text-xs text-muted-foreground mb-2">
          MAIN MENU
        </p>
        <div className="flex flex-col gap-3 -ml-4">
          <Button
            variant={"ghost"}
            className={cn(
              routeName === "dashboard"
                ? "text-primary"
                : "text-muted-foreground",
              "w-full justify-start"
            )}
            onClick={() => router.push("/dashboard")}
          >
            <RxDashboard className="w-4 h-4 mr-2" /> Dashboard
          </Button>
          <Button
            variant={"ghost"}
            className={cn(
              routeName === "organization"
                ? "text-primary"
                : "text-muted-foreground",
              "w-full justify-start"
            )}
            onClick={() => router.push("/organization")}
          >
            <GoOrganization className="w-4 h-4 mr-2" /> Organization
          </Button>
          <Button
            variant={"ghost"}
            className={cn(
              routeName === "event" ? "text-primary" : "text-muted-foreground",
              "w-full justify-start"
            )}
            onClick={() => router.push("/event")}
          >
            <CiCalendar className="w-4 h-4 mr-2" /> Event
          </Button>
          <Button
            variant={"ghost"}
            className={cn(
              routeName === "search-by-location"
                ? "text-primary"
                : "text-muted-foreground",
              "w-full justify-start"
            )}
            onClick={() => router.push("/search-by-location")}
          >
            <CiLocationOn className="w-4 h-4 mr-2" />
            Search by Location
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <p className="leading-7 uppercase text-xs text-muted-foreground mb-2">
          ACCOUNT CENTER
        </p>
        <div className="flex flex-col gap-3 -ml-4">
          <Button
            variant={"ghost"}
            className={cn(
              routeName === "" ? "text-primary" : "text-muted-foreground",
              "w-full justify-start"
            )}
          >
            <GoGear className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button
            variant={"ghost"}
            className={cn(
              routeName === "" ? "text-primary" : "text-muted-foreground",
              "w-full justify-start"
            )}
          >
            <IoIosHelpCircleOutline className="w-4 h-4 mr-2" /> Help Center
          </Button>
        </div>
      </div>
    </div>
  );
};
