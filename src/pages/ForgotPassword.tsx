import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useForgotPasswordMutation} from "../api/userApi.ts";
import Swal from "sweetalert2";
import {OrbitProgress} from "react-loading-indicators";
import React, {useState} from "react";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

export default function ForgotPassword() {
    const [emailSent, setEmailSent] = useState(false);
    const [forgotPassword, {isLoading, error}] = useForgotPasswordMutation();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;

        try {
            await forgotPassword(email).unwrap();
            setEmailSent(true);
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'Lấy lại mật khẩu thành công!',
                text: 'Một email khôi phục mật khẩu đã được gửi.',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err) {
            console.error('Update error:', error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Không tìm thấy thông tin tài khoản của bạn!',
                showConfirmButton: false,
                html: `
                    <div>
                        Vui lòng kiểm tra lại email trước khi gửi !
                    </div>
                    <button id="closeBtn" class="swal2-confirm swal2-styled" style="background-color: rgb(77 182 172); width: 100px; margin-top: 5px;">Đóng</button>
                `,
                willOpen: () => {
                    const closeBtn = document.getElementById('closeBtn');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', () => {
                            Swal.close();
                        });
                    }
                },
            });
        }
    };
    return (
        <Container component="main">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            > {emailSent ? (
                <Typography component="div" variant="h5" align="center" gutterBottom>
                    <SentimentVerySatisfiedIcon sx={{ fontSize: 60, color: 'primary' }} />
                    <br />
                    Một email khôi phục mật khẩu đã được gửi cho địa chỉ email tài khoản của bạn.
                    <br />
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Vui lòng kiểm tra hộp thư đến của bạn.
                    </Typography>
                </Typography>
            ) : (
                <>
                    <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" align="center">
                        Quên mật khẩu?
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ mt: 1, mb: 2 }}>
                        Nhập địa chỉ email của bạn. Chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            type="email"
                            variant="outlined"
                            size="small"
                            margin="normal"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
                        >
                            Đặt lại mật khẩu
                        </Button>
                    </Box>
                </>
            )}
            </Box>
    {
    isLoading && (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        }}>
            <OrbitProgress color="color.primary.main" size="medium" text="" textColor=""/>
        </Box>
    )
}
</Container>

)
    ;
}
