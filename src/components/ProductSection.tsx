import React from 'react'
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import promotion from '../Image/promotion.png';
import newProduct from '../Image/newProduct.png';

const ProductSection = () => {
    return (
        <Grid container spacing={2} direction="row" justifyContent="center" sx={{ margin: '0' }}>
            <Grid item sx={{ padding: '0' }}>
                <Card  sx={{ border: 'none',boxShadow: 'none', width: 580 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200"
                            image={promotion}
                            alt="Promotion"
                        />
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item  sx={{ padding: '0' }}>
                <Card sx={{  border: 'none',boxShadow: 'none', width: 580 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200"
                            image={newProduct}
                            alt="New Product"
                        />
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ProductSection;
