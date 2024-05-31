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
        <Box>
            <Box sx={{ paddingX: 10 }}>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Box sx={{ flex: 2, padding: '10px' }}>
                        <UserSpeedDial />
                    </Box>
                    <Box sx={{ flex: 10, padding: '10px' }}>
                        <MyOrder />
                    </Box>
                </Box>

            </Box>
            <ProductSection />
        </Box>

    )
}

export default User