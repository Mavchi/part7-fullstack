import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";

//import Blog from "./components/Blog";
import Toggable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Users from "./components/Users";
import BlogPage from "./components/BlogPage";

import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { initializeUser, userLogin, userLogOut } from "./reducers/userReducer";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className={message.type}>{message.txt}</div>;
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogs = useSelector((state) => state.blogs);
  let user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  const match = useRouteMatch("/blogs/:id");
  let selected_blog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null;
  //console.log(selected_blog)

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(userLogin({ username, password }));
    if (user) {
      setUsername("");
      setPassword("");
    } else {
      setErrorMessage({ type: "error", txt: "wrong username or password" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logOut = () => {
    dispatch(userLogOut());
  };

  const blogFormRef = useRef();
  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();

      dispatch(createBlog(blogObject));

      setErrorMessage({
        type: "success",
        txt: `a new blog ${blogObject.title} by ${blogObject.author} added`,
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage({ type: "error", txt: "missing title, author or url" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blogForm = () => {
    return (
      <Toggable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggable>
    );
  };

  const handleBlogLike = (blog) => {
    return () => dispatch(likeBlog(blog));
  };

  const handleRemoveBlog = (blog) => {
    return async () => {
      try {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
          dispatch(deleteBlog(blog));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  };

  if (user === null)
    return (
      <Container>
        <h2>log in to application</h2>
        <Notification message={errorMessage} />

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

  const sorted_blogs = blogs.sort((a, b) => {
    if (a.likes > b.likes) {
      return -1;
    } else if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  });
  
  return (
    <Container>
      <main style={{ marginTop: "2px", flexGrow: 1 }}>
        <Notification message={errorMessage} />
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
                flexGrow: '1',
                textAlign: 'right'
              }}
            >
              {user.name} logged in{" "}
            </Typography>
            <Button onClick={logOut}>logout</Button>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/blogs/:id">
            <BlogPage blog={selected_blog} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <main>
              {blogForm()}

              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {sorted_blogs.map((blog) => (
                      <TableRow key={blog.id}>
                        <TableCell>
                          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </TableCell>
                        <TableCell>{blog.author}</TableCell>
                      </TableRow>
                      /*
                      <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                        handleLike={handleBlogLike}
                        handleRemoveBlog={handleRemoveBlog}
                      />
                      */
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </main>
          </Route>
        </Switch>
      </main>
    </Container>
  );
};

export default App;
