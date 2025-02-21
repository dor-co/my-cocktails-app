import React from "react";
import "./style.scss";
import { IPagination } from "../../common/Types";
import TSButton from "../TSButton";

const Pagination: React.FC<IPagination> = ({ page, setPage, totalPages }) => {
  return (
    <>
      <TSButton
        label="Prev"
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
      />
      <TSButton
        label="Next"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      />
    </>
  );
};

export default Pagination;
