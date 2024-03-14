import { MdSearchOff } from "react-icons/md";

export const FilterNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <MdSearchOff className="w-12 h-12 mb-2" />
      <h1 className="text-lg font-semibold">No organizations found</h1>
      <p className="text-sm text-muted-foreground">
        We couldn't find any organizations that match your search. Please try
        again with a different keyword.
      </p>
    </div>
  );
};
