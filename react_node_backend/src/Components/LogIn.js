//UserDetailsForm.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/custom.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { envURL, reactURL } from '../config/environment';
import LoginSignupHeader from './LoginSignupHeader';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoggedIn: false
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleUsernameChange(e) {
        e.preventDefault();
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({
            password: e.target.value
        })
    }

    handleLogin(e) {
        e.preventDefault();
        console.log("In Login" + this.state.username + this.state.password);
        var user = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post(envURL + 'login', user, { withCredentials: true})
            .then((response) => {
                console.log("In Login Component handleLogin",response.data);
                if(response.data.errorMsg === '') {
                    //alert("User looging in...");
                    this.setState({
                        username: response.data.email,
                        isLoggedIn: true
                    }) //redirect to userhome from here
                } else {
                    alert("Correct your username and password");
                }

            })
    }

    renderRows() {

    }
    render() {
        return (
            <div>
            <LoginSignupHeader/>
            <div id="partner-band"></div>
            <div class="site-wrap signin vipsignin">
                <form method="post" action="/account/signin?from=%2F" id="Form1">
                    <div class="aspNetHidden">
                        <input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
                        <input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
                        <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="Kr07G4Ql3Axco8UucEFovxE1UlU/NFCswD3iEi9nxnNorz5oVjT+8c4UhKmzlWywD/lN8SWMjZ1uITOK7VOXFl30NwY=" />
                    </div>
                    
                    <div class="page registration authentication-form" role="main">
                        <div class="row">
                            <div class="double-type large-8 medium-10 small-12 large-centered medium-centered small-centered columns">
                                <div class="panel-group row">
                                    <div class="panel main-panel intercept-container large-6 medium-6 small-12 columns">
                                        <div class="action-details small-12 columns">
                                            <img src={require('../assets/static_images/signup.png')} alt="text" />
                                        </div>
                                    </div>
                                    <div class="panel main-panel sign-up-form large-6 medium-6 small-12 columns">
                                        <div class="sub-panel">
                                            <p class="join-header">FANDANGO<span class="page-header-emphasis">VIP</span>
                                            </p>
                                            
                                            <div id="ErrorMessageWrapper" class=" hide">
                                                <div id="signin-error" class="error-msg"></div>
                                            </div>
                                            <label for="UsernameBox">Email Address</label>
                                            <input name="ctl00$GlobalBody$SignOnControl$UsernameBox" onChange={ this.handleUsernameChange } type="text" id="UsernameBox" />
                                            <label for="PasswordBox">Password</label>
                                            <input name="ctl00$GlobalBody$SignOnControl$PasswordBox" onChange={ this.handlePasswordChange } type="password" maxlength="40" id="PasswordBox" />
                                            <input type="hidden" name="ctl00$GlobalBody$SignOnControl$CaptchEnabledField" id="GlobalBody_SignOnControl_CaptchEnabledField" />
                                            <a id="ForgotPasswordLink" href="forgotpassword?from=%2F" class="secondary-cta">Forgot your password?</a>
                                            <a id="ctl00_GlobalBody_SignOnControl_SignInButton" onClick={ this.handleLogin } class="btn-cta full-width" AlternateText="Sign In" data-wss="&amp;lid=Sign_Button" href="javascript:__doPostBack(&#39;ctl00$GlobalBody$SignOnControl$SignInButton&#39;,&#39;&#39;)">Sign In</a>
                                            
                                        </div>
                                        <div class="divider">
                                            <img class = "or-img" src={require('../assets/static_images/or.png')} alt="text" />
                                        </div>
                                        <div class="large-8 medium-12 columns social-signin large-centered">
                                            <div id="googlePlusSignIn" class="social-login-button social-login-gplus">Sign in with Google+</div>
                                            <div id="facebookSignIn" class="social-login-button social-login-facebook">Sign in with Facebook</div>
                                            <small class="secondary-cta">We respect your privacy and will never<br /> post without your permission.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="aspNetHidden">
                        <input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="8231AAFB" />
                        <input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value="" />
                    </div>
                </form>
            </div>
            <footer>
                <div class="row">
                    <p class="small-12 small-centered columns copyright">
                        <small class="copyright">Copyright © 2018 All rights reserved. Your Ticket to the Movies. Your Personal Box Office.</small>
                    </p>
                </div>
            </footer>

        </div>
        )
    }
}

export default withRouter(SignIn);