import './App.css'
import { ThemeProvider, colors, createTheme } from '@mui/material'
import Home from './pages/Home'
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
      <Home />
    </ThemeProvider>
  )
}

export default App
