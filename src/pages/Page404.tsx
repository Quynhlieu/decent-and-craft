import {Box, Button, Grid, Typography} from "@mui/material";
import image404 from "../assets/404_error.png";
import React from "react";
import {Link} from "react-router-dom";

const Page404: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                textAlign: 'center',
                backgroundColor: '#f4f4f4',
            }}
        >
            <Grid container spacing={2} width="1200px" justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={7}>
                    <img src={image404} alt="404 Error" width="80%"/>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Typography component="h1" variant="h3">
                        Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!
                    </Typography>
                    <Grid container spacing={2} columns={16}  sx={{marginTop: 5}}>
                        <Grid item xs={8}>
                            <Typography sx={{fontSize: 15}}>Trở về trang chủ <br/> Decent&Craft</Typography>
                            <Button variant="contained" component={Link} to="/" sx={{ marginTop: 1 }}>
                                Go Home
                            </Button>

                        </Grid>
                        <Grid item xs={8}>
                            <Typography sx={{fontSize: 15}}>Gọi hỗ trợ <br/> (8h00 - 21h30)</Typography>
                            <Button variant="contained" sx={{ marginTop: 1 }}>
                                1900 123 456
                            </Button>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Page404;
