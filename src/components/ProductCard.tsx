import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '../app/store';
import { cartItemAdd } from '../features/cart/cartSlice';
import { wishlistAdd, wishlistRemove } from '../features/wishlist/wishlistSlice';
import { Product } from '../interfaces/Product';
import { Price } from '../pages/ProductDetail';
export const VNDNumericFormat = (prop: { price: number, styled?: React.CSSProperties }) => {
    return (
        <NumericFormat style={{ ...prop.styled }} value={prop.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
    )
}
const InfomationHover = (props: { product: Product }) => {
    const { product } = props;
    return (
        <Box>
            <Typography>Số lượng trong kho: {product.unitInStock}</Typography>
            <Typography>Lượt xem: 25000</Typography>    
            <Typography>Đã bán: 10</Typography>
        </Box>
    );
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement='top'/>
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

const ProductCard = (product: { data: Product }) => {
    const { id, name, price, thumbnail, origin } = product.data;
    const wishlist = useSelector((state: RootState) => state.wishlist);
    const isInWishList = wishlist.some(p => p.id === id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Card sx={{ minWidth: 210, height: "auto" }}>
            <CardActionArea  onClick={() => {
                navigate(`product/${id}`);
            }}>
                <LightTooltip title={<InfomationHover product={product.data} />}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={thumbnail}
                        sx={{
                            transition: "all 0.5s ease",
                            "&:hover": {
                                transform: "rotate(15deg) scale(0.8)",
                            }
                        }}
                    />
                </LightTooltip>

                <CardContent sx={{paddingBottom: 0}}>
                    <Typography sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        textOverflow: 'ellipsis',
                        fontSize: 18,
                        lineHeight: '1.5em', // Điều chỉnh dòng cao cho phù hợp với kiểu chữ
                        height: '3em' // Chiều cao cố định cho 2 dòng
                    }} gutterBottom variant="h6" component="div">
                        {name}
                    </Typography>
                    <Price price={price} origin={origin} fontSize={16} />
                </CardContent>
            </CardActionArea >
            <CardActions sx={{ paddingBottom: 2, paddingTop: 1,display: 'flex', justifyContent: 'space-between'}} disableSpacing>
                <Typography sx={{ fontSize: 11 }}>Đã bán 10</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton sx={{ alignItems: 'end' }} onClick={() => {
                        !isInWishList ? dispatch(wishlistAdd(product.data))
                            : dispatch(wishlistRemove(product.data))
                        const message = isInWishList
                            ? "Xóa khỏi wishlist thành công"
                            : "Thêm vào wishlist thành công"
                        toast.success(message, { autoClose: 1000, position: "bottom-left" })

                    }} >
                        {isInWishList
                            ? <FavoriteIcon color="error" />
                            : <FavoriteBorderIcon color="error" />}
                    </IconButton>
                    <Button
                        variant='contained'
                        sx={{
                            fontWeight: "bold",
                            borderRadius: 5,
                            fontSize: 11,
                        }}
                        color="primary"
                        endIcon={<AddShoppingCartIcon />}
                        onClick={() => {
                            dispatch(cartItemAdd({
                                product: product.data,
                                quantity: 1
                            }))
                            toast.success("Thêm vào giỏ hàng thành công", { autoClose: 1000, position: "bottom-left" })
                        }}
                    >
                        Thêm vào giỏ
                    </Button>
                </Box>
            </CardActions>
        </Card>
    )
}

export default ProductCard