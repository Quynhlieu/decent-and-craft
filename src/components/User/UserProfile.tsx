import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Button,
    FormControl, FormLabel, RadioGroup, Radio
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PasswordIcon from '@mui/icons-material/Password';
import FemaleIcon from '@mui/icons-material/Female';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useDispatch} from "react-redux";
import { updateInfo} from "../../features/user/userSlice.ts";
import IUser from "../../interfaces/IUser.ts";

const UserProfile: React.FC  = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    const userFromSessionStorage = sessionStorage.getItem('user');
    const user: IUser | null = userFromSessionStorage ? JSON.parse(userFromSessionStorage) : null;
    // console.log(sessionStorage.getItem("user"))
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user?.id){
            navigate("/login");
        }
    },[]);

    const handleFormSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const updatedUser: IUser = {
            ...user,
            id: user?.id ?? 0,
            fullName: formData.get('fullName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            sex: formData.get('sex') as string,
            password: user?.password ?? '',
        };
        console.log(updatedUser);
        dispatch(updateInfo(updatedUser));
        setOpen(false);
    };
    return (
        <Box  sx={{ minHeight: 320, width: 800}}>
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

            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}
                sx={{margin:1}}>
                    Cập nhật thông tin
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: handleFormSubmit,
                    }}
                >
                    <DialogTitle>Cập nhật thông tin</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="fullName"
                            label="Họ và tên"
                            type="fullName"
                            fullWidth
                            variant="standard"
                            defaultValue={user?.fullName}
                        />

                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="email"
                            name="email"
                            label="Địa chỉ Email"
                            type="email"
                            fullWidth
                            variant="standard"
                            defaultValue={user?.email}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="Số điện thoại"
                            defaultValue={user?.phone}
                            fullWidth
                            variant="standard"/>
                        <FormControl sx={{mt: 2}}>
                            <FormLabel id="demo-radio-buttons-group-label">Giới tính</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                <FormControlLabel value="male" control={<Radio />} label="Nam" />
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Cập nhật</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Box>
    )
}

export default UserProfile