import {Box, IconButton} from "@mui/material";
import DataTable, {TableColumn} from "react-data-table-component";
import MyOrderDetail from "./MyOrderDetail.tsx";
import React from "react";
import {orders} from "../../data/order.ts";
import InfoIcon from "@mui/icons-material/Info";
import User from "../../interfaces/IUser.ts";
import Address from "../../interfaces/IAddess.ts";
import OrderDetail from "../../interfaces/IOrderDetail.ts";
import Voucher from "../../interfaces/IVoucher.ts";
import styled, {keyframes} from "styled-components";
interface Order {
    id: number;
    user: User;
    paymentMethod: string;
    shippingFee: number;
    address: Address;
    orderDetail: OrderDetail[];
    voucher?: Voucher;
    status: string;
    orderDate: string;
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
    selector: (row) => row.orderDetail[0].product.name,
    sortable: true,
    cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
                src={row.orderDetail[0]?.product.thumb || ''}
                alt={row.orderDetail[0]?.product.name || ''}
                style={{marginRight: '10px', width: '40px', height: '40px', borderRadius: 50}}
            />
            <span style={{
                display: 'inline-block',
                maxWidth: '240px',  // Đặt kích thước tối đa cho tên sản phẩm
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                {row.orderDetail[0]?.product.name || ''}
            </span>
        </div>
    ),
    width: '265px',
};

// // Cột mới: Số lượng
// const quantityColumn: TableColumn<Order> = {
//     name: 'Số lượng',
//     selector: row => row.orderDetail[0].quantity,
//     sortable: true,
// };
//
// // Cột mới: Giá
// const priceColumn: TableColumn<Order> = {
//     name: 'Giá',
//     selector: row => row.orderDetail[0].price,
//     sortable: true,
// };

// Cột mới: Tổng tiền
const totalColumn:TableColumn<Order> = {
    name: 'Tổng tiền',
    selector: row => {
        const totalOrderDetail = row.orderDetail.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const discount = row.voucher?.discount ?? 0;
        const shippingFee = row.shippingFee ?? 0;
        return totalOrderDetail - discount - shippingFee;
    },
    sortable: true,
};

// Cột mới: Trạng thái đơn hàng
const statusColumn:TableColumn<Order> = {
    name: 'Trạng thái đơn hàng',
    selector: row => row.status,
    sortable: true
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

const tableCustomStyles = {
    headRow: {
        style: {
            color:'#223336',
            backgroundColor: "#b7b3b3"
        },
    },
    rows: {
        style: {
            backgroundColor: "#f3f0f0"
        },
    }
}
interface MyDataTableProps {
    filter: string;
}

const MyDataTable: React.FC<MyDataTableProps> = ({ filter }) => {
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
            setRows(orders);
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
        // allowOverflow: true,   // Cho phép nội dung tràn ra ngoài cell nếu cần thiết
        // button: true,
    };

    const filteredRows = rows.filter((row) => {
        switch (filter) {
            case 'pending':
                return row.status === 'Đơn hàng đã được đặt';
            case 'shipping':
                return row.status === 'Vận chuyển';
            case 'completed':
                return row.status === 'Đã nhận được hàng';
            case 'cancelled':
                return row.status === 'Đã hủy';
            case 'returned':
                return row.status === 'Trả hàng/ hoàn tiền';
            case 'all':
            default:
                return true;
        }
    });
    return (
        <Box >
            <DataTable
                columns={[
                    productNameColumn,
                    // quantityColumn,
                    // priceColumn,
                    totalColumn,
                    statusColumn,
                    orderDateColumn,
                    orderFeatureColumn,

                ]}
                data={filteredRows}
                progressPending={pending}
                progressComponent={<CustomLoader />}
                pagination
                striped
                customStyles={tableCustomStyles}
            />
            <MyOrderDetail open={openDetail}
                           onClose={handleCloseDetail}
                           order={selectedOrder}
            />
        </Box>
    );
}

export default MyDataTable