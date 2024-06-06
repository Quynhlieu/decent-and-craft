import { AppBar, Badge, Box, Button, Divider, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import SeachBar from './SeachBar'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { getCount, getTotalPrice } from '../features/cart/cartSlice';
import { VNDNumericFormat } from './ProductCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CartContainer from './Cart/CartContainer';
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
        <Stack direction="row" spacing={8} sx={{ padding: 0, mt: 3 }} >
            <Link to="/"  >
                <NavItem active={true} >Trang chủ</NavItem>
            </Link>
            <NavItem >Gift Sets</NavItem>
            <NavItem >Album</NavItem>
            <NavItem >Khung hình</NavItem>
            <NavItem >Quà tặng</NavItem>
            <NavItem >Thiệp</NavItem>
            <NavItem >Nguyên liệu</NavItem>
            <NavItem >Blogs</NavItem>

        </Stack>
    )
}

const Header = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const wishlist = useSelector((state: RootState) => state.wishlist);
    const [showCart, setShowCart] = useState<boolean>(false);

    return (
        <Box sx={{
            padding: 0,
            margin: 0
        }} >
            <AppBar position='static' sx={{ boxShadow: "none" }} color='transparent'>
                <Toolbar sx={{
                    padding: 0,
                    margin: 0,
                }} >
                    <Typography variant='h4'>
                        Decent&Craft
                    </Typography>
                    <SeachBar />
                    <Stack spacing={2} direction="row">
                        <LocalPhoneIcon />
                        <Typography variant='body1'>0925821477</Typography>
                    </Stack>
                    <Stack sx={{ marginX: 2 }} spacing={3} direction="row">
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
                                        <Link to="/register">
                                            <Button variant='contained' sx={{ width: '100%' }}>Đăng Ký</Button>
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
                                    }} to={'/login'} >
                                    <Typography>
                                        ĐĂNG NHẬP
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
                        <Button
                            onMouseOver={() => {
                                setShowCart(true);
                            }}
                            onMouseOut={() => {
                                setShowCart(false);
                            }}
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
                            <CartContainer onMouseOut={() => {
                                setShowCart(false);
                            }} showCart={showCart} />
                        </Button>
                    </Stack>
                </Toolbar>
                <NavBar />
            </AppBar>
        </Box>
    )
}

export default Header