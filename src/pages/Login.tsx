import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link, useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from '@mui/icons-material/Google';
import {useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import {IconButton} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {useLoginMutation} from "../api/userApi.ts";
import {OrbitProgress} from "react-loading-indicators";
import {updateInfo} from "../features/user/userSlice.ts";
import {useDispatch} from "react-redux";
// TODO remove, this demo shouldn't need to reset the theme.

const FacebookGoogleBtns = () => {
    const handleFacebookLogin = () => {
        console.log('Logging in with Facebook');
    };

    const handleGoogleLogin = () => {
        console.log('Logging in with Google');
    };
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', marginY: 2}}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<FacebookIcon/>}
                sx={{flex: 1, mr: 1}}
                onClick={handleFacebookLogin}
            >
                Facebook
            </Button>
            <Button
                variant="contained"
                color="error"
                startIcon={<GoogleIcon/>}
                sx={{flex: 1, ml: 1}}
                onClick={handleGoogleLogin}
            >
                Google
            </Button>
        </Box>
    )
}

const ForgotPasswordRegisterBtns = () => {
    return (
        <Grid container>
            <Grid item xs>
                <Link to="/forgotPassword"
                      style={{
                          textDecoration: 'none',
                          color: '#3f51b5',
                      }}
                >
                    Quên mật khẩu?
                </Link>
            </Grid>
            <Grid item>
                <Link to="/register"
                      style={{
                          textDecoration: 'none',
                          color: '#3f51b5',
                      }}>
                    {"Bạn chưa có tài khoản? Đăng ký"}
                </Link>
            </Grid>
        </Grid>
    )
}

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginUser, {data, isLoading, isError, error}] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginData = {email, password};
        try {
            await loginUser(loginData).unwrap();
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    useEffect(() => {
        if (data) {
            sessionStorage.setItem('user', JSON.stringify(data));
            dispatch(updateInfo(data));
            navigate('/user');
        }
    }, [data, navigate]);

    let displayError: string | undefined;
    if (isError) {
        if ('status' in error) {
            displayError = 'Sai email hoặc password !';
        } else {
            displayError = error.message;
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                <Typography color="error">
                    {displayError}
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        type="email"
                        autoFocus
                        value={email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <FormControl sx={{width: '100%', mt: 1}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            value={password}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword(event.target.value);
                            }}/>
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        // disabled={!email && !password}
                        sx={{mt: 3, mb: 1, backgroundColor: "rgb(77 182 172)"}}
                        disabled={isLoading}
                    >
                        Đăng nhập
                    </Button>
                    <FacebookGoogleBtns/>
                    <ForgotPasswordRegisterBtns/>
                </Box>
            </Box>
            {isLoading && (
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
                    <OrbitProgress color="primary.main" size="medium" text="" textColor=""/>
                </Box>
            )}
        </Container>
    );
}