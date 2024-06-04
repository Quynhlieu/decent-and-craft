import { Box, Typography } from '@mui/material'
const AddressBar = () => {
    return (
        <Box bgcolor="primary.main" sx={{ p: 2,mt:10 }} >
            <Typography color="white" sx={{
                textTransform: "uppercase",
                fontWeight: "bold"
            }} textAlign="center">
                Địa chỉ 76 Đường Linh Trung, Thành Phố Thủ Đức,
            </Typography>
        </Box>
    )
}
export default AddressBar