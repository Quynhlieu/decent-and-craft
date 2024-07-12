import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import {useForm, UseFormRegister, FieldErrors, SubmitHandler} from "react-hook-form";
import {useRegisterMutation} from "../api/userApi.ts";
import {OrbitProgress} from "react-loading-indicators";

const TitleAndMessage = ({ error }: { error: string | undefined }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Đăng ký
            </Typography>

            <Typography color="red">{error}</Typography>
        </Box>
    );
};


interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormRegisterProps {
    registerForm: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    showPassword: boolean;
    showConfirmPassword: boolean;
    handleClickShowPassword: () => void;
    handleClickShowConfirmPassword: () => void;
    passwordValue: string;
    confirmPasswordValue: string;
}

const FormRegister = ({
                          registerForm,
                          errors,
                          showPassword,
                          showConfirmPassword,
                          handleClickShowPassword,
                          handleClickShowConfirmPassword,
                          passwordValue

                      }: FormRegisterProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    {...registerForm("firstName", { required: "Tên là bắt buộc" })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                    {...registerForm("lastName", { required: "Họ là bắt buộc" })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    type="email"
                    {...registerForm("email", { required: "Email là bắt buộc", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email không hợp lệ" } })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    {...registerForm("password", { required: "Password là bắt buộc", minLength: { value: 6, message: "Mật khẩu phải có 6 kí tự !" } })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="confirmPassword"
                    {...registerForm("confirmPassword", {
                        required: "Confirm password là bắt buộc",
                        validate: value => value === passwordValue || "Mật khẩu xác nhận phải trùng với mật khẩu hiện tại !"
                    })}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Grid>
        </Grid>
    );
};

function RegisterBtn({ isLoading }: { isLoading: boolean }) {
    return (
        <Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1, backgroundColor: "rgb(77 182 172)" }}
                disabled={isLoading}
            >
                Đăng ký
            </Button>
        </Box>
    );
}

const ForgotPasswordRegisterBtns = () => {
    return (
        <Grid container justifyContent="flex-end">
            <Grid item>
                <Link to="/login">
                    Bạn đã có tài khoản? Đăng nhập
                </Link>
            </Grid>
        </Grid>
    );
}

function RegisterWithFbOrGg() {
    const handleFacebookLogin = () => {
        console.log('Logging in with Facebook');
    };

    const handleGoogleLogin = () => {
        console.log('Logging in with Google');
    };

    return (
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
    );
}

export default function Register() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
    const [registerUser, { data, isLoading,isError, error }] = useRegisterMutation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const passwordValue = watch('password');
    const confirmPasswordValue = watch('confirmPassword');

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        const userRegisterData = {
            email: formData.email,
            password: formData.password,
            fullName: `${formData.lastName} ${formData.firstName}`
        };

        try {
            await registerUser(userRegisterData);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };
    useEffect(() => {
        if (data) {
            sessionStorage.setItem('user', JSON.stringify(data));
            navigate('/login');
        }
    }, [data, navigate]);
    let displayError: string | undefined;
    if (isError) {
        if ('status' in error) {
            displayError = 'Email đã tồn tại trong hệ thống !';
        } else {
            displayError = error.message;
        }
    }
    return (
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
                <TitleAndMessage error={displayError} />
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <FormRegister
                        registerForm={register}
                        errors={errors}
                        showPassword={showPassword}
                        showConfirmPassword={showConfirmPassword}
                        handleClickShowPassword={handleClickShowPassword}
                        handleClickShowConfirmPassword={handleClickShowConfirmPassword}
                        passwordValue={passwordValue}
                        confirmPasswordValue={confirmPasswordValue}
                    />
                    <RegisterBtn isLoading={isLoading} />
                    <RegisterWithFbOrGg />
                    <ForgotPasswordRegisterBtns />
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
                    <OrbitProgress color="color.primary.main" size="medium" text="" textColor="" />
                </Box>
            )}
        </Container>
    );
}
