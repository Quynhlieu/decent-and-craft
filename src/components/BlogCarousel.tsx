import { Box, Grid, Stack, Typography, TypographyProps } from '@mui/material'
import TitleBar from './TitleBar'
import { blogs } from "../data/blogs";
import { Link, LinkProps } from 'react-router-dom';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useState } from 'react';
import BlogCategory from '../interfaces/IBlogCategory';
type BlogItemProps = {
    tag?: string,
    title: string,
    date: string,
    thumb?: string,
    show?: boolean,
    categories?: BlogCategory[]
}
const PrevArrow = (props: any) => {
    const { className, style, onClick, show } = props;
    const commomStyle = {
        ...style,
        width: 80,
        height: "100%",
        backgroundColor: 'rgba(255,255,255,0.5)',
        left: -0,
        zIndex: 10,
        opacity: show ? 1 : 0,
    }

    return (
        <div
            onClick={onClick}
            style={{ ...commomStyle }}
            className={`${className} arrow`}>
            <Box sx={{
                height: "100%",

            }}
                className="flex-center"
            >
                <KeyboardArrowLeftIcon sx={{
                    ...style,
                    width: 50,
                    height: 50,
                    fontSize: 10,
                    color: "black",
                }}
                />
            </Box>
        </div >
    )
}
const NextArrow = (props: any) => {
    const { className, style, onClick, show } = props;
    const commomStyle = {
        ...style,
        width: 80,
        height: "100%",
        backgroundColor: 'rgba(255,255,255,0.5)',
        opacity: show ? 1 : 0,
        right: 0
    }

    return (
        <div
            onClick={onClick}
            style={{ ...commomStyle }}
            className={`${className} arrow`}>
            <Box sx={{
                height: "100%",

            }}
                className="flex-center"
            >
                <KeyboardArrowRightIcon sx={{
                    ...style,
                    width: 50,
                    height: 50,
                    fontSize: 10,
                    color: "black",
                }}
                />
            </Box>
        </div >
    )
}

const BlogTitle = styled(Typography)<TypographyProps>(() => ({
    fontWeight: "bold",
    fontSize: 20,
    textDecoration: "none",
    '&:hover': {
        textDecoration: "underline",
    }
}));
const StyledLink = styled(Link)<any>(() => ({
    textDecoration: "none",
    color: "black",

}));
const BlogItem = (props: BlogItemProps) => {
    const { title, date } = props;
    return (
        <Box>
            <StyledLink>
                <BlogTitle >
                    {title}
                </BlogTitle>
            </StyledLink>
            <Typography fontStyle="italic" sx={{ textDecoration: "underline" }} >
                <small>{date}</small>
            </Typography>
        </Box >
    )
}
const BlogCarouselItem = (props: BlogItemProps) => {
    const { title, date, show, thumb, categories } = props;
    return (
        <div className='p-relative'  >
            <div className="carousel-thumb" style={{
                backgroundImage: `url(${thumb})`,
                height: 300,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                filter: show ? "blur(12px)" : "blur(0)"
            }}
            >
            </div>
            <Box sx={{
                backgroundColor: "rgba(0,0,0,0.4)",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0
            }}
                className='p-absolute '>
                <Stack className='carousel-text flex-center' sx={{
                    top: show ? "40%" : "50%",
                }}  >
                    <Stack direction="row" spacing={1}>
                        {categories && categories
                            .map((c: BlogCategory) => <Typography
                                className='carousel-tag' sx={{
                                    color: "white",
                                    fontWeight: "bold",
                                    backgroundColor: show ? "orange" : "rgba(0,0,0,0.4)",
                                    padding: 0.4,
                                    borderRadius: 1,
                                    transition: "all 0.3s ease",
                                }}
                                key={c.id}><strong>{c.name}</strong></Typography>)}
                    </Stack>
                    <Typography sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 25
                    }}>
                        {title}
                    </Typography>
                    <Typography color="white">
                        {date}
                    </Typography>
                </Stack >
            </Box>

        </div >
    )
}
const BlogCarousel = () => {
    const [show, setShow] = useState<boolean>(false);
    let setting = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: <PrevArrow show={show} />,
        nextArrow: <NextArrow show={show} />,

    }
    return (
        <Grid container sx={{ mt: 5 }} spacing={2}>
            <Grid item sx={{ mt: 12 }} xs={6} >
                <Box sx={{ height: "100%" }} onMouseOver={() => {
                    setShow(true);
                }} onMouseOut={() => {
                    setShow(false);
                }}  >
                    <Slider   {...setting} >
                        {blogs.map(blog => <BlogCarouselItem key={blog.id} categories={blog.categories} thumb={blog.thumb} date={blog.date} show={show} title={blog.title} />)}
                    </Slider>
                </Box>
            </Grid>
            {/* <Divider orientation='vertical' flexItem /> */}
            <Grid item xs={6} >
                <Box>
                    <TitleBar variant='h4' title='Ý TƯỞNG/BÀI HƯỚNG DẪN' />
                    <Stack sx={{ ml: 2 }} spacing={1}>
                        {blogs.map(blog => <BlogItem key={blog.author} date={blog.date} title={blog.title} categories={[]} />)}
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    )
}

export default BlogCarousel