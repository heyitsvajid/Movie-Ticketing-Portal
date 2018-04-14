import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import '../assets/css/admin.css'


class UserDetailsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem('adminEmail') ? localStorage.getItem('adminEmail') : '',
            password: '',
        };
    }

    componentWillMount() {
        let url = 'http://localhost:3001/api/idLoggedIn';
        axios.get(url, { withCredentials: true })
            .then(res => {
                if (res.data.responseCode === 1) {
                    this.props.history.push('/dashboard')
                }
                else {
                    this.props.history.push('/')
                }
            })
            .catch(err => {
                console.error(err);
            });

    }

    handleSubmit(e) {
        e?e.preventDefault():''
        if(this.refs.remember_me.checked){
            localStorage.setItem();
        }
        if(!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            alert('Invalid Email')
            return;
        }
        if(!(this.state.password.length >= 6)){
            alert('Invalid Password')
            return;
        }
            alert('allow login')
            
        
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
    }
    render() {
        return (
            <body class="bg-dark"><div class="container">
                <div class="card card-login mx-auto mt-5">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input class="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp"
                                 placeholder="Enter email" name='email' value={this.state.email} onChange={this.handleUserInput}  />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input class="form-control" id="exampleInputPassword1" type="password" placeholder="Password"
                                value={this.state.password} name='password' onChange={this.handleUserInput}  />
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" ref="remember_me"/> Remember Password</label>
                                </div>
                            </div>
                            <a class="btn btn-primary btn-block" onClick={this.handleSubmit.bind(this)} >Login</a>
                        </form>
                    </div>
                </div>
            </div></body>)
    }
}

export default withRouter(UserDetailsForm);