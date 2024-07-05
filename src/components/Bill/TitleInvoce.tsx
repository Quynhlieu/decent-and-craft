import {Box, Typography} from "@mui/material";
import Order from "../../interfaces/IOrder.ts";

interface TitleInvoiceProps {
    order: Order;
}

const TitleInvoice: React.FC<TitleInvoiceProps> = ({ order }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2, borderBottom: "1px solid #ddd" }}>
            <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
                    Decent&Craft
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#666" }}>
                    Tin cậy - Tiện ích - Tận tình
                </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
                    Mã hóa đơn: <span style={{ fontWeight: "normal" }}>{order.id}</span>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
                    Ngày xuất hóa đơn: <span style={{ fontWeight: "normal" }}>{order.orderDate}</span>
                </Typography>
            </Box>
        </Box>
    );
}

export default TitleInvoice;