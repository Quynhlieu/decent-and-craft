import './App.css'
import { ThemeProvider, colors, createTheme } from '@mui/material'
import Home from './pages/Home'
import ProductDetail from "./pages/ProductDetail.tsx";
import User from "./pages/User";
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout.tsx';
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Cart from './pages/Cart.tsx';
import WishList from './pages/WishList.tsx';
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
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="user" element={<User />} />
            <Route path="product-detail" element={<ProductDetail  productId={1}/>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<WishList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
