import {Box} from "@mui/material";
import BreadcrumbHeader from "../components/BreadcrumbHeader.tsx";
import Detail from "../components/Detail.tsx";
import ProductSection from "../components/ProductSection.tsx";
import BreadcrumbFooter from "../components/BreadcrumbFooter.tsx";
const ProductDetail = () => {
    return (
    <Box sx={{mb:10, paddingX:6}}>
        <BreadcrumbHeader/>
        <Detail/>
        <ProductSection/>
        <BreadcrumbFooter/>
    </Box>
)
}




export default ProductDetail;