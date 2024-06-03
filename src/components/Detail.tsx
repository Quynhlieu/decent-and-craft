import {Avatar, Box, Button, colors, Grid, Rating, Stack, Tab, Tabs, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import '@splidejs/splide/dist/css/splide.min.css';
import React from "react";
import MySplideSlider from "./MySplideSlider.tsx";
import QuantityButton from "./QuantityButton.tsx";
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookIcon from '@mui/icons-material/Facebook';
import {productDescription} from "../data/productDescription.ts"
import {ProductDescription, IReview} from "../interfaces/IProductDescription.ts";
import "../assets/product-detail.css"

const Slider: React.FC = () => {
    const mainImages = [
        'https://via.placeholder.com/800x400?text=Image+1',
        'https://via.placeholder.com/800x400?text=Image+2',
        'https://via.placeholder.com/800x400?text=Image+3',
        'https://via.placeholder.com/800x400?text=Image+4',
    ];

    const thumbnails = [
        'https://via.placeholder.com/100x64?text=Thumbnail+1',
        'https://via.placeholder.com/100x64?text=Thumbnail+2',
        'https://via.placeholder.com/100x64?text=Thumbnail+3',
        'https://via.placeholder.com/100x64?text=Thumbnail+4',
    ];

    return (
        <div className="App">
            <h1>Splide Slider with Thumbnails</h1>
            <MySplideSlider mainImages={mainImages} thumbnails={thumbnails}/>
        </div>
    );
};


// Product Name
const Title = () => {
    const style = {
        color: colors.grey[700],
        fontSize: 25,
        fontWeight: "bold",
    }
    return (
        <Typography sx={style}>Sáp thơm hoa khô Elayne Orange & Sandalwood</Typography>
    )
}

// Line icon
const LineIcon = () => {
    const style = {
        background: grey[400],
        width: 40,
        height: 2,
        marginY: 2,
    }
    return (
        <Box sx={style}></Box>
    )
}


const Price = () => {
    const baseSx = {
        // Chỉ định cho các Typography con nằm trong baseSx
        '& > .MuiTypography-root': {
            fontSize: 25,
        },
    };

    const priceSx = {
        color: grey[500],
        textDecoration: 'line-through',
    };

    const discountSx = {
        color: grey[900],
        fontWeight: 'bold',
    };

    return (
        <Stack spacing={2} direction="row" sx={baseSx}>
            <Typography sx={priceSx}>135,000₫</Typography>
            <Typography sx={discountSx}>85,000₫</Typography>
        </Stack>
    );
}


// Thong tin chi tiet san pham
const InformationProduct = () => {
    return (
        <Box flexDirection="column" letterSpacing={10}>
            <Title/>
            <LineIcon/>
            <Price/>
            <Box>
                <Typography variant='subtitle1'>
                    Sáp Thơm 100% Tinh Dầu Thiên Nhiên được tạo ra với tinh thần tôn trọng và đề cao vẻ đẹp giản dị của
                    thiên nhiên.
                </Typography>
                <Typography variant='subtitle1'>
                    Thành phần: Sáp ong chất lượng cao và tinh dầu thiên nhiên cao cấp.
                </Typography>
                <Typography variant='subtitle1'>
                    Hương thơm nhẹ nhàng tự nhiên, chỉ sử dụng 100% tinh dầu tự nhiên nguyên chất.
                </Typography>
                <Typography variant='subtitle1'>
                    Cam kết không sử dụng thêm các chất để làm tăng cường độ tỏa hương.
                </Typography>
                <Typography variant='subtitle1'>
                    Có 5 mùi hương cho bạn lựa chọn.
                </Typography>
            </Box>
            <Stack direction="row" spacing={2} mt={2}>
                <QuantityButton quantity={1} quantityStock={15}/>
                <Button className="btn btn-cart" variant='contained'>THÊM VÀO GIỎ</Button>
            </Stack>
            <Stack direction="column" mt={2}>
                <Typography variant="body2" className="product-meta">
                    Mã: <Box component="span">KGNGOC-2-1-1-1</Box>
                </Typography>
                <Typography variant="body2" className="product-meta">
                    Danh mục:: <Box component="span"> Christmas, Sáp thơm hoa khô, Tết, Valentine</Box>
                </Typography>
                <Typography variant="body2" className="product-meta">
                    Từ khóa: <Box component="span">ift, HOA KHÔ, present, quà tặng, SÁP THƠM, wedding</Box>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
                <FacebookIcon fontSize="small" color="secondary"/>
                <TwitterIcon fontSize="small" color="secondary"/>
                <PinterestIcon fontSize="small" color="secondary"/>
            </Stack>
        </Box>
    )
}

/* Description Tab*/
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={value !== 2 ? { p: 2 } : {p:0}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

// ReviewItem
const ReviewItem = (props: IReview) => {
    const {reviewData} = props;

    return (
        <Box sx={{my: 2, borderBottom: '1px solid', borderColor: 'secondary.main'}}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Avatar alt={reviewData.fullName} src={reviewData.avatar}/>
                </Grid>
                <Grid item xs={11} direction="column">
                    <Typography>{reviewData.fullName}</Typography>
                    <Rating
                        name="read-only"
                        value={reviewData.rating}
                        readOnly
                        sx={{fontSize: 15,}}
                    />
                    <Typography sx={{fontSize: 10,color: grey[500]}}>{reviewData.created_at}</Typography>
                    <Typography sx={{mt:1, mb:3}}>{reviewData.contents}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

// Component Review
// const Review = (props: IReview[]) => {
//     const {reviewList} = props;
//     const showList = reviewList.map((reviewData: IReview) => {
//         return (
//             <ReviewItem reviewData={reviewData}></ReviewItem>
//         )
//     })
//
//     return (
//         <div>
//             <h1>Giao diện Review</h1>
//             {showList}
//         </div>
//     )
// }


/*
* Component thông tin bổ sung cho sản phẩm
* */
const DescriptionProduct = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log("value: ",value)
        setValue(newValue);
    };

    // render các title
    const showTitleTab: JSX.Element[] = productDescription.map((item: ProductDescription) => {
            return (<Tab label={item.title}></Tab>)
        }
    )
    // render nội dung các tab
    const showContentTab = productDescription.map((description: ProductDescription, index: number) => {
        let content;
        console.log("index:", index)

        content = description.descriptions.map((item, i) => {
            if (index === 2) {
                return (
                    <ReviewItem reviewData={item}/>
                );
            } else {

                return (
                    <Typography key={i} variant="subtitle2">{item}</Typography>
                );
            }

        } )

        return (
            <CustomTabPanel index={index} value={value}>
                {content}
            </CustomTabPanel>
        );

    });

    return (
        <Box sx={{width: '100%', paddingX: 10}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>
                    {showTitleTab}
                </Tabs>
            </Box>
            {showContentTab}
        </Box>
    );
};
/* End Description Tab*/

// Chi tiet san pham
const Detail = () => {
    return (
        <Box>
            <Grid container spacing={5} paddingX={10}>
                <Grid item xs={4}>
                    <Slider/>
                </Grid>
                <Grid item xs={8}>
                    <InformationProduct/>
                </Grid>
                <Grid item xs={12}>
                    <DescriptionProduct/>
                </Grid>
            </Grid>

        </Box>
    )
}
export default Detail;