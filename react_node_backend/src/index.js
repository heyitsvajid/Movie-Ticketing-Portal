import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './Components/LogIn';
import Layout from './Components/Layout';
import Index from './Components/Index';
import AdminDashboard from './Components/AdminDashboard';
import MovieShowTimings from './Components/MovieShowTimings';
import MovieDetails from './Components/MovieDetails';
import Checkout from './Components/Checkout';
import AccountSettings from "./Components/AccountSettings";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap-responsive.min.css'

import { createStore } from 'redux';
import allReducers from './Reducers';
import { Provider } from 'react-redux';
import MultiplexAdmin from "./Components/MultiplexAdmin";
import TicketBooking from './Components/TicketBooking';
import SignUp from "./Components/SignUp";

const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
      <Route exact path="/adminDashboard" component={AdminDashboard} />
        <Route exact path="/" component={Index} />
        <Route exact path="/movies" component={MovieShowTimings} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/multiplexadmin" component = {MultiplexAdmin} />
        <Route exact path="/tickets" component={TicketBooking} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/movie_details" component={MovieDetails} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/profile" component={AccountSettings} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)

