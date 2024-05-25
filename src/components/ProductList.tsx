import React from 'react'
import { Product } from '../interfaces/Product'
import { Grid } from '@mui/material'
import ProductCard from './ProductCard'

type ProductListProps = {
    products: Product[]
}
const ProductList = (props: ProductListProps) => {
    const { products } = props;
    return (
        <Grid container spacing={2}>
            {products.map(product => {
                return (
                    <Grid item>
                        <ProductCard data={product} />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default ProductList