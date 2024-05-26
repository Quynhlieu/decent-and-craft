import {Fab, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PasswordIcon from '@mui/icons-material/Password';
import FemaleIcon from '@mui/icons-material/Female';
import React from "react";

const UserProfile  = () => {
    return (
        <Box  sx={{ height: 320, width: 950}}>
            <Typography variant='h3'  sx={{
                textAlign: 'center',
                position: 'relative',
                marginBottom: '20px',
            }}>
                Thông tin tài khoản
            </Typography>
            <List
                sx={{ width: '100%', maxWidth: 950, bgcolor: 'background.paper' }}
                aria-label="contacts"
            >
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Số điện thoại:" />
                        <ListItemText sx={{ textAlign: 'right' }}  primary="(+84) 123 456 789" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Email:" />
                        <ListItemText sx={{ textAlign: 'right' }}  primary="example@example.com" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FemaleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Giới tính:" />
                        <ListItemText sx={{ textAlign: 'right' }}  primary="Nữ" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Địa chỉ:" />
                        <ListItemText sx={{ textAlign: 'right' }} primary="236 5th SE Avenue, New York NY10000, United States" />
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