import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';
import '../assets/css/style.css'

class MultiplexAdmin extends Component {

    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            address : '',
            profile_image_path : '',
            city : '',
            state : '' ,
            zipcode : '',
            phone_number : '',
            disable : 0 ,
            role_number : 2
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
                [e.target.name] : e.target.value
            }, () => {
                console.log(this.state)
            }
        )
    };

    handleCreateUser = (e) => {
        e.preventDefault();
        let url = envURL+'createmultiplexadmin';
        let admin = {
            first_name : this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            address : this.state.address,
            profile_image_path : this.state.profile_image_path,
            city : this.state.city,
            state : this.state.state ,
            zipcode : this.state.zipcode,
            phone_number : this.state.phone_number,
            disable : this.state.disable,
            role_number : this.state.role_number
        };
        axios.post(url, admin, {withCredentials : true} )
            .then( (response) => {
                console.log(response.data);
                alert("Multiplex Admin Added Successfully");
                window.location.reload(true);
            } )
    };

    handleFindAllAdmins = () => {
        let url = envURL+'findallmultiplexadmin';
        axios.post( url, {withCredentials : true} )
            .then( (response) => {
                console.log(response.data);
            } )
    };

    handleFindbyId = () => {
        let url = envURL+'findmultiplexadminbyid';
        let adminid = {
            id : this.state.id
        };
        axios.post( url, adminid , {withCredentials : true} )
            .then( (response) => {
                console.log(response.data);
            } )
    };

    render() {
        return(
            <div className='multiplexadmin'>
                <div class="jumbotron text-center">
                    <div class="container">
                        <strong className='multiplexadminheader' >Creating Multiplex Admin</strong>
                    </div>
                </div>
                <div className='container'>
                    <div className="MultiplexAdmin">
                        <form className='form-multiplexadmin' onSubmit={this.handleCreateUser} >
                            <div className='well well-lg'>
                                <div className="form-group">
                                    <label className='text-xl-left'>First Name :</label>
                                    <input type="text" onChange={this.handleChange} className="form-control" id="first_name" name='first_name' required />
                                </div>
                                <div className="form-group">
                                    <label>Last Name :</label>
                                    <input type="text" onChange={this.handleChange} className="form-control" id="last_name" name='last_name' required />
                                </div>
                                <div className="form-group">
                                    <label>Email :</label>
                                    <input type="email" onChange={this.handleChange} className="form-control" id="email" name='email'/>
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" className="form-control" onChange={this.handleChange} id="pwd" name='password' required />
                                </div>
                                <div className="form-group">
                                    <label>Address :</label>
                                    <input type="text" className="form-control" onChange={this.handleChange} id="address" name='address' required />
                                </div>
                                <div className="form-group">
                                    <label>City :</label>
                                    <input type="text" className="form-control" onChange={this.handleChange} id="city" name='city' required />
                                </div>
                                <div className="form-group">
                                    <label>State :</label>
                                    <input type="text" className="form-control" onChange={this.handleChange} id="state" name='state' required />
                                </div>
                                <div className="form-group">
                                    <label>Zipcode :</label>
                                    <input type="text" className="form-control" onChange={this.handleChange} id="zipcode" name='zipcode' required />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number :</label>
                                    <input type="text" className="form-control" onChange={this.handleChange} id="phone_number" name='phone_number' required />
                                </div>
                            <br/>
                            <button className='multiplexadmincreatebutton container btn btn-primary'> Create </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MultiplexAdmin);