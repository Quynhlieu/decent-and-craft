import {Avatar, Box, Grid, Pagination, Rating, Stack, Typography} from "@mui/material";
import React, {useState} from "react";
import {grey} from "@mui/material/colors";
import {ReviewItem} from "./Review.txs.tsx";
import {IReview} from "../interfaces/IProductDescription.ts";

interface Pagination {
    count: number;
}

export const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    function next() {
        setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
    }

    function prev() {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    }

    function jump(page) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
    }

    return {next, prev, jump, currentData, currentPage, maxPage};
}


export default function MyPagination(prop: { data:IReview[] }) {
    const {data} = prop;
    const PER_PAGE = 2;
    const [page, setPage] = useState(1);
    const count = Math.ceil(data.length / PER_PAGE);
    const _DATA = usePagination(data, PER_PAGE);

    // current page
    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p)
    }

    return (
        <Box>
            {_DATA.currentData().map((reviewData, index) => (
                <ReviewItem key={index} reviewData={reviewData}/>
            ))}
            <Stack alignItems="center" spacing={2}>
                <Pagination count={count} page={page} variant="outlined" shape="rounded" onChange={handleChange}/>
            </Stack>
        </Box>

    );
}