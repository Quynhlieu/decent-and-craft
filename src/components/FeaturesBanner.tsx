import { Box, Grid, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import TitleBar from './TitleBar'
import { Image } from '@mui/icons-material'
import carouse1 from '../assets/carousels/carousel1.jpeg';
interface SubtitleProps {
    bottom: number;
}
const Subtitle: React.FC<PropsWithChildren<SubtitleProps>> = ({ children, bottom }) => {
    return (
        <Typography
            className='flex-center'
            variant='h4'
            color="primary.main"
            bgcolor="rgba(255,255,255,0.8)"
            width={300}
            height={50}
            sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                borderRadius: 10,
                position: "absolute",
                bottom: { bottom },
            }}>{children}</Typography>
    )
}
const FeatureItem = (prop: { isBig: boolean  }) => {
    const width = prop.isBig ? 850 : 500;
    const bottom = prop.isBig ? 100 : 10;
    return (
        <>
            <img style={{ borderRadius: 50 }} width={width} src={carouse1} alt="" />
            <Subtitle bottom={bottom} >Ty my</Subtitle>
        </>
    )
}
const FeaturesBanner = () => {
    return (
        <Box sx={{ mt: 5 }}>
            <TitleBar title='ĐẶC ĐIỂM NỔI BẬT' />
            <Grid container>
                <Grid item xs={6} className='flex-center' sx={{ position: "relative" }} >
                    <FeatureItem isBig={true} />
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={5} direction="column">
                        <Grid item className='flex-center' sx={{ position: "relative" }}>
                            <FeatureItem width={500} />
                        </Grid>

                        <Grid item className='flex-center' sx={{ position: "relative" }}>
                            <FeatureItem width={500} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default FeaturesBanner