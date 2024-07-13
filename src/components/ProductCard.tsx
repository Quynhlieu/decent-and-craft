import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Fade, IconButton, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '../app/store';
import { cartItemAdd } from '../features/cart/cartSlice';
import { wishlistAdd, wishlistRemove } from '../features/wishlist/wishlistSlice';
import { Product } from '../interfaces/Product';
import { Price } from '../pages/ProductDetail';
import { Padding } from '@mui/icons-material';

export const VNDNumericFormat = (prop: { price: number, styled?: React.CSSProperties }) => {
    return (
        <NumericFormat style={{ ...prop.styled }} value={prop.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
    );
};


const InfomationHover = (props: { product: Product }) => {
    const { product } = props;
    return (
        <Box>
            <Typography>Số lượng trong kho: {product.unitInStock}</Typography>
            <Typography>Lượt xem: {product.views}</Typography>
        </Box>
    );
};

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} sx={{paddingX:10}} TransitionComponent={Fade}
        TransitionProps={{ timeout: 400 }}
        slotProps={{
            popper: {
                modifiers: [
                    {
                        name: "offset",
                        options: {
                            offset: [0, -80],
                        }
                    }
                ]
            }
        }}
        classes={{ popper: className }} placement='top' />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: `rgba(255,255,255,0.8)`,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
        padding:`10px 20px`
    },
}));

const StyledCardWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    border: `2px solid transparent`,
    transition: 'border-color 0.3s',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    }
}));

const ProductCard = ({ data: product }: { data: Product }) => {
    const { id, name, price, thumbnail, origin } = product;
    const wishlist = useSelector((state: RootState) => state.wishlist);
    const isInWishList = wishlist.some(p => p.id === id);
    const dispatch = useDispatch();
    const quantitySold = 10;

    return (
        <StyledCardWrapper>
            <Card sx={{
                minWidth: 150,
                height: "auto",
                transition: "border-color 0.3s",
                borderColor: "transparent",
                "&:hover": {
                    boxShadow: 6, // Tăng mức độ shadow để có hiệu ứng rõ ràng
                    borderColor: "primary.main"
                }
            }}>
                <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CardActionArea>
                        <LightTooltip title={<InfomationHover product={product} />}>
                            <CardMedia
                                component="img"
                                height="220"
                                image={thumbnail}
                                sx={{
                                    transition: "all 0.5s ease",
                                    "&:hover": {
                                        // transform: "rotate(15deg) scale(0.8)",
                                        transform: "scale(1.1)",
                                    }
                                }}
                            />
                        </LightTooltip>

                        <CardContent sx={{ paddingBottom: 0 }}>
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
                    </CardActionArea>
                </Link>
                <CardActions sx={{ padding: 2, paddingTop: 1, display: 'flex', justifyContent: 'space-between' }} disableSpacing>
                    <Typography sx={{ fontSize: 13 }}>Đã bán {quantitySold}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton sx={{ alignItems: 'end' }} onClick={() => {
                            !isInWishList ? dispatch(wishlistAdd(product))
                                : dispatch(wishlistRemove(product));
                            const message = isInWishList
                                ? "Xóa khỏi wishlist thành công"
                                : "Thêm vào wishlist thành công";
                            toast.success(message, { autoClose: 1000, position: "bottom-left" });
                        }}>
                            {isInWishList
                                ? <FavoriteIcon color="error" />
                                : <FavoriteBorderIcon color="error" />}
                        </IconButton>
                        <LightTooltip title="Thêm vào giỏ hàng">
                            <Button
                                variant='contained'
                                sx={{
                                    fontWeight: "bold",
                                    borderRadius: 5,
                                    fontSize: 10,
                                }}
                                color="primary"
                                onClick={() => {
                                    dispatch(cartItemAdd({
                                        product,
                                        quantity: 1
                                    }));
                                    toast.success("Thêm vào giỏ hàng thành công", { autoClose: 1000, position: "bottom-left" });
                                }}
                            >
                                {<AddShoppingCartIcon />}
                                {/* Thêm vào giỏ */}
                            </Button>
                        </LightTooltip>
                    </Box>
                </CardActions>
            </Card>
        </StyledCardWrapper>
    );
}

export default ProductCard;
