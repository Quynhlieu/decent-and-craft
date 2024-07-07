import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import AdminTitleBar from '../Components/AdminTitleBar'
import { Link } from 'react-router-dom'

const ProductFunctionBar = () => {
    return (
        <Stack direction="row">
            <Button>
                Thêm sản phẩm
            </Button>
            <Link to={"create"} >
                <Button variant='contained'>
                    Thêm sản phẩm
                </Button>
            </Link>
        </Stack>
    )
}

const ProductManager = () => {
    return (
        <Box>
            <AdminTitleBar title="Quản lý sản phẩm" />
            <ProductFunctionBar />
        </Box>
    )
}

export default ProductManager