import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
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
import { Link } from "react-router-dom";
import IUser from "../../interfaces/IUser";
import users from "../../data/user";
import Address from "../../interfaces/IAddress.ts";
import { SelectChangeEvent } from '@mui/material';
import LocationSelector from "./LocationSelector.tsx";
import MinHeightTextarea from "./MinHeightTextarea.tsx";

interface FormValues {
    fullName: string;
    email: string;
    phone: string;
    address: string;
}

const userFromSessionStorage = sessionStorage.getItem('user');
const user: IUser | null = userFromSessionStorage ? JSON.parse(userFromSessionStorage) : null;
const matchedUser = users.find(u => u.email === user?.email);

const DEFAULT_ADDRESS: Address = {
    id: -1,
    description: 'Khác',
    ward: '',
    district: '',
    province: '',
    isDefault: false
};

const PurchaseInformation : React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<FormValues>({
        defaultValues: {
            fullName: matchedUser?.fullName || '',
            email: matchedUser?.email || '',
            phone: matchedUser?.phone || '',
            address: matchedUser?.address
            && matchedUser.address.length > 0
                ? `${matchedUser.address[0].description}, 
                ${matchedUser.address[0].ward}, 
                ${matchedUser.address[0].district}, 
                ${matchedUser.address[0].province}`
                : DEFAULT_ADDRESS.description
        }
    });


    const [selectedAddress, setSelectedAddress] = React.useState<Address>(
        matchedUser?.address && matchedUser.address.length > 0
            ? matchedUser.address[0]
            : DEFAULT_ADDRESS
    );

    const [showLocationSelector, setShowLocationSelector] = useState(false);

    // const handleChange = (event: SelectChangeEvent<string>) => {
    //     const selectedAddressId = event.target.value;
    //     const address = matchedUser?.address?.find(addr => addr.id.toString() === selectedAddressId) || DEFAULT_ADDRESS;
    //     setSelectedAddress(address);
    //     setValue('address', address ? `${address.description}, ${address.ward}, ${address.district}, ${address.province}` : DEFAULT_ADDRESS);
    // };
    const handleChange = (
        event: SelectChangeEvent<string>,
    ) => {
        const selectedAddressId = event.target.value;
        const address =
            matchedUser?.address?.find(
                (addr) => addr.id.toString() === selectedAddressId
            ) || DEFAULT_ADDRESS;
        setSelectedAddress(address);
        setValue(
            "address",
            address
                ? `${address.description}, ${address.ward}, ${address.district}, ${address.province}`
                : DEFAULT_ADDRESS
        );
        setShowLocationSelector(address.id === -1);
    };


    const onSubmit = (data: FormValues) => {
        console.log(data);

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography variant="h6" gutterBottom>
                                Thông tin mua hàng
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button component={Link} to="/login" color="secondary">
                                Đăng nhập
                            </Button>
                        </Grid>
                    </Grid>

                    <Box mb={2}>
                        <TextField
                            required
                            fullWidth
                            id="fullName"
                            label="Họ và tên"
                            autoComplete="fullName"
                            type="text"
                            {...register("fullName", { required: "Họ và tên là bắt buộc" })}
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            type="email"
                            {...register("email", {
                                required: "Email là bắt buộc",
                                pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email không hợp lệ" }
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            required
                            fullWidth
                            id="phone"
                            label="Số điện thoại"
                            autoComplete="phone"
                            type="text"
                            {...register("phone", { required: "Số điện thoại là bắt buộc" })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Box>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <AddressSelect
                                addresses={matchedUser?.address || []}
                                selectedAddress={selectedAddress}
                                handleChange={(event) => {
                                    handleChange(event);
                                    field.onChange(event.target.value);
                                }}
                            />
                        )}
                    />
                    {errors.address && <p>{errors.address.message}</p>}
                    {showLocationSelector && <LocationSelector />}
                    <MinHeightTextarea />
                </CardContent>
            </Card>
        </form>
    );
}

interface Props {
    addresses: Address[];
    selectedAddress: Address | undefined;
    handleChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;

}

const AddressSelect: React.FC<Props> = ({ addresses, selectedAddress, handleChange  }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="address-label">Địa chỉ</InputLabel>
            <Select
                labelId="address-label"
                id="address"
                label="address"
                onChange={handleChange}
                value={selectedAddress?.id?.toString()}
            >
                {addresses.map((addr) => (
                    <MenuItem key={addr.id} value={addr.id.toString()}>
                        {`${addr.description}, ${addr.ward}, ${addr.district}, ${addr.province}`}
                    </MenuItem>
                ))}
                <MenuItem value="-1">Khác</MenuItem>
            </Select>
        </FormControl>
    );
};
export default PurchaseInformation;