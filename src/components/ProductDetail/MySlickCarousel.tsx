import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/product-detail.css"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { ImageList } from "../../features/productDetail/productDetailSlice";
const NextArrow = (props:any) => {
    const { onClick } = props;
    return (
        <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: '0', zIndex: 1, top: '48%'}}>
            <NavigateNextIcon style={{ fontSize: '40px', color: '#4db6ac' }} />
        </div>
    );
};

const PrevArrow = (props:any) => {
    const { onClick } = props;
    return (
        <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: '0', zIndex: 1, top: '48%' }}>
            <NavigateBeforeIcon style={{ fontSize: '40px', color: '#4db6ac' }} />
        </div>
    );
};

function MySlickCarousel(prop: { mainImages: ImageList[] }) {
    const { mainImages } = prop;

    const settings = {
        customPaging: function (i: number) {
            return (
                <a>
                    <img width={80} height={80} src={`${mainImages[i].url}`} alt={`thumbnail-${i}`} />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    const showImg = () => {
        return mainImages.map((imgSrc, index) => (
            <div key={index} className="img-main">
                <img width="auto" height={400} src={imgSrc.url} alt={`slide-${index}`} />
            </div>
        ));
    };

    return (
        <div className="slider-container">
            <Slider  {...settings}>
                {showImg()}
            </Slider>
        </div>
    );
}

export default MySlickCarousel;