import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "antd/dist/antd.css";
import  LoginComponent from './components/Login';
import  RegisterComponent from './components/Register';
import  HomeComponent from './components/Home';
import { useSelector } from 'react-redux';

export default function App() {
  const currentUser = useSelector(state => state.currentUser);
    
    return (
      <Router>
          <Switch>
            <Route path="/register">
                <RegisterComponent />
            </Route>
            <Route path="/login">
                <LoginComponent />
            </Route>
            <Route path="/">
                <HomeComponent />
            </Route>
          </Switch>
      </Router>
    );
}