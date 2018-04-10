import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import ShoppingList from './Components/test';
import Header from './Components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap.css'
import './assets/css/bootstrap-responsive.min.css'
import $ from 'jquery'; 


         
ReactDOM.render(
    
    <Router>
        <div>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/home" component={ShoppingList} />
          <Route exact path="/signup" component={SignUp} />
        </div>
    </Router>,
    document.getElementById('root')
  )

 