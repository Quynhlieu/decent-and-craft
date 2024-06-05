import {Pagination, Stack} from "@mui/material";

interface Pagination {
    count: number;

}

export default function PaginationRounded(pagination: Pagination) {
    return (
        <Stack spacing={2}>
            <Pagination count={pagination.count} variant="outlined" shape="rounded" />
        </Stack>
    );
}