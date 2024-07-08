import {Box, Grid, Typography} from "@mui/material";
import image404  from "../assets/404_error.png";
import React from "react";
const page404 = () => {
    return (
        <Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <img width={500} src={image404}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography component="h1" variant="h5">
                        Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!
                    </Typography>

                </Grid>
            </Grid>

        </Box>

    );
}

export default page404