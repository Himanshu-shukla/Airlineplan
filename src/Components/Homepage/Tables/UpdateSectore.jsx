import React, { useState, useEffect } from 'react'
import {
  Stack,
  Typography,
  TextField,
  Button,
  Dialog,
  IconButton,
} from "@mui/material";
import axios from "axios";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";
import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LoadingButton from "@mui/lab/LoadingButton";



const UpdateSectore = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCopyModal, setOpenCopyModal] = useState(false);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [sector, setSector] = useState("");
  const [sector1, setSector1] = useState("");
  const [sector2, setSector2] = useState("");
  const [gcd, setGCD] = useState("");
  const [acftType, setACFTType] = useState("");
  const [variant, setVariant] = useState("");
  const [bt, setBlockTime] = useState("");
  const [paxCapacity, setPaxCapacity] = useState("");
  const [CargoCapT, setCargoCapT] = useState("");
  const [paxLF, setPaxLfPercent] = useState("");
  const [cargoLF, setCargoLfPercent] = useState("");
  const [fromDt, setFromDt] = useState("");
  const [toDt, setToDt] = useState("");
  const [loading, setLoading] = useState(false);



  const [sector1Error, setSector1Error] = useState("");
  const [sector2Error, setSector2Error] = useState("");
  const [gcdError, setGCDError] = useState("");
  const [acftTypeError, setACFTTypeError] = useState("");
  const [variantError, setVariantError] = useState("");
  const [btError, setBlockTimeError] = useState("");
  const [paxCapacityError, setPaxCapacityError] = useState("");
  const [CargoCapTError, setCargoCapTError] = useState("");
  const [paxLFPercentError, setPaxLfPercentError] = useState("");
  const [cargoLFPercentError, setCargoLfPercentError] = useState("");
  const [fromDtError, setFromDtError] = useState("");
  const [toDtError, setToDtError] = useState("");

  //  disable Network Available Fields in Sector Table
  // const [availableFields, setAvailableFields] = useState([]);


  const handleClose = () => {
    setAnchorEl(null);
    setSector1Error(null);
    setSector2Error(null);
    setGCDError(null)
    setACFTTypeError(null)
    setVariantError(null)
    setPaxCapacityError(null)
    setCargoCapTError(null);
    setPaxLfPercentError(null);
    setCargoLfPercentError(null);
    setFromDtError(null);
    setToDtError(null);
    // setAvailableFields([]);
  };

  const handleSector = (event) => {
    setSector(event.target.value);
  };

  const handleSector1 = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z0-9\s]{0,4}$/.test(value)) {
      setSector1(value);
      setSector1Error("");
    } else {
      setSector1Error("Arr Stn must be 4 characters long");
    }
  };
  const handleSector2 = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z0-9\s]{0,4}$/.test(value)) {
      setSector2(value);
      setSector2Error("");
    } else {
      setSector2Error("Arr Stn must be 4 characters long");
    }
  };

  const handleGCD = (event) => {
    const inputValue = event.target.value;

    const parsedValue = parseInt(inputValue, 10);
    if (isNaN(parsedValue)) {
      setGCDError("Please enter a valid integer");
      return;
    }
    if (parsedValue < 0 || parsedValue > 20000) {
      setGCDError("Please enter an integer between 0 and 20,000.");
      console.error(
        "Invalid input: Please enter an integer between 0 and 20,000."
      );
      return;
    }
    setGCDError("");
    setGCD(parsedValue);
  };

  const handleACFT = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z0-9\s-]{0,8}$/.test(value)) {
      setACFTType(value);
      setACFTTypeError("");
    } else {
      setACFTTypeError(
        'Must be 8 characters and can only contain letters, numbers, "-", and blank spaces'
      );
    }
  };
  const handleVariant = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z0-9\s-]{0,8}$/.test(value)) {
      setVariant(value);
      setVariantError("");
    } else {
      setVariantError(
        'Must be 8 characters and can only contain letters, numbers, "-", and blank spaces'
      );
    }
  };
  const handleBlockTime = (event) => {
    setBlockTime(event.target.value);
  };



  const handlePaxCapacity = (event) => {
    const inputValue = event.target.value;
    const parsedValue = parseInt(inputValue, 10);

    if (isNaN(parsedValue) || !Number.isInteger(parsedValue)) {
      setPaxCapacityError("Please enter an integer between 0 and 600");
      setPaxCapacity("");
    } else if (parsedValue < 0 || parsedValue > 600) {
      setPaxCapacityError("Please enter an integer between 0 and 600.");
      setPaxCapacity("");
    } else {
      setPaxCapacityError("");
      setPaxCapacity(parsedValue);
    }
  };

  const handleCargoCapT = (event) => {
    const inputValue = event.target.value;
    const parsedValue = parseFloat(inputValue);

    if (isNaN(parsedValue) || parsedValue <= 0 || parsedValue > 150) {
      setCargoCapTError("Please enter a number between 0.1 and 150");
      setCargoCapT("");
    } else {
      setCargoCapTError("");
      setCargoCapT(parsedValue);
    }
  };


  const handlePaxPercent = (event) => {
    const value = event.target.value;
    const percentage = parseFloat(value);
    if (
      isNaN(percentage) ||
      percentage < 0 ||
      percentage > 100 ||
      value.includes(".")
    ) {
      setPaxLfPercentError("percentage between 0% and 100% without decimals.");
      setPaxLfPercent("");
      return;
    } else {
      setPaxLfPercent(percentage);
      setPaxLfPercentError("");
    }
  };

  const handleCargoPercent = (event) => {
    const value = event.target.value;
    const percentage = parseFloat(value);
    if (
      isNaN(percentage) ||
      percentage < 0 ||
      percentage > 100 ||
      value.includes(".")
    ) {
      setCargoLfPercentError(
        "percentage between 0% and 100% without decimals."
      );
      setPaxLfPercent("");
      return;
    } else {
      setCargoLfPercent(percentage);
      setCargoLfPercentError("");
    }
    event.target.value;
  };
  const handleFromDt = (event) => {
    setFromDt(event.target.value);
  };
  const handleToDt = (event) => {
    setToDt(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };



  useEffect(() => {
    if (!fromDt) {
      setFromDtError("This field is required.");
    } else {
      setFromDtError("");
    }
  }, [fromDt]);

  useEffect(() => {
    if (!toDt) {
      setToDtError("This field is required.");
    } else {
      setToDtError("");
    }
  }, [toDt]);

  const DataId = props.checkedRows[0];
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3005/sectorsbyid/${DataId}`
      );
      const item = response.data;

      const inputDate = item.fromDt;
      const formattedDate = moment(inputDate).format("DD/MMM/YY");

      const inputEfftodate = item.toDt;
      const formtEfftoDate = moment(inputEfftodate).format("DD/MMM/YY");
      setSector1(item.sector1)
      setSector2(item.sector2)
      setACFTType(item.acftType)
      setVariant(item.variant)
      setBlockTime(item.bt)
      setGCD(item.gcd)
      setPaxCapacity(item.paxCapacity)
      setCargoCapT(item.CargoCapT)
      setPaxLfPercent(item.paxLF)
      setCargoLfPercent(item.cargoLF)
      setFromDt(formattedDate)
      setToDt(formtEfftoDate)

      // setAvailableFields((prevFields) => {

      //   const newFields = [];
      //   if (item.fromDt) {
      //     newFields.push("fromDt");
      //   }
      //   if (item.toDt) {
      //     newFields.push("toDt");
      //   }
      //   if (item.sector1) {
      //     newFields.push("sector1");
      //   }
      //   if (item.sector2) {
      //     newFields.push("sector2");
      //   }
      //   if (item.acftType) {
      //     newFields.push("acftType");
      //   }
      //   if (item.variant) {
      //     newFields.push("variant");
      //   }
      //   if (item.bt) {
      //     newFields.push("bt");
      //   }
      //   if (item.gcd) {
      //     newFields.push("gcd");
      //   }
      //   if (item.paxCapacity) {
      //     newFields.push("paxCapacity");
      //   }
      //   if (item.CargoCapT) {
      //     newFields.push("CargoCapT");
      //   }
      //   if (item.paxLF) {
      //     newFields.push("paxLF");
      //   }
      //   if (item.cargoLF) {
      //     newFields.push("cargoLF");
      //   }

      //   return [...prevFields, ...newFields];
      // });

    } catch (error) {
      console.error(error);

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fromDt) {
      setFromDtError(" This field is required.");
      return;
    }
    if (!toDt) {
      setToDtError(" This field is required.");
      return;
    }

    if (
      sector1Error ||
      sector2Error ||
      gcdError ||
      acftTypeError ||
      variantError ||
      paxCapacityError ||
      CargoCapTError ||
      paxLFPercentError ||
      cargoLFPercentError ||
      false
    ) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3005/update-sectore/${DataId}`,
        {
          sector1,
          sector2,
          acftType,
          variant,
          bt,
          gcd,
          paxCapacity,
          CargoCapT,
          paxLF,
          cargoLF,
          fromDt,
          toDt,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        toast.success("Update successful!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      console.log(response.data);
    } catch (err) {
      console.error(err);

      if (err.response && err.response.status === 400) {
        toast.error("Already exist");
        setLoading(false);

      } else {
        toast.error("An error occurred while processing your request.");
        setLoading(false);

      }
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<DriveFileRenameOutlineIcon />}
        onClick={() => {
          setOpenUpdateModal(true);
          fetchData();
        }}
        sx={{ textTransform: "capitalize", width: "fit-content" }}
      >
        Update
      </Button>

      <Dialog
        open={openUpdateModal}
        onClose={() => {
          handleClose()
          setOpenUpdateModal(false);
        }}
        sx={{ width: "100%" }}
      >
        <Stack gap="16px" sx={{ padding: "5%", width: "fit-content" }}>
          <Stack flexDirection='row' justifyContent='space-between' alignItems='center' sx={{ borderBottom: "1px solid #D8D8D8" }}>
            <Typography sx={{ fontWeight: "bold" }}>Update Row</Typography>
            <IconButton sx={{ mb: '10px' }} onClick={() => { setOpenUpdateModal(false); setLoading(false); }}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack direction="row" gap="30px">
              <Stack direction="row" alignItems="center" width="50%">
                <Typography
                  sx={{ width: "50%", fontSize: "14px", fontWeight: "500" }}
                >
                  Dep Stn
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    size="small"
                    name="sector1"
                    required
                    value={sector1}
                    onChange={handleSector1}
                    placeholder="VI89,"
                    disabled={true}
                    />
                  {sector1Error && (
                    <div style={{ color: "red" }}>{sector1Error}</div>
                  )}
                </div>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                width="50%"
                marginTop="10px"
              >
                <Typography
                  sx={{ width: "50%", fontSize: "14px", fontWeight: "500" }}
                >
                  Arr Stn
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    size="small"
                    name="sector2"
                    required
                    placeholder="VIDP"
                    value={sector2}
                    onChange={handleSector2}
                    disabled={true}
                    />
                  {sector2Error && (
                    <div style={{ color: "red" }}>{sector2Error}</div>
                  )}
                </div>
              </Stack>
            </Stack>
            <Stack direction="row" gap="30px">
              <Stack
                direction="row"
                alignItems="center"
                width="50%"
                marginTop="10px"
              >
                <Typography
                  sx={{ width: "50%", fontSize: "14px", fontWeight: "500" }}
                >
                  ACFT Type
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    size="small"
                    name="acftType"
                    onChange={handleACFT}
                    required
                    value={acftType}
                    placeholder="A330-200"
                    />
                  {acftTypeError && (
                    <div style={{ color: "red" }}>{acftTypeError}</div>
                  )}
                </div>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                width="50%"
                marginTop="10px"
              >
                <Typography
                  sx={{ width: "50%", fontSize: "14px", fontWeight: "500" }}
                >
                  Variant
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    size="small"
                    name="variant"
                    onChange={handleVariant}
                    value={variant}
                    required
                    placeholder="777300ER"
                    disabled={true}
                    />
                  {variantError && (
                    <div style={{ color: "red" }}>{variantError}</div>
                  )}
                </div>
              </Stack>
            </Stack>
            <Stack direction="row" gap="30px">
              <Stack
                direction="row"
                alignItems="center"
                width="50%"
                marginTop="10px"
              >
                <Typography
                  sx={{ width: "50%", fontSize: "14px", fontWeight: "500" }}
                >
                  Block Time
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    sx={{ width: "165px" }}
                    size="small"
                    name="bt"
                    type="time"
                    value={bt}
                    onChange={handleBlockTime}
                    required
                    disabled={true}
                    />
                </div>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                width="50%"
                marginTop="10px"
              >
                <Typography
                  sx={{ width: "50%", fontSize: "14px", fontWeight: "500" }}
                >
                  Pax Capacity
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    size="small"
                    type="number"
                    name="paxCapacity"
                    onChange={handlePaxCapacity}
                    required
                    value={paxCapacity}
                    placeholder="1-600"
                    />
                  {paxCapacityError && (
                    <div style={{ color: "red" }}>{paxCapacityError}</div>
                  )}
                </div>
              </Stack>
            </Stack>
            <Stack direction="row" gap="30px">
              <Stack
                direction="row"
                alignItems="center"
                width="50%"
                marginTop="10px"
              >
                <Typography
                  sx={{ width: "50%", fontSize: "14px", fontWeight: "500" }}
                >
                  Cargo Cap T
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    size="small"
                    type="number"
                    name="CargoCapT"
                    value={CargoCapT}
                    onChange={handleCargoCapT}
                    required
                    placeholder="150.0"
                    />
                  {CargoCapTError && (
                    <div style={{ color: "red" }}>{CargoCapTError}</div>
                  )}
                </div>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                width="50%"
                marginTop="10px"
              >
                <Typography
                  sx={{ width: "50%", fontSize: "14px", fontWeight: "500" }}
                >
                  Pax LF%
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    size="small"
                    name="paxLF"
                    onChange={handlePaxPercent}
                    required
                    type='number'
                    placeholder="100%"
                    value={paxLF}
                    />
                  {paxLFPercentError && (
                    <div style={{ color: "red" }}>{paxLFPercentError}</div>
                  )}
                </div>
              </Stack>
            </Stack>
            <Stack direction="row" gap="30px">
              <Stack
                direction="row"
                alignItems="center"
                width="50%"
                marginTop="10px"
              >
                <Typography
                  sx={{ width: "50%", fontSize: "14px", fontWeight: "500" }}
                >
                  Cargo LF%
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    size="small"
                    type="number"
                    name="cargoLF"
                    required
                    value={cargoLF}
                    onChange={handleCargoPercent}
                    placeholder="100%"
                    />
                  {cargoLFPercentError && (
                    <div style={{ color: "red" }}>{cargoLFPercentError}</div>
                  )}
                </div>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                width="50%"
                marginTop="10px"
              >
                <Typography
                  sx={{ width: "50%", fontSize: "14px", fontWeight: "500" }}
                >
                  From Dt
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs} required>
                    <DatePicker
                      format="DD/MMM/YY"
                      defaultValue={dayjs(fromDt)}
                      value={dayjs(fromDt)}
                      disabled={true}
                      onChange={(date) => setFromDt(date)}
                      slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                    />
                  </LocalizationProvider>
                  {fromDtError && <div style={{ color: "red" }}>{fromDtError}</div>}

                </div>
              </Stack>
            </Stack>
            <Stack direction="row" gap="30px">
              <Stack
                direction="row"
                alignItems="center"
                gap="10px"
                width="48%"
                marginTop="10px"
              >
                <Typography
                  sx={{ width: "45%", fontSize: "14px", fontWeight: "500" }}
                >
                  To Dt
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >

                  <LocalizationProvider dateAdapter={AdapterDayjs} required>
                    <DatePicker
                      format="DD/MMM/YY"
                      defaultValue={dayjs(toDt)}
                      value={dayjs(toDt)}
                      onChange={(date) => setToDt(date)}
                      disabled={true}
                      slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                    />
                  </LocalizationProvider>
                  {toDtError && <div style={{ color: "red" }}>{toDtError}</div>}
                </div>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                width="50%"
                marginTop="10px"
              >
                <Typography
                  sx={{ width: "50%", fontSize: "14px", fontWeight: "500" }}
                >
                  GCD
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField size="small" type="number" onChange={handleGCD} value={gcd} required />
                  {gcdError && <div style={{ color: "red" }}>{gcdError}</div>}
                </div>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="end" mt="10px">
              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
              >
                <span>Submit</span>
              </LoadingButton>
            </Stack>
          </form>
        </Stack>
      </Dialog>
      <ToastContainer />
    </>
  )
}

export default UpdateSectore