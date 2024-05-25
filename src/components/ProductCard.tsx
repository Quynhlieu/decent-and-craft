import React from 'react'
import { Product } from '../interfaces/Product'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const ProductCard = (product: { data: Product }) => {
    const { id, name, price, thumb } = product.data;
    return (
        <Card sx={{ minWidth: 350 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={thumb}
                />
                <CardContent>
                    <Typography  gutterBottom variant="h4" component="div">
                        {name}
                    </Typography>
                    <Typography gutterBottom fontWeight="bold" variant="h5" component="div">
                        {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant='contained' size="small" color="primary" endIcon={<AddShoppingCartIcon />}>
                    Thêm vào giỏ hàng
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard