import { Grid, Stack, Typography } from '@mui/material'
import parse from 'html-react-parser';
import React from 'react'
import Blog from '../interfaces/IBlog';
import { useParams } from 'react-router-dom';
import { blogs } from "../data/blogs";
const BlogBody = (prop: { blog: Blog }) => {
    const { blog } = prop;
    return (
        <Stack >
            <Typography variant='h4' >
                <strong>
                    {blog.title}
                </strong>
            </Typography>
            <Typography color="secondary" variant='body2'>
                Ngày:{blog.date}
            </Typography>
            <Typography  >
                <small>
                    <strong>
                        {blog.header}
                    </strong>
                </small>
            </Typography>
            <Typography sx={{ mt: 1 }}>
                {parse(blog.content ?? "Không có nội dung")}
            </Typography>
        </Stack>
    )
}
const BlogDetail = () => {
    const { blogId } = useParams();
    const blogIdNumber = Number(blogId);

    const isError = (isNaN(blogIdNumber) || blogIdNumber <= 0);
    const blog = blogs.find((blog: Blog) => blog.id == blogIdNumber);
    return (
        <Grid container sx={{ mt: 5 }}>
            <Grid xs={10} item>
                {(!isError && blog)
                    ? <BlogBody blog={blog} />
                    : <Typography>Không tìm thấy bài viết này</Typography>}
            </Grid>
            <Grid xs={2} item>

            </Grid>
        </Grid>
    )
}

export default BlogDetail