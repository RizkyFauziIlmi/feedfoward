import { cn } from "@/lib/utils";
import { IoTicketOutline } from "react-icons/io5";

interface EventNotFoundProps {
  className?: string;
  isOwner: boolean;
}

export const EventNotFound = ({ className, isOwner }: EventNotFoundProps) => {
  return (
    <div className={cn("flex flex-col justify-center items-center my-28", className)}>
      <IoTicketOutline className="w-12 h-12 mb-2" />
      <h1 className="text-lg font-semibold">Event Not Found</h1>
      <p className="text-sm text-muted-foreground text-center">
        The event you are looking for is not found. Please try again or
        {isOwner
          ? " create a new event"
          : " wait the owner of this organization upload event"}
        .
      </p>
    </div>
  );
};
