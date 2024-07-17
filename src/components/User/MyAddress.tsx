import React, {useState} from "react";
import {Box, Container, Fab, Grid, Paper, TextField, Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {SubmitHandler, useForm} from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IAddress from "../../interfaces/IAddress";
import {useAddAddressMutation, useGetAddressListQuery, useUpdateAddressMutation} from "../../api/addressApi.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {OrbitProgress} from "react-loading-indicators";
import LocationSelector from "../Payment/LocationSelector.tsx";
import Swal from "sweetalert2";

interface AddressInfoProps {
    address: IAddress;
    onClickEdit: () => void;
    onClickDelete: () => void;
}

interface AddressAddBackProps {
    onBack: () => void;
    title: string
}

const TitleAddress: React.FC<{ title: string }> = ({ title }) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3}}>
            <AddLocationIcon color="primary" sx={{mr: 1}}/>
            <Typography variant="h5" align="center">
                {title}
            </Typography>
        </Box>
    );
}

const BackAndAdd: React.FC<AddressAddBackProps> = ({ onBack, title }) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 3}}>
            <Button variant="outlined" color="secondary" onClick={onBack} sx={{marginRight: 2}}>
                Quay lại
            </Button>
            <Button type="submit" variant="contained" color="primary">
                {title}
            </Button>
        </Box>
    );
}

interface FormValue {
    province: string;
    district: string;
    ward: string;
    description: string;
    fullName: string;
    phoneNumber: string;
    defaultAddress: boolean;
}

interface AddAddressFormProps {
    userId: number;
    onBack: () => void;
    title : string;
    defaultValues?: IAddress;
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({userId, onBack, title, defaultValues}) => {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<IAddress>({defaultValues});
    const [addAddress] = useAddAddressMutation();

    const[updateAddress] = useUpdateAddressMutation();

    const onSubmit: SubmitHandler<FormValue> = async formData => {
        try {
            if (defaultValues) {
                const updatedAddress = {
                    addressId: defaultValues.id,
                    userId: userId,
                    province: formData.province,
                    district: formData.district,
                    ward: formData.ward,
                    description: formData.description,
                    fullName: formData.fullName,
                    phoneNumber: formData.phoneNumber,
                    isDefault: formData.defaultAddress,
                };
                await updateAddress(updatedAddress).unwrap();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cập nhật địa chỉ thành công !",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                const newAddress = {
                    userId: userId,
                    province: formData.province,
                    district: formData.district,
                    ward: formData.ward,
                    description: formData.description,
                    fullName: formData.fullName,
                    phoneNumber: formData.phoneNumber,
                    isDefault: formData.defaultAddress,
                };
                await addAddress(newAddress).unwrap();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Thêm địa chỉ mới thành công !",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            onBack();
        } catch (e) {
            console.error(e);
        }
    };
    const province = (province: string) => {
        setValue('province', province);
    };
    const district = (district: string) => {
        setValue('district', district);
    };
    const ward = (ward: string) => {
        setValue('ward', ward);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{padding: 4, borderRadius: 2}}>
                <TitleAddress title = {title}/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="name"
                                label="Họ và Tên"
                                variant="outlined"
                                {...register("fullName", {required: "Họ và Tên là bắt buộc"})}
                                error={!!errors.fullName}
                                helperText={errors.fullName ? errors.fullName.message : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="phone"
                                label="Số điện thoại"
                                variant="outlined"
                                {...register("phoneNumber", {
                                    required: "Số điện thoại là bắt buộc",
                                    pattern: {
                                        value: /\d{10,11}/,
                                        message: "Số điện thoại không hợp lệ"
                                    },
                                    maxLength: {
                                        value: 11,
                                        message: "Số điện thoại tối đa 11 số"
                                    }
                                })}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
                            />
                        </Grid>
                        <Grid item xs ={12}>
                            <LocationSelector
                                province={province}
                                district={district}
                                ward={ward}
                                defaultValues = {defaultValues}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="description"
                                label="Mô tả"
                                variant="outlined"
                                {...register("description", {required: "Tòa nhà, tên đường là bắt buộc"})}
                                error={!!errors.description}
                                helperText={errors.description ? errors.description.message : ""}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox {...register("defaultAddress")} />}
                                label="Đặt làm địa chỉ mặc định"
                            />
                        </Grid>
                    </Grid>
                    <BackAndAdd onBack={onBack} title ={title}/>
                </form>
            </Paper>
        </Container>
    );
};

const AddBtn = ({onBack}: { onBack: () => void }) => {
    return (
        <Box sx={{width: '100%', display: 'flex', justifyContent: "flex-end", paddingTop: 3}}>
            <Fab variant="extended" onClick={onBack}>
                <AddIcon sx={{mr: 1, flex: 2}}/>
                Thêm
            </Fab>
        </Box>
    );
}

const AddressInfo: React.FC<AddressInfoProps> = ({ address, onClickEdit, onClickDelete }) => {

    return (
        <Box sx={{
            borderTop: '1px solid #ebebeb',
            paddingTop: 2,
            marginTop: 2,
            paddingBottom: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: 1,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <Box sx={{
                marginX: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box sx={{flex: 1}}>
                    <Typography variant="body1" sx={{mb: 1}}>
                        Họ tên: <strong>{address.fullName}</strong>
                        {address.defaultAddress && (
                            <span style={{marginLeft: 8, color: 'green', fontSize: '0.9rem'}}>
                                    <CheckCircleIcon sx={{verticalAlign: 'middle'}}/> Địa chỉ mặc định
                                </span>
                        )}
                    </Typography>
                    <Typography variant="body1" sx={{mb: 1}}>
                        Số điện thoại: <strong>{address.phoneNumber}</strong>
                    </Typography>
                    <Typography variant="body1" sx={{mb: 1}}>
                        Địa
                        chỉ: <strong>{`${address.description}, ${address.ward}, ${address.district}, ${address.province}`}</strong>
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{mb: 1}}>
                        <strong>Chức năng</strong>
                    </Typography>
                    <Box sx={{display: 'flex', gap: 1}}>
                        <Button variant="outlined" sx={{
                            borderColor: '#2196f3',
                            color: '#2196f3',
                            '&:hover': {
                                backgroundColor: '#e3f2fd'
                            },
                            mr: 1
                        }}
                                onClick={onClickEdit}
                        >
                            <EditIcon/>
                        </Button>
                        <Button variant="outlined" color="error" sx={{
                            borderColor: '#f44336',
                            color: '#f44336',
                            '&:hover': {
                                backgroundColor: '#ffebee'
                            }
                        }}
                                onClick={onClickDelete}
                        >
                            <DeleteIcon/>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
const MyAddress: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [title, setTitle] = useState("Thêm địa chỉ mới");
    const [currentAddress, setCurrentAddress] = useState<IAddress | null>(null);
    const user = useSelector((state: RootState) => state.user.user);
    const {data, isLoading} = useGetAddressListQuery(user?.id ?? 0);
    const handleBack = () => {
        setIsFormVisible(false);
        setCurrentAddress(null);
        setTitle("Thêm địa chỉ mới");
    };

    const handleAddClick = () => {
        setIsFormVisible(true);
        setTitle("Thêm địa chỉ mới");
    };

    const handleEditClick = (address: IAddress) => {
        setCurrentAddress(address);
        setIsFormVisible(true);
        setTitle("Chỉnh sửa địa chỉ");
    };
    // const [deleteAddress, {isLoading}] = use
    const handleDeleteClick = async (addressId: number) => {
        // try {
        //     await deleteAddress(addressId).unwrap();
        // } catch (e) {
        //     console.error(e);
        // }
    };
    return (
        <Box sx={{minHeight: 320, width: 800}}>
            {isFormVisible ? (
                <AddAddressForm onBack={handleBack} defaultValues={currentAddress ?? undefined} userId={user?.id ?? 0} title = {title}/>
            ) : (
                <>
                    <Typography variant='h3' sx={{
                        textAlign: 'center',
                        position: 'relative',
                        marginBottom: '20px',
                    }}>
                        Địa chỉ của tôi
                    </Typography>

                    <Box sx={{width: '100%'}}>
                        {data && data.map((address) => (
                            <AddressInfo
                                key={address.id}
                                address={address}
                                onClickEdit={() => handleEditClick(address)}
                                onClickDelete={() => handleDeleteClick(address.id)}
                            />
                        ))}
                    </Box>

                    <AddBtn onBack={handleAddClick}/>
                </>
            )}

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
                    <OrbitProgress color="color.primary.main" size="medium" text="" textColor=""/>
                </Box>
            )}
        </Box>
    );
};


export default MyAddress;
