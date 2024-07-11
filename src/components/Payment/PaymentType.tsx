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
                            <FormControlLabel value="paypal" control={<Radio />} label="Thanh toán qua Paypal" />
                            <FormControlLabel value="VNpay" control={<Radio />} label="Thanh toán qua VNPay" />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </CardContent>
        </Card>
    );
}

export default PaymentType;