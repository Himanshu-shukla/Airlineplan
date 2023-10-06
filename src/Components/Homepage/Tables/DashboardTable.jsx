import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  MenuItem,
  TextField,
  Grid,
  Box,
  TableContainer,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DashboardTableData } from "../../../assets/MockData/DashboardTableData";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from 'prop-types';
import "react-toastify/dist/ReactToastify.css";
import './dashboard.css';
import dayjs from "dayjs";
import axios from "axios";
import * as XLSX from 'xlsx';
import Select from 'react-select';


const MultiSelectDropdown = ({ placeholder, options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected);
    if (onChange) {
      onChange(selected);
    }
  };


  return (
    <div>
      <Select
        placeholder={placeholder}
        options={options}
        isMulti
        value={selectedOptions}
        onChange={handleDropdownChange}
      />
    </div>
  );
};


const SingleSelectDropdown = ({ placeholder, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleDropdownChange = (selected) => {
    setSelectedOption(selected);
    if (onChange) {
      onChange(selected);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "250px",
    }),
  };


  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleDropdownChange}
      styles={customStyles}
      placeholder={placeholder}
    />
  );
};

const DashboardTable = (props) => {
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [periodicity, setPeriodicity] = useState("");
  const [label, setLabel] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [downloading, setDownloading] = useState(false);

  const [selectedValues, setSelectedValues] = useState({});
  const [singleSelectValues, setSingleSelectValues] = useState({
    label: null,
    periodicity: null,
  });
  const [multiSelectValues, setMultiSelectValues] = useState({
    from: [],
    to: [],
    sector: [],
    variant: [],
    userTag1: [],
    userTag2: [],
  });

  const singleSelectLabelOptions = [
    { label: "Dom", value: "dom" },
    { label: "INTL", value: "intl" },
    { label: "Both", value: "both" },
  ];

  const singleSelectPeriodicityOptions = [
    { label: "Annually", value: "annually" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Monthly", value: "monthly" },
  ];


  const transformData = () => {

    const propertyMappings = {
      destinations: 'Destinations',
      departures: 'Departures',
      seats: 'Seats',
      pax: 'Pax',
      paxSF: 'Pax SF',
      paxLF: 'Pax LF',
      cargoCapT: 'Cargo Ton Capacity',
      cargoT: 'Cargo Tons',
      ct2ctc: 'Cargo Tons/Cargo Ton Capacity',
      cftk2atk: 'Cargo FTK/Cargo ATK',
      bh: 'BH'
    };
    
    const properties = Object.keys(propertyMappings);
    const uniqueDates = Array.from(new Set(data.map(item => item.endDate)));

    var newData = [['']];

    // Function to format the date to "dd mmm yy" format
    function formatDate(inputDate) {
        var date = new Date(inputDate);
        var options = { year: '2-digit', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
    }

    // Iterate through uniqueDates and format them before pushing into newData array
    for (var i = 0; i < uniqueDates.length; i++) {
        var formattedDate = formatDate(uniqueDates[i]);
        newData[0].push(formattedDate);
    }

    // Pushing the dates as the first column in newData
    // newData.push(['', ...uniqueDates]);
    
    // Extracting properties from oldData and pushing them into newData
    properties.forEach(property => {
      newData.push([propertyMappings[property], ...uniqueDates.map(date => {
        const matchingData = data.find(item => item.endDate === date);
        return matchingData ? matchingData[property] : '';
      })]);
    });
    
    return newData;
    
  }

  const downloadDashboardTable = async () => {
    // const data = [
    //   ['','30 Jun 23', '31 Jul 23', '31 Aug 23', '30 Sep 23', '31 Oct 23', '30 Nov 23', '31 Dec 23', '31 Jan 24'],
    //   ['Destinations', 2, 2, 2, 2, 2, 2, 2],
    //   ['Departures', 3, 4, 4, 5, 4, 4, 5],
    //   ['Seats', 150, 200, 200, 250, 200, 200, 250],
    //   ['Pax', 83, 110, 110, 138, 110, 110, 138],
    //   ['Pax SF', '55%', '55%', '55%', '55%', '55%', '55%', '55%'],
    //   ['Pax LF', '55%', '55%', '55%', '55%', '55%', '55%', '55%'],
    //   ['Cargo Ton Capacity', 75.0, 100.0, 100.0, 125.0, 100.0, 100.0, 125.0, 100.0],
    //   ['Cargo Tons', 6.8, 9.0, 9.0, 11.3, 9.0, 9.0, 11.3, 9.0],
    //   ['Cargo Tons/Cargo Ton Capacity', '9%', '9%', '9%', '9%', '9%', '9%', '9%', '9%'],
    //   ['Cargo FTK/Cargo ATK', '9%', '9%', '9%', '9%', '9%', '9%', '9%', '9%'],
    //   ['BH', 44, 58, 58, 73, 58, 58, 73, 58]
    // ];
  
    const newData = transformData();

    const transformedData = newData.map((row, rowIndex) => {
      // If it's the first row (index 0), leave the date values as strings
      if (rowIndex === 0) {
          return row;
      }
      // For other rows, convert numeric strings to numbers, leave other strings as they are
      return row.map((value, colIndex) => {
          // Skip the first column (index 0) which contains strings (dates)
          if (colIndex === 0) {
              return value;
          }
          const numValue = parseFloat(value);
          return isNaN(numValue) ? value : numValue;
      });
  });
  
  const ws = XLSX.utils.aoa_to_sheet(transformedData);
  
  // Set cell styles to center align the content
  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = { c: C, r: R };
          const cellRef = XLSX.utils.encode_cell(cellAddress);
          
          // Check if cell exists before applying styles
          if (ws[cellRef]) {
              ws[cellRef].s = {
                  alignment: { horizontal: 'center', vertical: 'center' }
              };
          }
      }
  }
  
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'DashboardTable');
  
  // Save the Excel file
  XLSX.writeFile(wb, 'dashboard_table.xlsx');
  }

  const handleMultipleClicks = () => {
    props.runhandler();
  };

  const handlePeriodChange = (event) => {
    setPeriodicity(event.target.value);
  };

  const handleLabel = (event) => {
    setLabel(event.target.value);
  };


  const labelRef = useRef(label);

  const additionalTableCellsCount = data.length > 6 ? data.length - 6 : 0;

  // Function to collect selected options from all dropdowns
  // const collectSelectedOptions = () => {
  //   const selectedOptions = {
  //     from: multiSelectValues.from.map((option) => option.value),
  //     to: multiSelectValues.to.map((option) => option.value),
  //     variant: multiSelectValues.variant.map((option) => option.value),
  //     sector: multiSelectValues.sector.map((option) => option.value),
  //     userTag1: multiSelectValues.userTag1.map((option) => option.value),
  //     userTag2: multiSelectValues.userTag2.map((option) => option.value),
  //     label: singleSelectValues.label.map((option) => option.value),
  //     periodicity: singleSelectValues.periodicity.map((option) => option.value),
  //   };

  //   return selectedOptions;
  // };

  useEffect(() => {
    labelRef.current = label;
  }, [label]);

  const fetchData = async (selected, fieldName) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      setSelectedValues((prevSelectedValues) => ({
        ...prevSelectedValues,
        [fieldName]: selected,
      }));

      // Create the request payload with the selectedValues
      const requestData = {
        ...selectedValues,
        [fieldName]: selected, // Update the specific field in the payload
      };

      // const selectedOptions = collectSelectedOptions();

      const response = await axios.get(
        'http://ec2-54-198-23-212.compute-1.amazonaws.com/dashboard',
        {
          params: requestData,
          headers: {
            'x-access-token': accessToken,
          },
        }
      );

      setData(response.data);
      console.log("data received in dashboard:", response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const accessToken = localStorage.getItem("accessToken");

  //       if (periodicity.trim() !== '' && labelRef.current.trim() !== '') {

  //         const response = await axios.get(
  //           `http://ec2-54-198-23-212.compute-1.amazonaws.com/dashboard?label=${label}&periodicity=${periodicity}`,
  //           {
  //             headers: {
  //               "x-access-token": accessToken,
  //             },
  //           }
  //         );

  //         setData(response.data);
  //         console.log("data received in dashboard:", response.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [periodicity, label]);

  useEffect(() => {

    const getDropdownData = async () => {

      const response = await axios.get(
        `http://ec2-54-198-23-212.compute-1.amazonaws.com/dashboard/populateDropDowns`,
        {
          headers: {
            "x-access-token": `${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMultiSelectValues(response.data);
    }
    getDropdownData()

  }, []);

  return (
    <Stack direction="column" gap="1rem" my="16px">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mt="10px"
      >
        {/* <TextField
          select
          label="Label"
          size="small"
          value={label}
          onChange={fetchData}
          sx={{ mt: "5px", minWidth: "200px" }}
        >
          <MenuItem value="Dom">Dom</MenuItem>
          <MenuItem value="Intl">INTL</MenuItem>
          <MenuItem value="Both">Both</MenuItem>
        </TextField> */}
        <SingleSelectDropdown
          placeholder="Label"
          options={singleSelectLabelOptions}
          onChange={(selected) => fetchData(selected, "label")}

        />
        <Stack>
          <Button
            variant="contained"
            sx={{ px: "30px", mt: "5px" }}
            onClick={handleMultipleClicks}
          >
            Run
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={2}>
        {/* You can adjust the spacing and other props as needed */}
        <Grid item xs={2}>
          <MultiSelectDropdown placeholder="From" options={multiSelectValues.from} onChange={(selected) => fetchData(selected, "from")} />
        </Grid>
        <Grid item xs={2}>
          <MultiSelectDropdown placeholder="To" options={multiSelectValues.to} onChange={(selected) => fetchData(selected, "to")} />
        </Grid>
        <Grid item xs={2}>
          <MultiSelectDropdown placeholder="Sector" options={multiSelectValues.sector} onChange={(selected) => fetchData(selected, "sector")} />
        </Grid>

        <Grid item xs={2}>
          <MultiSelectDropdown placeholder="Variant" options={multiSelectValues.variant} onChange={(selected) => fetchData(selected, "variant")} />
        </Grid>
        <Grid item xs={2}>
          <MultiSelectDropdown placeholder="User Tag 1" options={multiSelectValues.userTag1} onChange={(selected) => fetchData(selected, "userTag1")} />
        </Grid>
        <Grid item xs={2}>
          <MultiSelectDropdown placeholder="User Tag 2" options={multiSelectValues.userTag2} onChange={(selected) => fetchData(selected, "userTag2")} />
        </Grid>
      </Grid>
      <Stack direction="column" mt={5}>
        <Paper elevation={1} sx={{ height: "fit-content" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt="10px"
          >
            {/* <TextField
              select
              label="Select Periodicity"
              onChange={fetchData}
              value={periodicity}
              size="small"
              sx={{ bgcolor: "white", width: "12rem" }}
            >
              <MenuItem value="annually">Annually</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </TextField> */}

            <SingleSelectDropdown
              placeholder="Periodicity"
              options={singleSelectPeriodicityOptions}
              onChange={(selected) => fetchData(selected, "periodicity")}
            />
            <Box ></Box>
          </Stack>

          <TableContainer sx={{ overflowX: "scroll" }}>
            <Table
              sx={{
                border: "1px solid black",
                borderCollapse: "collapse",
                borderSpacing: "0",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    {" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {data && data[0]?.endDate
                      ? (() => {
                        const date = new Date(data[0]?.endDate);
                        if (!isNaN(date)) {
                          const day = String(date.getDate()).padStart(2, '0');
                          const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
                          const year = String(date.getFullYear()).slice(-2);
                          return `${day} ${month} ${year}`;
                        } else {
                          return " ---------           ";
                        }
                      })()
                      : " ---------           "}


                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {data && data[1]?.endDate
                      ? (() => {
                        const date = new Date(data[1]?.endDate);
                        if (!isNaN(date)) {
                          const day = String(date.getDate()).padStart(2, '0');
                          const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
                          const year = String(date.getFullYear()).slice(-2);
                          return `${day} ${month} ${year}`;
                        } else {
                          return " ---------           ";
                        }
                      })()
                      : " ---------           "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {data && data[2]?.endDate
                      ? (() => {
                        const date = new Date(data[2]?.endDate);
                        if (!isNaN(date)) {
                          const day = String(date.getDate()).padStart(2, '0');
                          const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
                          const year = String(date.getFullYear()).slice(-2);
                          return `${day} ${month} ${year}`;
                        } else {
                          return " ---------           ";
                        }
                      })()
                      : " ---------           "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {data && data[3]?.endDate
                      ? (() => {
                        const date = new Date(data[3]?.endDate);
                        if (!isNaN(date)) {
                          const day = String(date.getDate()).padStart(2, '0');
                          const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
                          const year = String(date.getFullYear()).slice(-2);
                          return `${day} ${month} ${year}`;
                        } else {
                          return " ---------           ";
                        }
                      })()
                      : " ---------           "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {data && data[4]?.endDate
                      ? (() => {
                        const date = new Date(data[4]?.endDate);
                        if (!isNaN(date)) {
                          const day = String(date.getDate()).padStart(2, '0');
                          const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
                          const year = String(date.getFullYear()).slice(-2);
                          return `${day} ${month} ${year}`;
                        } else {
                          return " ---------           ";
                        }
                      })()
                      : " ---------           "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {data && data[5]?.endDate
                      ? (() => {
                        const date = new Date(data[5]?.endDate);
                        if (!isNaN(date)) {
                          const day = String(date.getDate()).padStart(2, '0');
                          const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
                          const year = String(date.getFullYear()).slice(-2);
                          return `${day} ${month} ${year}`;
                        } else {
                          return " ---------           ";
                        }
                      })()
                      : " ---------           "}
                  </TableCell>
                  {Array.from({ length: additionalTableCellsCount }).map(
                    (_, index) => {
                      const item = data && data[index + 6]; // Ensure item is defined
                      const endDate = item?.endDate || " "; // Handle cases where destinations is not available
                      const key = index; // Use a unique identifier as the key, replace 'id' with your actual identifier

                      return (
                        <TableCell
                          key={key}
                          sx={{
                            border: "1px solid black",
                            whiteSpace: "nowrap",
                            padding: "5px",
                            textAlign: "center",
                            fontSize: "16px",
                            fontWeight: 600,
                          }}
                        >
                          {data && data[index + 6]?.endDate
                            ? (() => {
                              const date = new Date(data[index + 6]?.endDate);
                              if (!isNaN(date)) {
                                const day = String(date.getDate()).padStart(2, '0');
                                const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
                                const year = String(date.getFullYear()).slice(-2);
                                return `${day} ${month} ${year}`;
                              } else {
                                return " ---------           ";
                              }
                            })()
                            : " ---------           "}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Destinations{" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[0]?.destinations
                      ? data[0].destinations
                      : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[1]?.destinations
                      ? data[1].destinations
                      : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[2]?.destinations
                      ? data[2].destinations
                      : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[3]?.destinations
                      ? data[3].destinations
                      : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[4]?.destinations
                      ? data[4].destinations
                      : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[5]?.destinations
                      ? data[5].destinations
                      : " "}
                  </TableCell>
                  {Array.from({ length: additionalTableCellsCount }).map(
                    (_, index) => {
                      const item = data && data[index + 6]; // Ensure item is defined
                      const destinations = item?.destinations || " "; // Handle cases where destinations is not available
                      const key = index; // Use a unique identifier as the key, replace 'id' with your actual identifier

                      return (
                        <TableCell
                          key={key}
                          sx={{
                            border: "1px solid black",
                            whiteSpace: "nowrap",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {destinations}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Departures
                    </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[0]?.departures ? data[0].departures : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[1]?.departures ? data[1].departures : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[2]?.departures ? data[2].departures : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[3]?.departures ? data[3].departures : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[4]?.departures ? data[4].departures : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[5]?.departures ? data[5].departures : " "}
                  </TableCell>
                  {Array.from({ length: additionalTableCellsCount }).map(
                    (_, index) => {
                      const item = data && data[index + 6]; // Ensure item is defined
                      const departures = item?.departures || " "; // Handle cases where destinations is not available
                      const key = index; // Use a unique identifier as the key, replace 'id' with your actual identifier

                      return (
                        <TableCell
                          key={key}
                          sx={{
                            border: "1px solid black",
                            whiteSpace: "nowrap",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {departures ? departures : " ---------  "}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Seats{" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[0]?.seats ? data[0].seats : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[1]?.seats ? data[1].seats : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[2]?.seats ? data[2].seats : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[3]?.seats ? data[3].seats : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[4]?.seats ? data[4].seats : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[5]?.seats ? data[5].seats : " "}
                  </TableCell>
                  {Array.from({ length: additionalTableCellsCount }).map(
                    (_, index) => {
                      const item = data && data[index + 6]; // Ensure item is defined
                      const seats = item?.seats || " "; // Handle cases where destinations is not available
                      const key = index; // Use a unique identifier as the key, replace 'id' with your actual identifier

                      return (
                        <TableCell
                          key={key}
                          sx={{
                            border: "1px solid black",
                            whiteSpace: "nowrap",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {seats ? seats : " "}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    {" "}
                    Pax
                    </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[0]?.pax ? data[0].pax : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[1]?.pax ? data[1].pax : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[2]?.pax ? data[2].pax : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[3]?.pax ? data[3].pax : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[4]?.pax ? data[4].pax : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[5]?.pax ? data[5].pax : " "}
                  </TableCell>
                  {Array.from({ length: additionalTableCellsCount }).map(
                    (_, index) => {
                      const item = data && data[index + 6]; // Ensure item is defined
                      const pax = item?.pax || " "; // Handle cases where destinations is not available
                      const key = index; // Use a unique identifier as the key, replace 'id' with your actual identifier

                      return (
                        <TableCell
                          key={key}
                          sx={{
                            border: "1px solid black",
                            whiteSpace: "nowrap",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {pax ? pax : " "}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Pax SF{" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[0]?.paxSF == null) ? (isNaN(data[0]?.paxSF) ? "N/A" : data[0]?.paxSF + "%") : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[1]?.paxSF == null) ? (isNaN(data[1]?.paxSF) ? "N/A" : data[1]?.paxSF + "%") : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[2]?.paxSF == null)? (isNaN(data[2]?.paxSF) ? "N/A" : data[2]?.paxSF+ "%") : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[3]?.paxSF == null)? (isNaN(data[3]?.paxSF) ? "N/A" : data[3]?.paxSF+ "%") : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[4]?.paxSF == null)? (isNaN(data[4]?.paxSF) ? "N/A" : data[4]?.paxSF+ "%") : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}  
                  >
                    {data && data.length > 0 && !(data[5]?.paxSF == null)? (isNaN(data[5]?.paxSF) ? "N/A" : data[5]?.paxSF+ "%") : " "}
                  </TableCell>
                  {Array.from({ length: additionalTableCellsCount }).map(
                    (_, index) => {
                      const item = data && data[index + 6]; // Ensure item is defined
                      const paxSF = (isNaN(item?.paxSF) ? "N/A" : item?.paxSF+ "%"); // Handle cases where destinations is not available
                      const key = index; // Use a unique identifier as the key, replace 'id' with your actual identifier

                      return (
                        <TableCell
                          key={key}
                          sx={{
                            border: "1px solid black",
                            whiteSpace: "nowrap",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {paxSF}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Pax LF{" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[0]?.paxLF == null) ? (isNaN(data[0]?.paxLF) ? "N/A" : data[0]?.paxLF+ "%") : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[1]?.paxLF == null)? (isNaN(data[1]?.paxLF) ? "N/A" : data[1]?.paxLF+ "%") : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[2]?.paxLF == null)? (isNaN(data[2]?.paxLF) ? "N/A" : data[2]?.paxLF+ "%") : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[3]?.paxLF == null)? (isNaN(data[3]?.paxLF) ? "N/A" : data[3]?.paxLF+ "%") : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[4]?.paxLF == null)? (isNaN(data[4]?.paxLF) ? "N/A" : data[4]?.paxLF+ "%") : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[5]?.paxLF == null)? (isNaN(data[5]?.paxLF) ? "N/A" : data[5]?.paxLF+ "%") : " "}
                  </TableCell>
                  {Array.from({ length: additionalTableCellsCount }).map(
                    (_, index) => {
                      const item = data && data[index + 6]; // Ensure item is defined
                      const paxLF = (isNaN(item?.paxLF) ? "N/A" : item?.paxSF+ "%"); // Handle cases where destinations is not available
                      const key = index; // Use a unique identifier as the key, replace 'id' with your actual identifier

                      return (
                        <TableCell
                          key={key}
                          sx={{
                            border: "1px solid black",
                            whiteSpace: "nowrap",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {paxLF ? paxLF : " "}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Cargo Ton Capacity{" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[0]?.cargoCapT ? data[0].cargoCapT : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[1]?.cargoCapT ? data[1].cargoCapT : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[2]?.cargoCapT ? data[2].cargoCapT : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[3]?.cargoCapT ? data[3].cargoCapT : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[4]?.cargoCapT ? data[4].cargoCapT : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[5]?.cargoCapT ? data[5].cargoCapT : " "}
                  </TableCell>
                  {Array.from({ length: additionalTableCellsCount }).map(
                    (_, index) => {
                      const item = data && data[index + 6]; // Ensure item is defined
                      const cargoCapT = item?.cargoCapT || " "; // Handle cases where destinations is not available
                      const key = index; // Use a unique identifier as the key, replace 'id' with your actual identifier

                      return (
                        <TableCell
                          key={key}
                          sx={{
                            border: "1px solid black",
                            whiteSpace: "nowrap",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {cargoCapT ? cargoCapT : " "}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Cargo Tons{" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[0]?.cargoT ? data[0].cargoT : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[1]?.cargoT ? data[1].cargoT : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[2]?.cargoT ? data[2].cargoT : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[3]?.cargoT ? data[3].cargoT : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[4]?.cargoT ? data[4].cargoT : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[5]?.cargoT ? data[5].cargoT : " "}
                  </TableCell>
                  {Array.from({ length: additionalTableCellsCount }).map(
                    (_, index) => {
                      const item = data && data[index + 6]; // Ensure item is defined
                      const cargoT = item?.cargoT || " "; // Handle cases where destinations is not available
                      const key = index; // Use a unique identifier as the key, replace 'id' with your actual identifier

                      return (
                        <TableCell
                          key={key}
                          sx={{
                            border: "1px solid black",
                            whiteSpace: "nowrap",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {cargoT ? cargoT : " "}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Cargo Tons/Cargo Ton Capacity{" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[0]?.ct2ctc == null)? (isNaN(data[0]?.ct2ctc) ? "N/A" : data[0]?.ct2ctc+ "%") : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[1]?.ct2ctc == null)? (isNaN(data[1]?.ct2ctc) ? "N/A" : data[1]?.ct2ctc+ "%") : " "}

                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[2]?.ct2ctc == null)? (isNaN(data[2]?.ct2ctc) ? "N/A" : data[2]?.ct2ctc+ "%") : " "}

                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[3]?.ct2ctc == null)? (isNaN(data[3]?.ct2ctc) ? "N/A" : data[3]?.ct2ctc+ "%") : " "}

                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[4]?.ct2ctc == null)? (isNaN(data[4]?.ct2ctc) ? "N/A" : data[4]?.ct2ctc+ "%") : " "}

                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[5]?.ct2ctc == null)? (isNaN(data[5]?.ct2ctc) ? "N/A" : data[5]?.ct2ctc+ "%") : " "}

                  </TableCell>
                  {Array.from({ length: additionalTableCellsCount }).map(
                    (_, index) => {
                      const item = data && data[index + 6]; // Ensure item is defined
                      const key = index; // Use a unique identifier as the key, replace 'id' with your actual identifier
                      const ct2ctc = (isNaN(item?.ct2ctc) ? "N/A" : item?.ct2ctc+ "%");
                      return (
                        <TableCell
                          key={key}
                          sx={{
                            border: "1px solid black",
                            whiteSpace: "nowrap",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {ct2ctc}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Cargo FTK/Cargo ATK{" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[0]?.cftk2atk == null)? (isNaN(data[0]?.cftk2atk) ? "N/A" : data[0]?.cftk2atk+ "%") : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[1]?.cftk2atk == null)? (isNaN(data[1]?.cftk2atk) ? "N/A" : data[1]?.cftk2atk+ "%") : " "}

                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[2]?.cftk2atk == null)? (isNaN(data[2]?.cftk2atk) ? "N/A" : data[2]?.cftk2atk+ "%") : " "}

                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[3]?.cftk2atk == null)? (isNaN(data[3]?.cftk2atk) ? "N/A" : data[3]?.cftk2atk+ "%") : " "}

                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[4]?.cftk2atk == null)? (isNaN(data[4]?.cftk2atk) ? "N/A" : data[4]?.cftk2atk+ "%") : " "}

                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data.length > 0 && !(data[5]?.cftk2atk == null)? (isNaN(data[5]?.cftk2atk) ? "N/A" : data[5]?.cftk2atk+ "%") : " "}

                  </TableCell>
                  {Array.from({ length: additionalTableCellsCount }).map(
                    (_, index) => {
                      const item = data && data[index + 6]; // Ensure item is defined
                      const key = index; // Use a unique identifier as the key, replace 'id' with your actual identifier
                      const cftk2atk = (isNaN(item?.cftk2atk) ? "N/A" : item?.cftk2atk+ "%");
                      return (
                        <TableCell
                          key={key}
                          sx={{
                            border: "1px solid black",
                            whiteSpace: "nowrap",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {cftk2atk}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    BH
                    </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[0]?.bh ? data[0].bh : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[1]?.bh ? data[1].bh : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[2]?.bh ? data[2].bh : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[3]?.bh ? data[3].bh : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[4]?.bh ? data[4].bh : " "}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      whiteSpace: "nowrap",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {data && data[5]?.bh ? data[5].bh : " "}
                  </TableCell>
                  {Array.from({ length: additionalTableCellsCount }).map(
                    (_, index) => {
                      const item = data && data[index + 6]; // Ensure item is defined
                      const bh = item?.bh || " "; // Handle cases where destinations is not available
                      const key = index; // Use a unique identifier as the key, replace 'id' with your actual identifier

                      return (
                        <TableCell
                          key={key}
                          sx={{
                            border: "1px solid black",
                            whiteSpace: "nowrap",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {bh ? bh : " "}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Stack direction="row" justifyContent="end">
          <Button
            variant="contained"
            sx={{ width: "fit-content", px: "20px", mt: "5px" }}
            onClick={downloadDashboardTable}
          >
            Download
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

DashboardTable.propTypes = {
  runhandler: PropTypes.func, // Expecting a function prop and it's required
};

export default DashboardTable;
