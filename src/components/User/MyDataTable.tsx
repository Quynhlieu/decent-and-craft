import {Box, IconButton} from "@mui/material";
import DataTable, {TableColumn} from "react-data-table-component";
import MyOrderDetail from "./MyOrderDetail.tsx";
import React, {useEffect, useState} from "react";
import InfoIcon from "@mui/icons-material/Info";
import styled, {keyframes} from "styled-components";
import {OrderStatus} from "../../interfaces/IOrder.ts";
import Address from "../../interfaces/IAddress.ts";
import Voucher from "../../interfaces/IVoucher.ts";
import IUser from "../../interfaces/IUser.ts";
import OrderDetail from "../../interfaces/IOrderDetail.ts";
import { formatDate } from "../../utils/DateFormater.ts";

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
const productNameColumn: TableColumn<DataType> = {
    name: 'ID đơn hàng',
    selector: (row) => row.id,
    sortable: true,
};

// Cột mới: Tổng tiền
const totalColumn:TableColumn<DataType> = {
    name: 'Tổng tiền',
    selector: row => {
        const totalOrderDetail = row.orderDetails.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const discount = row.voucher?.amount ?? 0;
        const shippingFee = row.shippingFee ?? 0;
        const totalPrice = totalOrderDetail - discount + shippingFee;
        return totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    },
    sortable: true,
};

// Cột mới: Trạng thái đơn hàng
const statusColumn:TableColumn<DataType> = {
    name: 'Trạng thái đơn hàng',
    selector: row => {
        switch (row.status) {
            case OrderStatus.CHO_VAN_CHUYEN:
                return 'Chờ vận chuyển';
            case OrderStatus.DANG_VAN_CHUYEN:
                return 'Đã giao cho đơn vị vận chuyển';
            case OrderStatus.HOAN_THANH:
                return 'Đã nhận được hàng';
            case OrderStatus.DA_HUY:
                return 'Đã hủy';
            case OrderStatus.TRA_HANG:
                return 'Trả hàng';
            case OrderStatus.HOAN_TIEN:
                return 'Hoàn tiền';
            default:
                return '';
        }
    },
    sortable: true
};

// Cột mới: Ngày đặt hàng
const orderDateColumn: TableColumn<DataType> = {
    name: 'Ngày đặt hàng',
    selector: row => {
        return formatDate(row.createdDate)
    },
    sortable: true,
    width: '150px', // Đặt width cho cột ngày đặt hàng
};


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

interface MyDataTableProps {
    data: DataType[];
    filter: string;
}

const NoDataComponent = () => (
    <div style={{ padding: '24px', textAlign: 'center' }}>
        <p>Không có dữ liệu để hiển thị</p>
    </div>
);

const MyDataTable: React.FC<MyDataTableProps> = ({ filter, data }) => {
    const [filteredRows, setFilteredRows] = useState<DataType[]>([]);
    const [pending, setPending] = React.useState(true);
    const [openDetail, setOpenDetail] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState<DataType | null>(null);

    console.log("Current filter:", filter); // Thêm log để kiểm tra giá trị filter
    console.log("Data received:", data); // Thêm log để kiểm tra giá trị data

    const handleClickOpen = (order: DataType) => {
        setSelectedOrder(order);
        setOpenDetail(true);
    };

    const handleCloseDetail = () => {
        setOpenDetail(false);
        setSelectedOrder(null);
    };

    const orderFeatureColumn: TableColumn<DataType> = {
        name: 'Chức năng',
        cell:(row)  => (
            <IconButton aria-label="info" onClick={() =>
            {
                handleClickOpen(row)
            }}>
                <InfoIcon />
            </IconButton>
        ),
        ignoreRowClick: true,
        width: '100px'
    };

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const filtered = data.filter(row => {
                switch (filter) {
                    case 'pending':
                        return row.status === OrderStatus.CHO_VAN_CHUYEN;
                    case 'shipping':
                        return row.status === OrderStatus.DANG_VAN_CHUYEN;
                    case 'completed':
                        return row.status === OrderStatus.HOAN_THANH;
                    case 'cancelled':
                        return row.status === OrderStatus.DA_HUY;
                    case 'returned':
                        return row.status === OrderStatus.HOAN_TIEN || row.status === OrderStatus.TRA_HANG;
                    case 'all':
                    default:
                        return true;
                }
                return true;
            });
            setFilteredRows(filtered);
            setPending(false);
        } else {
            console.warn('Không có đơn hàng nào !');
        }
    }, [data, filter]);

    if (!data || !Array.isArray(data)) {
        return <div>Không có dữ liệu</div>;
    }
    console.log("Filtered rows:", filteredRows); // Thêm log để kiểm tra kết quả của filteredRows
    return (
        <Box >
            <DataTable
                columns={[
                    productNameColumn,
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
                noDataComponent={<NoDataComponent />}
            />
            <MyOrderDetail open={openDetail}
                           onClose={handleCloseDetail}
                           order={selectedOrder}
            />
        </Box>
    );
}

export default MyDataTable