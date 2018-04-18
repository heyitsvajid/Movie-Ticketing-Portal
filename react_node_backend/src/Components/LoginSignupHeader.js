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
                {/* <li id="global-search">
                  <form action="/search" autocomplete="off" role="search" novalidate>
                    <div class="fan-autocomplete">
                      <div class="fan-autocomplete-results"></div>
                      <input class="fan-input style-search" type="text" name="q" placeholder="Enter City + State, ZIP Code, or Movie" />
                      <div class="csspinner double-up no-overlay"></div>
                    </div>
                    <input type="hidden" name="mode" value="general"/>
                    <button class="fan-btn fan-btn-style-go" type="button">Go</button>
                  </form>
                </li> */}
              </ul>
          </div>
          <div class="col-md-6">
            <div class="width-25 right">
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

