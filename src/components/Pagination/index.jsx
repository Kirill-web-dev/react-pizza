import React from "react";
import ReactPaginate from "react-paginate";

import Styles from "./Pagination.module.scss";

export default function Pagination({ onChangePage }) {
    return (
        <ReactPaginate
            className={Styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={3}
            renderOnZeroPageCount={null}
        />
    );
}
