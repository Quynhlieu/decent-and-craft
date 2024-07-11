import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Button,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PasswordIcon from '@mui/icons-material/Password';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useEffect, useState} from "react";
import {useUpdateInfoUserMutation} from "../../api/userApi.ts";
import {OrbitProgress} from "react-loading-indicators";
import {RootState} from "../../app/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {updateInfo} from "../../features/user/userSlice.ts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {useGetAddressListQuery} from "../../api/addressApi.ts";

const UserProfile: React.FC  = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const[phone,setPhone] = useState<string>("");
    const[fullName,setFullName] = useState<string>("");
    const user = useSelector((state: RootState) => state.user.user);
    const {data : addressList} = useGetAddressListQuery(user?.id ?? 0);
    const [userUpdate, { isLoading,data, isError, error}] = useUpdateInfoUserMutation();
    const dispatch  = useDispatch();
    const handleClickOpen =   () => {
        console.log(user);
        setOpen(true);
    };

    const handleClose = async() => {
        setOpen(false);
    };


    const handleFormSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userInfo = {
            userId: user?.id ?? 0,
            fullName: fullName,
            phone: phone,
        };
        try {
            await userUpdate(userInfo);
        }
        catch (e) {
            console.error('Update error:', error);
        }
        setOpen(false);
    };
    useEffect(() => {
        if (user) {
            setFullName(user.fullName);
            setPhone(user.phone ?? "");
        }
    }, [user]);

    useEffect(() => {
        if (data) {
            sessionStorage.setItem('user', JSON.stringify(data));
            dispatch(updateInfo(data));
        }
    }, [data, dispatch]);
    let displayError: string | undefined;
    if (isError) {
        if ('status' in error) {
            displayError = 'Cập nhật không thành công !';
        } else {
            displayError = error.message;
        }
    }

    const defaultAddress = addressList && (addressList.find((addr) => addr.defaultAddress) || addressList[0]);
    const defaultAddressString = defaultAddress
        ? `${defaultAddress.description}, ${defaultAddress.ward}, ${defaultAddress.district}, ${defaultAddress.province}`
        : "Chưa có địa chỉ";
    return (
        <Box  sx={{ minHeight: 320, width: 800}}>
            <Typography variant='h3'  sx={{
                textAlign: 'center',
                position: 'relative',
                marginBottom: '20px',
            }}>
                Thông tin tài khoản
            </Typography>
            {isError &&
                    <Typography color="error" sx={{ m: 1 }}>
                        {displayError}
                    </Typography>}
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
                        <ListItemText sx={{ textAlign: 'right' }}  primary={user?.phone || 'Chưa có số điện thoại'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Email:" />
                        <ListItemText sx={{ textAlign: 'right' }}  primary={user?.email || 'Chưa có email'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Địa chỉ:" />
                        <ListItemText sx={{ textAlign: 'right' }} primary= {defaultAddressString || "Không có địa chỉ"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PasswordIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trạng thái:" />
                        <ListItemText sx={{ textAlign: 'right' }}  primary={user?.status ||""} />
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
                            value={fullName}
                            variant="standard"
                            onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                                setFullName(event.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="Số điện thoại"
                            value={phone}
                            onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                                setPhone(event.target.value);
                            }}
                            fullWidth
                            variant="standard"/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Cập nhật</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            {isLoading && (
                <Box sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                }}>
                    <OrbitProgress color="color.primary.main" size="medium" text="" textColor="" />
                </Box>
            )}
        </Box>
    )
}

export default UserProfile