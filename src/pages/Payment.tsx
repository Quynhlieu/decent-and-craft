import {
    Badge,
    Box,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
    Skeleton
} from '@mui/material';
import React, { useEffect, useState } from "react";
import PurchaseInformation from "../components/Payment/PurchaseInformation.tsx";
import Transport from "../components/Payment/Transport.tsx";
import PaymentType from "../components/Payment/PaymentType.tsx";
import { orders } from "../data/order.ts";
import OrderDetail from "../interfaces/IOrderDetail.ts";
import Button from "@mui/material/Button";
import PaymentBtn from "../components/Payment/PaymentBtn.tsx";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store.ts';
import TruncateText from '../components/TruncateText.tsx';
import { getTotalPrice, OrderDetailDto, orderSetOrderDetails, orderSetVoucherId } from '../features/order/orderSlice.ts';
import { useCreateOrderMutation } from '../api/userApi.ts';
import { useNavigate } from 'react-router-dom';
import { OrbitProgress } from 'react-loading-indicators';
import SellIcon from '@mui/icons-material/Sell';
import { useGetAllVouchersQuery } from '../api/voucherApi.ts';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import IVoucher from '../interfaces/IVoucher.ts';
import { VNDNumericFormat } from '../components/ProductCard.tsx';
import { cartClear } from '../features/cart/cartSlice.ts';
interface CardProductProps {
    detail: OrderDetail;
}
type VoucherListProps = {
    handleApplyVoucher: (code: string) => void
}
const VoucherList: React.FC<VoucherListProps> = ({
    handleApplyVoucher
}) => {
    const { data, isLoading } = useGetAllVouchersQuery();
    const [open, setOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<IVoucher | null>(null);
    const MySwal = withReactContent(Swal)
    const handleClickOpen = (voucher: IVoucher) => {
        setSelectedVoucher(voucher);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setSelectedVoucher(null);
    }
    return (
        <>
            <Stack sx={{ ml: 1 }} spacing={2} direction="row">
                {data && data.length > 0 &&
                    data.map(v =>
                        <VoucherItem onClick={() => handleClickOpen(v)} key={v.id} voucher={v} />)
                }
                {isLoading && <Skeleton width={100} height={50}></Skeleton>}
            </Stack>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle align='center'  >Chi tiết voucher</DialogTitle>
                <DialogContent>
                    {selectedVoucher && (
                        <>
                            <p><strong>Mã voucher:</strong> {selectedVoucher.voucherCode}</p>
                            <p><strong>Điều kiện:</strong>
                                Hóa đơn ít nhất:
                                <VNDNumericFormat price={selectedVoucher.conditions} />
                            </p>
                            <p><strong>Số tiền giảm:</strong>
                                <VNDNumericFormat price={selectedVoucher.amount} />
                            </p>
                            <p><strong>Số lượng còn lại:</strong> {selectedVoucher.quantity}</p>
                            <p><strong>Ngày hết hạn:</strong> {selectedVoucher.expirationDate}</p>
                            <p><strong>Mô tả:</strong> {selectedVoucher.description}</p>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        const code = selectedVoucher?.voucherCode ?? "";
                        handleApplyVoucher(code);
                        navigator.clipboard.writeText(code);
                        MySwal.fire({
                            title: "Sử dụng giảm giá thành công",
                            icon: "success",
                        })
                        handleClose();
                    }} variant='contained' color="primary">
                        Sử dụng
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const CardProduct: React.FC<CardProductProps> = ({ detail }) => (
    <Card sx={{ marginBottom: 2, height: "100px" }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Badge badgeContent={detail.quantity} color="primary" sx={{ alignSelf: 'center', marginX: 1, marginBottom: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 50, height: 50, objectFit: 'cover' }}
                    image={detail.product.thumbnail}
                    alt={detail.product.name}
                />
            </Badge>
            <CardContent sx={{ flex: 1 }}>
                <Typography gutterBottom component="div">
                    <TruncateText maxLength={50}>
                        {detail.product.name}
                    </TruncateText>
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">
                        Số lượng: {detail.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Giá: {detail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </Typography>
                </Box>
            </CardContent>
        </Box>
    </Card>
);

const CardProductList = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const orderDetails: OrderDetail[] = cart.map(cartItem => (
        {
            id: 0,
            price: cartItem.product.price,
            product: cartItem.product,
            quantity: cartItem.quantity
        }
    ));
    useEffect(() => {
        const orderDetailsDto: OrderDetailDto[] = orderDetails.map(od => (
            {
                price: od.price,
                productId: od.product.id,
                quantity: od.quantity
            }
        ))
        dispatch(orderSetOrderDetails(orderDetailsDto))
    }, [])
    return (
        <Box>
            {orderDetails.map((detail, index) => (
                <CardProduct key={index} detail={detail} />
            ))}
        </Box>
    );
};
interface VoucherItemProps {
    voucher: IVoucher
    onClick: () => void
}
const VoucherItem: React.FC<VoucherItemProps> = ({ voucher, onClick }) => {
    return (
        <Button onClick={onClick}
            size='small' color='warning' variant='contained' >
            <strong>
                {voucher.voucherCode}
            </strong>
        </Button >
    )
}
const Payment: React.FC = () => {
    const order = useSelector((state: RootState) => state.order);
    const user = useSelector((state: RootState) => state.user);
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const [voucherCode, setVoucherCode] = useState<string>("");
    const [voucherError, setVouchError] = useState<string>("");
    const [selectedVoucher, setSelectedVoucher] = useState<IVoucher | null>(null);
    const { data } = useGetAllVouchersQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const handleCreateOrder = async () => {
        if (order.addressId == null) {
            MySwal.fire({
                title: "Vui lòng chọn ít nhất 1 địa chỉ",
                icon: "warning",
            })
            return;
        }
        const data = await createOrder(order).unwrap();
        if (!error && data && !isLoading) {
            dispatch(cartClear())
            navigate(`/bill/${data.id}`, { state: { order: data, userInfo: user } });
        }
    }
    const handleApplyVoucher = (code: string) => {
        setVoucherCode(code);
    }
    const handleUseVoucher = () => {
        if (data && data?.length > 0) {
            const selectedVoucher = data.find(v => v.voucherCode === voucherCode);
            const selectedVoucherId: number | undefined = selectedVoucher?.id;
            const isValidCode = selectedVoucher != undefined
            if (!isValidCode) {
                setVouchError("Mã voucher không hợp lệ")
                return;
            }
            const isEnough = selectedVoucher?.quantity > 0;
            const isHigherThanMin = getTotalPrice(order.orderDetails) > selectedVoucher.conditions;
            if (!isEnough) {
                setVouchError("Mã voucher đã được sử dụng hết")
                setSelectedVoucher(null);
                return;
            }
            if (!isHigherThanMin) {
                setVouchError("Tổng hóa đơn chưa đủ điều kiện sử dụng voucher")
                setSelectedVoucher(null);
                return;
            }
            if (selectedVoucherId != undefined) {
                setVouchError("")
                setSelectedVoucher(selectedVoucher);
                dispatch(orderSetVoucherId(selectedVoucherId));
                return;

            }
        }

    }
    function calculateTotalOrderPrice(): number {
        const voucherAmount = selectedVoucher ? selectedVoucher.amount : 0;
        return getTotalPrice(order.orderDetails) + order.shippingFee - voucherAmount;

    }

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <PurchaseInformation />
                        </Grid>
                        <Grid item xs={6}>
                            <Transport />
                            <PaymentType />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Đơn hàng ({orders.length} sản phẩm)
                            </Typography>
                            <CardProductList />
                            <Divider orientation="horizontal" flexItem />
                            <Box sx={{ padding: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Stack direction="row" sx={{ mt: 2 }}>
                                        <Typography color="secondary.main" >
                                            <SellIcon fontSize='small' />
                                            <strong>Voucher</strong>
                                        </Typography>
                                        <VoucherList handleApplyVoucher={handleApplyVoucher} />
                                    </Stack>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Nhập mã giảm giá"
                                            variant="outlined"
                                            fullWidth
                                            value={voucherCode}
                                            onChange={event => {
                                                setVoucherCode(event.target.value)
                                            }}
                                            InputProps={{
                                                style: { backgroundColor: 'white', borderRadius: 4 }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            onClick={() => {
                                                handleUseVoucher();
                                            }}
                                            sx={{
                                                backgroundColor: "rgb(77, 182, 172)",
                                                padding: 1,
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: "rgb(57, 162, 152)",
                                                }
                                            }}
                                        >
                                            Áp dụng
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Typography color="red">
                                    {voucherError}
                                </Typography>
                            </Box>
                            <Divider orientation="horizontal" flexItem />
                            <Box sx={{ paddingY: 2 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Typography variant="body2">
                                        Tạm tính:
                                    </Typography>
                                    <Typography variant="body2">
                                        <VNDNumericFormat price={getTotalPrice(order.orderDetails)} />
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", paddingTop: 2 }}>
                                    <Typography variant="body2">
                                        Phí vận chuyển:
                                    </Typography>
                                    <Typography color="red" variant="body2">
                                        <VNDNumericFormat price={20000} />
                                    </Typography>
                                </Box>
                                {selectedVoucher &&
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", paddingTop: 2 }}>
                                        <Typography variant="body2">
                                            Giảm giá
                                        </Typography>
                                        <Typography color="green" variant="body2">
                                            -<VNDNumericFormat price={selectedVoucher.amount} />
                                        </Typography>
                                    </Box>
                                }
                            </Box>
                            <Divider orientation="horizontal" flexItem />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", paddingTop: 2 }}>
                                <Typography variant="h6">
                                    Tổng thanh toán:
                                </Typography>
                                <Typography variant="h6">
                                    <VNDNumericFormat price={calculateTotalOrderPrice()} />
                                </Typography>
                            </Box>
                            <PaymentBtn
                                handleCreateOrder={handleCreateOrder} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {isLoading && (
                <Box sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                }}>
                    <OrbitProgress color="primary.main" size="medium" text="" textColor="" />
                </Box>
            )}
        </Box>
    );
}

export default Payment;
