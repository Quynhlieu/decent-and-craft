import React from 'react'
import { Product } from '../interfaces/Product'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { NumericFormat } from 'react-number-format';
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
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography fontWeight="bold" variant="h5" component="div">
                        <NumericFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                    </Typography>
                </CardContent>
            </CardActionArea >
            <CardActions sx={{ paddingTop: 5, paddingBottom: 3 }}>
                <Button
                    variant='contained'
                    sx={{
                        fontWeight: "bold",
                        borderRadius: 5
                    }}
                    size="large"
                    color="primary"
                    endIcon={<AddShoppingCartIcon />}>
                    Thêm vào giỏ hàng
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard