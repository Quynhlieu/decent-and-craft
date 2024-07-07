import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import AdminTitleBar from '../Components/AdminTitleBar'

const ProductFunctionBar = () => {
    return (
        <Stack direction="row">
            <Button>
                Thêm sản phẩm
            </Button>
            <Button>
                Quản lý danh mục
            </Button>
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