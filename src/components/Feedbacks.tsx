import { Avatar, Box, Rating, Skeleton, Typography } from '@mui/material'
import TitleBar from './TitleBar'
import Slider from 'react-slick'
import { NextArrow, PrevArrow } from './Carousel';
import Feedback from '../interfaces/IFeedback';
import { useGetAllFeedbacksQuery } from '../api/feedackApi';
const FeedbackItem = (prop: { feedback: Feedback }) => {
    const { feedback } = prop;
    return (
        <div style={{
            padding: 25,
        }} >
            <Box style={{
                flexDirection: "column",
            }} className='flex-center'>
                <Avatar sx={{
                    width: 120,
                    height: 120,
                }} src={feedback.avatar} />
                <Rating readOnly size='large' value={feedback.rating} />
                <Typography sx={{
                    fontSize: 20,
                    my: 3,
                    minHeight: 270,
                    fontStyle: "italic"
                }}>
                    {feedback.comment}
                </Typography>
            </Box>
            <Typography variant='h6'>
                <strong>{feedback.name}</strong>/{feedback.source}
            </Typography>
        </div>
    )
}
const Feedbacks = () => {
    const { data, isLoading } = useGetAllFeedbacksQuery();
    const feedbacks = data;
    let setting = {
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
        <Box  sx={{ marginY: 5 }}>
            <TitleBar title='DECENT&CRAFT / KHÁCH HÀNG' />
            {isLoading ? <Skeleton width={100} height={50} />
                : <Box sx={{ mt: 2 }}>
                    <Slider  {...setting} >
                        {feedbacks && feedbacks.map(f => {
                            return <FeedbackItem key={f.id} feedback={f} />
                        })}
                    </Slider>
                </Box>
            }
        </Box>
    )
}

export default Feedbacks