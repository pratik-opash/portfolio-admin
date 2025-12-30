import React from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center justify-end gap-3 p-4", className)}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-stroke hover:bg-gray-100 disabled:opacity-50 dark:border-dark-3 dark:hover:bg-dark-2"
      >
        &lt;
      </button>

      <div className="flex gap-2">
        {pages.map((page) => {
           // Simple truncation logic could be added here for many pages
           if (
             page === 1 ||
             page === totalPages ||
             (page >= currentPage - 1 && page <= currentPage + 1)
           ) {
             return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md border border-stroke text-sm hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2",
                  currentPage === page &&
                    "bg-primary text-white border-primary hover:bg-primary dark:border-primary dark:hover:bg-primary"
                )}
              >
                {page}
              </button>
             );
           } else if (
             page === currentPage - 2 ||
             page === currentPage + 2
           ) {
             return <span key={page} className="self-end px-1">...</span>;
           }
           return null;
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-stroke hover:bg-gray-100 disabled:opacity-50 dark:border-dark-3 dark:hover:bg-dark-2"
      >
        &gt;
      </button>
    </div>
  );
}
