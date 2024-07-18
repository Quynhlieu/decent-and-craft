import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import CancelIcon from '@mui/icons-material/Cancel';
import { CartItem, cartItemRemove, cartUpdate, getTotalPrice } from '../features/cart/cartSlice'
import { toast } from 'react-toastify'
import { VNDNumericFormat } from '../components/ProductCard'
import { grey } from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { StyledLink } from '../components/BlogCarousel'
const QuantityButton = (prop: { cartItem: CartItem }) => {
    const { cartItem } = prop;
    const dispatch = useDispatch();
    const [localQuantity, setLocalQuantity] = useState(cartItem.quantity);

    const handleBlur = () => {
        if (localQuantity <= 0) {
            setLocalQuantity(cartItem.quantity); // Revert to the previous valid quantity
        } else if (localQuantity > cartItem.product.unitInStock) {
            setLocalQuantity(cartItem.quantity); // Revert to the previous valid quantity
        } else {
            dispatch(cartUpdate({
                productId: cartItem.product.id,
                value: localQuantity - cartItem.quantity
            }));
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantityValue = parseInt(event.target.value, 10);
        if (!isNaN(quantityValue)) {
            setLocalQuantity(quantityValue);
        }
    };
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
                    if (localQuantity > 0) {
                        setLocalQuantity(pre => pre - 1)
                    }
                }}
                endIcon={<RemoveIcon />} />
            <TextField
                className="text-field"
                type="tel"
                value={localQuantity}
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ width: 10 }}
            />
            <Button sx={{ minWidth: 0 }}
                onClick={() => {
                    dispatch(cartUpdate({
                        productId: cartItem.product.id,
                        value: 1
                    }))
                    if (localQuantity + 1 < cartItem.product.unitInStock)
                        setLocalQuantity(pre => pre + 1)
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
                        <StyledLink to={"/product/" + row.product.id} >
                            {row.product.name}
                        </StyledLink>
                    </Stack >
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

const Cart = () => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const cart = useSelector((state: RootState) => state.cart);
    const user = useSelector((state: RootState) => state.user);
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
                    <PriceRow name='Phí vận chuyển' styled={{ color: "red" }} price={20000} />
                    <Divider sx={{ mt: 1 }} />
                    <PriceRow name='Tổng cộng' price={getTotalPrice(cart) + 20000} />
                    <Divider sx={{ mt: 1, borderBottomWidth: 3 }} />
                    <Button sx={{ mt: 2 }} color='warning'
                        variant='contained'
                        onClick={() => {
                            if (!user.user) {
                                MySwal.fire({
                                    title: "Vui lòng đăng nhập để có thể thanh toán",
                                    icon: "warning",
                                })
                                navigate("/login")
                                return;
                            }
                            navigate("/pay")

                        }}>
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