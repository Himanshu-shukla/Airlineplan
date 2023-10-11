import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LoadingButton from "@mui/lab/LoadingButton";
import TermsAndConditionsModal from '../Components/Homepage/TermsAndConditionsModal'
import backgroundPic from "../assets/Images/bglogin.jpeg"
import './loginPage.css'



const defaultTheme = createTheme();

export default function Loginpage() {

  const customStyles = {
    normal: {
      fontFamily: 'Calibri, Arial, sans-serif',
      fontSize: '14px',
      color: 'black',
    },
    link: {
      fontFamily: 'Calibri, Arial, sans-serif',
      fontSize: '14px',
      marginLeft: '3px'
    }
  };

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://airlineplan.com/user-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('accessToken', data.token);
        toast.success(data.message);
        setLoading(false);

        setTimeout(() => {
          navigate('/homepage');
        }, 1500);
      } else {
        toast.error(data.error);
        setLoading(false);

      }
    } catch (error) {
      console.error(error);
      setLoading(false);

    }
  };
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/homepage');
    } else {
      navigate('/');
    }
  }, []);



  return (
    <div className={`loginPage ${location.pathname === '/' ? 'withBackground' : ''}`}>
<ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton
                onClick={handleLogin}
                loading={loading}
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "100%" }}

              >
                <span>Sign In</span>
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link href="/forget" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Stack >
          <Box mt={2} >
          <Typography variant="body2" color="textSecondary" align="center" style={customStyles.normal}>
            Welcome to Airlineplan!
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" style={customStyles.normal}>
            Airlineplan computes KPIs for a flight schedule. Upload schedule, make changes, input expected loads and get performance metrics.
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" style={customStyles.normal}>
            Registration is simple, fast and free!
            After registering, drop an email
            <Link href="www.airlineplan.com" variant="body2" style={customStyles.link}>
              contact@airlineplan.com
            </Link> for the template format for schedule upload.
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" style={customStyles.normal}>
            Do email any questions, issues and suggestions you have to
            <Link href="www.airlineplan.com" variant="body2" style={customStyles.link}>
              contact@airlineplan.com
            </Link>
            .
          </Typography>
        </Box>
        <TermsAndConditionsModal />
        </Stack>
        
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}