import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import { initializeUsers } from "../reducers/usersReducer";

const User = ({ user }) => {
  console.log(user);
  if (!user) {
    return null;
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <h5>added blogs</h5>
      <ul>
          {user.blogs.map(blog => {
              return <li key={blog.id}>{blog.title}</li>
          })}
      </ul>
    </div>
  );
};

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);

  const match = useRouteMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  //console.log(users[0], match.params.id);
  return (
    <Switch>
      <Route path="/users/:id">
        <User user={user} />
      </Route>
      <Route path="/users">
        <div>
          <h3>Users</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>
                  <strong>blogs created</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Route>
    </Switch>
  );
};

export default Users;
