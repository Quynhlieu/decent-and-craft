import {Box} from "@mui/material";
import Header from "../components/Header.tsx";
import MyBreadcrumb from "../components/MyBreadcrumb.tsx";
import Detail from "../components/Detail.tsx";
const ProductDetail = () => {
    return (
    <Box sx={{paddingX:20}}>
        <Header/>
        <MyBreadcrumb/>
        <Detail/>
        
    </Box>
)
}




export default ProductDetail;