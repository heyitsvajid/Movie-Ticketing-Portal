import React, { Component } from 'react';
import axios from 'axios';
import {envURL} from "../config/environment";
import '../assets/css/style.css'

class LoginSignupHeader extends Component {
  constructor(props) {
    super(props);
      this.state = {
          isLoggedIn: false
      }
  }
  
  componentWillMount(){
      axios.get(envURL + 'isLoggedIn', {withCredentials: true})
          .then((response) => {
              console.log("After checking the session", response.data);
              if(response.data.session === 'valid') {
                  this.setState({
                      isLoggedIn: true
                  })
              }
          })
  }

  render() {

      var changeButtons = null;
      if(this.props.page === "login") {
          changeButtons = (
              <a href="/signup" class = "form-btn btn-sm"> Don't have a Fandango VIP Account?  <strong> JOIN NOW FOR FREE </strong></a>
          );
      } else if (this.props.page === "signup") {
          changeButtons = (
              <a href="/login" class = "form-btn btn-sm"> Already have a Fandango VIP Account? <strong> SIGN IN </strong> </a>
          );
      }

    return (
    <div>
      <div id="header-wrap">
        <header id="global-header" class="form-header" role="banner">
          <nav class="row" role="navigation">
          <div class="col-md-6">
            <i class="left icon grip"></i>
              <ul class="inline-items tablet-width-100 left nonstandard-width">
                <li>
                  <div class="ad" data-unit="homepagelogo" data-responsive="false" data-media="">
                    
                  </div>
                  <a class="icon left fandango-logo header-logo" href="/">Fandango</a>
                </li>
              </ul>
          </div>
          <div class="col-md-6">
            <div class=" right">
              {/*<a href="/fandango-gift-cards" class = "form-btn">SignUp</a> |*/}
              {/*<a href="/freemovietickets" class = "form-btn">SignIn</a> |*/}
                { changeButtons }
            </div>
          </div>
            
          </nav>
        </header>
      </div>
      
    </div>
    )
  }
}

export default LoginSignupHeader;

