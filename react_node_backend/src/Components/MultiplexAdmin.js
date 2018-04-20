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
            role_number : 2,
            multiplexAdminList:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
    }

    componentWillMount(){
        this.handleFindAllAdmins();
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
         
            } )
            var that = this;
            setTimeout(function () {
                that.handleFindAllAdmins()
            }, 2000);
    
    };

    handleFindAllAdmins = () => {
        let url = envURL+'findallmultiplexadmin';
        axios.get( url, {withCredentials : true} )
            .then( (response) => {
                console.log(response.data);

                this.setState({
                    multiplexAdminList:response.data.data?response.data.data:[]
                })
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

    returnMultiplexAdminList(){
            let rowNodes = this.state.multiplexAdminList.map((item, index) => {
                return (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{item.first_name} {item.last_name}</td>
                        <td>{item.email}</td>
                        <td>{item.city}</td>
                        <td>{item.zipcode}</td>
 
                    </tr>
                )
            });
            return (
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">City</th>
                            <th scope="col">Zip Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowNodes}
                    </tbody>
                </table>
            );            
    }
    render() {
        return(
            <div >
                <div>
                    <div>
                    <h3>Multiplex Admin List</h3>
                <hr />

                {this.returnMultiplexAdminList()}
                <hr class='mt-5 mb-5' />
                <h3>Add New Multiplex Admin</h3>
                <hr />

                        <form className='form-multiplexadmin' onSubmit={this.handleCreateUser} >
                            <div className='well well-lg'>
                                <div className="form-group">
                                    <h5>First Name :</h5>
                                    <input type="text" onChange={this.handleChange} className="form-control" id="first_name" name='first_name' required />
                                </div>
                                <div className="form-group">
                                    <h5>Last Name :</h5>
                                    <input type="text" onChange={this.handleChange} className="form-control" id="last_name" name='last_name' required />
                                </div>
                                <div className="form-group">
                                    <h5>Email :</h5>
                                    <input type="email" onChange={this.handleChange} className="form-control" id="email" name='email'/>
                                </div>
                                <div className="form-group">
                                    <h5>Password:</h5>
                                    <input type="password" className="form-control" onChange={this.handleChange} id="pwd" name='password' required />
                                </div>
                                <div className="form-group">
                                    <h5>Address :</h5>
                                    <input type="text" className="form-control" onChange={this.handleChange} id="address" name='address' required />
                                </div>
                                <div className="form-group">
                                    <h5>City :</h5>
                                    <input type="text" className="form-control" onChange={this.handleChange} id="city" name='city' required />
                                </div>
                                <div className="form-group">
                                    <h5>State :</h5>
                                    <input type="text" className="form-control" onChange={this.handleChange} id="state" name='state' required />
                                </div>
                                <div className="form-group">
                                    <h5>Zipcode :</h5>
                                    <input type="number" className="form-control" onChange={this.handleChange} id="zipcode" name='zipcode' required />
                                </div>
                                <div className="form-group">
                                    <h5>Phone Number :</h5>
                                    <input type="number" className="form-control" onChange={this.handleChange} id="phone_number" name='phone_number' required />
                                </div>
                            <br/>
                            <button className='btn btn-primary'> Create </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MultiplexAdmin);