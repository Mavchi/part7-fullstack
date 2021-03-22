import React, { useState } from 'react'
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core/";

import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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
}))

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const classes = useStyles()

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <React.Fragment>
      <Container component="section" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create New Blog
          </Typography>
        </div>
        <form onSubmit={addBlog} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                id="title"
                label="Title"
                autoFocus
                variant="outlined"
                required
                fullWidth
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="author"
                id="author"
                label="Author"
                variant="outlined"
                required
                fullWidth
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="url"
                id="url"
                label="Url"
                variant="outlined"
                required
                fullWidth
                value={url}
                onChange={(event) => setUrl(event.target.value)}
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
            Create
          </Button>
        </form>
      </Container>
    </React.Fragment>
  );

  /*
  return (
        <div>
          author:
          <input
            type='text'
            name='Author'
            id='author'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            name='Url'
            id='url'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <Button id='create-blog-button' type='submit'>create</Button>
      </form>
    </div>
  )
*/
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm