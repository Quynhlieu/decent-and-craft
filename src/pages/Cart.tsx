import {Box, Button, Divider, Grid, Stack, TextField, Typography} from '@mui/material'
import React, {useState} from 'react'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../app/store'
import CancelIcon from '@mui/icons-material/Cancel';
import {CartItem, cartItemRemove, cartUpdate, getTotalPrice} from '../features/cart/cartSlice'
import {toast} from 'react-toastify'
import {VNDNumericFormat} from '../components/ProductCard'
import {grey} from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SellIcon from '@mui/icons-material/Sell';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
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
    const customStyle = {
        headCells: {
            style: {
                fontSize: '16px', // override the cell padding for head cells
                fontWeight: "bold"
            },
        },
        rows: {
            style: {
                padding: "10px 0"
            }
        }
    }
    const columns = [
        {
            name: "SẢN PHẨM",
            minWidth: "400px",
            cell: (row: CartItem) => {
                return (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
                        <CancelIcon onClick={() => {
                            dispatch(cartItemRemove(row.product.id));
                            toast.error("Xóa sản phẩm khỏi giỏ hàng thành công",
                                { autoClose: 1000, position: "bottom-left" })
                        }} color='warning' sx={{ "&:hover": { color: "black" } }} />
                        <img width={60} height={60} src={row.product.thumbnail} />
                        <Typography>
                            {row.product.name}
                        </Typography>
                    </Stack>
                )
            }
        },
        {
            name: "GIÁ",
            cell: (row: CartItem) => <VNDNumericFormat styled={{ fontWeight: "bold" }} price={row.product.price} />
        },
        {
            name: "SỐ LƯỢNG",
            cell: (row: CartItem) =>
                <QuantityButton cartItem={row} />
        },
        {
            name: "TỔNG TIỀN",
            cell: (row: CartItem) => <VNDNumericFormat styled={{ fontWeight: "bold" }} price={row.product.price * row.quantity} />
        }
    ]
    return (
        <DataTable customStyles={customStyle} columns={columns} data={cart} />
    )
}
const PriceRow = (prop: { name: string, price: number, styled?: React.CSSProperties }) => {
    const { name, price, styled } = prop;
    return (
        <Box sx={{
            display: "flex",
            mt: 2,
            justifyContent: "space-between"
        }}>
            <Typography variant='body1'>
                {name}
            </Typography>
            <VNDNumericFormat styled={{ ...styled, fontWeight: "bold" }} price={price} />
        </Box>
    )
}
const VoucherItem = () => {
    const MySwal = withReactContent(Swal)
    return (
        <Button onClick={() => {
            navigator.clipboard.writeText("DBT19");
            MySwal.fire({
                title: "Lưu mã giảm giá thành công",
                icon: "success",
            })
        }} size='small' variant='outlined'>
            DBT19
        </Button>
    )
}

const Cart = () => {
    const MySwal = withReactContent(Swal)

    const navigate = useNavigate();
    const cart = useSelector((state: RootState) => state.cart);
    const [discount, setDiscount] = useState<number>(0);
    const [voucherCode, setVoucherCode] = useState<string>("");
    const handleApplyVoucher = () => {
        if (voucherCode === "DBT19") {

            MySwal.fire({
                title: "Sử dụng mã giảm giá thành công",
                icon: "success",
            })
            setDiscount(20000);
        }
    }
    return (
        cart.length ? <Grid sx={{ mt: 3, mb: 20 }} spacing={3} container>
            <Grid xs={8} sx={{ pr: 2 }} item>
                <CartTable />
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                    variant='outlined' sx={{
                        mt: 2,
                        "&:hover": {
                            backgroundColor: "primary.main",
                            color: "white"
                        }
                    }}
                    startIcon={<KeyboardBackspaceIcon />}
                >
                    <strong>TIẾP TỤC MUA SẮM</strong>
                </Button>
            </Grid>
            <Divider orientation="vertical"
                flexItem
                sx={{
                    mr: "-3px",
                    borderRightWidth: 3,
                    mt: 5
                }} />
            <Grid xs={4} item>
                <Stack sx={{ mt: 2 }}>
                    <Typography>
                        <strong>CỘNG GIỎ HÀNG</strong>
                        <Divider sx={{ mt: 1.5, borderBottomWidth: 2 }} />
                    </Typography>
                    <PriceRow name='Tổng phụ' price={getTotalPrice(cart)} />
                    <Divider sx={{ mt: 1 }} />
                    {discount > 0 && <Box>
                        <PriceRow styled={{ color: "red" }} name='Voucher giảm giá' price={-discount} /> <Divider sx={{ mt: 1 }} />
                    </Box>}
                    <PriceRow name='Tổng cộng' price={getTotalPrice(cart) - discount} />
                    <Divider sx={{ mt: 1, borderBottomWidth: 3 }} />
                    <Stack direction="row" sx={{ mt: 2 }}>
                        <Typography color="secondary.main" >
                            <SellIcon fontSize='small' />
                            <strong>Voucher</strong>
                        </Typography>
                        <Stack sx={{ ml: 3 }} spacing={2} direction="row">
                            <VoucherItem />
                            <VoucherItem />
                            <VoucherItem />
                        </Stack>
                    </Stack>
                    <Divider sx={{ mt: 1, borderBottomWidth: 3 }} />
                    <TextField sx={{ mt: 2 }}
                        size='small'
                        placeholder='Mã giảm giá'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setVoucherCode(event.target.value);
                        }}>
                    </TextField>
                    <Button onClick={handleApplyVoucher} sx={{ mt: 2 }} variant='contained'>
                        Áp dụng
                    </Button>
                    <Divider sx={{ mt: 1, borderBottomWidth: 3 }} />
                    <Button sx={{ mt: 2 }} color='warning' variant='contained' onClick={() => { navigate("/pay") }}>
                        <strong>  TIẾN HÀNH THANH TOÁN</strong>
                    </Button>
                </Stack>
            </Grid>
        </Grid>
            : <Box sx={{ my: 10 }} >
                <Typography textAlign="center" variant='h3'>
                    Chưa có sản phẩm nào trong giỏ hàng
                </Typography>
                <Box textAlign="center">
                    <SentimentVeryDissatisfiedIcon color='primary' sx={{ fontSize: 100 }} />
                </Box>
            </Box>
    )
}

export default Cart