import { Badge, Box, Card, CardContent, CardMedia, Divider, Grid, TextField, Typography } from '@mui/material';
import React from "react";
import PurchaseInformation from "../components/Payment/PurchaseInformation.tsx";
import Transport from "../components/Payment/Transport.tsx";
import PaymentType from "../components/Payment/PaymentType.tsx";
import { orders } from "../data/order.ts";
import OrderDetail from "../interfaces/IOrderDetail.ts";
import Button from "@mui/material/Button";
import PaymentBtn from "../components/Payment/PaymentBtn.tsx";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store.ts';
import TruncateText from '../components/TruncateText.tsx';

interface CardProductProps {
    detail: OrderDetail;
}

const CardProduct: React.FC<CardProductProps> = ({ detail }) => (
    <Card sx={{ marginBottom: 2, height: "100px" }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Badge badgeContent={detail.quantity} color="primary" sx={{ alignSelf: 'center', marginX: 1, marginBottom: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 50, height: 50, objectFit: 'cover' }}
                    image={detail.product.thumbnail}
                    alt={detail.product.name}
                />
            </Badge>
            <CardContent sx={{ flex: 1 }}>
                <Typography gutterBottom component="div">
                    <TruncateText maxLength={50}>
                        {detail.product.name}
                    </TruncateText>
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">
                        Số lượng: {detail.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Giá: {detail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </Typography>
                </Box>
            </CardContent>
        </Box>
    </Card>
);

const CardProductList = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const orderDetails: OrderDetail[] = cart.map(cartItem => (
        {
            id: 0,
            price: cartItem.product.price,
            product: cartItem.product,
            quantity: cartItem.quantity
        }
    ));
    return (
        <Box>
            {orderDetails.map((detail, index) => (
                <CardProduct key={index} detail={detail} />
            ))}
        </Box>
    );
};

const Payment: React.FC = () => {
    const order = useSelector((state:RootState)=>state.order)
    const dispatcher = 
    const createOrder = () => {

        console.log(order);
    }
    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <PurchaseInformation />
                        </Grid>
                        <Grid item xs={6}>
                            <Transport />
                            <PaymentType />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Đơn hàng ({orders.length} sản phẩm)
                            </Typography>
                            <CardProductList />
                            <Divider orientation="horizontal" flexItem />
                            <Box sx={{ padding: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={8}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Nhập mã giảm giá"
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                style: { backgroundColor: 'white', borderRadius: 4 }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            sx={{
                                                backgroundColor: "rgb(77, 182, 172)",
                                                padding: 1,
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: "rgb(57, 162, 152)",
                                                }
                                            }}
                                        >
                                            Áp dụng
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider orientation="horizontal" flexItem />
                            <Box sx={{ paddingY: 2 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Typography variant="body2">
                                        Tạm tính:
                                    </Typography>
                                    <Typography variant="body2">
                                        50000
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", paddingTop: 2 }}>
                                    <Typography variant="body2">
                                        Phí vận chuyển:
                                    </Typography>
                                    <Typography variant="body2">
                                        40000
                                    </Typography>
                                </Box>

                            </Box>
                            <Divider orientation="horizontal" flexItem />
                            <Typography variant="h6" sx={{ marginTop: 2 }}>
                                Tổng thanh toán: 90000
                            </Typography>
                            <PaymentBtn  handleCreateOrder={createOrder} />
                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Payment;
