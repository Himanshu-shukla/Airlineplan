import React from 'react'
import Header from '../Components/Homepage/Header'
import TermsAndConditionsModal from '../Components/Homepage/TermsAndConditionsModal'
import Table from '../Components/Homepage/Tables/MainPage'
import { Stack } from '@mui/material'
import SideBar from '../Components/Homepage/SideBar'

const Homepage = () => {
  return (
    <Stack sx={{ width: '100%' }}>
      <Table />
      <TermsAndConditionsModal />
    </Stack>
  )
}

export default Homepage
