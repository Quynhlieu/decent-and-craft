import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const  BreadcrumbHeader = () => {
    const location = useLocation();
    const pathNames = location.pathname.split("/").filter(x => x);
    const websiteName = "Decent&Craft";

    // Giả sử bạn có một selector để lấy chi tiết sản phẩm hiện tại từ state
    const productDetailState = useSelector((state: RootState) => state.productDetail);
    const productDetail = productDetailState.productDetail;
    const product = productDetailState.productDetail?.product;

    // Trích xuất tên danh mục đầu tiên
    const firstCategory = productDetail && productDetail.categoryList[0];

    // Xây dựng đường dẫn breadcrumb
    let breadcrumbPath = "";

    const breadcrumbItemStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '150px', // Tùy chỉnh chiều rộng tối đa theo ý muốn
        display: 'inline-block', // Đảm bảo các phần tử nằm trên cùng một hàng
        verticalAlign: 'middle' // Căn chỉnh các phần tử
    };
    const breadcrumbNameStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '500px', // Tùy chỉnh chiều rộng tối đa theo ý muốn
        display: 'inline-block', // Đảm bảo các phần tử nằm trên cùng một hàng
        verticalAlign: 'middle' // Căn chỉnh các phần tử
    };

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ marginY: 3, paddingX: 5}} maxItems={3}>
            <Link underline="hover" color="inherit" component={RouterLink} to="/" sx={breadcrumbItemStyle}>
                {websiteName}
            </Link>
            {firstCategory && (
                <Link underline="hover" color="inherit" component={RouterLink} to={`/search?categoryId=${firstCategory.id}`} sx={breadcrumbItemStyle}
                >
                    {firstCategory.name}
                </Link>
            )}
            {pathNames.map((name, index) => {
                breadcrumbPath += `/${name}`;
                const isLast = index === pathNames.length - 1;

                if (isLast) {
                    return (
                        <Typography 
                            color="text.primary" 
                            key={breadcrumbPath}
                            sx={breadcrumbNameStyle}
                        >
                            {product?.name}
                        </Typography>
                    );
                } 
            })}
        </Breadcrumbs>
    );
};
export default BreadcrumbHeader;