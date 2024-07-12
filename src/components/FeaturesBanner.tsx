import { Box, Grid, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import TitleBar from './TitleBar'
import feature1 from "../assets/features/feature1.png"
import feature2 from "../assets/features/feature2.png"
import feature3 from "../assets/features/feature3.jpg"
interface SubtitleProps {
    bottom: number;
}
const Subtitle: React.FC<PropsWithChildren<SubtitleProps>> = ({ children, bottom }) => {
    return (
        <Typography
            className='flex-center'
            variant='h4'
            color="primary.main"
            bgcolor="rgba(255,255,255,0.9)"
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
const FeatureItem = (prop: { isBig?: boolean, image: string,text:string }) => {
    const width = prop.isBig ? 800 : 450;
    const bottom = prop.isBig ? 20 : 10;
    const image = prop.image;
    return (
        <>
            <img style={{ borderRadius: 20, objectFit: "cover" }} height={prop.isBig ? 450:220} width={width} src={image} alt="" />
            <Subtitle bottom={bottom} >{prop.text}</Subtitle>
        </>
    )
}
const FeaturesBanner = () => {
    return (
        <Box sx={{ mt: 5 }}>
            <TitleBar title='ĐẶC ĐIỂM NỔI BẬT' />
            <Grid container >
                <Grid item xs={6} className='flex-center' sx={{ position: "relative" }} >
                    <FeatureItem text='TỈ MỈ' image={feature1} isBig={true} />
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2} direction="column">
                        <Grid item className='flex-center' sx={{ position: "relative" }}>
                            <FeatureItem text='CHẤT LƯỢNG' image={feature2} />
                        </Grid>
                        <Grid item className='flex-center' sx={{ position: "relative" }}>
                            <FeatureItem text='PHONG CÁCH' image={feature3} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default FeaturesBanner