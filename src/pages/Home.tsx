import React from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material'
import Carousel from '../components/Carousel'
import HotProductList from '../components/HotProductList'
import FeaturesBanner from '../components/FeaturesBanner'

const Home = () => {
    return (
        <Box sx={{ paddingX: 20 }}>
            <Header />
            <Carousel />
            <HotProductList />
            <FeaturesBanner />
        </Box>
    )
}

export default Home