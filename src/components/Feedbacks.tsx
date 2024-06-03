import { Avatar, Box, Rating, Typography } from '@mui/material'
import React from 'react'
import TitleBar from './TitleBar'
import Slider from 'react-slick'
import { feedbacks } from "../data/feedbacks";
import { NextArrow, PrevArrow } from './Carousel';
export type Feedback = {
    avatar: string,
    rating: number,
    text: string,
    author: string,
    source: string,
}

const FeedbackItem = (prop: { feedback: Feedback }) => {
    const { feedback } = prop;
    return (
        <div style={{
            padding: 50,
        }} >
            <Box style={{
                flexDirection: "column",
            }} className='flex-center'>
                <Avatar sx={{
                    width: 120,
                    height: 120,
                }} src={feedback.avatar} />
                <Rating readOnly size='large' value={feedback.rating} />
                <Typography sx={{ fontSize: 20, my: 5, fontStyle: "italic" }}>
                    {feedback.text}
                </Typography>
            </Box>
            <Typography variant='h5'>
                <strong>{feedback.author}</strong>/{feedback.source}
            </Typography>
        </div>
    )
}
const Feedbacks = () => {
    let setting = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,

    }
    return (
        <Box sx={{ mt: 5 }}>
            <TitleBar title='DECENT&CRAFT / KHÁCH HÀNG' />
            <Box sx={{ mt: 3 }}>
                <Slider  {...setting} >
                    {feedbacks.map(f => {
                        return <FeedbackItem feedback={f} />
                    })}
                </Slider>
            </Box>
        </Box>
    )
}

export default Feedbacks