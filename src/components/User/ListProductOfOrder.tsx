import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Tooltip,
    Typography
} from "@mui/material";
import React from "react";
import SmsIcon from '@mui/icons-material/Sms';
import InfoIcon from '@mui/icons-material/Info';
import {OrderStatus} from "../../interfaces/IOrder.ts";
import OrderDetail from "../../interfaces/IOrderDetail.ts";
import Address from "../../interfaces/IAddress.ts";
import Voucher from "../../interfaces/IVoucher.ts";
import IUser from "../../interfaces/IUser.ts";

interface DataType {
    createdDate: string;
    id: number;
    address: Address;
    status: OrderStatus;
    voucher?: Voucher;
    user: IUser;
    orderDetails: OrderDetail[];
    shipment: string;
    notice: string;
    shippingFee: number;
    totalPrice: number;
}
interface ListProductOfOrderProps {
    order: DataType | null;
}
interface CardProductProps {
    detail: OrderDetail;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day}/${month}/${year} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};
const CardProduct: React.FC<CardProductProps> = ({ detail }) => (
    <Card sx={{ marginBottom: 2 }}>
        <CardActionArea>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 140 }}
                    image={detail.product.thumbnail}
                    alt={detail.product.name}
                />
                <CardContent sx={{ flex: 1 }}>

                    <Typography gutterBottom sx={{ fontSize: '1rem' }} component="div">
                        {detail.product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Số lượng: {detail.quantity}
                    </Typography>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="body2" color="black" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                            Giá: {detail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </Typography>
                    </Box>
                    <Button variant="outlined"  sx={{ fontSize: 10 }}>
                        Đổi trả miễn phí trong vòng 15 ngày
                    </Button>

                </CardContent>
            </Box>
        </CardActionArea>
    </Card>
);

const CardProductList: React.FC<ListProductOfOrderProps> = ({ order }) => {
    if (!order) return null;

    return (
        <Box>
            {order.orderDetails.map((detail, index) => (
                <CardProduct key={index} detail={detail} />
            ))}
        </Box>
    );
};

const ListProductOfOrder: React.FC<ListProductOfOrderProps> = ({ order }) => (
    <Box sx={{ width: "100%", flexGrow: 1, marginY: 3 }}>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ flex: 1, display: "flex" }}>
                        <Button variant="outlined" color="error" sx={{ marginRight: 1 }}>
                            Yêu thích
                        </Button>
                        <Typography sx={{ textAlign: "center", alignContent: "center", marginRight: 1 }}>
                            Decent and craft
                        </Typography>
                        <Button variant="contained" startIcon={<SmsIcon />}>
                            Chat
                        </Button>
                    </Box>
                    <Tooltip title= {order && formatDate(order.createdDate)} arrow>
                        <InfoIcon />
                    </Tooltip>

                </Box>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Divider orientation="horizontal" flexItem sx={{ height: '100%' }} />
            </Grid>
            <Grid item xs={12} spacing={1}>
                <CardProductList order={order} />
            </Grid>
        </Grid>
    </Box>
);

export default ListProductOfOrder;
