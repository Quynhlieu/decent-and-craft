import { Product } from '../interfaces/Product'
import { Grid, Skeleton } from '@mui/material'
import ProductCard from './ProductCard'

type ProductListProps = {
    products: Product[] | undefined | null,
    isLoading?: boolean | undefined
}
const ProductList = (props: ProductListProps) => {
    const { products, isLoading } = props;
    const isSearchPage = window.location.pathname.includes('search');
    const gridSize = isSearchPage ? 4 : 5; // 
    return (
        <Grid container sx={{ mt: 2 }} spacing={2}>
            {isLoading
                ? Array.from(new Array(8)).map(index => (
                    <Grid
                        item
                        xs={12 / gridSize}
                        key={index}>
                        <Skeleton variant="rectangular" width="100%" height={350} />
                    </Grid>))
                :
                products?.map(product => (
                    <Grid
                        item
                        xs={12 / gridSize}
                        key={product.id}>
                        <ProductCard data={product} />
                    </Grid>))

            }
        </Grid>
    )
}
export default ProductList