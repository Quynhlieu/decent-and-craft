import { AppBar, Box, Button, Divider, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import SeachBar from './SeachBar'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface NavItemProps {
    active?: boolean,
    children: React.ReactNode
}

const NavItem: React.FC<NavItemProps> = ({ active, children }) => {
    const baseSx = {
        textTransform: "none",
        color: "secondary",
        fontSize: 22
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
            sx={style}> {children} </Button >
    )
}

const NavBar = () => {
    return (
        <Stack direction="row" spacing={8} sx={{ paddingX: 10, mt: 5 }} >
            <NavItem active={true} >Trang chủ</NavItem>
            <NavItem  >Gift Sets</NavItem>
            <NavItem  >Album</NavItem>
            <NavItem  >Khung hình</NavItem>
            <NavItem  >Quà tặng</NavItem>
            <NavItem  >Thiệp</NavItem>
            <NavItem  >Nguyên liệu</NavItem>
            <NavItem  >Blogs</NavItem>

        </Stack>
    )
}

const Header = () => {
    return (
        <Box>
            <AppBar  position='static' sx={{boxShadow:"none"}} color='transparent'>
                <Toolbar  >
                    <Typography variant='h4'>
                        Decent&Craft
                    </Typography>
                    <SeachBar />
                    <Stack spacing={2} direction="row">
                        <LocalPhoneIcon />
                        <Typography variant='body1'>0925821477</Typography>
                    </Stack>
                    <Stack sx={{ marginX: 3 }} spacing={3} direction="row">
                        <Button sx={{
                            borderRadius: 10,
                            fontWeight: "bold"
                        }} variant='contained' >ĐĂNG NHẬP/ĐĂNG KÝ</Button>
                        <Divider orientation='vertical' flexItem />
                        <Button
                            sx={{
                                borderRadius: 10,
                                textTransform: "none"
                            }}
                            variant='contained'
                            endIcon={<ShoppingCartIcon />}>
                            0đ
                        </Button>
                    </Stack>
                </Toolbar>
                <NavBar />
            </AppBar>
        </Box>
    )
}

export default Header