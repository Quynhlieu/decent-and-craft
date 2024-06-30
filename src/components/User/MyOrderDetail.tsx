import React from "react";
import Order from "../../interfaces/IOrder";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Divider from "@mui/material/Divider";
import HorizontalNonLinearStepper from "./HorizontalNonLinearStepper.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface OrderDetail {
    id: number;
    productId: number;
    price: number;
    quantity: string;
    order: Order;
}

interface MyOrderDetailProps {
    open: boolean;
    onClose: () => void;
    order: Order | null;
}

const BackBtn: React.FC = () => {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <ArrowBackIosIcon />
            <Typography sx={{ backgroundColor: "#f3f0f0" }} component="div">
                Trở lại
            </Typography>
        </Stack>
    );
};

const ProductCodeAndStatus: React.FC<{ order: Order | null }> = ({ order }) => {
    if (!order) return null;
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ backgroundColor: "#f3f0f0"}} component="div">
                Mã đơn hàng: 1234435
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography sx={{ backgroundColor: "#f3f0f0", color:"red" }} component="div">
                Đã giao hàng thành công
            </Typography>
        </Stack>
    );
};

const BackAndStatus: React.FC<{ order: Order | null }> = ({ order }) => {
    return (
        <Box sx={{ width: 800 , backgroundColor: "#f3f0f0", padding: 2, borderRadius: '8px'}}>
            <Stack direction="row" spacing={4} justifyContent="space-between">
                <BackBtn />
                <ProductCodeAndStatus  order={order}/>
            </Stack>
        </Box>
    );
};

const MyOrderDetail: React.FC<MyOrderDetailProps> = ({ open, onClose, order }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            <DialogContent>
                <Box sx={{ minHeight: 500 }}>
                    <BackAndStatus order={order} />
                    <HorizontalNonLinearStepper />
                </Box>
            </DialogContent>
            <DialogActions >
                <Button onClick={onClose} color="primary">Đóng</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MyOrderDetail;
