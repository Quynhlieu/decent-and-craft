import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { RootState } from '../app/store'
import { useSelector } from 'react-redux'
import { Product } from '../interfaces/Product'

const WishList = () => {
    const wishlist: Product[] = useSelector((state: RootState) => state.wishlist)
    return (
        <Box sx={{ my: 10 }}>
            <Typography textAlign="center" variant='h3'>
                Danh sách sản phẩm yêu thích
            </Typography>
            {wishlist && wishlist.map(p => <Typography>{p.name}</Typography>)}
        </Box>
    )
}

export default WishList