import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";
import { grey } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "../assets/product-detail.css"
import {CartItem, cartUpdate} from "../features/cart/cartSlice.ts";
import {useDispatch} from "react-redux";

const QuantityButton: React.FC<{ cartItem: CartItem }> = ({ cartItem }) => {
    const dispatch = useDispatch();

    const baseSx = {
        borderRadius: 50,
        background: grey[200],
        border: '1px solid #e0e0e0',
        width: "auto",
        height: 50,
    };

    return (
        <Box>
            <Stack sx={baseSx} direction="row">
                <Button className="btn btn-quantity" onClick={() => {
                    dispatch(cartUpdate({
                        productId: cartItem.product.id,
                        value: -1
                    }));
                }} endIcon={<RemoveIcon />} />
                <TextField
                    className="text-field"
                    type="tel"
                    sx={{ width: 10 }}
                    value={cartItem.quantity}
                    disabled
                />
                <Button className="btn btn-quantity" onClick={() => {
                    dispatch(cartUpdate({
                        productId: cartItem.product.id,
                        value: 1
                    }))
                }} startIcon={<AddIcon />} />
            </Stack>
        </Box>
    );
}

export default QuantityButton;