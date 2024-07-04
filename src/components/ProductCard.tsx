import React from 'react'
import { Product } from '../interfaces/Product'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartItemAdd } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { wishlistAdd, wishlistRemove } from '../features/wishlist/wishlistSlice';
import { RootState } from '../app/store';
export const VNDNumericFormat = (prop: { price: number, styled?: React.CSSProperties }) => {
    return (
        <NumericFormat style={{ ...prop.styled }} value={prop.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
    )
}
const ProductCard = (product: { data: Product }) => {
    const { id, name, price, thumb } = product.data;
    const wishlist = useSelector((state: RootState) => state.wishlist);
    const isInWishList = wishlist.some(p => p.id === id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Card sx={{ minWidth: 210 }}>
            <CardActionArea onClick={() => {
                navigate("product-detail");
            }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={thumb}
                    sx={{
                        transition: "all 0.5s ease",
                        "&:hover": {
                            transform: "rotate(15deg) scale(0.8)",
                        }
                    }}
                />
                <CardContent>
                    <Typography sx={{ minHeight: 60 }} gutterBottom variant="h6" component="div">
                        {name}
                    </Typography>
                    <Typography fontWeight="bold" variant="h6" component="div">
                        <VNDNumericFormat price={price} />
                    </Typography>
                </CardContent>
            </CardActionArea >
            <CardActions sx={{ paddingY: 2 }}>
                <Button
                    variant='contained'
                    sx={{
                        fontWeight: "bold",
                        borderRadius: 5,
                        fontSize: 11,
                    }}
                    // size="large"
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
                <IconButton onClick={() => {
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
            </CardActions>
        </Card>
    )
}

export default ProductCard