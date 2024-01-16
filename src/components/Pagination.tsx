import { cn } from "@/lib/utils";
import { JobFilterValues } from "@/lib/validation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues;
  page: number;
}

const Pagination = ({
  currentPage,
  page,
  totalPages,
  filterValues: { q, type, location, remote },
}: PaginationProps) => {
  function generateLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex items-center justify-between">
      <Link
        href={generateLink(currentPage - 1)}
        className={cn(
          "flex cursor-pointer items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generateLink(currentPage + 1)}
        className={cn(
          "flex cursor-pointer items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next Page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default Pagination;
