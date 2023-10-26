import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const [message, setMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Data = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const { email, password } = Data;

    let result = await fetch("http://localhost:9000/login", {
      method: "POST",
      body: JSON.stringify({
        email, password
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    result = await result.json();
    
    if (result.status === "Failed") {
      setMessage(result.message);
    } else if(result.token){
      localStorage.setItem("userId", result.data._id)
      localStorage.setItem("token", result.token)
      localStorage.setItem("session", JSON.stringify({
        userId: result.session.isLoggedIn ,
        expiresAt: new Date().getTime() + 60*60*1000
      }))
      navigate(`/detailsform/${result.data._id}`);
    }else{
      console.log("token is not Found...!")
    }
  };

  return (
    <div>
      {message ?
        <h2 style={{
          "backgroundColor": "green",
          "color": "black"
        }}>{message}</h2> : null
      }

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
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                type="hidden"
                name='_csrf'
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
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}


