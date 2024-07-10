import { Box, Button, colors, Divider, Grid, Rating, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import BreadcrumbHeader from "../components/ProductDetail/BreadcrumbHeader.tsx";
import ProductSection from "../components/ProductSection.tsx";
import BreadcrumbFooter from "../components/ProductDetail/BreadcrumbFooter.tsx";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { hotProducts } from "../data/product.ts";
import ProductList from "../components/ProductList.tsx";
import Review, { RatingOverview } from "../components/ProductDetail/Review.tsx";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import MySclickCarousel from "../components/ProductDetail/MySlickCarousel.tsx";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { CartItem, cartUpdate } from "../features/cart/cartSlice.ts";
import { useGetProductDetailByIdQuery } from "../api/productDetailApi.ts";
import { IProductDetail } from "../features/productDetail/productDetailSlice.ts";
import { toast } from "react-toastify";
import { cartItemAdd } from "../features/cart/cartSlice.ts";

// Line icon
export const LineIcon = () => {
    return (
        <Box my={1}><Divider orientation="horizontal" flexItem sx={{ height: '2px', width: '10%', background: grey[400] }} /></Box>
    )
}

const Price = (prop: { price: number, origin: number }) => {
    const { price, origin } = prop;
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
            <Typography sx={discountSx}>{origin}</Typography>
        </Stack>
    );
}

/* Quantity button*/
const QuantityButton: React.FC<{ cartItem: CartItem }> = ({ cartItem }) => {
    const dispatch = useDispatch();

    const baseSx = {
        borderRadius: 50,
        background: grey[200],
        border: '1px solid #e0e0e0',
        width: "auto",
        height: 50,
    };

    return (
        <Box>
            <Stack sx={baseSx} direction="row">
                <Button className="btn btn-quantity" onClick={() => {
                    dispatch(cartUpdate({
                        productId: cartItem.product.id,
                        value: -1
                    }))
                }} endIcon={<RemoveIcon />} />
                <TextField
                    className="text-field"
                    type="tel"
                    sx={{ width: 10 }}
                    value={cartItem.quantity}
                    disabled
                />
                <Button className="btn btn-quantity" onClick={() => {
                    dispatch(cartUpdate({
                        productId: cartItem.product.id,
                        value: 1
                    }))
                }} startIcon={<AddIcon />} />
            </Stack>
        </Box>
    );
}
/* End quantity button*/


// Thong tin chi tiet san pham
const InformationProduct = (prop: { productDetail: IProductDetail }) => {
    const dispatch = useDispatch();
    const { productDetail } = prop;
    const styleTitle = {
        color: colors.grey[700],
        fontSize: 25,
        fontWeight: "bold",
    }
    const [quantity, setQuantity] = useState(1);
    const cartItem = { product: productDetail.product, quantity: 1 }
    const product = productDetail.product;
    const productBlog = productDetail.productBlog;
    const categories = productDetail.categoryList;
    const getCategoryNames = categories.map(c => {
        return c.name.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    }).join(", ")
    return (
        <Box flexDirection="column" letterSpacing={10}>
            <Typography sx={styleTitle}>{product.name}</Typography>
            <Box sx={{my:2}} flexDirection="row">
                {/* <RatingOverview productId={product.id} /> */}
                <Box sx={{mr: 2}}></Box>
                <Rating
                            name="half-read-only"
                            defaultValue={0}
                            value={parseFloat("5.0")}
                            precision={0.25}
                            readOnly
                            sx={{ fontSize: 15 }}
                        
                        />
                {/* <Typography variant='subtitle2'>{rating}</Typography> */}
                
            </Box>
            <LineIcon />
            <Price price={product.price} origin={product.origin} />
            
            <Stack direction="row" spacing={2} mt={2}>
                <QuantityButton cartItem={cartItem} />
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
                    Mã: <Box component="span">{product.id}</Box>
                </Typography>
                <Typography variant="body2" className="product-meta">
                    Danh mục: <Box component="span">{getCategoryNames}</Box>
                </Typography>
                <Typography variant="body2" className="product-meta">
                    Số lượng trong kho: <Box component="span">{product.unitInStock}</Box>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
                <FacebookIcon fontSize="small" color="secondary" /> 
                <TwitterIcon fontSize="small" color="secondary" />
                <PinterestIcon fontSize="small" color="secondary" />
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
const DescriptionProduct = (prop: { productDetail: IProductDetail }) => {
    const { productDetail } = prop;
    const [value, setValue] = React.useState(0);
    // const productDetail = useSelector((state: RootState) => state.productDetail);
    // const product = productDetail.find(i => i.product.id === productId);
    const productDescriptions = productDetail && productDetail.productBlog.content;

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
        // const content = <Review productId={productDetail.product.id} />;
        const content = <Review productId={1} />;
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
    const { productDetail } = prop;
    return (
        <Box>
            <Grid container spacing={5}>
                <Grid item xs={5}>
                    <Box  >
                        <MySclickCarousel mainImages={productDetail.imageList} />
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    <InformationProduct productDetail={productDetail} />
                </Grid>
                <Grid item xs={12}>
                    <DescriptionProduct productDetail={productDetail} />
                </Grid>
            </Grid>
            <SimilarProductList />
        </Box>
    )
}

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!productId) {
            navigate("/");
        }
    }, [productId, navigate]);
    const { data, error, isLoading } = useGetProductDetailByIdQuery(Number(productId));
    const productDetail = data;
    console.log(productDetail);
    
    // const productDetail = useSelector((state: RootState) => state.productDetail);
    // const product = productDetail.find(p => p.id === productId);
    return (
        <Box sx={{ mb: 10 }}>
            <BreadcrumbHeader />
            {productDetail && <Detail productDetail={productDetail} />}
            <ProductSection />
            <BreadcrumbFooter />
            <Outlet />
        </Box>
    )
}

export default ProductDetail;