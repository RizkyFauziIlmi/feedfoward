"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useWindowLocation from "@/hooks/use-window-location";
import { redirect, useRouter, useSearchParams } from "next/navigation";

interface ExplorePaginationProps {
  totalPages: number;
}

export const ExplorePagination = ({ totalPages }: ExplorePaginationProps) => {
  const location = useWindowLocation();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const getPageUrl = (page: number) => {
    const url = new URL(location ?? "http://localhost:3000/explore");
    const params = new URLSearchParams();
    params.set("search", searchParams.get("search") || "");
    params.set(
      "organizationType",
      searchParams.get("organizationType") || "all"
    );
    params.set("sort", searchParams.get("sort") || "");
    params.set("from", searchParams.get("from") || "");
    params.set("to", searchParams.get("to") || "");
    params.set("page", page.toString());
    url.search = params.toString();
    return url.toString();
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (currentPage > totalPages || currentPage < 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={!isFirstPage ? getPageUrl(currentPage - 1) : undefined}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={getPageUrl(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href={getPageUrl(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage !== 1 && currentPage !== totalPages && (
          <PaginationItem>
            <PaginationLink href={getPageUrl(currentPage)} isActive={true}>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href={getPageUrl(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              href={getPageUrl(totalPages)}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href={!isLastPage ? getPageUrl(currentPage + 1) : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
