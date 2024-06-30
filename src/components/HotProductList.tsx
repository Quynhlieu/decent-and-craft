import { Box } from '@mui/material'
import React from 'react'
import TitleBar from './TitleBar'
import ProductList from './ProductList'
import {hotProducts} from "../data/products";

const HotProductList = () => {
    const data = hotProducts;
    return (
        <Box sx={{ my: 5 }}>
            <TitleBar title='SẢN PHẨM HOT' />
            <ProductList products={data} />
        </Box>
    )
}

export default HotProductList