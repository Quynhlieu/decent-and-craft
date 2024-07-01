import { Box } from '@mui/material'
import TitleBar from './TitleBar'
import ProductList from './ProductList'
import {hotProducts} from "../data/product";

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