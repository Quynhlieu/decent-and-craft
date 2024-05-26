import './App.css'
import { ThemeProvider, colors, createTheme } from '@mui/material'
import Home from './pages/Home'
import ProductDetail from "./pages/ProductDetail.tsx";
import User from "./pages/User";
import Header from './components/Header';
const theme = createTheme({
  palette: {
    primary: {
      main: colors.teal[300],
      contrastText: "white",
    },
    secondary: {
      main: colors.grey[500],
    }
  }
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/*<Home />*/}
      <ProductDetail/>  
      {/*<User />*/}
    </ThemeProvider>
  )
}

export default App
