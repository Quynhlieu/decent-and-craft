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
        <Grid container sx={{ mt: 2 }} spacing={5}>
            {products.map(product => {
                return (
                    <Grid xs={3} key={product.id} item>
                        <ProductCard data={product} />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default ProductList