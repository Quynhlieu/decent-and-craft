import React, { useState } from "react";
import {Box, Container, Fab, Grid, Paper, TextField, Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import {SubmitHandler, useForm} from "react-hook-form";

interface IAddress {
    name: string;
    phone: string;
    province: string;
    district: string;
    ward: string;
    description: string;
}

const TitleAddress = ()=> {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <AddLocationIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h5" align="center">
                Thêm Địa Chỉ Mới
            </Typography>
        </Box>
    );
}

const BackAndAdd =({ onBack }: { onBack: () => void })=>{
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
            <Button variant="outlined" color="secondary" onClick={onBack} sx={{ marginRight: 2 }}>
                Quay lại
            </Button>
            <Button type="submit" variant="contained" color="primary">
                Thêm Địa Chỉ
            </Button>
        </Box>
    );
}

const AddAddressForm = ({ onBack }: { onBack: () => void }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IAddress>();
    const onSubmit: SubmitHandler<IAddress> = data => {
        console.log(data);

        onBack();
    };
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
               <TitleAddress />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="name"
                                label="Họ và Tên"
                                variant="outlined"
                                {...register("name", { required: "Họ và Tên là bắt buộc" })}
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="phone"
                                label="Số điện thoại"
                                variant="outlined"
                                {...register("phone", {required: "Số điện thoại là bắt buộc"})}
                                error={!!errors.phone}
                                helperText={errors.phone ? errors.phone.message : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="province"
                                label="Thành phố/ tỉnh"
                                variant="outlined"
                                {...register("province", {required: "Thành phố là bắt buộc"})}
                                error={!!errors.province}
                                helperText={errors.province ? errors.province.message : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="district"
                                label="Quận/ huyện"
                                variant="outlined"
                                {...register("district", {required: "Huyện là bắt buộc"})}
                                error={!!errors.district}
                                helperText={errors.district ? errors.district.message : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="ward"
                                label="Phường/ xã "
                                variant="outlined"
                                {...register("ward", {required: "Xã là bắt buộc"})}
                                error={!!errors.ward}
                                helperText={errors.ward ? errors.ward.message : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id = "description"
                                label="Ghi chú"
                                variant="outlined"
                                {...register("description", {required: "Ghi chú là bắt buộc"})}
                                error={!!errors.description}
                                helperText={errors.description ? errors.description.message : ""}
                            />
                        </Grid>
                    </Grid>
                    <BackAndAdd onBack={onBack} />
                </form>
            </Paper>
        </Container>
    );
};

const AddBtn = ({ onBack }: { onBack: () => void }) => {
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent:"flex-end", paddingTop: 3 }}>
            <Fab variant="extended" onClick={onBack}>
                <AddIcon sx={{ mr: 1 , flex:2}} />
                Thêm
            </Fab>
        </Box>
    );
}

const MyAddress: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleBack = () => {
        setIsFormVisible(false);
    };
    const handleAddClick = () => {
        setIsFormVisible(true);
    };
    const handleSummaryClick = () => {
        setExpanded(true);
    };

    const handleCancelClick = () => {
        setExpanded(false);
    };

    return (
        <Box sx={{ minHeight: 320, width: 800 }}>
            {isFormVisible ? (
                <AddAddressForm onBack={handleBack} />
            ) : (
                <>
            <Typography variant='h3' sx={{
                textAlign: 'center',
                position: 'relative',
                marginBottom: '20px',
            }}>
                Địa chỉ của tôi
            </Typography>

            <Box sx={{ width: '100%', display: 'flex' }}>
                <Accordion expanded={expanded} sx={{ width: '100%', backgroundColor: "#93ded7" }}>
                    <AccordionSummary
                        aria-controls="panel3-content"
                        id="panel3-header"
                        onClick={handleSummaryClick}
                    >
                        <Stack spacing={2} sx={{ flex: 2 }}>
                            <div>
                                <Stack
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={2}
                                >
                                    <TextField
                                        variant="outlined"
                                        sx={{ flex: 2 , backgroundColor: 'white', borderRadius: 2}}
                                        defaultValue="ABC"
                                        InputProps={{ sx: { height: 30, fontSize: 14 } }}
                                    />
                                    <TextField
                                        variant="outlined"
                                        sx={{ flex: 1 , backgroundColor: 'white', borderRadius:2}}
                                        defaultValue="(+84) 03867585"
                                        InputProps={{ sx: { height: 30, fontSize: 14 } }}
                                    />
                                </Stack>
                            </div>
                            <TextField
                                variant="outlined"
                                sx={{ backgroundColor: 'white', borderRadius: 2}}
                                fullWidth
                                defaultValue="236 5th SE Avenue, New York NY10000, United States"
                                InputProps={{ sx: { height: 30, fontSize: 14 } }}
                            />
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ flex: 1, justifyContent: 'flex-end', alignContent: 'space-around', alignItems: 'center' }}>
                            <Button variant="outlined" sx={{ width: 120, height: 30, color: "#dc9715", borderColor: "#dc9715"  }}>Mặc định</Button>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        Bạn có chắc chắn muốn sửa địa chỉ này?
                    </AccordionDetails>
                    <AccordionActions>
                        <Button onClick={handleCancelClick} sx={{color: "#211616", backgroundColor: 'red',}}>Cancel</Button>
                        <Button sx={{color: "#211616", backgroundColor: 'white',}}>Agree</Button>
                    </AccordionActions>
                </Accordion>
            </Box>
            <AddBtn onBack={handleAddClick}/>
                </>
            )}
        </Box>
    );
};


export default MyAddress;
