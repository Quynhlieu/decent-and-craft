import { Box, Typography } from "@mui/material";
import LabTabs from "./LabTabs.tsx";
import { useGetOrderListQuery } from "../../api/orderApi.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { OrbitProgress } from "react-loading-indicators";
import { OrderStatus } from "../../interfaces/IOrder.ts";
import Address from "../../interfaces/IAddress.ts";
import Voucher from "../../interfaces/IVoucher.ts";
import IUser from "../../interfaces/IUser.ts";
import OrderDetail from "../../interfaces/IOrderDetail.ts";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const MyOrder = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const { data, isLoading, error } = useGetOrderListQuery(user?.id ?? 0);

    useEffect(() => {
        if (error) {
            toast.error("Đã xảy ra lỗi khi tải đơn hàng. Vui lòng thử lại sau.");
        }
    }, [error]);
    return (
        <Box sx={{ height: 500, width: 800 }}>
            {data && data.length > 0 ? (
                <>
                    <Typography variant='h3' sx={{
                        textAlign: 'center',
                        position: 'relative',
                        marginBottom: '20px',
                    }}>
                        Đơn hàng của bạn
                    </Typography>
                    <LabTabs data={data} />
                </>
            ) : (
                <Box sx={{ my: 10, textAlign: 'center' }}>
                    <Typography variant='h3'>
                        Bạn chưa có đơn hàng nào!
                    </Typography>
                    <SentimentVeryDissatisfiedIcon color='primary' sx={{ fontSize: 100, marginTop: 2 }} />
                </Box>
            )}

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
                    <OrbitProgress color="color.primary.main" size="medium" text="" textColor="" />
                </Box>
            )}
        </Box>

    );
}

export default MyOrder;
