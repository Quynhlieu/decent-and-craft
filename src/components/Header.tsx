import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Badge, Button, Divider, IconButton, Slide, Stack, styled, Toolbar, Tooltip, Typography, useScrollTrigger } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { getCount, getTotalPrice } from '../features/cart/cartSlice';
import { logout } from "../features/user/userSlice.ts";
import useScrollDirection from '../hooks/useScrollDirection.ts';
import CartContainer from './Cart/CartContainer';
import { VNDNumericFormat } from './ProductCard';
import SeachBar from './SearchBar';


const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    fontSize: 25,
    padding: 10,
    color: 'inherit',
    '&.active': {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    '&.inactive': {
        fontWeight: 'normal',
    },
    '&.visited': {
        color: "white",
        fontWeight: 'normal',
    },
}));

const NavBar = () => {

    return (
        <Stack direction="row" spacing={0} sx={{ paddingY: 2, mt: 1, justifyContent: "space-around" }}>
            <StyledNavLink to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                Trang chủ
            </StyledNavLink>
            <StyledNavLink
                to="/search/category/1"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                Gift sets
            </StyledNavLink>
            <StyledNavLink
                to="/search/category/2"
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
                Album
            </StyledNavLink>
            <StyledNavLink
                to="/search/category/3"
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
                Khung hình
            </StyledNavLink>
            <StyledNavLink
                to="/search/category/4"
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
                Quà tặng
            </StyledNavLink>
            <StyledNavLink
                to="/search/category/5"
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
                Thiệp
            </StyledNavLink>
            <StyledNavLink
                to="/search/category/6"
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
                Nguyên liệu
            </StyledNavLink>
            <StyledNavLink to="/blogs" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                Blogs
            </StyledNavLink>
        </Stack>
    );
};



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
