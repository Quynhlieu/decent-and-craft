import {Box, Button, Grid, Stack, TextField, Typography} from '@mui/material'
import React from 'react'
import facebookIcon from "../assets/icons/facebook.png";
import intaIcon from "../assets/icons/Instagram_icon.png";
import youtubeIcon from "../assets/icons/youtube.png";

const IconImage = (props: any) => {
    return (
        <Box sx={{
            width: 50,
            height: 50,
        }}>
            <img
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%"
                }}
                src={props.image} />
        </Box>
    )
}

const Column4 = () => (
    <Box   >
        <Typography color="red">
            Hotliene đặt hàng: <strong>
                0925821477
            </strong>
        </Typography>
        <Typography color="secondary.main">
            <small>(từ 09h00 - 18h00, tất cả các ngày)
            </small>
        </Typography>
        <Typography color="red">
            Góp ý - khiếu nại: <strong>
                0925821478
            </strong>
        </Typography>
        <Stack spacing={2} >
            <Typography variant='h5' fontWeight="bold">
                ĐĂNG KÝ NHẬN TIN
            </Typography>
            <TextField placeholder='Email'>
            </TextField>
            <Button sx={{ width: 150, height: 50 }} variant='contained'>
                ĐĂNG KÝ
            </Button>
        </Stack>
        <Box sx={{ mt: 3 }}>
            <Typography variant='h6'>
                <strong>
                    KẾT NỐI DECENT&CRAFT TẠI
                </strong>
            </Typography>
            <Stack direction="row" spacing={2} >
                <IconImage image={facebookIcon} />
                <IconImage image={intaIcon} />
                <IconImage image={youtubeIcon} />
            </Stack>
            <Stack direction="row" sx={{ mt: 2 }}>
                <Box bgcolor="#6bc530" sx={{ px: 3, py: 0.5 }}>
                    <Typography color="white" fontWeight="bold" variant='h5'>
                        DMCA
                    </Typography>
                </Box>
                <Box bgcolor="#4d4d4d" sx={{ px: 3, py: 0.5 }}>
                    <Typography color="white" fontWeight="bold" variant='h5'>
                        PROTECTED
                    </Typography>
                </Box>
            </Stack>
        </Box>
    </Box>

)

const Column3 = () => {
    return (
        <Stack spacing={1}>
            <Typography color="secondary.main" >
                Các câu hỏi thường gặp
            </Typography>
            <Typography color="secondary.main">
                Hợp tác kinh doanh
            </Typography>
            <Typography color="secondary.main">
                Tuyển dụng
            </Typography>
        </Stack>
    )
}

const Column2 = () => {
    return (
        <Stack spacing={1}>
            <Typography color="secondary.main" >
                Giới thiệu về Decent & Craft
            </Typography>
            <Typography color="secondary.main">
                Chính sách & Quy định chung
            </Typography>
            <Typography color="secondary.main">
                Quy định và hình thức thanh toán
            </Typography>
            <Typography color="secondary.main">
                Chính sách bảo hành
            </Typography>
            <Typography color="secondary.main">
                Chính sách vận chuyển và giao nhận
            </Typography>
            <Typography color="secondary.main">
                Chính sách bảo mật và thông tin cá nhân
            </Typography>
            <Typography color="secondary.main">
                Chính sách đổi/trả hàng và thông tin hoàn tiền
            </Typography>
        </Stack>
    )
}

const Column1 = () => {
    return (
        <Box>
            <Typography fontWeight="bold" >
                THÔNG TIN CÔNG TY
            </Typography>
            <Typography color="secondary.main">
                2024 - Bản quyền của Decent & Craft
            </Typography>
            <Typography color="secondary.main">
                76 Đường Linh Trung, Thành Phố Thủ Đức, Thành Phố Hồ Chí Minh
            </Typography>
            <Typography color="secondary.main">
                Mã bưu chính 700000
            </Typography>
            <Typography color="secondary.main">
                Điện thoại: 0925821477
            </Typography>
            <Typography color="secondary.main">
                Giấy chứng nhận Đăng ký kinh doanh số 0312323423 do Sở Kế Hoạch và Đầu Tư TPHCM
            </Typography>
            <Typography color="secondary.main">
                cấp ngày 19/02/2024
            </Typography>
        </Box>
    )
}

const Footer = () => {
    return (
        <Box sx={{
            height: 400,
            mt: 5
        }}>
            <Grid container spacing={2}>
                <Grid xs={3} item>
                    <Column1 />
                </Grid>
                <Grid xs={3} item>
                    <Column2 />
                </Grid>
                <Grid xs={2.5} item>
                    <Column3 />
                </Grid>
                <Grid xs={3.5} item>
                    <Column4 />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer