import blogService from '../services/blogs'

const reducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT':
            return action.data
        case 'NEW':
            return state.concat(action.data)
        case 'LIKE':
            const newBlog = action.data
            return state.map(blog => blog.id === newBlog.id ? newBlog : blog)
        case 'DELETE':
            const blog = action.data
            return state.filter(b => b.id !== blog.id)
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'NEW',
            data: newBlog
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.update({...blog, likes: blog.likes+1})
        dispatch({
            type: 'LIKE',
            data: newBlog
        })
    }
} 

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch({
            type: 'DELETE',
            data: blog
        })
    }
}

export default reducer