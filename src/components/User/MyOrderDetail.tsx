import React from "react";
import {OrderStatus} from "../../interfaces/IOrder";
import Divider from "@mui/material/Divider";
import HorizontalNonLinearStepper from "./HorizontalNonLinearStepper.tsx";
import AddressAndInfoOrder from "./AddressAndInfoOrder.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography} from "@mui/material";
import ListProductOfOrder from "./ListProductOfOrder.tsx";
import Address from "../../interfaces/IAddress.ts";
import Voucher from "../../interfaces/IVoucher.ts";
import IUser from "../../interfaces/IUser.ts";
import OrderDetail from "../../interfaces/IOrderDetail.ts";

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
interface MyOrderDetailProps {
    open: boolean;
    onClose: () => void;
    order: DataType | null;
}


const ProductCodeAndStatus: React.FC<{ order: DataType | null }> = ({ order }) => {

    const getStatusText = () => {
        if (!order) return '';
        switch (order.status) {
            case OrderStatus.CHO_VAN_CHUYEN:
                return 'Chờ vận chuyển';
            case OrderStatus.DANG_VAN_CHUYEN:
                return 'Đang vận chuyển';
            case OrderStatus.HOAN_THANH:
                return 'Hoàn thành';
            case OrderStatus.DA_HUY:
                return 'Đã hủy';
            case OrderStatus.TRA_HANG:
                return 'Đang trả hàng';
            case OrderStatus.HOAN_TIEN:
                return 'Đã hoàn tiền';
            default:
                return 'Trạng thái đơn hàng không xác định';
        }
    };
    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ paddingRight: 3 }}>
            <Typography sx={{ backgroundColor: "#f3f0f0" }} component="div">
                Mã đơn hàng: {order ? order.id : ''}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography sx={{ backgroundColor: "#f3f0f0", color: "red" }} component="div">
                Trạng thái: {getStatusText()}
            </Typography>
        </Stack>
    );
};

const BackAndStatus: React.FC<{ order: DataType | null }> = ({ order }) => {
    return (
        <Box sx={{ width: "98.5%", backgroundColor: "#f3f0f0", paddingY: 2, borderRadius: '8px' }}>
            <Stack direction="row"  justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center" sx={{ paddingLeft: 3 }}>
                    <Typography sx={{ backgroundColor: "#f3f0f0" }} component="div">
                        Chi tiết đơn hàng
                    </Typography>
                </Stack>
                <ProductCodeAndStatus order={order} />
            </Stack>
        </Box>
    );
};

const MyOrderDetail: React.FC<MyOrderDetailProps> = ({ open, onClose, order }) => {
    return (
        <Dialog open={open} maxWidth="lg" fullWidth>
            <DialogTitle> <BackAndStatus order={order} /></DialogTitle>
            <DialogContent>
                <Box sx={{ minHeight: 500 }}>
                    <HorizontalNonLinearStepper order={order} />
                    <ListProductOfOrder order={order}/>
                    <AddressAndInfoOrder order = {order} />
                </Box>
            </DialogContent>
            <DialogActions >
                <Button onClick={onClose} color="primary">Đóng</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MyOrderDetail;
