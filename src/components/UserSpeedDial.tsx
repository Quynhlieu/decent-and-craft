import React, { useState } from 'react';
import { Fab, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PasswordIcon from '@mui/icons-material/Password';
import '../assets/user.css';

interface UserSpeedDialProps {
    onComponentChange: (componentName: string) => void;
}

const UserSpeedDial: React.FC<UserSpeedDialProps> = ({ onComponentChange }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box className="UserProfile">
            <div className="left">
                <Fab className="Fab" size="small" color="secondary" aria-label="add" onClick={handleToggle}>
                    {isExpanded ? <RemoveIcon /> : <AddIcon />}
                </Fab>
                <Box className={isExpanded ? 'expanded' : 'collapsed'} sx={{ width: '100%', bgcolor: 'background.paper' }} style={{ display: isExpanded ? 'block' : 'none' }}>
                    <nav aria-label="main mailbox folders">
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onComponentChange('UserProfile')}>
                                    <ListItemIcon>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Thông tin" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onComponentChange('MyOrder')}>
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Đơn hàng" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onComponentChange('MyAddress')}>
                                    <ListItemIcon>
                                        <LocationOnIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Địa chỉ" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onComponentChange('ChangePassword')}>
                                    <ListItemIcon>
                                        <PasswordIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Đổi mật khẩu" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                    <Divider />
                    <nav aria-label="secondary mailbox folders">
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Đăng xuất" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            </div>
        </Box>
    );
}

export default UserSpeedDial;
