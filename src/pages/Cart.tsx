import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import CancelIcon from '@mui/icons-material/Cancel';
import { CartItem, cartItemRemove, cartUpdate } from '../features/cart/cartSlice'
import { toast } from 'react-toastify'
import { VNDNumericFormat } from '../components/ProductCard'
import { grey } from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const QuantityButton = (prop: { cartItem: CartItem }) => {
    const { cartItem } = prop;
    const dispatch = useDispatch();
    const baseSx = {
        borderRadius: 50,
        background: grey[200],
        border: '1px solid #e0e0e0',
        height: 30,
    };
    return (
        <Stack sx={baseSx} direction="row" >
            <Button size='small' sx={{ minWidth: 0 }}
                onClick={() => {
                    dispatch(cartUpdate({
                        productId: cartItem.product.id,
                        value: -1
                    }))
                }}
                endIcon={<RemoveIcon />} />
            <TextField
                className="text-field"
                type="tel"
                sx={{ width: 10 }}
                // onChange={handleQuantity}
                value={cartItem.quantity}
            />
            <Button sx={{ minWidth: 0 }}
                onClick={() => {
                    dispatch(cartUpdate({
                        productId: cartItem.product.id,
                        value: 1
                    }))
                }}
                startIcon={<AddIcon />} />
        </Stack>
    )
}
const CartTable = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const columns = [
        {
            name: "SAN PHAM",
            minWidth: "400px",
            cell: (row: any) => {
                return (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
                        <CancelIcon onClick={() => {
                            dispatch(cartItemRemove(row.product.id));
                            toast.error("Xóa sản phẩm khỏi giỏ hàng thành công",
                                { autoClose: 1000, position: "bottom-left" })
                        }} color='warning' sx={{ "&:hover": { color: "black" } }} />
                        <img width={60} height={60} src={row.product.thumb} />
                        <Typography>
                            {row.product.name}
                        </Typography>
                    </Stack>
                )
            }
        },
        {
            name: "GIA",
            cell: (row: any) => <VNDNumericFormat styled={{ fontWeight: "bold" }} price={row.product.price} />
        },
        {
            name: "SO LUONG",
            cell: (row: any) =>
                <QuantityButton cartItem={row} />
        },
        {
            name: "TONG TIEN",
            cell: (row: any) => <VNDNumericFormat styled={{ fontWeight: "bold" }} price={row.product.price * row.quantity} />
        }
    ]
    return (
        // <table>
        //     <thead>
        //         <tr style={{ fontWeight: "bold" }}>
        //             <td style={{ padding: "0 24px", width: 360 }} >SẢN PHẨM</td>
        //             <td style={{ padding: "0 24px" }} >GIÁ</td>
        //             <td style={{ padding: "0 24px" }} >SỐ LƯỢNG</td>
        //             <td style={{ padding: "0 24px" }} >TỔNG TIỀN</td>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {cart.map(cartItem => {
        //             return <tr>
        //                 <td>
        //                     <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
        //                         <CancelIcon onClick={() => {
        //                             dispatch(cartItemRemove(cartItem.product.id));
        //                             toast.error("Xóa sản phẩm khỏi giỏ hàng thành công",
        //                                 { autoClose: 1000, position: "bottom-left" })
        //                         }} color='warning' sx={{ "&:hover": { color: "black" } }} />
        //                         <img width={60} height={60} src={cartItem.product.thumb} />
        //                         <Typography>
        //                             {cartItem.product.name}
        //                         </Typography>
        //                     </Stack>
        //                 </td>
        //                 <td>
        //                     <strong>
        //                         <VNDNumericFormat price={cartItem.product.price} />
        //                     </strong>
        //                 </td>
        //                 <td>
        //                     <QuantityButton cartItem={cartItem} />
        //                 </td>
        //                 <td>
        //                     <strong>
        //                         <VNDNumericFormat price={cartItem.product.price * cartItem.quantity} />
        //                     </strong>
        //                 </td>
        //             </tr>
        //         })}
        //     </tbody>
        // </table>
        <DataTable columns={columns} data={cart} />
    )
}
const Cart = () => {
    return (
        <Grid sx={{ mt: 3 }} container>
            <Grid xs={8} item>
                <Box >
                    <CartTable />
                </Box>
            </Grid>
            <Grid xs={4} item>
                <Box bgcolor="green">
                    abc
                </Box>
            </Grid>
        </Grid>
    )
}

export default Cart