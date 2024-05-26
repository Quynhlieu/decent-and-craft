import React from 'react'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PasswordIcon from '@mui/icons-material/Password';
import {Backdrop} from "@mui/material";


const actions = [
    { icon: <AccountCircleIcon />, name: 'Thông tin' },
    { icon: <AssignmentIcon />, name: 'Đơn hàng' },
    { icon: <LocationOnIcon />, name: 'Địa chỉ' },
    { icon: <PasswordIcon />, name: 'Mật khẩu' },
];


const UserSpeedDial = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box sx={{ height: 320, width: 200, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <Backdrop
                open={open}
                onClick={handleClose}
                sx={{
                    zIndex: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
            />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16
                }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="down"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        tooltipPlacement="right"
                        onClick={handleClose}
                        sx={{
                            '& .MuiSpeedDialAction-staticTooltipLabel': {
                                backgroundColor: 'secondary.main',
                                color: '#fff',
                                borderRadius: '4px',
                                fontSize: '0.875rem',
                                padding: '4px 8px',
                                whiteSpace: 'nowrap'
                            },
                        }}
                    />
                ))}
            </SpeedDial>
        </Box>
    )
}

export default UserSpeedDial