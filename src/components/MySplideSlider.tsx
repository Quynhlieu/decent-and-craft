import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

interface MySplideSliderProps {
    mainImages: string[];
    thumbnails: string[];
}


const MySplideSlider: React.FC<MySplideSliderProps> = ({ mainImages, thumbnails }) => {
    let splide = new Splide()

    return (
        <div>
            <Splide
                options={{
                    type: 'fade',
                    heightRatio: 0.5,
                    pagination: false,
                    arrows: true,
                    cover: true,
                    breakpoints: {
                        640: {
                            heightRatio: 0.4,
                        },
                    },
                }}
                aria-label="Main Slider"
            >
                {mainImages.map((image, index) => (
                    <SplideSlide key={index}>
                        <img src={image} alt={`Slide ${index}`} />
                    </SplideSlide>
                ))}
            </Splide>

            <Splide
                options={{
                    fixedWidth: 100,
                    fixedHeight: 64,
                    isNavigation: true,
                    gap: 10,
                    focus: 'center',
                    pagination: false,
                    cover: true,
                    arrows: false,
                    breakpoints: {
                        640: {
                            fixedWidth: 66,
                            fixedHeight: 40,
                        },
                    },
                }}
                className="thumbnails"
                aria-label="Thumbnail Slider"
            >
                {thumbnails.map((thumbnail, index) => (
                    <SplideSlide key={index}>
                        <img src={thumbnail} alt={`Thumbnail ${index}`} />
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default MySplideSlider;