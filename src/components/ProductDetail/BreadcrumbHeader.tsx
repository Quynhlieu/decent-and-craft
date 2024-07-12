import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, useRef, useState } from "react";
const BreadcrumbHeader = () => {
    const location = useLocation();
    const pathNames = location.pathname.split("/").filter(x => x);
    const websiteName = "Decent&Craft";

    const productDetailState = useSelector((state: RootState) => state.productDetail);
    const productDetail = productDetailState.productDetail;
    const product = productDetailState.productDetail?.product;
    const firstCategory = productDetail?.categoryList[0];

    const [containerWidth, setContainerWidth] = useState(0);
    const [otherBreadcrumbsWidth, setOtherBreadcrumbsWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const breadcrumbsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
        const totalWidth = breadcrumbsRef.current.reduce((acc, el) => acc + (el?.offsetWidth || 0), 0);
        setOtherBreadcrumbsWidth(totalWidth);
    }, [pathNames, containerWidth]);

    const breadcrumbItemStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '120px',
        display: 'inline-block',
        verticalAlign: 'middle'
    };

    const breadcrumbNameStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: `${containerWidth - otherBreadcrumbsWidth}px`, // Tính toán maxWidth dựa trên chiều rộng container còn lại
        display: 'inline-block',
        verticalAlign: 'middle'
    };

    const breadcrumbs = [
        <Link underline="hover" color="inherit" component={RouterLink} to="/" sx={breadcrumbItemStyle} key="home" ref={(el) => breadcrumbsRef.current[0] = el}>
            {websiteName}
        </Link>
    ];

    if (pathNames[0] === 'search') {
        breadcrumbs.push(
            <Typography color="text.primary" sx={breadcrumbItemStyle} key="search" ref={(el) => breadcrumbsRef.current[1] = el}>
                Kết quả tìm kiếm của: {new URLSearchParams(location.search).get("categoryName")}
            </Typography>
        );
    } else if (pathNames[0] === 'product' && firstCategory) {
        breadcrumbs.push(
            <Link underline="hover" color="inherit" component={RouterLink} to={`/search?categoryId=${firstCategory.id}&categoryName=${firstCategory.name}`} sx={breadcrumbItemStyle} key="category" ref={(el) => breadcrumbsRef.current[1] = el}>
                {firstCategory.name}
            </Link>
        );

        breadcrumbs.push(
            <Typography color="text.primary" sx={breadcrumbNameStyle} key="product">
                {product?.name}
            </Typography>
        );
    }

    return (
        <div ref={containerRef} style={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ marginY: 3, paddingX: 5 }} maxItems={3}>
                {breadcrumbs}
            </Breadcrumbs>
        </div>
    );
}
export default BreadcrumbHeader;