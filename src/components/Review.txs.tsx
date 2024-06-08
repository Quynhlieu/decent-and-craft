// ReviewItem
import {Avatar, Box, Button, Grid, Rating, Stack, TextField, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import React, {useState} from "react";
import {getProductById, getRatingOverview, reviewAdd} from "../features/productDetail/productDetailSlice.ts";
import {IReview} from "../interfaces/IProductDescription.ts";
import MyPagination from "./MyPagination.tsx";
import {useDispatch} from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import {findCustomerById} from "../data/productDetail.ts";

export const ReviewItem = ({reviewData}) => {
    return (
        <Box sx={{my: 2, borderBottom: '1px solid', borderColor: ' #e0e0e0'}}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Avatar sx={{marginLeft: 5}} alt={reviewData.customer.fullName}/>
                </Grid>
                <Grid item xs={10} direction="column">
                    <Typography>{reviewData.customer.fullName}</Typography>
                    <Rating
                        name="read-only"
                        value={reviewData.rating}
                        readOnly
                        sx={{fontSize: 15}}
                    />
                    <Typography sx={{fontSize: 10, color: grey[500]}}>{reviewData.created_at}</Typography>
                    <Typography sx={{mt: 1, mb: 3}}>{reviewData.contents}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

// Review form
const ReviewForm = ({onSubmit}) => {
    const [rating, setRating] = React.useState(0);
    const [contents, setContents] = React.useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const customer = findCustomerById(4);
        const newReview = {
            customer,
            rating,
            contents,
            created_at: new Date().toLocaleDateString(),
        };
        dispatch(reviewAdd({productId: 1, review: newReview}));
        setRating(0);
        setContents('');
    };


    return (
        <Box my={3}>
            <Typography sx={{fontWeight: 'bold'}}>VIẾT ĐÁNH GIÁ</Typography>
            <Box component="form" onSubmit={handleSubmit} className="product-meta-border review-form">
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(e, newValue) => setRating(newValue)}
                    sx={{mb: 2}}
                    size="large"
                />
                <TextField
                    label="Nội dung"
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                    multiline
                    rows={1}
                    sx={{mb: 2, width: '80%'}}
                />
                <Button type="submit" variant="contained" startIcon={<SendIcon/>}>Gửi đánh giá</Button>
            </Box>
        </Box>
    );
};


// đang làm
const RatingOverview = (prop: {productId: number}) => {
    const {productId} = prop
    const ratingValue = getRatingOverview(productId);
    const [rating, setRating] = useState(ratingValue);

    const handleChangeRating = () => {

    }
    return (
        <Box my={3} class="rating-overview">
            <Typography sx={{fontWeight: 'bold'}}>ĐÁNH GIÁ SẢN PHẨM</Typography>
            <Box
                className="product-meta-border"
                padding={3}
                sx={{backgroundColor: "#eff8f8"}}
            >
                <Grid container direction="row">
                    <Grid
                        item
                        xs={3}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{height: '100%',}}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{fontSize: 30}}>{rating}</Typography>
                            <Typography>trên 5</Typography>
                        </Stack>
                        <Rating
                            name="half-read-only"
                            defaultValue={0}
                            value={rating}
                            precision={0.25}
                            readOnly
                            sx={{fontSize: 25}}
                        />
                    </Grid>
                    <Grid item xs={9} className="size-12">
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" size="small">Tất cả</Button>
                            <Button variant="outlined" size="small">1 sao</Button>
                            <Button variant="outlined" size="small">2 sao</Button>
                            <Button variant="outlined" size="small">3 sao</Button>
                            <Button variant="outlined" size="small">4 sao</Button>
                            <Button variant="outlined" size="small">5 sao</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

const Review = (prop: { productId: number }) => {
    const {productId} = prop;
    // const productDetail = useSelector((state:RootState) => state.productDetail);
    const reviewList: IReview[] = getProductById(productId).reviewList.descriptions;

    const handleNewReview = (newReview) => {
        setReviews([newReview, ...reviewList]);
    };

    return (
        <div>
            <ReviewForm onSubmit={handleNewReview}/>
            <Box>
                <RatingOverview productId={productId}/>
            </Box>
            <MyPagination data={reviewList}/>
        </div>
    );
};

export default Review;