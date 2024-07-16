import { Box, Card, CardContent, FormControl, Radio, RadioGroup, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

const PaymentType = () => {
    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Thanh toán
                </Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    paddingX: 2
                }}>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="payment-type-label"
                            defaultValue="female"
                            name="payment-type-group"
                        >
                            <FormControlLabel
                                disabled
                                value="paypal"
                                control={<Radio />} label="Thanh toán qua Paypal (Bảo trì)" />
                            <FormControlLabel
                                value="VNpay"
                                disabled
                                control={<Radio />}
                                label="Thanh toán qua VNPay (Bảo trì)" />
                            <FormControlLabel
                                value="COD"
                                checked
                                control={<Radio />}
                                label="Thanh toán qua khi nhận hàng" />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </CardContent>
        </Card>
    );
}

export default PaymentType;