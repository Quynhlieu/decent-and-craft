import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Footer from '../components/Footer'
import AddressBar from '../components/AddressBar'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const Layout = () => {
  return (
    <Box>
      <ToastContainer />
      <Box sx={{ paddingX: 20 }}>
        <Header />
        <Outlet />
        <Footer />
      </Box>
      <AddressBar />
    </Box>

  )
}

export default Layout