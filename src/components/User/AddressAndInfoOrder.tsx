import {Box, Grid, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import React from "react";
import  {OrderStatus} from "../../interfaces/IOrder.ts";
import InfoOrder from "./InfoOrder.tsx";
import Address from "../../interfaces/IAddress.ts";
import Voucher from "../../interfaces/IVoucher.ts";
import IUser from "../../interfaces/IUser.ts";
import OrderDetail from "../../interfaces/IOrderDetail.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";

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
interface AddressAndInfoOrderProps {
    order: DataType | null;
}

const AddressAndInfoOrder: React.FC<AddressAndInfoOrderProps> = ({order}) => {
    const user = useSelector((state: RootState) => state.user.user);
    return (
        <Box sx={{width: "100%", flexGrow: 1}}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Typography sx={{fontSize: 25, marginBottom: 2, color: "black"}}>
                        Địa chỉ nhận hàng
                    </Typography>
                    <Typography sx={{color: "black", paddingY: 1}}>
                        <b>Tên người nhận:</b> {user?.fullName}
                    </Typography>
                    <Typography sx={{color: "#9a9393"}}>
                        <b>Số điện thoại:</b> {user?.phone}
                    </Typography>
                    <Typography sx={{color: "#9a9393", wordWrap: "break-word", wordBreak: "break-all"}}>
                        <b>Địa
                            chỉ:</b> {`${order?.address.description} ${order?.address.ward} ${order?.address.district} ${order?.address.province}`}
                    </Typography>
                </Grid>
                <Grid item xs={1} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Divider orientation="vertical" flexItem sx={{height: '100%'}}/>
                </Grid>
                <Grid item xs={8}>
                    <Typography sx={{fontSize: 25, color: "black"}}>
                        Thông tin đơn hàng
                    </Typography>
                    <InfoOrder order={order}/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AddressAndInfoOrder