import React from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material'
import Carousel from '../components/Carousel'

const Home = () => {
    return (
        <Box sx={{paddingX:20}}>
            <Header />
            <Carousel/>
        </Box>
    )
}

export default Home