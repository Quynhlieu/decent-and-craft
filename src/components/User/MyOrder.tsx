import {Box, Typography} from "@mui/material";
import LabTabs from "./LabTabs.tsx";


const MyOrder = () => {
    return (
        <Box sx={{ height: 500, width: 800 }}>
            <Typography variant='h3' sx={{
                textAlign: 'center',
                position: 'relative',
                marginBottom: '20px',
            }}>
                Đơn hàng của bạn
            </Typography>
            <LabTabs />

        </Box>

    );
}

export default MyOrder;
