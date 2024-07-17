import { Product } from '../interfaces/Product'
import { Grid, Skeleton } from '@mui/material'
import ProductCard from './ProductCard'

type ProductListProps = {
    products: Product[] | undefined,
    isLoading:boolean | undefined
}
const ProductList = (props: ProductListProps) => {
    const { products } = props;
    const isSearchPage = window.location.pathname.includes('search');
    const gridSize = isSearchPage ? 4 : 5; // 
    return (
        <Grid container sx={{ mt: 2 }} spacing={2}>
            {(products ?? Array.from(new Array(8))).map((product, index) => (
                <Grid
                    item
                    xs={12 / gridSize}
                    key={product?.id ?? index}
                >
                    {product ? (
                        <ProductCard data={product} />
                    ) : (
                        <Skeleton variant="rectangular" width="100%" height={350} />
                    )}
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductList