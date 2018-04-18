import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/custom.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import swal from 'sweetalert2'
import { envURL, reactURL } from '../config/environment';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            formErrors: { name: '', email: '', password: '' },
            nameValid: false,
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    componentWillMount(){
        let url = envURL+'isLoggedIn';
        axios.get(url,{withCredentials: true})
            .then(res => {
                
                if (res.data.responseCode === 0) {
                    localStorage.setItem('id', res.data.id);
                    localStorage.setItem('name', res.data.name);
                    localStorage.setItem('email', res.data.email);
                    this.props.history.push('/home')
                }
                else {
                    this.props.history.push('/signup')
                }
            })
            .catch(err => {
                console.error(err);
            });
      
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let nameValid = this.state.nameValid;

        switch (fieldName) {
            case 'name':
                nameValid = value.length > 0;;
                fieldValidationErrors.name = nameValid ? '' : ' is required';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    handleSubmit() {     
        let signUpAPI=envURL+'signup';
        //alert("abc");
        let name = this.state.name.trim();
        let email = this.state.email.trim();
        let password = this.state.password;
        if (!name || !email || !password) {
            return;
        }
        var apiPayload = {name:name, email:email, password:password};
         axios.post(signUpAPI, apiPayload, {withCredentials:true}) 
            .then(res => {
                // eslint-disable-next-line
                if(res.data.errorMsg!=''){
                    swal({
                        type: 'error',
                        title: 'Sign Up',
                        text: res.data.errorMsg,
                      })
                }else{
                    localStorage.setItem('id',res.data.data.id);
                    localStorage.setItem('name',res.data.data.name);
                    localStorage.setItem('email',res.data.data.email);
                    this.props.history.push('/login');
                    swal({
                        type: 'success',
                        title: 'Sign Up',
                        text: 'Login to Continue',
                      })
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
    render() {
        return (
            <div className="text-center divclasscenter">
                <form method = "POST" className="form-signup">
                    <img className="mb-4" src="https://cdn6.f-cdn.com/build/icons/fl-logo.svg" alt="" />
                    <h1 className="h3 mb-3 font-weight-normal">Please Sign Up</h1>
                    <div class='mt-2 mb-2'>
                        <div className="panel panel-default">
                        </div>
                    </div>
                    <label className="sr-only">Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Name" required="" autoFocus=""
                        value={this.state.name} onChange={this.handleUserInput} />
                    <br />
                    <label className="sr-only">Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Email address" required="" autoFocus=""
                        value={this.state.email} onChange={this.handleUserInput} />
                    <br />
                    <label className="sr-only">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Password" required=""
                        value={this.state.password} onChange={this.handleUserInput} />
                    <br />

                    <button className="btn btn-lg btn-primary btn-block" type="button"
                        disabled={!this.state.formValid}
                        onClick={this.handleSubmit.bind(this)}>Create Account</button>
                    <p className="mt-5 mb-3 text-muted">© 2017-2018</p>

                
                    <span className="login-form-signup-link">
                        Already a Freelancer.com member?
                        <Link to="/login"><a className="switch-to-login">Log In</a></Link>
                    </span>
                </form>

            </div>


        )
    }
}
export default withRouter(SignUp);