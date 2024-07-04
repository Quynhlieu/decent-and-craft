import {Box, Card, CardContent, FormControl, Radio, Typography} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

const Transport = () => {
    const shippingCost = 40000;

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Vận chuyển
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
                        <FormControlLabel
                            value="female"
                            control={<Radio checked={true}/>}
                            label="Giao hàng tận nơi"
                        />
                    </FormControl>
                    <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                        {shippingCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Transport