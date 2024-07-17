import EditIcon from '@mui/icons-material/Edit';
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Box, Button, Grid, IconButton, Rating, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddReviewMutation, useGetAllReviewsByProductIdQuery, useUpdateReviewMutation } from "../../api/reviewApi.ts";
import { RootState } from "../../app/store.ts";
import { AddReviewDto, IReview, reviewsLoad, UpdateReviewDto } from "../../features/productDetail/productDetailSlice.ts";
import { setContents, setIsShow, setKey, setRating } from "../../features/review/reviewSlice.ts";
import { formatDatetime } from "../../utils/DateFormater.ts";
import MyPagination from "./MyPagination.tsx";


export const ReviewItem = (prop: { reviewData: IReview }) => {
    const { reviewData } = prop;
    const userLoginId = useSelector((state: RootState) => state.user.user)?.id
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleEdit = () => {
        dispatch(setContents(reviewData.comments ?? ""));
        dispatch(setRating(reviewData.rating));
        dispatch(setIsShow(true));
        dispatch(setKey(reviewData.id))
        navigate('#reviewForm');
    }
    return (
        <Box sx={{ pt: 2, borderBottom: '1px solid', borderColor: ' #e0e0e0' }}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Avatar sx={{ marginLeft: "20%" }} alt={reviewData.userId && reviewData.userFullName || 'Avatar'} />
                </Grid>
                <Grid item xs={10} direction="column">
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography>{(reviewData) && reviewData.userFullName}</Typography>
                        {(reviewData) && reviewData.userId === userLoginId && <IconButton onClick={handleEdit} >
                            <EditIcon />
                        </IconButton>}
                    </Stack>
                    <Rating
                        name="read-only"
                        value={reviewData.rating}
                        readOnly
                        sx={{ fontSize: 15 }}
                    />
                    <Typography sx={{ fontSize: 10, color: grey[500] }}>{formatDatetime(reviewData.modifiedDate)}</Typography>
                    <Typography sx={{ mt: 1, mb: 3 }}>{reviewData.comments}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

// Review form
export const ReviewForm = (prop: { productId: number }) => {
    const reviewFormState = useSelector((state: RootState) => state.review);
    const reviewsState = useSelector((state: RootState) => state.productDetail);
    const { productId } = prop;
    const reviewList = reviewsState.reviews;
    const customer = useSelector((state: RootState) => state.user).user;
    const [addReview] = useAddReviewMutation();
    const [updateReview] = useUpdateReviewMutation();
    const dispatch = useDispatch();
    // Bat loi form
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!customer) {
            setError("Vui lòng đăng nhập tài khoản!");
            toast.error(error,
                { autoClose: 1000, position: "top-right" });
            return;
        }
        else if (reviewFormState.rating == 0) {
            setError("Vui lòng thực hiện đánh giá sao!");
            toast.error(error,
                { autoClose: 1000, position: "top-right" });
            return;
        }
        const newReview: AddReviewDto = {
            userId: customer.id,
            productId: (productId) ? productId : 0,
            rating: reviewFormState.rating,
            text: reviewFormState.contents
        };
        if (reviewFormState.key != 0) {
            const updateReviewDto: UpdateReviewDto = {
                reviewId: reviewFormState.key,
                userId: customer.id,
                productId: productId || 0,
                rating: reviewFormState.rating,
                text: reviewFormState.contents,
            };
            updateReview(updateReviewDto);
            toast.success("Chỉnh sửa đánh giá thành công!",
                { autoClose: 1000, position: "top-right" });
            return;
        }
        addReview(newReview);
        dispatch(setIsShow(false));
        toast.success("Thêm đánh giá thành công!",
            { autoClose: 1000, position: "top-right" });
        return;

    };

    // Kiểm tra người dùng có review chưa?
    // Sử dụng productId = 1
    const isExist = () => {
        return reviewList.some(r => r.userId && (r.userId === customer?.id));
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
                    onChange={(_event: React.SyntheticEvent<Element, Event>, newValue: number | null) => dispatch(setRating(newValue ? newValue : 0))}
                    sx={{ mb: 2 }}
                    size="large"
                />
                <TextField
                    label="Nội dung"
                    value={reviewFormState.contents}
                    key={reviewFormState.key}
                    onChange={(e) => { dispatch(setContents(e.target.value)) }}
                    multiline
                    rows={1}
                    sx={{ mb: 2, width: '80%' }}
                />
                <Button type="submit" variant="contained" startIcon={<SendIcon />}>Gửi đánh giá</Button>
            </Box>
        </Box>)
    );
};

export const RatingOverview = (prop: { productId: number, handleFilter: (newRating: number | null) => void }) => {
    const { productId, handleFilter } = prop;
    const productDetail = useSelector((state: RootState) => state.productDetail);
    const product = productDetail.productDetail?.product;
    const reviewList = productDetail.reviews || null;

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
        if (reviews) return reviews.length;
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
    const { data: reviewList } = useGetAllReviewsByProductIdQuery(productId, { refetchOnMountOrArgChange: true });

    // thêm vào slice
    const [filterReviewList, setFilterReviewList] = useState<IReview[]>(reviewList ? reviewList : []);
    useEffect(() => {
        if (reviewList) {
            setFilterReviewList(reviewList);
            dispatch(reviewsLoad(reviewList));
        }
    }, [reviewList, dispatch]);
    const reviewFilterByStar = (rating: number | null) => {
        if (rating === 0) {
            (reviewList && setFilterReviewList(reviewList));
            return;
        }
        (reviewList && setFilterReviewList(reviewList.filter(r => r.rating === rating)));
    }
    return (
        <div>
            <ReviewForm productId={productId} />
            <Box>
                <RatingOverview handleFilter={reviewFilterByStar} productId={productId} />
            </Box>
            <MyPagination data={filterReviewList} />
        </div>
    );
};

export default Review;