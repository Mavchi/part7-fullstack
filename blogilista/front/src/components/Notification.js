import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from "@material-ui/lab";

const Notification = () => {
  const message = useSelector(state => state.message)

  if (message === null) {
    return null;
  }

  return <Alert severity={message.type}>{message.txt}</Alert>;
};

export default Notification