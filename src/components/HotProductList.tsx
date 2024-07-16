import { Box } from '@mui/material'
import TitleBar from './TitleBar'
import ProductList from './ProductList'
import { useGetAllHotProductQuery } from '../api/productApi';

const HotProductList = () => {
    const { data, isLoading } = useGetAllHotProductQuery()
    return (
        <Box sx={{ my: 5 }}>
            <TitleBar title='SẢN PHẨM HOT' />
            {isLoading
                ? <h1>Loading</h1>
                : <ProductList products={data} />
            }
        </Box>
    )
}

export default HotProductList