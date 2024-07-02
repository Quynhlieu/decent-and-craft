import {Box, Grid, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import React from "react";
import Order from "../../interfaces/IOrder.ts";
import InfoOrder from "./InfoOrder.tsx";

interface AddressAndInfoOrderProps {
    order: Order | null;
}

const AddressAndInfoOrder: React.FC<AddressAndInfoOrderProps> = ({order}) => {
    return (
        <Box sx={{width: "100%", flexGrow: 1}}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Typography sx={{fontSize: 25, marginBottom: 2, color: "black"}}>
                        Địa chỉ nhận hàng
                    </Typography>
                    <Typography sx={{color: "black", paddingY: 1}}>
                        <b>Tên người nhận:</b> {order?.user.fullName}
                    </Typography>
                    <Typography sx={{color: "#9a9393"}}>
                        <b>Số điện thoại:</b> {order?.user.phone}
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