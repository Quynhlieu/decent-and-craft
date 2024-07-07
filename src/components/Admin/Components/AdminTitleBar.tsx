import { Stack, Typography } from '@mui/material'
import React from 'react'

type AdminTitleBarProps = {
    title: String
}
const AdminTitleBar = (prop: AdminTitleBarProps {
}) => {
    return (
        <Stack direction="row" >
            <Typography variant='h4'>
                ${prop.title}
            </Typography>
        </Stack>
    )
}

export default AdminTitleBar