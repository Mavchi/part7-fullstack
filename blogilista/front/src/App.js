import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Blog from "./components/Blog";
import Toggable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Users from "./components/Users";
import BlogPage from './components/BlogPage'

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
  let selected_blog = match ? blogs.find(blog => blog.id === match.params.id) : null;
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
      <div>
        <h2>log in to application</h2>
        <Notification message={errorMessage} />
        <form id="loginForm" onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              id="username"
              value={username}
              name="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              id="password"
              value={password}
              name="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
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
    <main>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <p>
        {user.name} logged in <button onClick={logOut}>logout</button>
      </p>
      <Switch>
        <Route path="/blogs/:id">
          <BlogPage blog={selected_blog} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <div>
            {blogForm()}

            <div className="content-blogs">
              {sorted_blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  handleLike={handleBlogLike}
                  handleRemoveBlog={handleRemoveBlog}
                />
              ))}
            </div>
          </div>
        </Route>
      </Switch>
    </main>
  );
};

export default App;
