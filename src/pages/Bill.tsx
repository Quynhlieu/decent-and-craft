import React, { useRef } from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import ItemList from "../components/Bill/ItemList.tsx";
import TotalAmount from "../components/Bill/TotalAmount.tsx";
import TitleInvoce from "../components/Bill/TitleInvoce.tsx";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { useLocation, useNavigate } from "react-router-dom";
import BillDetails from '../components/Bill/BillDetails.tsx';
import { useReactToPrint } from 'react-to-print';
const BillContainer = () => {
    const navigate = useNavigate();
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })
    const handleClose = () => {
        navigate('/');
    };
    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Bill ref={componentRef} />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" sx={{ backgroundColor: "red", marginRight: 4 }} onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="contained" color="primary" onClick={handlePrint}>
                    <LocalPrintshopIcon />
                </Button>
            </Box>
        </Paper>
    )
}

const Bill = React.forwardRef<HTMLDivElement>((props,ref) => {
    const location = useLocation();
    const order = location.state?.order;
    return (
        <div ref={ref}>
            <Box sx={{ minHeight: 320 }}>
                <TitleInvoce order={order} />
                <Typography
                    variant='h4'
                    sx={{
                        textAlign: 'center',
                        position: 'relative',
                        marginY: '20px',
                    }}
                >
                    Hóa đơn mua hàng
                </Typography>
                <BillDetails order={order} />
                <ItemList order={order} />
                <TotalAmount order={order} />
            </Box>
        </div>
    );
});

export default BillContainer;
