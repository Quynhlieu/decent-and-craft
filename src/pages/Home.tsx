import React from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material'
import Carousel from '../components/Carousel'
import HotProductList from '../components/HotProductList'

const Home = () => {
    return (
        <Box sx={{ paddingX: 20 }}>
            <Header />
            <Carousel />
            <HotProductList />
        </Box>
    )
}

export default Home