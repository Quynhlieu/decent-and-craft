import React from 'react';
import Order from "../../interfaces/IOrder.ts";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

interface TotalAmountProps {
    order: Order;
}

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

const TotalAmount: React.FC<TotalAmountProps> = ({ order }) => {
    if (!order) return null;
    const totalItemsPrice = order.orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingFee = order.shippingFee;
    const voucherDiscount = order.voucher ? order.voucher.amount : 0;
    const finalPrice = totalItemsPrice + shippingFee - voucherDiscount;
    type RowsType = {
        name: string,
        value: string,
    }
    let rows: RowsType[] = [
        {
            name: "Tổng tiền hàng",
            value: formatCurrency(totalItemsPrice),
        },
        {
            name: "Phí vận chuyển",
            value: formatCurrency(shippingFee),
        },
        {
            name: "Thành tiền",
            value: formatCurrency(finalPrice),
        },
        {
            name: "Phương thức thanh toán:",
            value: order.shipment,
        },
    ];
    if (voucherDiscount) {
        const voucherRow = {
            name: "Áp dụng Voucher",
            value: formatCurrency(-voucherDiscount)
        };
        rows.splice(2, 0, voucherRow)
    }

    return (
        <Box sx={{ padding: '16px', borderBottom: '1px solid #ddd' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                Tổng tiền
            </Typography>
            <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right"
                                    sx={row.name === "Thành tiền" ?
                                        { color: "red", fontWeight: 'bold', fontSize: '20px' }
                                        : {}}>
                                    {row.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TotalAmount;
