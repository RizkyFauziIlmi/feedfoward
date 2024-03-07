"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface HeaderFormProps {
  title: string;
  routeParentName: string;
  routeName: string;
  backLink: string;
}

export const HeaderForm = ({
  routeName,
  routeParentName,
  title,
  backLink,
}: HeaderFormProps) => {
  const router = useRouter();

  return (
    <>
      <div className="p-6">
        <p className="text-sm text-muted-foreground">
          <Button
            variant={"link"}
            onClick={() => router.push(`${backLink}`)}
            className="text-primary p-0 pr-2"
          >
            {routeParentName}
          </Button>
          <span>/ {routeName}</span>
        </p>
        <p className="text-xl mt-6">{title}</p>
      </div>
      <Separator />
    </>
  );
};
