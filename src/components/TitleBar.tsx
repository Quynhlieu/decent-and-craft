import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react'


const Line = () => {
    return (
        <Box bgcolor="secondary.main" component="div" sx={{
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
        //     <Stack className='flex-center' spacing={3} direction="row">
        //         <Line />
        //         <Typography variant="h3">{title}</Typography>
        //         <Line />
        //     </Stack>
        <Grid className='flex-center'  spacing={2} container>
            <Grid flex="1 1 auto" item>
                <Line />
            </Grid>
            <Grid item>
                <Typography textAlign="center" variant="h3">{title}</Typography>
            </Grid>
            <Grid flex="1 1 auto" item>
                <Line />
            </Grid>

        </Grid>
    )
}

export default TitleBar