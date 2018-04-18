import React, { Component } from 'react';
import axios from 'axios';

class LoginSignupHeader extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
  
  }

  render() {
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
              <a href="/fandango-gift-cards" class = "form-btn">SignUp</a> |
              <a href="/freemovietickets" class = "form-btn">SignIn</a> |
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

