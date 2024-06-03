import React from 'react'
import { Product } from '../interfaces/Product'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
const ProductCard = (product: { data: Product }) => {
    const { id, name, price, thumb } = product.data;
    const navigate = useNavigate();
    return (
        <Card sx={{ minWidth: 280 }}>
            <CardActionArea onClick={() => {
                navigate("product-detail");
            }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={thumb}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography fontWeight="bold" variant="h6" component="div">
                        <NumericFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                    </Typography>
                </CardContent>
            </CardActionArea >
            <CardActions sx={{ paddingY:2 }}>
                <Button
                    variant='contained'
                    sx={{
                        fontWeight: "bold",
                        borderRadius: 5
                    }}
                    size="large"
                    color="primary"
                    endIcon={<AddShoppingCartIcon />}>
                    Thêm vào giỏ
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard