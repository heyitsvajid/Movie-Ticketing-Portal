import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';
import '../assets/css/style.css'
import swal from "sweetalert2";

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
            multiplexAdminList:[],
            searchedAdminList: [],
            error : ''
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
                [e.target.name] : e.target.value,
                error : ''
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

        if (!this.state.zipcode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/i)) {
            swal({
                type: 'error',
                title: 'Add Multiplex Admin',
                text: 'Invalid Zipcode',
            });
            return;
        }
        else {
            axios.post(url, admin, {withCredentials : true} )
                .then( (response) => {
                    console.log("response from Kafka", response.data );
                    if( response.data.errorMsg !== '' ) {
                        this.setState({
                            error : "Email is already used for Multiplex Admin"
                        })
                    }
                    else if( response.data.successMsg !== '' ) {
                        console.log(response.data);
                        alert("Multiplex Admin Added Successfully");
                        window.location.reload(true);
                    }
                } );
        }


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
                    multiplexAdminList:response.data.data?response.data.data:[],
                    searchedAdminList: response.data.data?response.data.data:[]
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

    handleSearchBar(e){
        var searched_array = [];
        if(e.target.value != ""){
          if(this.state.multiplexAdminList.length > 0){
              for(let i = 0; i < this.state.multiplexAdminList.length; i++){
                var strRegExPattern = new RegExp(e.target.value, 'i');
                let list_element = this.state.multiplexAdminList[i]
                if(list_element.first_name.match(strRegExPattern) || list_element.last_name.match(strRegExPattern)
                || list_element.email.match(strRegExPattern)){
                    searched_array.push(list_element);
                }
              }
              this.setState({searchedAdminList: searched_array})
          }
        }
        else{
          this.handleFindAllAdmins();
        }
    }

    returnMultiplexAdminList(){
            let rowNodes = this.state.searchedAdminList.map((item, index) => {
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
                <div class="row">
                    <div class="col-lg-2">
                        <h4 class="c-grey-900 mB-20">All Multiplex Admins</h4>
                    </div>
                    <div class="col-lg-10">
                    <div id = "search_bar">
                        <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search Multiplex By Name" onChange = {this.handleSearchBar.bind(this)}/>
                        </div>
                    </div>
                    </div>
                </div>
                
                {this.returnMultiplexAdminList()}
                <div>
                    <div>
                        <hr class='mt-5 mb-5' />
                        <h3>Add New Multiplex Admin</h3>
                        <hr />
                        <div class="row gap-20 masonry pos-r" style={{position: 'relative', height: '1086px'}}>
                            <div class="masonry-item col-md-6" style={{position: 'absolute', top: '0px'}}>
                                <div class="bgc-white p-20 bd">
                                    <div class="mT-30">
                                        <form id="dashboard-form" className='form-multiplexadmin' onSubmit={this.handleCreateUser}>

                                            <div class="form-row">
                                                <div className="form-group col-md-6">
                                                    <label class="dashboard-label">First Name</label>
                                                    <input type="text" onChange={this.handleChange} placeholder="Enter First Name" className="form-control" id="first_name" name='first_name' pattern='[A-Za-z]*' title='Please enter valid name' required />
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label class="dashboard-label">Last Name</label>
                                                    <input type="text" onChange={this.handleChange} placeholder="Enter Last Name" className="form-control" id="last_name" name='last_name' pattern='[A-Za-z]*' title='Please enter valid name' required />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label class="dashboard-label">Email</label>
                                                <input type="email" placeholder="Enter Email" onChange={this.handleChange} className="form-control" id="email" name='email' />
                                            </div>
                                            <div className="form-group">
                                                <label class="dashboard-label">Password</label>
                                                <input type="password" placeholder="Enter Password" className="form-control" onChange={this.handleChange} id="pwd" name='password' required />
                                            </div>
                                            <div className="form-group">
                                                <label class="dashboard-label">Address</label>
                                                <input type="text" placeholder="Enter Address" className="form-control" onChange={this.handleChange} id="address" name='address' required />
                                            </div>
                                            <div class="form-row">
                                                <div className="form-group col-md-6">
                                                    <label class="dashboard-label">City</label>
                                                    <input type="text" placeholder="Enter City" className="form-control" onChange={this.handleChange} id="city" name='city' pattern='[A-Za-z]+[\s]*[A-Za-z]*' title='Please enter valid city' required />
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label class="dashboard-label" > State : </label>
                                                    <select class="form-control" onChange={this.handleChange} id="state" name='state' required >
                                                        <option value="AL">Alabama</option>
                                                        <option value="AK">Alaska</option>
                                                        <option value="AZ">Arizona</option>
                                                        <option value="AR">Arkansas</option>
                                                        <option value="CA">California</option>
                                                        <option value="CO">Colorado</option>
                                                        <option value="CT">Connecticut</option>
                                                        <option value="DE">Delaware</option>
                                                        <option value="DC">District Of Columbia</option>
                                                        <option value="FL">Florida</option>
                                                        <option value="GA">Georgia</option>
                                                        <option value="HI">Hawaii</option>
                                                        <option value="ID">Idaho</option>
                                                        <option value="IL">Illinois</option>
                                                        <option value="IN">Indiana</option>
                                                        <option value="IA">Iowa</option>
                                                        <option value="KS">Kansas</option>
                                                        <option value="KY">Kentucky</option>
                                                        <option value="LA">Louisiana</option>
                                                        <option value="ME">Maine</option>
                                                        <option value="MD">Maryland</option>
                                                        <option value="MA">Massachusetts</option>
                                                        <option value="MI">Michigan</option>
                                                        <option value="MN">Minnesota</option>
                                                        <option value="MS">Mississippi</option>
                                                        <option value="MO">Missouri</option>
                                                        <option value="MT">Montana</option>
                                                        <option value="NE">Nebraska</option>
                                                        <option value="NV">Nevada</option>
                                                        <option value="NH">New Hampshire</option>
                                                        <option value="NJ">New Jersey</option>
                                                        <option value="NM">New Mexico</option>
                                                        <option value="NY">New York</option>
                                                        <option value="NC">North Carolina</option>
                                                        <option value="ND">North Dakota</option>
                                                        <option value="OH">Ohio</option>
                                                        <option value="OK">Oklahoma</option>
                                                        <option value="OR">Oregon</option>
                                                        <option value="PA">Pennsylvania</option>
                                                        <option value="RI">Rhode Island</option>
                                                        <option value="SC">South Carolina</option>
                                                        <option value="SD">South Dakota</option>
                                                        <option value="TN">Tennessee</option>
                                                        <option value="TX">Texas</option>
                                                        <option value="UT">Utah</option>
                                                        <option value="VT">Vermont</option>
                                                        <option value="VA">Virginia</option>
                                                        <option value="WA">Washington</option>
                                                        <option value="WV">West Virginia</option>
                                                        <option value="WI">Wisconsin</option>
                                                        <option value="WY">Wyoming</option>
                                                    </select>

                                                    {/*<label class="dashboard-label">State</label>*/}
                                                    {/*<input type="text" placeholder="Enter State" className="form-control" onChange={this.handleChange} id="state" name='state' pattern='[A-Za-z]*' title='Please enter valid state' required />*/}

                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div className="form-group col-md-6">
                                                    <label class="dashboard-label">ZipCode</label>
                                                    <input type="text" placeholder="Enter ZipCode" className="form-control" onChange={this.handleChange} id="zipcode" name='zipcode' required />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label class="dashboard-label">Phone Number</label>
                                                    <input type="text" placeholder="Enter Phone Number" className="form-control" onChange={this.handleChange} id="phone_number" name='phone_number' pattern='[0-9]{10}' title='Please enter 10 Digit Phone Number' required />
                                                </div>
                                            </div>

                                            <button type="submit" class="dashboard-form-btn btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MultiplexAdmin);