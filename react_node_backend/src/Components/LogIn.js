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
                                            <img src={require('../static_images/signup.png')} alt="text" />
                                            {/* <div class="vip-perks vip-perks--authentication">
                                                <h4>As a Fandango VIP You Have Access To</h4>
                                                <div class="row">
                                                    <span class="left-text worry-free-tickets columns"><span class="light">1. Refunds + Exchanges</span></span>
                                                </div>
                                                <div class="row">    
                                                    <span class="left-text insider-perks  columns"><span class="light">2. Insider Perks</span></span>
                                                </div>
                                                <div class="row">
                                                    <span class="left-text worry-free-tickets columns"><span class="light">3. Partner Rewards</span></span>
                                                </div>
                                                <div class="row">    
                                                    <span class="left-text insider-perks  columns"><span class="light">4. My Fandangos</span></span>
                                                </div>

                                            </div> */}
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
                                            <input name="ctl00$GlobalBody$SignOnControl$UsernameBox" type="text" id="UsernameBox" />
                                            <label for="PasswordBox">Password</label>
                                            <input name="ctl00$GlobalBody$SignOnControl$PasswordBox" type="password" maxlength="40" id="PasswordBox" />
                                            <input type="hidden" name="ctl00$GlobalBody$SignOnControl$CaptchEnabledField" id="GlobalBody_SignOnControl_CaptchEnabledField" />
                                            <a id="ForgotPasswordLink" href="forgotpassword?from=%2F" class="secondary-cta">Forgot your password?</a>
                                            <a id="ctl00_GlobalBody_SignOnControl_SignInButton" class="btn-cta full-width" AlternateText="Sign In" data-wss="&amp;lid=Sign_Button" href="javascript:__doPostBack(&#39;ctl00$GlobalBody$SignOnControl$SignInButton&#39;,&#39;&#39;)">Sign In</a>
                                            
                                        </div>
                                        <div class="divider">
                                            <img class = "or-img" src={require('../static_images/or.png')} alt="text" />
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