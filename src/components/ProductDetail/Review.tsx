import { Avatar, Box, Button, Grid, IconButton, Rating, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState} from "react";
import {  reviewAdd, reviewsLoad } from "../../features/productDetail/productDetailSlice.ts";
import { IReview } from "../../interfaces/IProductDescription.ts";
import MyPagination from "./MyPagination.tsx";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { findCustomerById } from "../../data/productDetail.ts";
import { RootState } from "../../app/store.ts";
import EditIcon from '@mui/icons-material/Edit';
import { Customer } from "../../interfaces/Customer.ts";
import { setContents, setIsShow, setRating } from "../../features/review/reviewSlice.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllReviewsByProductIdQuery } from "../../api/reviewApi.ts";

export const ReviewItem = (prop: { reviewData: IReview }) => {
    const { reviewData } = prop;
    const customerId = 2;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleEdit = () => {
        dispatch(setContents(reviewData.contents ?? ""));
        dispatch(setRating(reviewData.rating));
        dispatch(setIsShow(true));
        navigate('#reviewForm');
    }
    return (
        <Box sx={{ my: 2, borderBottom: '1px solid', borderColor: ' #e0e0e0' }}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Avatar sx={{ marginLeft: "20%", width: 50, height: 50 }} alt={(reviewData.customer) && reviewData.customer.fullName} />
                </Grid>
                <Grid item xs={10} direction="column">
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography>{(reviewData.customer) && reviewData.customer.fullName}</Typography>
                        {(reviewData.customer) && reviewData.customer.id === customerId && <IconButton onClick={handleEdit} >
                            <EditIcon />
                        </IconButton>}
                    </Stack>
                    <Rating
                        name="read-only"
                        value={reviewData.rating}
                        readOnly
                        sx={{ fontSize: 15 }}
                    />
                    <Typography sx={{ fontSize: 10, color: grey[500] }}>{reviewData.created_at}</Typography>
                    <Typography sx={{ mt: 1, mb: 3 }}>{reviewData.contents}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

// Review form
export const ReviewForm = () => {
    const productDetail = useSelector((state: RootState) => state.productDetail);
    const { data: user, error, isLoading } = use;    const dispatch = useDispatch();
    // Bat loi form
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLDivElement>(null);


    const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        // if (!customer) {
        //     setError("Vui lòng đăng nhập tài khoản!");
        //     toast.error(error,
        //         { autoClose: 1000, position: "top-right" });
        //     return;
        // }
        // else if (reviewFormState.rating == 0) {
        //     setError("Vui lòng thực hiện đánh giá sao!");
        //     toast.error(error,
        //         { autoClose: 1000, position: "top-right" });
        //     return;
        // }
        // IReview
        const newReview: IReview = {
            customer,
            rating: reviewFormState.rating,
            contents: reviewFormState.contents,
            created_at: new Date().toLocaleDateString(),
        };
        dispatch(reviewAdd({ productId: 1, review: newReview }));
        dispatch(setIsShow(false));
        toast.success("Chỉnh sửa đánh giá thành công!",
            { autoClose: 1000, position: "top-right" });
    };

    // Kiểm tra người dùng có review chưa?
    // Sử dụng productId = 1
    const isExist = () => {
        return reviewListState.find(i => i.product.id === 1)?.reviewList.some(r => r.customer && (r.customer.id === customer?.id));
    }

    useEffect(() => {
        if (reviewFormState.isShow && formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [reviewFormState.isShow]);

    return (
        (!isExist() || reviewFormState.isShow) &&
        (<Box my={3} id="reviewForm" ref={formRef}>
            <Typography sx={{ fontWeight: 'bold' }}>VIẾT ĐÁNH GIÁ</Typography>
            <Box component="form" onSubmit={handleSubmit} className="product-meta-border review-form">
                <Rating
                    name="rating"
                    value={(reviewFormState.rating) && reviewFormState.rating}
                    onChange={(_event:React.SyntheticEvent<Element, Event>, newValue:number|null) => dispatch(setRating(newValue ? newValue : 0))}
                    sx={{ mb: 2 }}
                    size="large"
                />
                <TextField
                    label="Nội dung"
                    value={reviewFormState.contents}
                    onChange={(e) => dispatch(setContents(e.target.value))}
                    multiline
                    rows={1}
                    sx={{ mb: 2, width: '80%' }}
                />
                <Button type="submit" variant="contained" startIcon={<SendIcon />}>Gửi đánh giá</Button>
            </Box>
        </Box>)
    );
};

export const RatingOverview = (prop: { productId: number, handleFilter: unknown }) => {
    const { productId, handleFilter } = prop;
    const productDetail = useSelector((state: RootState) => state.productDetail);
    const product = productDetail.productDetail?.product;
    const reviewList = productDetail.reviews || null;
    console.log("DANH SACH REVIEW: "+reviewList);
    

    const calculateAverageRating = (reviews: IReview[]) => {
        const totalRatings = reviews.reduce((total, item) => {
            if (typeof item !== 'string') {
                return total + item.rating;
            }
            return total;
        }, 0);
        const numberOfReviews = reviews.filter(item => typeof item !== 'string').length;
        return numberOfReviews > 0 ? (totalRatings / numberOfReviews).toFixed(1) : '0.0';
    };

    const [rating, setRating] = useState(calculateAverageRating((reviewList)));
    const [selectedRating, setSelectedRating] = useState<number | null>(0);

    useEffect(() => {
        setRating(calculateAverageRating(reviewList || []));
    }, [product, productDetail, productId]);

    const handleRatingChange = (_event: React.MouseEvent<HTMLElement>, newRating: number | null) => {
        setSelectedRating(newRating);
        handleFilter(newRating);
    };

    const getQuantityReview = (rating: number): number => {
        const reviews: (IReview[] | undefined) = reviewList.filter(r => r.rating === rating);
        if(reviews) return reviews.length;
        return 0;
    }

    const btnSx = {
        '&.Mui-selected': {
            backgroundColor: 'white',
            color: "primary.main",
            borderColor: "primary.main",
        }
    }

    // Tạo ra Toggle button filter 
    const createToggleButtons = () => {
        const ratings = [0, 1, 2, 3, 4, 5];
        return ratings.map(rating => (
            <ToggleButton key={rating} value={rating} sx={btnSx}>
                {rating === 0 ? 'Tất cả' : `${rating} sao (${getQuantityReview(rating)})`}
            </ToggleButton>
        ));
    }

    return (
        <Box my={3} className="rating-overview" >
            <Typography sx={{ fontWeight: 'bold' }}>ĐÁNH GIÁ SẢN PHẨM</Typography>
            <Box
                className="product-meta-border"
                padding={3}
                sx={{ backgroundColor: "#eff8f8" }}
            >
                <Grid container direction="row">
                    <Grid
                        item
                        xs={3}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{ height: '100%' }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{ fontSize: 30 }}>{rating}</Typography>
                            <Typography>trên 5</Typography>
                        </Stack>
                        <Rating
                            name="half-read-only"
                            defaultValue={0}
                            value={parseFloat(rating)}
                            precision={0.25}
                            readOnly
                            sx={{ fontSize: 25 }}
                        />
                    </Grid>
                    <Grid item xs={9} className="size-12">

                        <ToggleButtonGroup
                            value={selectedRating}
                            exclusive
                            onChange={handleRatingChange}
                            size="small"
                        >
                            <Stack spacing={5} direction="row">
                                {createToggleButtons()}
                            </Stack>
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
};

const Review = (prop: { productId: number }) => {
    const { productId } = prop;
    // Lấy danh sách review từ server
    const dispatch = useDispatch();

    // Lấy danh sách review từ server
    const { data: reviewList, error, isLoading } = useGetAllReviewsByProductIdQuery(productId);
    // thêm vào slice
    useEffect(() => {
        if (reviewList) {
            dispatch(reviewsLoad(reviewList));
        }
    }, [reviewList, dispatch]);

    const [filterReviewList, setFilterReviewList] = useState<IReview[]>(reviewList ? reviewList : []);
    useEffect(() => {
        (reviewList && setFilterReviewList(reviewList));
        reviewList && setFilterReviewList(reviewList);
    }, [reviewList]);
    const reviewFilterByStar = (rating: number) => {
        if (rating === 0) {
            (reviewList && setFilterReviewList(reviewList));
            return;
        }        
        (reviewList && setFilterReviewList(reviewList.filter(r => r.rating === rating)));
    }
    return (
        <div>
            <ReviewForm />
            <Box>
                <RatingOverview handleFilter={reviewFilterByStar} productId={productId} />
            </Box>
            <MyPagination data={filterReviewList} />
        </div>
    );
};

export default Review;