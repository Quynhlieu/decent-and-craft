import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const AdminLayout = () => {
    return (
        <Box>
            <ToastContainer />
            <Box >
                <Outlet />
            </Box>
        </Box>
    )
}

export default AdminLayout