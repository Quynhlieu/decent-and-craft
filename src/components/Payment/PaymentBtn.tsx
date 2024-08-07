import { Link as RouterLink } from 'react-router-dom';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Box, Link, Typography, Button } from '@mui/material';

interface PaymentBtnProps {
    handleCreateOrder: () => void
}
const PaymentBtn: React.FC<PaymentBtnProps> = ({ handleCreateOrder }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link component={RouterLink} to="/cart" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <KeyboardDoubleArrowLeftIcon />
                <Typography sx={{ ml: 1 }}>
                    Quay về giỏ hàng
                </Typography>
            </Link>
            <Button
                type="submit"
                variant="contained"
                onClick={handleCreateOrder}
                sx={{ mt: 3, mb: 1, backgroundColor: "rgb(77 182 172)" }}
            >
                Thanh toán
            </Button>
        </Box>
    );
}

export default PaymentBtn