import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, Link as RouterLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useRef } from "react";
import { updateCategories } from "../../features/filter/filterSlice";

const BreadcrumbHeader = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const pathNames = location.pathname.split("/").filter(x => x);
    const websiteName = "Decent&Craft";

    const productDetailState = useSelector((state: RootState) => state.productDetail);
    const filterState = useSelector((state: RootState) => state.filter);
    
    const productDetail = productDetailState.productDetail;
    const product = productDetailState.productDetail?.product;
    const firstCategory = productDetail?.categoryList[0];

    const containerRef = useRef<HTMLDivElement>(null);
    const breadcrumbsRef = useRef<HTMLDivElement[]>([]);
    const breadcrumbItemStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '500px',
    };

    const breadcrumbNameStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '500px',
    };

    const handleClickCategory = () => {
        (firstCategory && dispatch(updateCategories([firstCategory])))
    }

    const breadcrumbs = [
        <Link underline="hover" color="inherit" component={RouterLink} to="/" sx={breadcrumbItemStyle} key="home" ref={(el) => breadcrumbsRef.current[0] = el}>
            {websiteName}
        </Link>
    ];

    if (pathNames[0] === 'search') {
        breadcrumbs.push(
            <Typography color="text.primary" sx={breadcrumbItemStyle} key="search" ref={(el) => breadcrumbsRef.current[1] = el}>
                Kết quả tìm kiếm của: {filterState.categories?.map(c => c.name).join(', ')}
            </Typography>
        );
    } else if (pathNames[0] === 'product' && firstCategory) {
        breadcrumbs.push(
            <Link underline="hover" color="inherit" component={RouterLink} to={`/search/filter?categoryName=${firstCategory.name}`} sx={breadcrumbItemStyle} key="category" ref={(el) => breadcrumbsRef.current[1] = el}
                onClick={handleClickCategory}
            >
                {firstCategory.name}
            </Link>
        );

        breadcrumbs.push(
            <Typography color="text.primary" sx={breadcrumbNameStyle} key="product" noWrap>
                {product?.name}
            </Typography>
        );
    }

    return (
            <div ref={containerRef}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ marginY: 3, paddingX: 5 }} maxItems={3}>
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
    );
}

export default BreadcrumbHeader;
