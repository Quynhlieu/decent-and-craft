import React from 'react';
import Order from "../../interfaces/IOrder.ts";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

interface ItemListProps {
    order: Order;
}

const ItemList: React.FC<ItemListProps> = ({ order }) => {
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <Box sx={{ padding: '16px', borderBottom: '1px solid #ddd' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                Danh sách sản phẩm:
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Mã sản phẩm</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tên sản phẩm</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Giá</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Số lượng</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Tổng tiền</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.orderDetail.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {item.product.id}
                                </TableCell>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">{formatCurrency(item.price * item.quantity)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ItemList;
