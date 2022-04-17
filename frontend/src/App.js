import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Login from './component/login/Login';
import Register from './component/register/Register';
import Home from "./component/home/Home";
import Profile from "./component/profile/Profile"
import { logout } from "./features/authSlice";

function App() {
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser)
  return (
    <div className="app">
      <Router>
       <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;
