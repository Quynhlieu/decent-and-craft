import { Box, Button, colors, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import BreadcrumbHeader from "../components/ProductDetail/BreadcrumbHeader.tsx";
import ProductSection from "../components/ProductSection.tsx";
import BreadcrumbFooter from "../components/ProductDetail/BreadcrumbFooter.tsx";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../app/store.ts";
import React, {useState} from "react";
import { grey } from "@mui/material/colors";
import QuantityButton from "../components/QuantityButton.tsx";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { hotProducts } from "../data/product.ts";
import ProductList from "../components/ProductList.tsx";
import Review from "../components/ProductDetail/Review.tsx";
// import { IProductDetail } from "../features/productDetail/productDetailSlice.ts";
import { Outlet, useParams } from "react-router-dom";
import MySclickCarousel from "../components/ProductDetail/MySlickCarousel.tsx";
import { useGetProductByIdQuery } from "../api/productApi.ts";
import {IProductDetail} from "../features/productDetail/productDetailSlice.ts";
import {toast} from "react-toastify";
import {cartItemAdd} from "../features/cart/cartSlice.ts";


const Slider = () => {
    const mainImages = [
        'https://fairycorner.vn/wp-content/uploads/2021/10/Orange-Woods-2.jpg',
        'https://fairycorner.vn/wp-content/uploads/2021/10/14.png',
        'https://fairycorner.vn/wp-content/uploads/2021/10/15.png',
        'https://fairycorner.vn/wp-content/uploads/2021/10/16.png',
    ];
    return (
        <Box  >
            <MySclickCarousel mainImages={mainImages} />
        </Box>
    );
};

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
    const { price, discount } = prop;
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
            <Typography sx={discountSx}>{price * discount}</Typography>
        </Stack>
    );
}


// Thong tin chi tiet san pham
const InformationProduct = (prop: { productDetail: IProductDetail }) => {
    const dispatch = useDispatch();
    const {productDetail} = prop;
    const styleTitle = {
        color: colors.grey[700],
        fontSize: 25,
        fontWeight: "bold",
    }
    const [quantity, setQuantity] = useState(1);
    const cartItem = {product: productDetail.product, quantity: 1}
    return (
        <Box flexDirection="column" letterSpacing={10}>
            <Typography sx={styleTitle}>{productDetail.product.name}</Typography>
            <LineIcon/>
            <Price price={productDetail.product.price} discount={productDetail.discount}/>
            <Box>
                <Typography variant='subtitle1'>{productDetail.overview}</Typography>
            </Box>
            <Stack direction="row" spacing={2} mt={2}>
                <QuantityButton cartItem={cartItem}/>
                <Button className="btn btn-cart" variant='contained' onClick={() => {
                    dispatch(cartItemAdd({
                        product: productDetail.product,
                        quantity: quantity
                    }))
                    toast.success("Thêm vào giỏ hàng thành công", { autoClose: 1000, position: "bottom-left" })
                }}>THÊM VÀO GIỎ</Button>
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
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={value !== 2 ? { p: 2 } : { p: 0 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


/*
* Component thông tin bổ sung cho sản phẩm
* */
const DescriptionProduct: React.FC<{ productId: number }> = ({ productId }) => {
    const [value, setValue] = React.useState(0);
    const productDetail = useSelector((state: RootState) => state.productDetail);
    const product = productDetail.find(i => i.product.id === productId);
    const productDescriptions = product && product.productDescriptions;

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // Show mô tả sản phẩm
    const showDescriptionTab = () => {
        return (
            <CustomTabPanel index={0} value={value}>
                <Typography variant="subtitle2" mt={2}>{productDescriptions}</Typography>
            </CustomTabPanel>
        )
    }
    // Show Review
    const showReviewTab = () => {
        const content = <Review productId={productId} />;
        return (
            <CustomTabPanel index={1} value={value}>
                {content}
            </CustomTabPanel>
        );
    };


    return (
        <Box sx={{ width: '100%', paddingX: 10 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab key={0} label="MÔ TẢ" />
                    <Tab key={1} label="ĐÁNH GIÁ SẢN PHẨM" />
                </Tabs>
            </Box>
            {showDescriptionTab()}
            {showReviewTab()}
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
        <Box sx={{ my: 5 }}>
            <Typography sx={{ fontWeight: 'bold' }}>SẢN PHẨM TƯƠNG TỰ</Typography>
            <ProductList products={data} />
        </Box>
    )
}

// Chi tiet san pham
const Detail = (prop: { productDetail: IProductDetail }) => {
    const {productDetail} = prop;
    return (
        <Box>
            <Grid container spacing={5}>
                <Grid item xs={5}>
                    <Slider/>
                </Grid>
                <Grid item xs={7}>
                    <InformationProduct productDetail={productDetail}/>
                </Grid>
                <Grid item xs={12}>
                    <DescriptionProduct productId={productDetail.product.id}/>
                </Grid>
            </Grid>
            <SimilarProductList/>
        </Box>
    )
}

const ProductDetail = () => {
    const {productId} =  useParams();
    const { data, error, isLoading } = useGetProductByIdQuery(+productId);
    const product = data;
    // const { productId } = prop;
    // const productDetail = useSelector((state: RootState) => state.productDetail);
    // const product = productDetail.find(p => p.id === productId);
    return (
        <Box sx={{ mb: 10 }}>
            <BreadcrumbHeader />
            {product && <Detail product={product} />}
            <ProductSection />
            <BreadcrumbFooter />
            <Outlet />
        </Box>
    )
}

export default ProductDetail;