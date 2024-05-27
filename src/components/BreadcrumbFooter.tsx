import {Box, Breadcrumbs, Divider, Link, Typography} from "@mui/material";
const BreadcrumbFooter = () => {
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center', mt: 5,
        }}>
            <Breadcrumbs
                separator={<Divider orientation="vertical" flexItem sx={{ marginX: 1, height: 24, alignSelf: 'center' }} />}
                sx={{ display: 'flex', alignItems: 'center' }}
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
        </Box>
    );
}

export default BreadcrumbFooter;