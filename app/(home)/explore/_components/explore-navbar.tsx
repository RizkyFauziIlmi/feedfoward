"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useDebounceValue } from "usehooks-ts";

export const ExploreNavbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [organizationType, setOrganizationType] = useState(
    searchParams.get("organizationType") || "all"
  );
  const [sortingMethod, setSortingMethod] = useState(
    searchParams.get("sort") || ""
  );
  const page = parseInt(searchParams.get("page") as string) || 1;
  const [debouncedSearch, setValue] = useDebounceValue(
    searchParams.get("search") || "",
    500
  );

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputvalue = e.target.value;
    setValue(inputvalue);
  };

  const handleSelectOrganizationType = (type: string) => {
    setOrganizationType(type);
  };

  const handleSelectSotringMethod = (method: string) => {
    setSortingMethod(method);
  };

  useEffect(() => {
    router.push(
      `/explore?search=${debouncedSearch}&organizationType=${organizationType}&sort=${sortingMethod}&from=${
        date?.from !== undefined ? format(date?.from, "yyyy-MM-dd") : ""
      }&to=${
        date?.to !== undefined ? format(date?.to, "yyyy-MM-dd") : ""
      }&page=${page}`
    );
  }, [debouncedSearch, organizationType, date, sortingMethod]);

  return (
    <div className="flex w-full md:justify-between flex-wrap">
      <div className="flex items-center flex-wrap md:flex-nowrap gap-3">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Organization Type
          </p>
          <Select
            onValueChange={handleSelectOrganizationType}
            defaultValue={organizationType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Organization Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="restaurant">Restaurant</SelectItem>
              <SelectItem value="hotel">Hotel</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Event Date Range</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Sort By</p>
          <Select
            onValueChange={handleSelectSotringMethod}
            defaultValue={sortingMethod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Sorting Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="last-updated">Last Updated</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-end gap-2">
        <Input
          placeholder="Search Organization/Event"
          className="max-w-2xl"
          defaultValue={debouncedSearch || ""}
          onChange={handleInputSearch}
        />
      </div>
    </div>
  );
};
