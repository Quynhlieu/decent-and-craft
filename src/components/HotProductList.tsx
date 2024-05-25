import { Box } from '@mui/material'
import React from 'react'
import TitleBar from './TitleBar'
import ProductList from './ProductList'
import { Product } from '../interfaces/Product'


const HotProductList = () => {
    const data: Product[] = [
        {
            id: 1,
            name: "Set Qua Protrail",
            price: 950000,
            thumb: "https://fairycorner.vn/wp-content/uploads/2022/02/MG_9303-300x300.jpg",
        },
        {
            id: 2,
            name: "Set Qua Protrail2",
            price: 1000000,
            thumb: "https://fairycorner.vn/wp-content/uploads/2022/02/MG_9303-300x300.jpg"
        },
    ];
    return (
        <Box sx={{ mt: 5 }}>
            <TitleBar title='SẢN PHẨM HOT' />
            <ProductList products={data} />
        </Box>
    )
}

export default HotProductList