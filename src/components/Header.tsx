import { AppBar, Badge, Box, Button, Divider, IconButton, Slide, Stack, Toolbar, Tooltip, Typography, useScrollTrigger } from '@mui/material'
import React, { useState } from 'react'
import SeachBar from './SearchBar'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { getCount, getTotalPrice } from '../features/cart/cartSlice';
import { VNDNumericFormat } from './ProductCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CartContainer from './Cart/CartContainer';
import { logout } from "../features/user/userSlice.ts";
import useScrollDirection from '../hooks/useScrollDirection.ts';
interface NavItemProps {
    active?: boolean,
    children: React.ReactNode
}

const NavItem: React.FC<NavItemProps> = ({ active, children }) => {
    const baseSx = {
        textTransform: "none",
        color: "secondary",
        fontSize: 20,
    }
    const activeSx = active ? {
        fontWeight: "bold",
        textDecoration: "underline"

    } : {};
    const style: object = { ...baseSx, ...activeSx };
    return (
        <Button
            size='large'
            color={active ? "primary" : "secondary"}
            sx={style} style={{ marginLeft: '43px' }}> {children} </Button >
    )
}

const NavBar = () => {
    return (
        <Stack direction="row" spacing={0} sx={{ padding: 0, mt: 1 }} >
            <Link to="/"  >
                <NavItem active={true} >Trang chủ</NavItem>
            </Link>
            <NavItem >Gift Sets</NavItem>
            <NavItem >Album</NavItem>
            <NavItem >Khung hình</NavItem>
            <NavItem >Quà tặng</NavItem>
            <NavItem >Thiệp</NavItem>
            <NavItem >Nguyên liệu</NavItem>
            <Link to={'/blogs'}>
                <NavItem >Blogs</NavItem>
            </Link>
        </Stack>
    )
}



const Header = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const wishlist = useSelector((state: RootState) => state.wishlist);
    const user = useSelector((state: RootState) => state.user.user);
    const [showCart, setShowCart] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 120,
    });
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
    const scrollDirection = useScrollDirection();
    return (
        <Slide appear={false} direction='down' in={scrollDirection === "up" || !trigger}  >
            <AppBar position="sticky" sx={{
                boxShadow: "none",
                zIndex: 1004,
                transition: 'transform 0.3s ease-in-out', // Smooth transition
            }} color='inherit'>
                <Toolbar sx={{
                }} >
                    <Typography variant='h4'>
                        Decent&Craft
                    </Typography>
                    <SeachBar />
                    <Stack spacing={2} direction="row">
                        <LocalPhoneIcon />
                        <Typography variant='body1'>0925821477</Typography>
                    </Stack>
                    <Stack sx={{ marginX: 2 }} spacing={2} direction="row">
                        <Button
                            sx={{
                                height: 30,
                                width: 130,
                                borderRadius: 10,
                                position: "relative",
                                fontWeight: "bold"
                            }}
                            variant='contained'
                        >
                            <Tooltip
                                color='white'
                                title={
                                    <Stack direction="column" spacing={1}>
                                        <Link to={user ? '/login' : '/register'}>
                                            {user ? (
                                                <Button
                                                    variant='contained'
                                                    sx={{ width: '100%' }}
                                                    onClick={handleLogout}
                                                >
                                                    Đăng xuất
                                                </Button>
                                            ) : (
                                                <Link to='/register' style={{ width: '100%' }}>
                                                    <Button variant='contained' sx={{ width: '100%' }}>
                                                        Đăng Ký
                                                    </Button>
                                                </Link>
                                            )}
                                        </Link>
                                    </Stack>
                                }
                                arrow
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            bgcolor: "white"
                                        }
                                    }
                                }}
                            >
                                <Link
                                    style={{
                                        color: "white",
                                        textDecoration: "none"
                                    }} to={user ? '/user' : '/login'}>
                                    <Typography>
                                        {user ? 'Tài khoản' : 'Đăng nhập'}
                                    </Typography>
                                </Link>
                            </Tooltip>
                        </Button>
                        <Divider orientation='vertical' flexItem />
                        <Badge color='error' badgeContent={wishlist.length} >
                            <Link to={"wishlist"}>
                                <IconButton>
                                    <FavoriteIcon color="primary" />
                                </IconButton>
                            </Link>
                        </Badge>
                        <Stack
                            onMouseOver={() => {
                                setShowCart(true);
                            }}
                            onMouseOut={() => {
                                setShowCart(false);
                            }}
                            spacing={3} >
                            <Button
                                sx={{
                                    height: 30,
                                    borderRadius: 10,
                                    textTransform: "none",
                                    position: "relative"
                                }}
                                variant='contained'
                                endIcon={<Badge color='error' badgeContent={getCount(cart)}>
                                    <ShoppingCartIcon />
                                </Badge>}>
                                <VNDNumericFormat price={getTotalPrice(cart)} />
                            </Button>
                            <CartContainer onMouseOut={() => {
                                setShowCart(false);
                            }} showCart={showCart} />
                        </Stack>
                    </Stack>
                </Toolbar>
                <NavBar />
            </AppBar>
        </Slide>
    )
}

export default Header