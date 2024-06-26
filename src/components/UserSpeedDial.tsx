import React, {useEffect, useState} from 'react';
import { Fab, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PasswordIcon from '@mui/icons-material/Password';
import '../assets/user.css';
import {useNavigate} from "react-router-dom";

interface UserSpeedDialProps {
    onComponentChange: (componentName: string) => void;
}

const UserSpeedDial: React.FC<UserSpeedDialProps> = ({ onComponentChange }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [selectedComponent, setSelectedComponent] = useState<string>('UserProfile'); // Thay đổi ở đây
    const navigate = useNavigate();
    useEffect(() => {
        onComponentChange(selectedComponent);
    }, [selectedComponent, onComponentChange]);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleItemClick = (componentName: string) => {
        setSelectedComponent(componentName);
    };
    console.log(sessionStorage.getItem("user"))
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        navigate("/login");
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
                                <ListItemButton
                                    onClick={() => handleItemClick('UserProfile')}
                                    selected={selectedComponent === 'UserProfile'}
                                    sx={{
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '& .MuiListItemIcon-root': { color: 'white' }
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Thông tin" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleItemClick('MyOrder')}
                                    selected={selectedComponent === 'MyOrder'}
                                    sx={{
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '& .MuiListItemIcon-root': { color: 'white' }
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Đơn hàng" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleItemClick('MyAddress')}
                                    selected={selectedComponent === 'MyAddress'}
                                    sx={{
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '& .MuiListItemIcon-root': { color: 'white' }
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <LocationOnIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Địa chỉ" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleItemClick('ChangePassword')}
                                    selected={selectedComponent === 'ChangePassword'}
                                    sx={{
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '& .MuiListItemIcon-root': { color: 'white' }
                                        }
                                    }}
                                >
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
                            <ListItem>
                                <ListItemButton  onClick={handleLogout}>
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
