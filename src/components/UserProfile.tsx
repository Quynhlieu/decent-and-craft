import {Fab, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PasswordIcon from '@mui/icons-material/Password';
import FemaleIcon from '@mui/icons-material/Female';
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const UserProfile  = () => {
    const userFromSessionStorage = sessionStorage.getItem('user');
    const user = JSON.parse(userFromSessionStorage)
    console.log(sessionStorage.getItem("user"))
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user?.id){
            navigate("/login");
        }
    },[])
    return (
        <Box  sx={{ height: 320, width: 800}}>
            <Typography variant='h3'  sx={{
                textAlign: 'center',
                position: 'relative',
                marginBottom: '20px',
            }}>
                Thông tin tài khoản
            </Typography>
            <List
                sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}
                aria-label="contacts"
            >
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Số điện thoại:" />
                        <ListItemText sx={{ textAlign: 'right' }}  primary={user?.phone || 'N/A'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Email:" />
                        <ListItemText sx={{ textAlign: 'right' }}  primary={user?.email} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FemaleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Giới tính:" />
                        <ListItemText sx={{ textAlign: 'right' }}  primary={user?.sex || 'N/A'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Địa chỉ:" />
                        <ListItemText sx={{ textAlign: 'right' }} primary={user?.address && user.address.length > 0 ? user.address[0].description : 'N/A'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PasswordIcon />
                        </ListItemIcon>
                        <ListItemText primary="Password:" />
                        <ListItemText sx={{ textAlign: 'right' }}  primary="********" />
                    </ListItemButton>
                </ListItem>

            </List>

        </Box>
    )
}

export default UserProfile