import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
    Button
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Address from "../../interfaces/IAddress.ts";
import { SelectChangeEvent } from '@mui/material';
import LocationSelector from "./LocationSelector.tsx";
import MinHeightTextarea from "./MinHeightTextarea.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";
import { useGetAddressListQuery } from "../../api/addressApi.ts";
import { useNavigate } from "react-router-dom";

interface FormValues {
    fullName: string;
    email: string;
    phone: string;
    address: string;
}

const DEFAULT_ADDRESS: Address = {
    id: -1,
    description: 'Khác',
    ward: '',
    district: '',
    province: '',
    defaultAddress: false
};

const PurchaseInformation: React.FC = () => {
    const user = useSelector((state: RootState) => state.user).user;
    const navigate = useNavigate();
    const { data, isLoading } = useGetAddressListQuery(user.id);
    const addressess = data;
    const [showLocationSelector, setShowLocationSelector] = useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState<Address | undefined>(undefined);
    useEffect(() => {
        if (user == undefined) {
            navigate("/")
        }
    }, [user]);
    useEffect(() => {
        if (addressess && addressess.length > 0 && !isLoading) {
            const defaultAddress = addressess.find(a => a.defaultAddress);
            console.log(defaultAddress);
            setSelectedAddress(defaultAddress);
        }
    }, [addressess, isLoading]);


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
                {selectedAddress &&
                    <AddressSelect
                        handleChange={(event) => {
                            setSelectedAddress(addressess?.find(a=>a.id==event.target.value));
                        }}
                        selectedAddress={selectedAddress}
                        addresses={addressess}
                    />
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
                {addresses && addresses.map((addr,index) => (
                    <MenuItem key={addr.id} value={addr.id.toString()}>
                        {`#${index} ${addr.description}, ${addr.ward}, ${addr.district}, ${addr.province}`}
                    </MenuItem>
                ))}
                <MenuItem value="-1">Khác</MenuItem>
            </Select>
        </FormControl>
    );
};
export default PurchaseInformation;