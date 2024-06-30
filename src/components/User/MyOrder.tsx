import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import DataTable, {TableColumn} from 'react-data-table-component';
import styled, { keyframes } from 'styled-components';
import carouse1 from "../../assets/carousels/carousel1.jpg";
import InfoIcon from '@mui/icons-material/Info';
import MyOrderDetail from "./MyOrderDetail.tsx";
import OrderDetail from "../../interfaces/IOrderDetail.ts";

interface Order {
    id: number;
    productName: string;
    quantity: number;
    price: number;
    total: number;
    status: string;
    orderDate: string;
    image: string;
    orderDetail: OrderDetail[];
}

// Khai báo keyframe cho spinner
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled component cho Spinner
const Spinner = styled.div`
	margin: 16px;
	animation: ${rotate360} 1s linear infinite;
	transform: translateZ(0);
	border-top: 2px solid grey;
	border-right: 2px solid grey;
	border-bottom: 2px solid grey;
	border-left: 4px solid black;
	background: transparent;
	width: 80px;
	height: 80px;
	border-radius: 50%;
`;

// Cột mới: Tên sản phẩm
const productNameColumn: TableColumn<Order> = {
    name: 'Tên sản phẩm',
    selector: (row) => row.productName,
    sortable: true,
    cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
                src={row.image}
                alt={row.productName}
                style={{ marginRight: '10px', width: '40px', height: '40px', borderRadius: 50 }}
            />
            <span>{row.productName}</span>
        </div>
    ),
};

// Cột mới: Số lượng
const quantityColumn:TableColumn<Order> = {
    name: 'Số lượng',
    selector: row => row.quantity,
    sortable: true,
};

// Cột mới: Giá
const priceColumn:TableColumn<Order> = {
    name: 'Giá',
    selector: row => row.price,
    sortable: true,
};

// Cột mới: Tổng tiền
const totalColumn:TableColumn<Order> = {
    name: 'Tổng tiền',
    selector: row => row.total,
    sortable: true,
};

// Cột mới: Trạng thái đơn hàng
const statusColumn:TableColumn<Order> = {
    name: 'Trạng thái đơn hàng',
    selector: row => row.status,
    sortable: true,
};

// Cột mới: Ngày đặt hàng
const orderDateColumn:TableColumn<Order> = {
    name: 'Ngày đặt hàng',
    selector: row => row.orderDate,
    sortable: true,
};

// Cột mới: Chức năng

const CustomLoader = () => (
    <div style={{ padding: '24px' }}>
        <Spinner />
        <div>Fancy Loader...</div>
    </div>
);
const data = [
    {
        id: 1,
        productName: 'Áo phông',
        quantity: 2,
        price: 250000,
        total: 500000,
        status: 'Đang xử lý',
        orderDate: '2024-06-04',
        image: carouse1,
        orderDetail:
    },
    {
        id: 2,
        productName: 'Quần jean',
        quantity: 1,
        price: 350000,
        total: 350000,
        status: 'Đã giao hàng',
        orderDate: '2024-06-02',
        image: carouse1,
    },
];

const MyOrder = () => {
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState<Order[]>([]);
    const [openDetail, setOpenDetail] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

    const handleClickOpen = (order: Order) => {
        setSelectedOrder(order);
        setOpenDetail(true);
    };

    const handleCloseDetail = () => {
        setOpenDetail(false);
        setSelectedOrder(null);
    };

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    const orderFeatureColumn: TableColumn<Order> = {
        name: 'Chức năng',
        cell:(row)  => (
            <IconButton aria-label="info" onClick={() =>
                {
                    handleClickOpen(row)
                }}>
                <InfoIcon />
            </IconButton>
        ),
        ignoreRowClick: true,  // Sự kiện click không được truyền đến hàng
        allowOverflow: true,   // Cho phép nội dung tràn ra ngoài cell nếu cần thiết
        button: true,
    };
    return (
        <Box sx={{ height: 500, width: 800 }}>
            <Typography variant='h3' sx={{
                textAlign: 'center',
                position: 'relative',
                marginBottom: '20px',
            }}>
                Đơn hàng của bạn
            </Typography>
            <DataTable
                columns={[
                    productNameColumn,
                    quantityColumn,
                    priceColumn,
                    totalColumn,
                    statusColumn,
                    orderDateColumn,
                    orderFeatureColumn,
                ]}
                data={rows}
                progressPending={pending}
                progressComponent={<CustomLoader />}
                pagination
            />
            <MyOrderDetail open={openDetail}
                           onClose={handleCloseDetail}
                           order={selectedOrder}/>
        </Box>

    );
}

export default MyOrder;
