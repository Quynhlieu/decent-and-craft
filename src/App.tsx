import './App.css'
import { ThemeProvider, colors, createTheme } from '@mui/material'
import Home from './pages/Home'
<<<<<<< HEAD
import ProductDetail from "./pages/ProductDetail.tsx";
=======
import User from "./pages/User";
import Header from './components/Header';
>>>>>>> 4f32c4f3a67fc99d7fa866e76bbf803ff1826a6a
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
<<<<<<< HEAD
      {/*<Home />*/}
      <ProductDetail/>  
=======
      <User />
>>>>>>> 4f32c4f3a67fc99d7fa866e76bbf803ff1826a6a
    </ThemeProvider>
  )
}

export default App
