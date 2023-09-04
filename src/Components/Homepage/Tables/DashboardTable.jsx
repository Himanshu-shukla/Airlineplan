import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Stack, MenuItem, TextField, Grid, Box, TableContainer, Paper, Typography, Button } from '@mui/material'
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
        <Stack>
          <Button variant='contained' sx={{ px: '30px', mt: '5px' }} onClick={props.runhandler}>Run</Button>
        </Stack>
      </Stack>
       <Grid container spacing={2}>
       {/* You can adjust the spacing and other props as needed */}
       <Grid item xs={2}>
         <TextField size='small' placeholder='From' label="From" variant="outlined" fullWidth />
       </Grid>
       <Grid item xs={2}>
         <TextField size='small' placeholder='To' label="To" variant="outlined" fullWidth />
       </Grid>
       <Grid item xs={2}>
         <TextField size='small' placeholder='Sector' label="Sector" variant="outlined" fullWidth />
       </Grid>
       <Grid item xs={2}>
         <TextField size='small' placeholder='Variant' label="Variant" variant="outlined" fullWidth />
       </Grid>
       <Grid item xs={2}>
         <TextField size='small' placeholder='User Tag 1' label="User Tag 1" variant="outlined" fullWidth />
       </Grid>
       <Grid item xs={2}>
         <TextField size='small' placeholder='User Tag 2' label="User Tag 2" variant="outlined" fullWidth />
       </Grid>
     </Grid>
      <Stack direction='column' mt={5}>
        <Paper elevation={1} sx={{ height: 'fit-content' }}>
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
