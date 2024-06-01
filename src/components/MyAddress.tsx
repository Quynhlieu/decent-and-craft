import React, { useState } from "react";
import {Box, Container, Fab, TextField, Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

const AddAddressForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            name: '',
            phone: '',
            province: '',
            district: '',
            ward: '',
            description: ''
        });
    };

    return (
        <Container sx={{ minHeight: 320, width: 800 }}>
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Thêm Địa Chỉ Mới
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        required
                        name="name"
                        label="Họ và Tên"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        sx={{'& .MuiInputLabel-root': {
                                alignItems: 'baseline'
                            },'& input': { padding: '10px' } }}
                    />
                    <TextField
                        fullWidth
                        required
                        name="phone"
                        label="Số điện thoại"
                        variant="outlined"
                        value={formData.phone}
                        onChange={handleChange}
                        margin="normal"
                        sx={{'& .MuiInputLabel-root': {
                                alignItems: 'baseline'
                            },'& input': { padding: '10px' } }}
                    />
                    <TextField
                        fullWidth
                        required
                        name="province"
                        label="Thành phố/ tỉnh"
                        variant="outlined"
                        value={formData.province}
                        onChange={handleChange}
                        margin="normal"
                        sx={{'& .MuiInputLabel-root': {
                                alignItems: 'baseline'
                            },'& input': { padding: '10px' } }}
                    />
                    <TextField
                        fullWidth
                        required
                        name="district"
                        label="Quận/ huyện"
                        variant="outlined"
                        value={formData.district}
                        onChange={handleChange}
                        margin="normal"
                        sx={{'& .MuiInputLabel-root': {
                                alignItems: 'baseline'
                            },'& input': { padding: '10px' } }}
                    />
                    <TextField
                        fullWidth
                        required
                        name="ward"
                        label="Phường/ xã "
                        variant="outlined"
                        value={formData.ward}
                        onChange={handleChange}
                        margin="normal"
                        sx={{'& .MuiInputLabel-root': {
                                alignItems: 'baseline'
                            },'& input': { padding: '10px' } }}
                    />
                    <TextField
                        fullWidth
                        required
                        name="description"
                        label="Ghi chú"
                        variant="outlined"
                        value={formData.description}
                        onChange={handleChange}
                        margin="normal"
                        sx={{'& .MuiInputLabel-root': {
                                alignItems: 'baseline'
                            },'& input': { padding: '10px' } }}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        Thêm Địa Chỉ
                    </Button>
                </form>
            </Box>
        </Container>
    );
};
const MyAddress = () => {
    const [expanded, setExpanded] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleSummaryClick = () => {
        setExpanded(true);
    };

    const handleCancelClick = () => {
        setExpanded(false);
    };

    const handleAddClick = () => {
        setIsFormVisible(true);
    };

    return (
        <Box sx={{ minHeight: 320, width: 800 }}>
            {isFormVisible ? (
                <AddAddressForm />
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
            <Box sx={{ width: '100%', display: 'flex', justifyContent:"flex-end", paddingTop: 3 }}>
                <Fab variant="extended" onClick={handleAddClick}>
                    <AddIcon sx={{ mr: 1 , flex:2}} />
                    Thêm
                </Fab>
            </Box>
                </>
            )}
        </Box>
    );
};


export default MyAddress;
