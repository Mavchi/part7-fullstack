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
  CssBaseline,
} from "@material-ui/core";

//import Blog from "./components/Blog";
import MainMenu from './components/MainMenu'
import Notification from './components/Notification'
import Login from './components/Login'
import Toggable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Users from "./components/Users";
import BlogPage from "./components/BlogPage";

import {
  initializeBlogs,
  createBlog,
} from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";
import { setMessage } from './reducers/messageReducer'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const blogs = useSelector((state) => state.blogs);
  let user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(setMessage({type: 'success', txt: 'Successfully logged in'}))
  }, [dispatch]);

  const match = useRouteMatch("/blogs/:id");
  let selected_blog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null;
  //console.log(selected_blog)

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

  if (user === null)
    return (
      <Login />
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
      <CssBaseline />

      <Notification />
      <MainMenu />

      <main style={{ marginTop: "2px", flexGrow: 1 }}>
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

/*
to-do
- login error not corrects

*/