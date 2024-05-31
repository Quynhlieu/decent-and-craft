import React from 'react'
import UserProfile from "../components/UserProfile.tsx";
import { Box } from "@mui/material";
import UserSpeedDial from "../components/UserSpeedDial.tsx";
import Header from "../components/Header.tsx";
import Carousel from "../components/Carousel.tsx";
import ProductSection from "../components/ProductSection.tsx";
import MyOrder from "../components/MyOrder.tsx";

const User = () => {
    return (
        <Box sx={{ paddingX: 20 }}>
            {/*<Header/>*/}
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ flex: 2, padding: '16px' }}>
                    <UserSpeedDial />
                </Box>
                <Box sx={{ flex: 10, padding: '16px' }}>
                    <MyOrder />
                </Box>
            </Box>
            <ProductSection />
        </Box>

    )
}

export default User