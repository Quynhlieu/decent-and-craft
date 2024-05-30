import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Footer from '../components/Footer'
import AddressBar from '../components/AddressBar'

const Layout = () => {
  return (
    <Box>
      <Box sx={{ paddingX: 20 }}>
        <Header />
        <Outlet />
        <Footer />
      </Box>
      <AddressBar  />
    </Box>

  )
}

export default Layout