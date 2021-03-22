import React, { useState, useImperativeHandle } from 'react'
import { Button, makeStyles, Container, Grid } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  createButton: {
    margin: theme.spacing(1, 1.5)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const classes = useStyles()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          variant="outlined"
          className={classes.createButton}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                onClick={toggleVisibility}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
})

Togglable.displayName = 'Togglable'

export default Togglable