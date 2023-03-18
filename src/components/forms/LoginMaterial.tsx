import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../services/authServices';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

// Define Schema of validation with yup

const loginSchema = Yup.object().shape(
  {
      email: Yup.string().email('Invalid Email Format').required('Email is required'),
      password: Yup.string().required('Password is required')
  }
)

export const LoginMaterial = () => {

  let navigate = useNavigate();

  // We define the initial credentials
  const initialCredentials = {
    email: '',
    password: '',
}

  const formik = useFormik({
    initialValues: initialCredentials,
    validationSchema: loginSchema,
    onSubmit: async(values) => {
      login(values.email, values.password).then(async(response: AxiosResponse) => {
          
          if (response.status === 200) {
              if (response.data.token) {
                  await sessionStorage.setItem('sessionJWTToken', response.data.token); 
                  navigate('/')
              } else {
                  throw new Error('Invalid token');
              }

          } else {
              throw new Error('Invalid crendetials');
          }



      }).catch((error) => console.error(`[LOGIN ERROR]: something went wrong: ${error}`))
    }
  })


  return (
    <ThemeProvider theme={theme}>
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
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              autoComplete="email"
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
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}