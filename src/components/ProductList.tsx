import { Product } from '../interfaces/Product'
import { Grid } from '@mui/material'
import ProductCard from './ProductCard'

type ProductListProps = {
    products: Product[] | undefined
}
const ProductList = (props: ProductListProps) => {
    const { products } = props;
    const isSearchPage = window.location.pathname.includes('search');
    return (
        <Grid container sx={{ mt: 2 }} spacing={2}>
            {products&&   products.map(product => {
                return (
                    <Grid 
                        xs={12 / (isSearchPage ? 4 : 5)} 
                        key={product.id} 
                        item
                    >
                        <ProductCard data={product} />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default ProductList