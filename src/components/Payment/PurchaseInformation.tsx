import React, { useEffect } from "react";
import {
    Card,
    CardContent,
    FormControl,
    MenuItem,
    Select,
    TextField,
    Typography,
    Box,
    Grid,
    Button,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Address from "../../interfaces/IAddress.ts";
import { SelectChangeEvent } from '@mui/material';
import MinHeightTextarea from "./MinHeightTextarea.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";
import { useGetAddressListQuery } from "../../api/addressApi.ts";
import { useNavigate } from "react-router-dom";
import { orderSetAddressId, orderSetUserId } from "../../features/order/orderSlice.ts";

const PurchaseInformation: React.FC = () => {
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = React.useState<Address | undefined>(undefined);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user).user;
    const { data, isLoading } = useGetAddressListQuery(user?.id);
    useEffect(() => {
        if (user == undefined) {
            navigate("/")
        }
        else {
            dispatch(orderSetUserId(user?.id));
        }
    }, [navigate, user, dispatch]);
    const addresses = data;
    useEffect(() => {
        if (addresses && addresses.length > 0 && !isLoading) {
            const defaultAddress = addresses.find(a => a.defaultAddress);
            if (defaultAddress) {
                dispatch(orderSetAddressId(defaultAddress?.id));
                setSelectedAddress(defaultAddress);
            }
            else {
                dispatch(orderSetAddressId(addresses[0].id));
                setSelectedAddress(addresses[0]);
            }
        }
    }, [addresses, isLoading]);


    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography variant="h6" gutterBottom>
                            Thông tin mua hàng
                        </Typography>
                    </Grid>
                </Grid>
                <Box mb={2}>
                    <TextField
                        required
                        fullWidth
                        id="fullName"
                        label="Họ và tên"
                        disabled
                        value={selectedAddress?.fullName || ""}
                        autoComplete="fullName"
                        type="text"
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        disabled
                        value={user?.email}
                        label="Email Address"
                        type="email"
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        required
                        fullWidth
                        disabled
                        id="phone"
                        label="Số điện thoại"
                        autoComplete="phone"
                        value={selectedAddress?.phoneNumber || " "}
                        type="text"
                    />
                </Box>
                {selectedAddress ?
                    <AddressSelect
                        handleChange={(event) => {
                            dispatch(orderSetAddressId(+event.target.value));
                            setSelectedAddress(addresses?.find(a => a.id == +event.target.value));
                        }}
                        selectedAddress={selectedAddress}
                        addresses={addresses}
                    />
                    : <Button onClick={() => {
                        navigate("/user");
                    }} variant="contained">
                        Thêm địa chỉ
                    </Button>
                }
                <MinHeightTextarea />
            </CardContent>
        </Card>
    );
}

interface Props {
    addresses: Address[] | undefined;
    selectedAddress: Address | undefined;
    handleChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
}
const AddressSelect: React.FC<Props> = ({ addresses, selectedAddress, handleChange }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="address-label">Địa chỉ</InputLabel>
            <Select
                labelId="address-label"
                id="address"
                label="address"
                onChange={handleChange}
                value={selectedAddress?.id.toString()}
            >
                {addresses && addresses.map((addr, index) => (
                    <MenuItem key={addr.id} value={addr.id.toString()}>
                        {`#${index + 1} ${addr.description}, ${addr.ward}, ${addr.district}, ${addr.province}`}
                    </MenuItem>
                ))}
                <MenuItem value="-1">Khác</MenuItem>
            </Select>
        </FormControl>
    );
};
export default PurchaseInformation;