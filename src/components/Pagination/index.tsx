import React from "react";
import { IPagination } from "../../common/Types";
import TSButton from "../TSButton";
import "./style.scss";

const Pagination: React.FC<IPagination> = ({ page, totalPages, onClick }) => {
  return (
    <>
      <TSButton
        label="Prev"
        disabled={page === 0}
        onClick={() => onClick(-1)}
      />
      <TSButton
        label="Next"
        disabled={page === totalPages}
        onClick={() => onClick(1)}
      />
    </>
  );
};

export default Pagination;
