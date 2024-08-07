import './App.css'
import { ThemeProvider, colors, createTheme } from '@mui/material'
import Home from './pages/Home'
import ProductDetail from "./pages/ProductDetail.tsx";
import User from "./pages/User";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout, { ScrollToTop } from './pages/Layout.tsx';
import Login from "./pages/Login.tsx";
import Cart from './pages/Cart.tsx';
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Blogs from './pages/Blogs.tsx';
import BlogDetail from './components/BlogDetail.tsx';
import SearchPage from "./pages/SearchPage.tsx";
import Register from "./pages/Register.tsx";
import Payment from "./pages/Payment.tsx";
import WishList from "./pages/WishList.tsx";
import AdminLayout from './components/Admin/Page/AdminLayout.tsx';
import ProductManager from './components/Admin/Page/ProductManager.tsx';
import CreateProduct from './components/Admin/Page/CreateProduct.tsx';
import Page404 from "./pages/Page404.tsx";
import BillContainer from './pages/Bill.tsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
const theme = createTheme({
  palette: {
    primary: {
      main: colors.teal[300],
      contrastText: "white",
    },
    secondary: {
      main: colors.grey[500],
    }
  },
  transitions: {
    duration: {
      standard: 500
    }
  }
})
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="user" element={<User />} />
              <Route path="product" >
                <Route path=":productId" element={<ProductDetail />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgotPassword" element={<ForgotPassword />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="cart" element={<Cart />} />
              <Route path="blogs"  >
                <Route path=":blogId" element={<BlogDetail />} />
                <Route index element={<Blogs />} />
                <Route path="category/:blogCategoryId" element={<Blogs />} />
              </Route>
              <Route path="search" element={<SearchPage />}>
                <Route path="filter?" element={<SearchPage />} />
                <Route path="category/:categoryId" element={<SearchPage />} />
              </Route>
              <Route path="pay" element={<Payment />} />
              <Route path="bill"   >
                <Route path=":orderId" element={<BillContainer />} />
              </Route>
            </Route>
            <Route path="/admin" element={<AdminLayout />} >
              <Route path='products'  >
                <Route index element={<ProductManager />} />
                <Route path="create" element={<CreateProduct />} />
              </Route>
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>

    </GoogleOAuthProvider>
  )
}

export default App
