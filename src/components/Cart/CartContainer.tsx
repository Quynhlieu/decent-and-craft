import {Box, Button, Paper, Stack, Typography} from '@mui/material'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../app/store'
import {VNDNumericFormat} from '../ProductCard'
import {CartItem, cartItemRemove, getTotalPrice} from '../../features/cart/cartSlice'
import CancelIcon from '@mui/icons-material/Cancel';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

type CartItemListType = {
    cartItems: CartItem[];
}
const CartItemComponent = (prop: { cartItem: CartItem }) => {
    const cartItem = prop.cartItem;
    const dispatch = useDispatch();
    return (
        <Stack direction="row" spacing={2}
            sx={{
                borderBottom: "1px solid rgba(0,0,0,0.2)",
                pb: 2
            }} >
            <img width={50} height={50} src={cartItem.product.thumb} />
            <Box textAlign="left" minWidth={250}>
                <Typography>
                    <strong>
                        {cartItem.product.name}
                    </strong>
                </Typography>
                <Stack direction="row" >
                    <Typography>
                        {cartItem.quantity}x
                    </Typography>
                    <VNDNumericFormat price={cartItem.product.price} />
                </Stack>
            </Box>
            <CancelIcon onClick={() => {
                dispatch(cartItemRemove(cartItem.product.id));
                toast.error("Xóa sản phẩm khỏi giỏ hàng thành công",
                    { autoClose: 1000, position: "bottom-left" })
            }} color='warning' sx={{ "&:hover": { color: "black" } }} />
        </Stack>
    )
}
const CartItemList = (prop: CartItemListType) => {
    const cartItems = prop.cartItems;
    return (
        <Stack spacing={2}>
            {cartItems.map(cartItem => <CartItemComponent cartItem={cartItem} />)}
        </Stack>
    )

}
const CartContainer = (prop: { showCart: boolean, onMouseOut: any }) => {
    const { showCart } = prop;
    const cart = useSelector((state: RootState) => state.cart)
    const navigate = useNavigate();
    return (
        <Paper
            onMouseOut={prop.onMouseOut}
            elevation={5}
            className='p-absolute'
            sx={{
                p: 2,
                minWidth: 250,
                top: 30,
                right: 0,
                zIndex: 10,
                visibility: showCart ? "visible" : "hidden"
            }} >
            {cart.length ? <Stack spacing={2} >
                <CartItemList cartItems={cart} />
                <Typography>Tong tien: <strong><VNDNumericFormat price={getTotalPrice(cart)} /></strong></Typography>
                <Button onClick={() => { navigate("cart") }} variant='contained'>Xem gio hang</Button>
                <Button color="error" variant='contained'>Thanh Toan</Button>
            </Stack> : <Typography>
                Chưa có sản phẩm trong giỏ hàng
            </Typography>}
        </Paper>
    )
}

export default CartContainer
