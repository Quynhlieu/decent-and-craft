import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ReviewItem } from "./Review.tsx";
import { IReview } from "../../interfaces/IProductDescription.ts";

interface Pagination {
    count: number;
}

export const usePagination = (data:IReview[], itemsPerPage:number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = data && Math.ceil(data.length / itemsPerPage);

    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data && data.slice(begin, end);
    }

    function next() {
        setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
    }

    function prev() {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    }

    function jump(page:number) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(() => Math.min(pageNumber, maxPage));
    }

    return {next, prev, jump, currentData, currentPage, maxPage};
}


export default function MyPagination(prop: { data:IReview[] }) {
    const {data} = prop;
    const PER_PAGE = 10;
    const [page, setPage] = useState(1);
    const count = data && Math.ceil(data.length / PER_PAGE);
    const _DATA = usePagination(data, PER_PAGE);

    // current page
    const handleChange = (_e:unknown, p:number) => {
        setPage(p);
        _DATA.jump(p)
    }

    const showNoResult = () => {

        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" my={10}>
                <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/shoprating/7d900d4dc402db5304b2.png" />
                <Typography>Chưa có đánh giá</Typography>
            </Box>
        );
    }
    return (
        <Box>
             {_DATA.currentData() && _DATA.currentData().length === 0 ? (
                showNoResult()
            ) : (
                <>
                    {_DATA.currentData().map((reviewData: IReview, index: number) => (
                        <ReviewItem key={index} reviewData={reviewData} />
                    ))}
                    <Stack alignItems="center" spacing={2}>
                        <Pagination count={count} page={page} variant="outlined" shape="rounded" onChange={handleChange} />
                    </Stack>
                </>
            )}
        </Box>

    );
}