import { GiCardboardBoxClosed } from "react-icons/gi";

interface ItemNotFoundProps {
  isOwner: boolean;
}

export const ItemNotFound = ({ isOwner }: ItemNotFoundProps) => {
  return (
    <div className="flex flex-col justify-center items-center my-28">
      <GiCardboardBoxClosed className="w-12 h-12 mb-2" />
      <h1 className="text-lg font-semibold">Item Not Found</h1>
      <p className="text-sm text-muted-foreground">
        The item you are looking for is not found. Please try again or
        {isOwner
          ? " create a new item"
          : " wait the owner of this event upload item"}
        .
      </p>
    </div>
  );
};
