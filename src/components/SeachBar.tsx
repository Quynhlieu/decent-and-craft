import styled from '@emotion/styled';
import { alpha, Box, InputBase } from '@mui/material';
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";
const SeachBar = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            marginX: 3,
            border: "1px solid rgba(0,0,0,0.3)",
            borderRadius: 2,
            paddingX: 2,
            paddingY: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }} >
            <SearchIcon sx={{ mr: 2 }} onClick={() => {
                navigate("/search")
            }} />
            <InputBase sx={{ width: 300 }} placeholder='Bạn cần tìm gì?' />
        </Box>
    )
}

export default SeachBar