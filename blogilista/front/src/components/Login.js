import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  CssBaseline,
  makeStyles,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core/";

import Notification from "./Notification";

import { userLogin } from "../reducers/userReducer";
import { setMessage } from "../reducers/messageReducer";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogin = async (event) => {
    event.preventDefault();
    await dispatch(userLogin({ username, password }));
    if (!user) {
      dispatch(
        setMessage({
          type: "error",
          txt: "Wrong password or username",
        })
      );
    }
    else {
      setUsername("");
      setPassword("");
      dispatch(
        setMessage({
          type: "success",
          txt: "Successfully logged in",
        })
      );
    } 
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Notification />

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log in application
        </Typography>
      </div>
      <form onSubmit={handleLogin} className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="username"
              id="username"
              label="username"
              autoFocus
              variant="outlined"
              required
              fullWidth
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              id="password"
              label="password"
              variant="outlined"
              required
              fullWidth
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          fullWidth
        >
          Log In
        </Button>
      </form>
    </Container>
  );
  /*
    return (
      <Container>
        <h2>log in to application</h2>
        <Notification message={message} />

        <form id="loginForm" onSubmit={handleLogin}>
          <div className="login-input">
            <TextField
              id="username"
              type="text"
              label="Username"
              defaultValue="Username"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="login-input">
            <TextField
              id="password"
              type="password"
              label="Password"
              defaultValue="Password"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            id="login-button"
            type="submit"
          >
            login
          </Button>
        </form>
      </Container>
    );
    */
};

export default Login;
