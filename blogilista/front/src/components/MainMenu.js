import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogOut } from "../reducers/userReducer";
import { Link } from "react-router-dom";
import { AppBar, makeStyles, Toolbar, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  link: {
    textDecoration: "none",
    textTransform: "uppercase",
    margin: theme.spacing(1, 1.5)
  },
  menu_title: {
      flexGrow: 1,
      textAlign: 'right',
  },
}));

const MainMenu = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = useSelector(state => state.user)

  const logOut = () => {
    dispatch(userLogOut());
  };

    return (
      <React.Fragment>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <nav>
              <Button color="inherit">
                <Link to="/" className={classes.link}>
                  blogs{" "}
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/users/" className={classes.link}>
                  users
                </Link>
              </Button>
            </nav>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.menu_title}
            >
              {user.name} logged in
            </Typography>
            <Button
              onClick={logOut}
              variant="outlined"
              className={classes.link}
            >
              logout
            </Button>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
}

export default MainMenu

/*
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              arial-label="menu"
            ></IconButton>
            <Button color="inherit">
              <Link to="/">blogs </Link>
            </Button>
            <Button color="inherit">
              <Link to="/users/">users </Link>
            </Button>
            <Typography
              style={{
                flexGrow: "1",
                textAlign: "right",
              }}
            >
              {user.name} logged in
            </Typography>
            <Button onClick={logOut}>logout</Button>
          </Toolbar>
        </AppBar>;
*/