import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/custom.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { envURL, reactURL } from '../config/environment';
import LoginSignupHeader from './LoginSignupHeader';
import swal from 'sweetalert';
var LogAPI = require('../utils/logging');

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name : '',
            username: '',
            password: '',
            role_number : 1 ,
            confirmpassword : '' ,
            isLoggedIn: false,
            errorMsg: ''
        };
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    componentWillMount() {
        //Sign Up
          let click = {
            pageClick: {
                email: "anonymous",
                pageName: "Sign Up",
                timeStamp: new Date().getTime()
            }
        };
        console.log(click);
        LogAPI.logUserClicks(click);      
        axios.get(envURL + 'isLoggedIn', {withCredentials: true})
            .then((response) => {
                console.log("After checking the session", response.data);
                if(response.data.session === 'valid') {
                    if(response.data.result.role_number === 1)
                        this.props.history.push('/');
                    else {
                        this.props.history.push('/adminDashboard');
                    }
                }
            }
        )
    }

    componentDidMount() {
        document.addEventListener('keydown', function(event) {
            if(event.keyCode === 13 ) {
                document.getElementById('ctl00_GlobalBody_SignOnControl_SignInButton').click();
            }
        });
    }

    handleFirstNameChange(e) {
        e.preventDefault();
        this.setState({
            first_name : e.target.value,
            errorMsg: ''
        })
    }

    handleUsernameChange(e) {
        e.preventDefault();
        this.setState({
            username: e.target.value,
            errorMsg: ''
        })
    }

    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({
            password : e.target.value
        }, () => {
            if( this.state.password.length < 8 ) {
                this.setState({
                    errorMsg: 'Password length should be more than 8 characters'
                })
            }
            else {
                this.setState({
                    errorMsg: ''
                })
            }
        })
    }

    handleConfirmPasswordChange(e) {
        e.preventDefault();
        this.setState({
            confirmpassword: e.target.value,
            errorMsg: ''
        }, () => {
            if( this.state.password !== this.state.confirmpassword ) {
                console.log(this.state);
                this.setState({
                    errorMsg : 'Passwords do not match'
                })
            }
        })
    }

    handleSignUp(e) {
        e.preventDefault();
        //validation of email
        var patt = new RegExp('[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z]+');
        var res = patt.test( this.state.username );
        //Checking for Blank email
        if ( this.state.first_name.length < 1 ) {
            this.setState({
                errorMsg : 'Please fill all the fields'
            })
        }
        //Checking for password match after clicking on SignUp
        else if( this.state.password !== this.state.confirmpassword ) {
            console.log(this.state);
            this.setState({
                errorMsg : 'Passwords do not match'
            })
        }
        //Password Length check and email regex
        else if( res && this.state.password.length >= 8 ) {
            if( this.state.errorMsg === '' )
            {
                var user = {
                    first_name : this.state.first_name,
                    username: this.state.username,
                    password: this.state.password,
                    role_number : this.state.role_number
                };
                console.log("In Signup : ", this.state );
                axios.post(envURL + 'signup', user, { withCredentials: true} )
                    .then((response) => {
                        console.log("response in SignUp Component", response.data );
                        if( response.data.errorMsg !== '' ) {
                            this.setState({
                                errorMsg: 'User with same email already exists'
                            })
                        }
                        else {
                            swal("Account Created Successfully", "", "success");
                            this.props.history.push('/login')
                        }
                    }
                )
            }
        }
        else {
            this.setState({
                errorMsg: 'Invalid Email or password'
            })
        }
    }

    render() {
        return (
            <div>
                <LoginSignupHeader page="signup"/>
                <div id="partner-band"></div>
                <div class="site-wrap signin vipsignin">
                    <form >
                        <div class="aspNetHidden">
                            <input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
                            <input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
                            <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="Kr07G4Ql3Axco8UucEFovxE1UlU/NFCswD3iEi9nxnNorz5oVjT+8c4UhKmzlWywD/lN8SWMjZ1uITOK7VOXFl30NwY=" />
                        </div>
                        <div class="page registration authentication-form" role="main">
                            <div class="row">
                                <div class="credential-box double-type large-8 medium-10 small-12 large-centered medium-centered small-centered columns">
                                    <div class="panel-group row">
                                        <div class="panel main-panel intercept-container large-6 medium-6 small-12 columns">
                                            <div class="action-details small-12 columns">
                                                <img src={require('../assets/static_images/signup1.png')} alt="text" />
                                            </div>
                                        </div>
                                        <div class="panel main-panel sign-up-form large-6 medium-6 small-12 columns">
                                            <div class="sub-panel">
                                                <p class="join-header">FANDANGO<span class="page-header-emphasis">VIP</span>
                                                </p><br />
                                                {/*<div id="ErrorMessageWrapper" class=" hide">*/}
                                                <div id="signin-error" class="error-msg">
                                                    { this.state.errorMsg }
                                                </div>
                                                {/*</div>*/}
                                                <label for="UsernameBox">First Name</label>
                                                <input name="ctl00$GlobalBody$SignOnControl$UsernameBox" onChange={ this.handleFirstNameChange } type="text" id="UsernameBox" />
                                                <label for="UsernameBox">Email Address</label>
                                                <input name="ctl00$GlobalBody$SignOnControl$UsernameBox" onChange={ this.handleUsernameChange } type="text" id="UsernameBox" />
                                                <label for="PasswordBox">Password</label>
                                                <input name="ctl00$GlobalBody$SignOnControl$PasswordBox" onChange={ this.handlePasswordChange } type="password" maxlength="40" id="PasswordBox" />
                                                <small> <i> Use 8 or more characters. </i> </small>
                                                <br/>
                                                <input type="hidden" name="ctl00$GlobalBody$SignOnControl$CaptchEnabledField" id="GlobalBody_SignOnControl_CaptchEnabledField" />
                                                <label for="PasswordBox">Confirm Password</label>
                                                <input name="ctl00$GlobalBody$SignOnControl$PasswordBox" onChange={ this.handleConfirmPasswordChange } type="password" maxlength="40" id="PasswordBox" />
                                                <a id="ctl00_GlobalBody_SignOnControl_SignInButton" onClick={ this.handleSignUp } class="btn-cta full-width" AlternateText="Sign In" data-wss="&amp;lid=Sign_Button" href="javascript:__doPostBack(&#39;ctl00$GlobalBody$SignOnControl$SignInButton&#39;,&#39;&#39;)">Join Now for Free</a>
                                                <small>
                                                    By creating an account, you agree to the <a class="footer_links_bottom" rel="nofollow" href="http://www.fandango.com/PrivacyPolicy" name="&amp;lid=Footer&amp;lpos=Footer">Privacy Policy</a> and the <a class="footer_links_bottom" rel="nofollow" href="http://www.fandango.com/terms-and-policies" name="&amp;lid=Footer&amp;lpos=Footer">Terms and Policies</a>, and to receive email from Fandango.
                                                </small>
                                            </div>
                                            <div class="divider">
                                                <img class = "or-img" src={require('../assets/static_images/or.png')} alt="text" />
                                            </div>
                                            <div class="large-8 medium-12 columns social-signin large-centered">
                                                <div id="googlePlusSignIn" class="social-login-button social-login-gplus"> Join with Google+</div>
                                                <div id="facebookSignIn" class="social-login-button social-login-facebook"> Join with Facebook</div>
                                                <small class="secondary-cta"> <i>We respect your privacy and will never<br /> post without your permission. </i></small>
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

export default withRouter(SignUp);