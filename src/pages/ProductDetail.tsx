import {Box} from "@mui/material";
import Header from "../components/Header.tsx";
import BreadcrumbHeader from "../components/BreadcrumbHeader.tsx";
import Detail from "../components/Detail.tsx";
import ProductSection from "../components/ProductSection.tsx";
import BreadcrumbFooter from "../components/BreadcrumbFooter.tsx";
const ProductDetail = () => {
    return (
    <Box sx={{paddingX:20, mb:10}}>
        <Header/>
        <BreadcrumbHeader/>
        <Detail/>
        <ProductSection/>
        <BreadcrumbFooter/>
    </Box>
)
}




export default ProductDetail;