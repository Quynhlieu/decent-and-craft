import React from 'react'
import AdminTitleBar from '../Components/AdminTitleBar'
import { Box, FormControlLabel, FormGroup, FormLabel, TextField, Typography } from '@mui/material'
import { CheckBox } from '@mui/icons-material';

const CreateProduct = () => {
    const categories = ["NL", "Album", "Gift"];
    return (
        <Box>
            <AdminTitleBar title="Thêm sản phẩm mới" />
            <FormGroup sx={{
                padding: 2,
                margin: 10,
                borderRadius: 2,
                border: "1px solid"
            }}  >
                <TextField variant='filled' placeholder='Tên sản phẩm' />
                <FormLabel sx={{ mt: 3 }}>
                    <Typography variant='h6'>
                        Thể loại
                    </Typography>
                    <FormGroup>
                        {categories.map(c => <FormControlLabel control={<CheckBox color='primary' />} label={c} />)}
                    </FormGroup>
                </FormLabel>
            </FormGroup>
        </Box>
    )

}

export default CreateProduct