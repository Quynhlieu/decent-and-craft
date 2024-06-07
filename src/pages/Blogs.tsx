import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import Blog from "../interfaces/IBlog";
import { blogs } from '../data/blogs';
import parse from "html-react-parser"
import { useNavigate, useParams } from 'react-router-dom';
const BlogItem = (prop: { blog: Blog }) => {
    const { blog } = prop;
    let header = parse(blog.header ?? "Không có nội dung");
    const navigate = useNavigate();
    const handleViewBlog = () => {
        navigate("" + blog.id);
    }
    return (
        <Grid container>
            <Grid item xs={3}>
                <img onClick={handleViewBlog} style={{
                    width: "200px",
                    height: "200px"
                }} src={blog.thumb} />
            </Grid>
            <Grid item xs={9}>
                <Stack>
                    <Typography variant='h5' >
                        <strong>
                            {blog.title}
                        </strong>
                    </Typography>
                    <Typography color="secondary" variant='body2'>
                        Ngày:{blog.date}
                    </Typography>
                    <Typography sx={{
                        minHeight: 120
                    }}>
                        {header}
                    </Typography>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }} >
                        <Typography
                            color="secondary"
                            sx={{ fontStyle: "italic" }}
                            variant='body2'>
                            Tác giả:{blog.author}
                        </Typography>
                        <Stack direction="row" spacing={2} >
                            {blog.categories
                                && blog.categories
                                    .map(c =>
                                        <Typography sx={{
                                            backgroundColor: "warning.main",
                                            padding: 0.5,
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            borderRadius: 2,
                                            color: "white"
                                        }} >
                                            {c.name}
                                        </Typography>)}
                        </Stack>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>

    )
}
const Title = (prop: { title: string }) => {
    const { title } = prop;
    return (
        <Stack>
            <Typography >
                <strong>
                    {title}
                </strong>
            </Typography>
            <Divider sx={{
                borderBottomWidth: 5,
                borderRadius: 2,
                backgroundColor: "primary.main",
            }} />
        </Stack>
    )
}
const LastestBlogs = () => {
    return (
        <Stack spacing={2} >
            <Title title='BÀI VIẾT MỚI NHẤT' />
            {blogs.map(blog => {
                return <Box>
                    <Grid sx={{ cursor: "pointer" }} container>
                        <Grid xs={3} item>
                            <img
                                style={{ width: 65, height: 65 }}
                                src={blog.thumb} />
                        </Grid>
                        <Grid xs={9} item>
                            <Stack height="100%" justifyContent="space-between" >
                                <Typography variant='body2' lineHeight={1} >
                                    <strong>
                                        <small>
                                            {blog.title}
                                        </small>
                                    </strong>
                                </Typography>
                                <Typography color="secondary" variant='body2' >
                                    <small>
                                        Ngày:{blog.date} 
                                    </small>
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Divider />
                </Box>
            })}
        </Stack>
    )
}
const CategoryBlogs = () => {
    return (
        <Stack>
            <Title title='DANH MỤC TIN TỨC' />
        </Stack>
    )
}
const Blogs = () => {
    let {blogCategoryId} = useParams();
    return (
        <Box sx={{ mt: 5 }}>
            <Typography textAlign="center" variant='h3'>BÀI VIẾT/ TIN TỨC</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }} >
                <Grid xs={9} item>
                    <Stack spacing={2}>
                        {blogs.map(blog => <BlogItem blog={blog} />)}
                    </Stack>
                </Grid>
                <Grid xs={3} item>
                    <Stack spacing={2}>
                        <LastestBlogs />
                        <CategoryBlogs />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Blogs