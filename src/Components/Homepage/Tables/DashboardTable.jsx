import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Stack, MenuItem, TextField, Box, TableContainer, Paper, Typography, Button } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DashboardTableData } from '../../../assets/MockData/DashboardTableData';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';


const DashboardTable = (props) => {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [period, setPeriod] = useState('')
  const [label, setLabel] = useState('')

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value)
  }

  const handleLabel = (event) => {
    setLabel(event.target.value)
  }
  return (
    <Stack direction='column' gap='1rem' my='16px'>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mt='10px'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateField']}>
            <Box sx={{ width: '100%', minWidth: '200px' }}>
              <DateField
                label="From Date"
                value={from}
                onChange={(newValue) => setFrom(newValue)}
                format="DD-MMM-YY"
                size='small'
              />
            </Box>
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateField']}>
            <Box sx={{ width: '100%', minWidth: '200px' }}>
              <DateField
                label="To Date"
                value={to}
                onChange={(newValue) => setTo(newValue)}
                format="DD-MMM-YY"
                size='small'
                sx={{}}
              />
            </Box>
          </DemoContainer>
        </LocalizationProvider>
        <TextField select
          label='Label'
          size='small'
          value={label}
          onChange={handleLabel}
          sx={{ mt: '5px', minWidth: '200px' }}
        >
          <MenuItem value='Dom'>Dom</MenuItem>
          <MenuItem value='Intl'>INTL</MenuItem>
          <MenuItem value='Intl'>Both</MenuItem>
        </TextField>
        <TextField variant='outlined' placeholder='Airport' size='small'
          label='Airport'
          sx={{ mt: '5px', minWidth: '200px' }}
        />
        <Stack>
          <Button variant='contained' sx={{ px: '30px', mt: '5px' }} onClick={props.runhandler}>Run</Button>
        </Stack>
      </Stack>
      <Stack direction='column' gap='2rem'>
        <Paper elevation={2}>
          <Table sx={{ border: '0.5px solid #F5F5F5', borderRadius: '12px' }}>
            <TableBody sx={{ margin: 0, padding: 0 }}>
              {DashboardTableData.map((row, index) => (
                <TableRow key={index} sx={{ margin: 0, padding: 0 }}>
                  <TableCell sx={{ whiteSpace: 'nowrap', margin: 0, padding: 0 }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '14px', ml: '5px' }}>{row.firstCol}</Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    <TextField variant='outlined' size='small' placeholder='FROM'
                      sx={{
                        minWidth: '100px',
                        '& .MuiOutlinedInput-notchedOutline': { height: '30px' },
                        '& .MuiOutlinedInput-input': {
                          fontSize: '14px',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }} />
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    <TextField variant='outlined' size='small' placeholder='TO'
                      sx={{
                        minWidth: '100px',
                        '& .MuiOutlinedInput-notchedOutline': { height: '30px' },
                        '& .MuiOutlinedInput-input': {
                          fontSize: '14px',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }} />
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    <TextField variant='outlined' size='small' placeholder='Sector'
                      sx={{
                        minWidth: '100px',
                        '& .MuiOutlinedInput-notchedOutline': { height: '30px' },
                        '& .MuiOutlinedInput-input': {
                          fontSize: '14px',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }} />
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    <TextField variant='outlined' size='small' placeholder='ACFT Type'
                      sx={{
                        minWidth: '100px',
                        '& .MuiOutlinedInput-notchedOutline': { height: '30px' },
                        '& .MuiOutlinedInput-input': {
                          fontSize: '14px',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }} />
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    <TextField variant='outlined' size='small' placeholder='Variant'
                      sx={{
                        minWidth: '100px',
                        '& .MuiOutlinedInput-notchedOutline': { height: '30px' },
                        '& .MuiOutlinedInput-input': {
                          fontSize: '14px',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }} />
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    <TextField variant='outlined' size='small' placeholder='User Tag 1'
                      sx={{
                        minWidth: '100px',
                        '& .MuiOutlinedInput-notchedOutline': { height: '30px' },
                        '& .MuiOutlinedInput-input': {
                          fontSize: '14px',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }} />
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    <TextField variant='outlined' size='small' placeholder='User Tag 2'
                      sx={{
                        minWidth: '100px',
                        '& .MuiOutlinedInput-notchedOutline': { height: '30px' },
                        '& .MuiOutlinedInput-input': {
                          fontSize: '14px',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Paper elevation={2} sx={{ height: 'fit-content' }}>
          <Stack>
            <TextField select
              label='Select Periodicity'
              onChange={handlePeriodChange}
              value={period}
              size='small'
              sx={{ bgcolor: 'white', width: '12rem' }}
            >
              <MenuItem value="annually">Annually</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </TextField>
            <TableContainer sx={{ overflowX: 'scroll' }}>
              <Table sx={{ border: '1px solid black', borderCollapse: 'collapse', borderSpacing: '0' }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', padding: '5px' }}> </TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}>Period 1</TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}>Period 2</TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}>Period 3</TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}>Period 4</TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}>Period 5</TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}>Period 6</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', padding: '5px' }}>Destinations </TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', padding: '5px' }}>Departures</TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', padding: '5px' }}>Seats </TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', padding: '5px' }}> Pax</TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', padding: '5px' }}>Pax SF </TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', padding: '5px' }}>Cargo Ton Capacity </TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', padding: '5px' }}>Cargo Tons </TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', padding: '5px' }}>Cargo Tons/Cargo Ton Capacity </TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', padding: '5px' }}>Cargo FTK/Cargo ATK </TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', padding: '5px' }}>BH</TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ border: '1px solid black', whiteSpace: 'nowrap', padding: '5px', textAlign: 'center' }}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Paper>
        <Stack direction='row' justifyContent='end'>
          <Button variant='contained' sx={{ width: 'fit-content', px: '20px', mt: '5px' }}>Download</Button>
        </Stack>
      </Stack>
    </Stack >
  )
}

DashboardTable.propTypes = {
  runhandler: PropTypes.func,
};

export default DashboardTable
