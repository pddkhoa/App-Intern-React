import React, { useContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginApp } from "../Service/userService";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import {
  Grid,
  Link,
  Typography,
  Box,
  TextField,
  FormControl,
  OutlinedInput,
  Button,
  InputLabel,
  Container,
  InputAdornment,
  CssBaseline,
  IconButton,
} from "@mui/material";
import "./Login.scss";
import { useNavigate } from "react-router";

const defaultTheme = createTheme();
function Login() {
  const navigate = useNavigate();
  const { user, loginContext } = useContext(UserContext);
  const [loadingApi, setLoadingApi] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  //
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }
    setLoadingApi(true);
    let res = await loginApp(email.trim(), password);
    if (res && res.token) {
      loginContext(email, res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingApi(false);
  };
  //
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            LOG IN
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl style={{ width: "400px" }}>
              <TextField
                margin="normal"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </FormControl>

            <FormControl style={{ width: "400px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              className="button-login"
              type="submit"
              fullWidth
              variant="contained"
              disabled={email && password ? false : true}
              onClick={() => handleLogin()}
              sx={{ mt: 3, mb: 2 }}
            >
              {loadingApi && (
                <i className="fas fa-circle-notch fa-spin mx-1"></i>
              )}
              Sign In
            </Button>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
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
export default Login;
