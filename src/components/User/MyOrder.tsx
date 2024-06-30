import React from 'react';
import { Box, Typography } from "@mui/material";
import DataTable, {TableColumn} from 'react-data-table-component';
import styled, { keyframes } from 'styled-components';
import carouse1 from "../../assets/carousels/carousel1.jpg";


interface Order {
    id: number;
    productName: string;
    quantity: number;
    price: number;
    total: number;
    status: string;
    orderDate: string;
    image: string;
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

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

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
                ]}
                data={rows}
                progressPending={pending}
                progressComponent={<CustomLoader />}
                pagination
            />
        </Box>
    );
}

export default MyOrder;
