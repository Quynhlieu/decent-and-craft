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
import Register from "./pages/Register.tsx";
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
      standard: 500,
    }
  }
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="user" element={<User />} />
            <Route path="product-detail" element={<ProductDetail productId={1}/>}>
              {/* <Route path=":review-form" element={<ReviewForm />} /> */}
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="cart" element={<Cart />} />
            <Route path="blogs"  >
              <Route path=":blogId" element={<BlogDetail />} />
              <Route index element={<Blogs />} />
              <Route path="category/:blogCategoryId" element={<Blogs />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
