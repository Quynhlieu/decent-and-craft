import React from 'react';
import { Box, Grid, Typography } from "@mui/material";
import Order from "../../interfaces/IOrder.ts";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store.ts';

export interface UserInfo {
    fullName: string | undefined;
    email: string | undefined;
    phone: string | undefined;
}
interface BillDetailsProps {
    order: Order;
}
const BillDetails: React.FC<BillDetailsProps> = ({ order }) => {
    const user = useSelector((state: RootState) => state.user).user;
    const userInfo: UserInfo = user ? {
        email: user.email,
        fullName: user.fullName,
        phone: user.phone
    } : {
        email: "Không có",
        fullName: "Không có",
        phone: "Không có"
    };
    return (
        <Box sx={{ padding: '16px', borderBottom: '1px solid #ddd' }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                        Thông tin khách hàng:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingLeft: '10px' }}>
                        <Typography variant="body1">
                            <strong>Họ và tên:</strong> {userInfo.fullName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email:</strong> {userInfo.email}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Số điện thoại:</strong> {userInfo.phone
                                ? userInfo.phone
                                : "Không có"
                            }
                        </Typography>
                        <Typography variant="body1">
                            <strong>Địa chỉ:</strong> {order.address.description}, {order.address.ward}, {order.address.district}, {order.address.province}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Thông tin người nhận:</strong> {order.address.fullName} - {order.address.phoneNumber}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Ghi chú:</strong> {order.notice ?? "Không có"}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                        Thông tin từ cửa hàng:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingLeft: '10px' }}>
                        <Typography variant="body1">
                            <strong>Tên cửa hàng:</strong> Decent&Craft
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email cửa hàng:</strong> decentcraft@example.com
                        </Typography>
                        <Typography variant="body1">
                            <strong>Số điện thoại cửa hàng:</strong> 0123456789
                        </Typography>
                        <Typography variant="body1">
                            <strong>Địa chỉ cửa hàng:</strong> 123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh
                        </Typography>
                    </Box>
                </Grid>

            </Grid>
        </Box>
    );
};

export default BillDetails;