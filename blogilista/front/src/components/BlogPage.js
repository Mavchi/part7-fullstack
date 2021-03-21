import React from "react";
import { useDispatch } from "react-redux";

import { likeBlog } from "../reducers/blogReducer";

import Comments from '../components/Comments'

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }
  
  return (
    <section>
      <h2>blog app</h2>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url} alt="link to blog">
          {blog.url}
        </a>
      </div>
      <span className="blog-likes">{blog.likes}</span>
      <button
        className="blog-like-button"
        onClick={() => dispatch(likeBlog(blog))}
      >
        like
      </button>
      <br />
      added by {blog.user.name}

      <Comments blog={blog} />
    </section>
  );
};

export default BlogPage;
