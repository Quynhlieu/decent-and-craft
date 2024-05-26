import {Box, colors, Grid, Stack, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import logo from "./Physical diagram.png"
import {Splide, SplideSlide} from "@splidejs/react-splide";
// interface productProps {
//
// }

const SplideThumsnail = () => {

    return(
            <Splide>
                <SplideSlide>
                    <img src={logo} alt="Image 1"/>
                </SplideSlide>
                <SplideSlide>
                    <img src={logo} alt="Image 2"/>
                </SplideSlide>
                <SplideSlide>
                    <img src={logo} alt="Image 1"/>
                </SplideSlide>
                <SplideSlide>
                    <img src={logo} alt="Image 1"/>
                </SplideSlide>
            </Splide>
    )
}

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
        <Box>
            <Title/>
            <LineIcon/>
            <Price/>
            <Box>
                <Typography variant='subtitle1'>
                    Sáp Thơm 100% Tinh Dầu Thiên Nhiên được tạo ra với tinh thần tôn trọng và đề cao vẻ đẹp giản dị của thiên nhiên.

                    Thành phần: Sáp ong chất lượng cao và tinh dầu thiên nhiên cao cấp.

                    Hương thơm nhẹ nhàng tự nhiên, chỉ sử dụng 100% tinh dầu tự nhiên nguyên chất.

                    Cam kết không sử dụng thêm các chất để làm tăng cường độ tỏa hương.

                    Có 5 mùi hương cho bạn lựa chọn.
                </Typography>
            </Box>
        </Box>
    )
}

// Chi tiet san pham
const Detail = () => {
    return (
        <Grid container spacing={5} paddingX={10}>
            <Grid item xs={4}>
                <SplideThumsnail/>
            </Grid>
            <Grid item xs={8}>
                <InformationProduct/>
            </Grid>
        </Grid>
    )
}
export default Detail;