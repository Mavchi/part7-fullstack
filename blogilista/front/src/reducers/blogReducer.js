import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
    switch (action.type) {
      case "INIT_BLOGS":
        return action.data;
      case "NEW_BLOGS":
        return state.concat(action.data);
      case "LIKE_BLOGS":
        const newBlog = action.data;
        return state.map((blog) => (blog.id === newBlog.id ? newBlog : blog));
      case "DELETE_BLOGS":
        const blog = action.data;
        return state.filter((b) => b.id !== blog.id);
      case "ADD_COMMENT":
        const updatedBlog = action.data;
        return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog )
      default:
        return state;
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
          type: "INIT_BLOGS",
          data: blogs,
        });
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
          type: "NEW_BLOGS",
          data: newBlog,
        });
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.update({...blog, likes: blog.likes+1})
        dispatch({
          type: "LIKE_BLOGS",
          data: newBlog,
        });
    }
} 

export const commentBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    dispatch({
      type: "ADD_COMMENT",
      data: updatedBlog
    });
  }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch({
          type: "DELETE_BLOGS",
          data: blog,
        });
    }
}

export default blogReducer