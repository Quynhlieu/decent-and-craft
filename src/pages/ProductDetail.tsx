import {Box, Button, colors, Grid, Stack, Tab, Tabs, Typography} from "@mui/material";
import BreadcrumbHeader from "../components/BreadcrumbHeader.tsx";
import ProductSection from "../components/ProductSection.tsx";
import BreadcrumbFooter from "../components/BreadcrumbFooter.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import React from "react";
import MySplideSlider from "../components/MySplideSlider.tsx";
import {grey} from "@mui/material/colors";
import QuantityButton from "../components/QuantityButton.tsx";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import {hotProducts} from "../data/products.ts";
import ProductList from "../components/ProductList.tsx";
import Review from "../components/Review.txs.tsx";
import {IProductDetail} from "../features/productDetail/productDetailSlice.ts";


const Slider: React.FC = () => {
    const mainImages = [
        'https://via.placeholder.com/800x400?text=Image+1',
        'https://via.placeholder.com/800x400?text=Image+2',
        'https://via.placeholder.com/800x400?text=Image+3',
        'https://via.placeholder.com/800x400?text=Image+4',
    ];

    const thumbnails = [
        'https://via.placeholder.com/100x64?text=Thumbnail+1',
        'https://via.placeholder.com/100x64?text=Thumbnail+2',
        'https://via.placeholder.com/100x64?text=Thumbnail+3',
        'https://via.placeholder.com/100x64?text=Thumbnail+4',
    ];

    return (
        <div className="App">
            <h1>Splide Slider with Thumbnails</h1>
            <MySplideSlider mainImages={mainImages} thumbnails={thumbnails}/>
        </div>
    );
};


// Product Name
// const Title = () => {
//     const style = {
//         color: colors.grey[700],
//         fontSize: 25,
//         fontWeight: "bold",
//     }
//     return (
//         <Typography sx={style}>Sáp thơm hoa khô Elayne Orange & Sandalwood</Typography>
//     )
// }

// Line icon
const LineIcon = () => {
    const style = {
        background: grey[400],
        width: 40,
        height: 2,
        marginY: 2,
    }
    return (
        <Box sx={style}></Box>
    )
}


const Price = (prop: { price: number, discount: number }) => {
    const {price, discount} = prop;
    const baseSx = {
        // Chỉ định cho các Typography con nằm trong baseSx
        '& > .MuiTypography-root': {
            fontSize: 25,
        },
    };

    const priceSx = {
        color: grey[500],
        textDecoration: 'line-through',
    };

    const discountSx = {
        color: grey[900],
        fontWeight: 'bold',
    };

    return (
        <Stack spacing={2} direction="row" sx={baseSx}>
            <Typography sx={priceSx}>{price}</Typography>
        </Stack>
    );
}


// Thong tin chi tiet san pham
const InformationProduct = (prop: { name: string, overview: string, price: number, discount: number }) => {
    const {name, overview, price, discount} = prop;
    const styleTitle = {
        color: colors.grey[700],
        fontSize: 25,
        fontWeight: "bold",
    }
    return (
        <Box flexDirection="column" letterSpacing={10}>
            <Typography sx={styleTitle}>{name}</Typography>
            <LineIcon/>
            <Price price={price} discount={discount}/>
            <Box>
                <Typography variant='subtitle1'>{overview}</Typography>
            </Box>
            <Stack direction="row" spacing={2} mt={2}>
                <QuantityButton quantity={1} quantityStock={15}/>
                <Button className="btn btn-cart" variant='contained'>THÊM VÀO GIỎ</Button>
            </Stack>
            <Stack direction="column" mt={2}>
                <Typography variant="body2" className="product-meta">
                    Mã: <Box component="span">KGNGOC-2-1-1-1</Box>
                </Typography>
                <Typography variant="body2" className="product-meta">
                    Danh mục:: <Box component="span"> Christmas, Sáp thơm hoa khô, Tết, Valentine</Box>
                </Typography>
                <Typography variant="body2" className="product-meta">
                    Từ khóa: <Box component="span">ift, HOA KHÔ, present, quà tặng, SÁP THƠM, wedding</Box>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
                <FacebookIcon fontSize="small" color="secondary"/>
                <TwitterIcon fontSize="small" color="secondary"/>
                <PinterestIcon fontSize="small" color="secondary"/>
            </Stack>
        </Box>
    )
}

/* Description Tab*/
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={value !== 2 ? {p: 2} : {p: 0}}>
                    {children}
                </Box>
            )}
        </div>
    );
}


/*
* Component thông tin bổ sung cho sản phẩm
* */
const DescriptionProduct: React.FC<{ productId: number }> = ({productId}) => {
    const [value, setValue] = React.useState(0);
    const productDescriptions = getProductDescriptions(productId);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    if (!productDescriptions) {
        return <Typography variant="h6">Product not found</Typography>;
    }

    const showTitleTab = productDescriptions.map((item, index) => (
        <Tab key={index} label={item.title}/>
    ));

    const showContentTab = productDescriptions.map((description, index) => {
        let content;
        if (description.title == "Đánh giá sản phẩm") {
            content = <Review productId={productId}/>;
        } else {
            content = (description.descriptions as string[]).map((item, i) => (
                <Typography key={i} variant="subtitle2">{item}</Typography>
            ));
        }

        return (
            <CustomTabPanel key={index} index={index} value={value}>
                {content}
            </CustomTabPanel>
        );
    });

    return (
        <Box sx={{width: '100%', paddingX: 10}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>
                    {showTitleTab}
                </Tabs>
            </Box>
            {showContentTab}
        </Box>
    );
};
/* End Description Tab*/

/*
* Similar product list
* */
const SimilarProductList = () => {
    const data = hotProducts;
    return (
        <Box sx={{my: 5}}>
            <Typography sx={{fontWeight: 'bold'}}>SẢN PHẨM TƯƠNG TỰ</Typography>
            <ProductList products={data}/>
        </Box>
    )
}

// Chi tiet san pham
const Detail = (prop: { product: IProductDetail }) => {
    const {product} = prop;
    return (
        <Box>
            <Grid container spacing={5}>
                <Grid item xs={4}>
                    <Slider/>
                </Grid>
                <Grid item xs={8}>
                    <InformationProduct name={product.name} overview={product.overview} price={product.price}
                                        discount={product.discount}/>
                </Grid>
                <Grid item xs={12}>
                    <DescriptionProduct productId={product.id}/>
                </Grid>
            </Grid>
            <SimilarProductList/>
        </Box>
    )
}

const ProductDetail = (prop: { productId: number }) => {
    const {productId} = prop;
    const productDetail = useSelector((state: RootState) => state.productDetail);
    const product = productDetail.find(p => p.id === productId);
    return (
        <Box sx={{mb: 10}}>
            <BreadcrumbHeader/>
            {product && <Detail product={product}/>}
            <ProductSection/>
            <BreadcrumbFooter/>
        </Box>
    )
}

export default ProductDetail;