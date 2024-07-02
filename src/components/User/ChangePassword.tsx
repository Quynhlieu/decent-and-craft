import React, {MouseEvent, useState} from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ChangePassword:React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = () => {
        if (oldPassword === newPassword) {
            setError("Mật khẩu mới không được trùng với mật khẩu cũ");
        } else if (newPassword !== confirmPassword) {
            setError("Xác nhận mật khẩu không khớp với mật khẩu mới");
        } else {
            setError("");
            console.log("Đổi mật khẩu thành công");
        }
    };

    return (
        <Container sx={{ minHeight: 320, width: 800 }}>
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 4 }}>
                    Đổi mật khẩu
                </Typography>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <Typography color="error" sx={{ m: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="old-password">Mật khẩu cũ</InputLabel>
                        <OutlinedInput
                            id="old-password"
                            required
                            type={showPassword ? 'text' : 'password'}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Mật khẩu cũ"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="new-password">Mật khẩu mới</InputLabel>
                        <OutlinedInput
                            id="new-password"
                            required
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Mật khẩu mới"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="confirm-password">Xác nhận mật khẩu mới</InputLabel>
                        <OutlinedInput
                            id="confirm-password"
                            required
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Xác nhận mật khẩu mới"
                        />
                    </FormControl>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                        <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
                            Đổi mật khẩu
                        </Button>

                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default ChangePassword;
