import {Breadcrumbs, Link, Typography} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {useLocation, Link as RouterLink } from "react-router-dom";

const BreadcrumbHeader = () => {
    const location = useLocation();
    const pathNames = location.pathname.split("/").filter(x => x);
    let breadcrumbPath = "";

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ marginY: 5 }}>
            <Link underline="hover" color="inherit" component={RouterLink} to="/">
                Home
            </Link>
            {pathNames.map((name, index) => {
                breadcrumbPath += `/${name}`;
                const isLast = index === pathNames.length - 1;

                return isLast ? (
                    <Typography color="text.primary" key={breadcrumbPath}>
                        {name}
                    </Typography>
                ) : (
                    <Link underline="hover" color="inherit" component={RouterLink} to={breadcrumbPath} key={breadcrumbPath}>
                        {name}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default BreadcrumbHeader;