import React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import BillDetails from "../components/Bill/BillDetails.tsx";
import ItemList from "../components/Bill/ItemList.tsx";
import TotalAmount from "../components/Bill/TotalAmount.tsx";
import TitleInvoce from "../components/Bill/TitleInvoce.tsx";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { useLocation, useNavigate } from "react-router-dom";
const Bill: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order;
    const handlePrint = () => {
        window.print();
    };

    const handleClose = () => {

        navigate('/');
    };
    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
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
                <BillDetails order={orders[0]} />
                <ItemList order={orders[0]} />
                <TotalAmount order={orders[0]} />

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button variant="contained" sx={{ backgroundColor: "red", marginRight: 4 }} onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="contained" color="primary" onClick={handlePrint}>
                        <LocalPrintshopIcon />
                    </Button>

                </Box>
            </Box>
        </Paper>



    );
};

export default Bill;
