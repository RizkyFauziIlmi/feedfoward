import { CiStreamOff } from "react-icons/ci";
import { Badge } from "../ui/badge";

export const OverBadge = () => {
  return (
    <Badge>
      <CiStreamOff className="w-4 h-4 mr-2" /> Is Over
    </Badge>
  );
};
