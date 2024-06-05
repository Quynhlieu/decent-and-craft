import {AppBar, Badge, Box, Button, Divider, Popover, Stack, Toolbar, Typography} from '@mui/material'
import React, { useState } from 'react'
import SeachBar from './SeachBar'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { getCount, getTotalPrice } from '../features/cart/cartSlice';
import { VNDNumericFormat } from './ProductCard';
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
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const cart = useSelector((state: RootState) => state.cart);
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
                    <Stack sx={{marginX: 2}} spacing={3} direction="row">
                        <div
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                        >
                            <Button
                                sx={{
                                    height: 30,
                                    width: 200,
                                    borderRadius: 10,
                                    fontWeight: "bold"
                                }}
                                variant='contained'
                            >
                                ĐĂNG NHẬP/ĐĂNG KÝ
                            </Button>
                            <Popover sx={{mt: 1}}
                                     open={open}
                                     anchorEl={anchorEl} //xác định vị trí xuất hiện của Popover.
                                     anchorOrigin={{
                                         vertical: 'bottom',
                                         horizontal: 'center',
                                     }}
                                     transformOrigin={{
                                         vertical: 'top',
                                         horizontal: 'center',
                                     }}
                                     onClose={handlePopoverClose}
                                     disableRestoreFocus
                            >
                                <Stack direction="column" spacing={1} sx={{p: 2}}>
                                    <Link to="/login">
                                        <Button variant='contained' sx={{width: '100%'}}>Đăng Nhập</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button variant='contained' sx={{width: '100%'}}>Đăng Ký</Button>
                                    </Link>
                                </Stack>
                            </Popover>
                        </div>
                        <Divider orientation='vertical' flexItem/>
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
                                <ShoppingCartIcon/>
                            </Badge>}>
                            <VNDNumericFormat price={getTotalPrice(cart)}/>
                            <CartContainer onMouseOut={() => {
                                setShowCart(false);
                            }} showCart={showCart}/>
                        </Button>
                    </Stack>
                </Toolbar>
                <NavBar/>
            </AppBar>
        </Box>
    )
}

export default Header