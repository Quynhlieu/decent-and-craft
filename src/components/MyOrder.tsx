import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Avatar } from "@mui/material";
import "../assets/user.css"

const columns = [
    { field: 'id', headerName: 'ID', width: 70 , headerClassName: 'custom-header'},
    { field: 'product', headerName: 'Sản phẩm', width: 310,
        headerClassName: 'custom-header',
        renderCell: (params) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ mr: 2 }} src={`/path/to/${params.row.product}.jpg`} alt={params.row.product} />
                <Typography>{params.row.product}</Typography>
            </Box>
        )
    },
    { field: 'quantity', headerName: 'Số lượng', type: 'number', width: 150, headerClassName: 'custom-header' },
    { field: 'price', headerName: 'Giá', type: 'number', width: 150 , headerClassName: 'custom-header'},
    { field: 'total', headerName: 'Tổng tiền', type: 'number', width: 180 , headerClassName: 'custom-header'},
];

const rows = [
    { id: 1, product: 'Áo thun', quantity: 2, price: 10, total: 20 },
    { id: 2, product: 'Quần jeans', quantity: 1, price: 25, total: 25 },
    { id: 3, product: 'Giày sneakers', quantity: 1, price: 30, total: 30 },
    { id: 4, product: 'Mũ snapback', quantity: 3, price: 15, total: 45 },
    { id: 5, product: 'Balo đựng laptop', quantity: 1, price: 50, total: 50 },
];

const MyOrder = () => {
    return (
        <Box sx={{ height: 500, width: 950 }}>
            <Typography variant='h3' sx={{
                textAlign: 'center',
                position: 'relative',
                marginBottom: '20px',
            }}>
                Đơn hàng của bạn
            </Typography>
            <div style={{ width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    autoHeight
                    checkboxSelection
                    headerClassName="custom-header"
                />
            </div>
        </Box>
    );
}

export default MyOrder;
