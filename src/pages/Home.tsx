import React from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material'
import Carousel from '../components/Carousel'
import HotProductList from '../components/HotProductList'
import FeaturesBanner from '../components/FeaturesBanner'
import Feedbacks from '../components/Feedbacks'

const Home = () => {
    return (
        <Box sx={{ paddingX: 20 }}>
            <Carousel />
            <HotProductList />
            <FeaturesBanner />
            <Feedbacks />
        </Box>
    )
}

export default Home