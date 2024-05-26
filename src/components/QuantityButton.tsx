import {Box, Button, Stack, TextField} from "@mui/material";
import React, {useState} from "react";
import {grey} from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "../assets/product-detail.css"

interface QuantityProps{
    quantity: number,
    quantityStock: number,
}

const QuantityButton: React.FC<QuantityProps> = ({quantity, quantityStock}) => {
    const [quantityState, setQuantityState] = useState(quantity);

    const handleDecrement = () => {
        return quantityState > 1 ? setQuantityState(prevCount => prevCount - 1) : quantityState;
    }
    const handleIncrement = () => {
        return quantityState < quantityStock ? setQuantityState(prevCount => prevCount + 1) : quantityState;
    }

    // Chưa hoàn thiện
    const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if(!isNaN(value) && value >= 1 && value < quantityStock){
            setQuantityState(value);
        }

    }
    const baseSx = {
        borderRadius: 50,
        background: grey[200],
        border: '1px solid #e0e0e0',
        width: "auto",
        height: 50,
    };

    console.log(quantityState)
    return (
        <Box>
            <Stack sx={baseSx} direction="row" >
                <Button className="btn btn-quantity" onClick={handleDecrement} endIcon={<RemoveIcon/>}/>
                <TextField className="text-field" onChange={handleQuantity} inputProps={{min: 1, max: quantityStock}} value={quantityState}/>
                <Button className="btn btn-quantity" onClick={handleIncrement} startIcon={<AddIcon/>}/>
            </Stack>
        </Box>

    )
}

export default QuantityButton;