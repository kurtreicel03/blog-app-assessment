import Button from "./Button";

import React from "react";

type PaginationProps = {
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPage,
  setPage,
}) => {
  const pagination = (
    <nav className="flex justify-center space-x-2 mt-4">
      <Button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`m-1.5 rounded-full text-l border-2 py-1 px-2 text-indigo-500 ${
          page === 1 && "disabled:opacity-50 disabled:cursor-not-allowed"
        }`}
      >
        Prev
      </Button>
      <div>
        {page} of {totalPage}
      </div>
      <Button
        disabled={page === totalPage}
        onClick={() => setPage(page + 1)}
        className={`m-1.5 rounded-full text-l border-2 py-1 px-2 text-indigo-500 ${
          page === totalPage &&
          "disabled:opacity-50 disabled:cursor-not-allowed"
        }`}
      >
        Next
      </Button>
    </nav>
  );

  return totalPage > 0 ? pagination : <></>;
};

export default Pagination;
