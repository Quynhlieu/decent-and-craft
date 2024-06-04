import { Box, Typography, colors } from '@mui/material'
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carouse1 from "../assets/carousels/carousel1.jpg";
import carouse2 from "../assets/carousels/carousel2.jpeg";
import carouse3 from "../assets/carousels/carousel3.jpeg";
import carouse4 from "../assets/carousels/carousel4.jpeg";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
export const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            onClick={onClick}
            className={className}>
            < KeyboardArrowRightIcon sx={{
                ...style,
                width: 50,
                height: 50,
                fontSize: 10,
                color: "black",
            }} />
        </div>
    )
}

export const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            onClick={onClick}
            className={className}>
            < KeyboardArrowLeftIcon sx={{
                ...style,
                width: 50,
                height: 50,
                marginLeft: -5,
                fontSize: 10,
                color: "black",
            }} />
        </div>
    )
}

const CarouselItem = (props: any) => {
    const { image } = props;
    return (
        <div className='flex-center'>
            <img width={1200} height={600} style={{objectFit:"cover"}} src={image} alt="" />
        </div >
    )
}

const Carousel = () => {

    let setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,

    }
    return (
        <Box sx={{mt:3  }}>
            <Slider  {...setting}>
                <CarouselItem image={carouse1} />
                <CarouselItem image={carouse2} />
                <CarouselItem image={carouse3} />
                <CarouselItem image={carouse4} />
            </Slider>
        </Box>
    )
}

export default Carousel