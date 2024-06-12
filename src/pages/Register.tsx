import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../features/user/usersSlice.ts";
import IUser from "../interfaces/IUser.ts";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import {IconButton} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from '@mui/material/FormControl';
import {RootState} from "../app/store.ts";

const defaultTheme = createTheme();

export default function Register() {

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const registerState = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName :'',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const onChangeHandle = useCallback((e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.id]: e.target.value,
        }));
    }, []);

    useEffect(() =>{
        console.log(formData)
    })

    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
    const validateConfirmPassword = useCallback(() => {
        const { password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            setConfirmPasswordValid(false);
        } else {
            setConfirmPasswordValid(true);
        }
    }, [formData]);
    useEffect(() => {
        validateConfirmPassword();
    }, [formData.password, formData.confirmPassword]);
    const handleFacebookLogin = () => {
        console.log('Logging in with Facebook');
    };

    const onSubmitHandle = (e:any) =>{
        e.preventDefault();
        const user:IUser = {
            id:4,
            email:formData.email,
            fullName:formData.firstName+" "+formData.lastName,
            password:formData.password,
        };
        dispatch(register(user));

    }
    const handleGoogleLogin = () => {
        console.log('Logging in with Google');
    };
    console.log(registerState.error)
    useEffect(() => {
        if (registerState.user) {
            sessionStorage.setItem('user', JSON.stringify(registerState.user));
            navigate("/login");
        }
    }, [registerState.user, navigate]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng ký
                    </Typography>
                    <Typography color="red" >{registerState.error}</Typography>
                    {!confirmPasswordValid && (
                        <Typography color="error" sx={{ m: 1 }}>
                            Mật khẩu xác nhận không khớp với mật khẩu
                        </Typography>
                    )}
                    <Box component="form" onSubmit={onSubmitHandle} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={onChangeHandle}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={onChangeHandle}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    onChange={onChangeHandle}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{ width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
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
                                        label="Password"
                                        required
                                        fullWidth
                                        name="password"
                                        autoComplete="new-password"
                                        onChange={onChangeHandle}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{ width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm password"
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        autoComplete="confirmPassword"
                                        onChange={onChangeHandle}
                                        error={!confirmPasswordValid && confirmPasswordTouched}
                                        onBlur={() => setConfirmPasswordTouched(true)}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 , backgroundColor: "rgb(77 182 172)" }}
                        >
                            Đăng ký
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginY: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<FacebookIcon />}
                                sx={{ flex: 1, mr: 1 }}
                                onClick={handleFacebookLogin}
                            >
                                Facebook
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<GoogleIcon />}
                                sx={{ flex: 1, ml: 1 }}
                                onClick={handleGoogleLogin}
                            >
                                Google
                            </Button>
                        </Box>
                        <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/login" >
                                        Bạn đã có tài khoản? Đăng nhập
                                    </Link>
                                </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
