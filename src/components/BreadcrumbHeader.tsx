import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const BreadcrumbHeader = () => {
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize='small'/>}
            sx={{ paddingX: 10, marginY:5 }}
        >
            <Link underline="hover" color="inherit" href="#">
                Fairy Corner
            </Link>
            <Link underline="hover" color="inherit" href="#">
                Sản phẩm
            </Link>
            <Link underline="hover" color="inherit" href="#">
                Special Gifts
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
    );
}

export default BreadcrumbHeader;