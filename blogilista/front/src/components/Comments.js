import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import _ from 'lodash'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch()

  const handleAddBlog = (event) => {
      event.preventDefault()
      const newBlog = _.cloneDeep(blog)
      newBlog.comments = newBlog.comments.concat(comment)
      setComment("")
      dispatch(commentBlog(newBlog));
  }

  console.log(blog);
  return (
    <section>
      <h4>Comments</h4>
      <form onSubmit={handleAddBlog}>
        <input id="comment" value={comment} onChange={(event) => setComment(event.target.value)}/>
        <button type="submit">add comment</button>
      </form>

      <ul>
          {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </section>
  );
};
export default Comments;
