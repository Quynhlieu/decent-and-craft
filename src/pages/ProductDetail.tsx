import AddIcon from "@mui/icons-material/Add";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RemoveIcon from "@mui/icons-material/Remove";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Button, colors, Divider, Grid, Rating, Skeleton, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetProductByCategoryIdQuery, usePutViewsProductByIdMutation } from "../api/productApi.ts";
import { useGetAverageRatingQuery, useGetProductDetailByIdQuery } from "../api/productDetailApi.ts";
import { useGetAllReviewsByProductIdQuery } from "../api/reviewApi.ts";
import { RootState } from "../app/store";
import { VNDNumericFormat } from "../components/ProductCard.tsx";
import BreadcrumbFooter from "../components/ProductDetail/BreadcrumbFooter.tsx";
import BreadcrumbHeader from "../components/ProductDetail/BreadcrumbHeader.tsx";
import MySclickCarousel from "../components/ProductDetail/MySlickCarousel.tsx";
import Review from "../components/ProductDetail/Review.tsx";
import ProductList from "../components/ProductList.tsx";
import ProductSection from "../components/ProductSection.tsx";
import { cartItemAdd } from "../features/cart/cartSlice.ts";
import { productViewedHistoryAdd } from "../features/history/productViewedHistorySlice.ts";
import { addCartItem, updateCartItem } from "../features/productDetail/productDetailSlice.ts";
import { Product } from "../interfaces/Product.ts";
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
            <Typography sx={priceSx}><VNDNumericFormat price={origin} /></Typography>
            <Typography sx={discountSx}><VNDNumericFormat price={price} /></Typography>
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
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        textOverflow: 'ellipsis',
        lineHeight: '1.5em', // Điều chỉnh dòng cao cho phù hợp với kiểu chữ
        height: '3em' // Chiều cao cố định cho 2 dòng

    };
    const product = productDetail.product;
    let { data: averageRating } = useGetAverageRatingQuery(productDetail.id);
    const { data: numberReviews } = useGetAllReviewsByProductIdQuery(productDetail.id);

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
    averageRating = typeof averageRating === 'number' ? averageRating : 0;
    return (
        <Box flexDirection="column" letterSpacing={10}>
            <Typography sx={styleTitle}>{product.name}</Typography>
            <Stack spacing={2} direction="row" alignItems="center">
                {averageRating !== 0 ? (
                    <Stack direction="row" alignItems="center">
                        <Typography>
                            {averageRating.toFixed(1)}
                        </Typography>
                        <Rating
                            name="half-read-only"
                            defaultValue={0}
                            value={parseFloat(String(averageRating))}
                            precision={0.25}
                            readOnly
                            sx={{ fontSize: 15, ml: 1, '& .MuiRating-icon': { mr: 0 } }}
                        />
                        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

                        <Typography>{numberReviews?.length || 0} Đánh giá</Typography>
                    </Stack>
                ) : (
                    <Stack direction="row" alignItems="center">
                        <Typography>Chưa có đánh giá</Typography>
                    </Stack>
                )}

                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

                <Typography>{product.views || 0} Lượt xem</Typography>

                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

                <Typography>{product.soldQuantity || 0} Đã bán</Typography>
            </Stack>
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
        const content = <Review productId={productDetail.id} />;
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
const HistoryProductList = () => {
    const historyProducts = useSelector((state: RootState) => state.history);
    return (
        <Box sx={{ my: 5 }}>
            <Typography sx={{ fontWeight: 'bold' }}>SẢN PHẨM ĐÃ XEM</Typography>
            <ProductList products={historyProducts} />
        </Box>
    )
}

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
    const { data } = useGetProductByCategoryIdQuery(productDetail.categoryList[0].id ?? 1);
    const products = data?.content.filter((p) => p.id !== productDetail.id);
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
            <HistoryProductList />
        </Box>
    )
}

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [putViewsProductById] = usePutViewsProductByIdMutation();
    const [hasPutViews, setHasPutViews] = useState(false);
    const { data: productDetail, isLoading, error } = useGetProductDetailByIdQuery(Number(productId));
    useEffect(() => {
        if (!productId) {
            navigate("/");
        }
        if (error) {
            navigate("*");
        }
        if (!hasPutViews) {
            putViewsProductById(Number(productId));
            setHasPutViews(true);
        }
        if (productDetail) {
            dispatch(productViewedHistoryAdd(productDetail?.product))
        }
    }, [productId, navigate, error]);


    return (
        <Box sx={{ mb: 10 }}>
            {isLoading
                ? <Skeleton width={900} height={220} />
                : productDetail && <BreadcrumbHeader productDetail={productDetail} />}
            {productDetail && !isLoading
                ? <Detail productDetail={productDetail} />
                : <Skeleton width={1200} height={400} />}
            <ProductSection />
            <BreadcrumbFooter />
        </Box>
    );
};

export default ProductDetail;
