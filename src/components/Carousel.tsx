import { Box, Typography } from '@mui/material'
import React from 'react'

const Carousel = () => {
    return (
        <Box height={500}
            sx={{
                backgroundColor: "primary.main",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
            }}  >
            <Typography variant='h1'>
                This is the very Carousel
            </Typography>
        </Box >
    )
}

export default Carousel