import { Box, Grid, Typography } from "@mui/material";
import image404 from "../assets/404_error.png";
import React from "react";
import { Link } from "react-router-dom";

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
                padding: 3,
            }}
        >
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6}>
                    <img src={image404} alt="404 Error" width="80%" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h3">
                        Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!
                    </Typography>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>
                            <Link to="/" className="link-home">
                                Go Home
                            </Link>
                        </Grid>
                        <Grid item xs={8}>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Page404;
