import { Box, Grid, Typography } from '@mui/material';

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
    variant?: any
}
const TitleBar = (props: TitleBarProps) => {
    const { title } = props;
    const variant = props.variant ?? "h3";
    return (
        <Grid className='flex-center' sx={{ my: 2 }} spacing={2} container>
            <Grid flex="1 1 auto" item>
                <Line />
            </Grid>
            <Grid item>
                <Typography textAlign="center" variant={variant} >{title}</Typography>
            </Grid>
            <Grid flex="1 1 auto" item>
                <Line />
            </Grid>

        </Grid>
    )
}

export default TitleBar