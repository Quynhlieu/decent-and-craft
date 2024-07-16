import { Box, Button, Stack, Typography } from '@mui/material'
import { RootState } from '../app/store'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from '../interfaces/Product'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import CancelIcon from '@mui/icons-material/Cancel';
import { VNDNumericFormat } from '../components/ProductCard'
import { wishlistRemove } from '../features/wishlist/wishlistSlice'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { cartItemAdd } from '../features/cart/cartSlice'
import { Link } from 'react-router-dom'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
const WishList = () => {
    const wishlist: Product[] = useSelector((state: RootState) => state.wishlist)
    const dispatch = useDispatch();
    const customStyle = {
        headCells: {
            style: {
                fontSize: '16px', // override the cell padding for head cells
                fontWeight: "bold",
            },
        },
        rows: {
            style: {
                padding: "10px 0"
            }
        },
    }
    const columns = [
        {
            name: "SẢN PHẨM",
            minWidth: "400px",
            cell: (row: Product) => {
                return (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
                        <CancelIcon onClick={() => {
                            dispatch(wishlistRemove(row));
                            toast.error("Xóa sản phẩm khỏi danh sách sản phẩm yêu thích thành công",
                                { autoClose: 1000, position: "bottom-left" })
                        }} color='warning' sx={{ "&:hover": { color: "black" } }} />
                        <img width={60} height={60} src={row.thumbnail} />
                        <Typography>
                            {row.name}
                        </Typography>
                    </Stack>
                )
            }
        },
        {
            name: "GIÁ",
            maxWidth: "100px",
            cell: (row: Product) => <VNDNumericFormat styled={{ fontWeight: "bold" }} price={row.price} />
        },
        {
            name: "CHỨC NĂNG",
            cell: (row: Product) =>
                <Stack
                    direction="row"
                    width="100%"
                    spacing={3} >
                    <Button
                        onClick={() => {
                            dispatch(cartItemAdd({ product: row, quantity: 1 }))
                            toast.success("Thêm vào giỏ hàng thành công", { autoClose: 1000, position: "bottom-left" })
                        }}
                        variant="contained"
                        endIcon={<ShoppingCartIcon />}
                    >
                        THÊM VÀO GIỎ
                    </Button>
                    <Link to={"/product/" + row.id}>
                        <Button color='warning' variant="contained"
                            endIcon={<SearchIcon />}
                        >
                            XEM CHI TIẾT
                        </Button>
                    </Link>
                </Stack>
        },
    ]
    return (
        wishlist.length>0 ?
            <Box sx={{ my: 10 }} >
                <Typography textAlign="center" variant='h3'>
                    Danh sách sản phẩm yêu thích
                </Typography>
                <DataTable columns={columns} customStyles={customStyle} data={wishlist} />
            </Box >
            : <Box sx={{ my: 10 }} >
                <Typography textAlign="center" variant='h3'>
                    Chưa có sản phẩm nào trong danh sách yêu thích 
                </Typography>
                <Box textAlign="center">
                    <SentimentVeryDissatisfiedIcon color='primary' sx={{ fontSize: 100 }} />
                </Box>
            </Box>
    )
}
export default WishList