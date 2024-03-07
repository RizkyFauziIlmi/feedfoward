import { CiStreamOn } from "react-icons/ci"
import { Badge } from "../ui/badge"

export const LiveBadge = () => {
    return(
        <Badge className="bg-green-500">
            <CiStreamOn className="w-4 h-4 mr-2 animate-pulse text-destructive"/> On Going
        </Badge>
    )
}