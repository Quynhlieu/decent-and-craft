import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react'


const Line = () => {
    return (
        <Box bgcolor="secondary.main" sx={{
            width: 500,
            height: 3,
            opacity: 0.7,
        }}></Box>
    )
}
type TitleBarProps = {
    title: string,
}
const TitleBar = (props: TitleBarProps) => {
    const { title } = props;
    return (
        <Stack className='flex-center' spacing={3} direction="row">
            <Line />
            <Typography variant="h3">{title}</Typography>
            <Line />
        </Stack>
    )
}

export default TitleBar