import { Box, Button, colors, Divider, Grid, Rating, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import BreadcrumbHeader from "../components/ProductDetail/BreadcrumbHeader.tsx";
import ProductSection from "../components/ProductSection.tsx";
import BreadcrumbFooter from "../components/ProductDetail/BreadcrumbFooter.tsx";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { grey } from "@mui/material/colors";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import ProductList from "../components/ProductList.tsx";
import Review from "../components/ProductDetail/Review.tsx";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import MySclickCarousel from "../components/ProductDetail/MySlickCarousel.tsx";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useGetAverageRatingQuery, useGetProductDetailByIdQuery } from "../api/productDetailApi.ts";
import { addCartItem, productDetailLoad, updateCartItem } from "../features/productDetail/productDetailSlice.ts";
import { toast } from "react-toastify";
import { cartItemAdd } from "../features/cart/cartSlice.ts";
import { RoundedNumericFormat, VNDNumericFormat } from "../components/ProductCard.tsx";
import { RootState } from "../app/store";
import { Product } from "../interfaces/Product.ts";
import { useGetAllProductQuery } from "../api/productApi.ts";
import { IProductDetail } from "../interfaces/ProductDetail.ts";

// Line icon
export const LineIcon = () => {
    return (
        <Box my={1}><Divider orientation="horizontal" flexItem sx={{ height: '2px', width: '10%', background: grey[400] }} /></Box>
    )
}

export const Price = (prop: { price: number, origin: number, fontSize: number }) => {
    const { price, origin, fontSize } = prop;
    const baseSx = {
        // Chỉ định cho các Typography con nằm trong baseSx
        '& > .MuiTypography-root': {
            fontSize: fontSize,
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
            <Typography sx={priceSx}><VNDNumericFormat price={price} /></Typography>
            <Typography sx={discountSx}><VNDNumericFormat price={origin} /></Typography>
        </Stack>
    );
}

// Quantity button component
const QuantityButton: React.FC = () => {
    const dispatch = useDispatch();
    const cartItem = useSelector((state: RootState) => state.productDetail.cartItem);

    const baseSx = {
        borderRadius: 50,
        background: colors.grey[200],
        border: '1px solid #e0e0e0',
        width: "auto",
        height: 50,
    };

    if (!cartItem) return null;

    return (
        <Box>
            <Stack sx={baseSx} direction="row">
                <Button className="btn btn-quantity" onClick={() => {
                    dispatch(updateCartItem(-1));
                }} endIcon={<RemoveIcon />} />
                <TextField
                    className="text-field"
                    type="tel"
                    sx={{ width: 50 }}
                    value={cartItem.quantity}
                    disabled
                />
                <Button className="btn btn-quantity" onClick={() => {
                    dispatch(updateCartItem(1));
                }} startIcon={<AddIcon />} />
            </Stack>
        </Box>
    );
}

// Thong tin chi tiet san pham
const InformationProduct: React.FC<{ productDetail: IProductDetail }> = ({ productDetail }) => {
    const dispatch = useDispatch();
    const styleTitle = {
        color: colors.grey[700],
        fontSize: 25,
        fontWeight: "bold",

    };
    const product = productDetail.product;
    const { data: averageRating } = useGetAverageRatingQuery(productDetail.id);

    useEffect(() => {
        const cartItem = { product: product, quantity: 1 };
        dispatch(addCartItem(cartItem));
    }, [dispatch, product]);

    const categories = productDetail.categoryList;
    const getCategoryNames = categories.map(c => {
        return c.name.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }).join(", ");

    const productDetailState = useSelector((state: RootState) => state.productDetail);
    const currentCartItem = productDetailState.cartItem;

    return (
        <Box flexDirection="column" letterSpacing={10}>
            <Typography sx={styleTitle}>{product.name}</Typography>
            <Box sx={{
                my: 2, 
                display: 'flex',
                borderColor: 'divider',
                color: 'text.secondary',
                direction: "row",
                '& svg': {
                    m: 1,
                },
            }} >
                <Stack sx={{ mr: 2 }} direction="row" alignItems="center" spacing={1}>
                    <Typography><RoundedNumericFormat averageRating={averageRating ? averageRating : 0} /></Typography>
                    <Rating
                        name="half-read-only"
                        defaultValue={0}
                        value={1.28}
                        precision={0.25}
                        readOnly
                        sx={{ fontSize: 15 }}
                    />
                </Stack>
                <Divider orientation="vertical" variant="middle" flexItem />

                <Typography>{productDetail.views} Lượt xem</Typography>
                <Typography>{productDetail.views} Đánh giá</Typography>
                <Typography>{productDetail.views} Đã bán</Typography>

            </Box>
            <LineIcon />
            <Price price={product.price} origin={product.origin} fontSize={25} />
            <Box>

            </Box>
            <Stack direction="row" spacing={2} mt={2}>
                <QuantityButton />
                <Button className="btn btn-cart" variant='contained' onClick={() => {
                    if (currentCartItem) {
                        dispatch(cartItemAdd(currentCartItem));
                        toast.success("Thêm vào giỏ hàng thành công", { autoClose: 1000, position: "bottom-left" });
                    }
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
    );
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
        const content = <Review productId={productDetail.product.id} />;
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
const SimilarProductList = (prop: { similarProducts: Product[] }) => {
    const { similarProducts } = prop;
    return (
        <Box sx={{ my: 5 }}>
            <Typography sx={{ fontWeight: 'bold' }}>SẢN PHẨM TƯƠNG TỰ</Typography>
            <ProductList products={similarProducts} />
        </Box>
    )
}

// Chi tiet san pham
const Detail = (prop: { productDetail: IProductDetail }) => {
    const { productDetail } = prop;
    const { data } = useGetAllProductQuery();
    const products = data;
    return (
        <Box component="div">
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <Box  >
                        <MySclickCarousel mainImages={productDetail.imageList} />
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    <InformationProduct productDetail={productDetail} />
                </Grid>
                <Grid item xs={12} mt={2}>
                    <DescriptionProduct productDetail={productDetail} />
                </Grid>
            </Grid>
            <SimilarProductList similarProducts={products ?? []} />
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
    const { data: productDetail } = useGetProductDetailByIdQuery(Number(productId));
    const dispatch = useDispatch();
    productDetail && dispatch(productDetailLoad(productDetail));
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