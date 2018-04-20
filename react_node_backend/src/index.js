import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import Layout from './Components/Layout';
import Index from './Components/Index';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import MovieShowTimings from './Components/MovieShowTimings';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap-responsive.min.css'

import { createStore } from 'redux';
import allReducers from './Reducers';
import { Provider } from 'react-redux';
import MultiplexAdmin from "./Components/MultiplexAdmin";

const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
      <Route exact path="/adminDashboard" component={AdminDashboard} />
      <Route exact path="/adminlogin" component={AdminLogin} />
        <Route exact path="/" component={Index} />
        <Route exact path="/movies" component={MovieShowTimings} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
          <Route exact path="/multiplexadmin" component = {MultiplexAdmin} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)

