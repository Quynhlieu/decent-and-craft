import React from 'react'
import { Box } from '@mui/material'
import Carousel from '../components/Carousel'
import HotProductList from '../components/HotProductList'
import FeaturesBanner from '../components/FeaturesBanner'
import Feedbacks from '../components/Feedbacks'
import BlogCarousel from '../components/BlogCarousel'

const Home = () => {
    return (
        <Box >
            <Carousel />
            <HotProductList />
            <FeaturesBanner />
            <BlogCarousel />
            <Feedbacks />
        </Box>
    )
}

export default Home