import React from "react";
import "./style.scss";
import { IPagination } from "../../common/Types";

const Pagination: React.FC<IPagination> = ({ page, setPage, totalPages }) => {
  return (
    <>
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        back
      </button>
      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        next
      </button>
    </>
  );
};

export default Pagination;
