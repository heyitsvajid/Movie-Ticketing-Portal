import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import { envURL, reactURL } from '../config/environment';
import '../assets/css/style.css';
import swal from "sweetalert";

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
            state_name : 'AL' ,
            zipcode : '',
            phone_number : '',
            disable : 0 ,
            role_number : 2,
            multiplexAdminList:[],
            searchedAdminList: [],
            error : '', 
            currentPage: 1,
            perPageRows: 5,
            update: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
    }

    componentWillMount(){
        this.handleFindAllAdmins();
    }
    handleChange = (e) => {
        e.preventDefault();
        document.getElementById(e.target.name + "_error").innerHTML = "";
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

        let firstNameErrorPresent = !this.validateFirstNameFormat(this.state.first_name) ? true : false; 
        let lastNameErrorPresent = !this.validateLastNameFormat(this.state.last_name) ? true : false;
        let emailErrorPresent = !this.validateEmailFormat(this.state.email) ? true : false;

        let addressErrorPresent = !this.validateAddressFormat(this.state.address) ? true : false;
        let cityErrorPresent = !this.validateCityFormat(this.state.city) ? true : false;
        let stateErrorPresent = !this.validateStateFormat(this.state.state_name) ? true : false;
        let zipcodeErrorPresent = !this.validateZipcodeFormat(this.state.zipcode) ? true : false;
        let passwordErrorPresent = !this.validatePasswordFormat(this.state.password) ? true : false;
        let phoneNumberErrorPresent = !this.validatePhoneNumberFormat(this.state.phone_number) ? true : false;
        
        if(firstNameErrorPresent || lastNameErrorPresent || emailErrorPresent || addressErrorPresent || cityErrorPresent || 
            stateErrorPresent || zipcodeErrorPresent || passwordErrorPresent || phoneNumberErrorPresent){ return;}

        axios.post(url, admin, {withCredentials : true} )
            .then( (response) => {
                console.log("response from Kafka", response.data );
                if( response.data.errorMsg !== '' ) {
                    document.getElementById("email_error").innerHTML = "Email is already used for Multiplex Admin";
                    
                }
                else if( response.data.successMsg !== '' ) {
                    console.log(response.data);
                    swal({
                        type: 'success',
                        title: 'Create Admin',
                        text: 'Multiplex Admin Created Successfully',
                    })
                    this.setState({
                        first_name: "",
                        last_name: "",
                        password: "",
                        email: "",
                        address: "",
                        city: "",
                        state_name: "AL",
                        zipcode: "",
                        phone_number: ""
                    }) 
                }
            } );

            var that = this;
            setTimeout(function () {
                that.handleFindAllAdmins()
            }, 2000);
    
    };

    validateFirstNameFormat(first_name){
        if(first_name.trim() == ""){
          document.getElementById("first_name_error").innerHTML = "Please enter first name";
          return false;
        }
        return true;
    }

    validateLastNameFormat(last_name){
        if(last_name.trim() == ""){
          document.getElementById("last_name_error").innerHTML = "Please enter last name";
          return false;
        }
        return true;
    }

    validateEmailFormat(email){
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email == ""){
          document.getElementById("email_error").innerHTML = "Please enter your email";
          return false;
        }
        else if(!regex.test(String(email).toLowerCase())){
          document.getElementById("email_error").innerHTML = "Please enter valid email address";
          return false;
        }
        return true;
    }

    validateAddressFormat(address){
        if(address.trim() == ""){
          document.getElementById("address_error").innerHTML = "Please enter address";
          return false;
        }
        return true;
    }
    
    validateCityFormat(city){
        if(city.trim() == ""){
          document.getElementById("city_error").innerHTML = "Please enter city";
          return false;
        }
        return true;
    }

    validateStateFormat(state_name){
        // if(state_name.trim() == ""){
        // //   document.getElementById("state_name_error").innerHTML = "Please enter state";
        //   return false;
        // }
        return true;
    }

    validateZipcodeFormat(zipcode){
        const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        if(zipcode.trim() == ""){
          document.getElementById("zipcode_error").innerHTML = "Please enter zipcode";
          return false;
        }
        else if(!regex.test(String(zipcode).toLowerCase())){
          document.getElementById("zipcode_error").innerHTML = "Please enter valid Zipcode";
          return false;
        }
        return true;
    }

    validatePasswordFormat(password){
        if(password.trim() == ""){
          document.getElementById("password_error").innerHTML = "Please enter password";
          return false;
        }
        else if(password.trim().length < 8){
          document.getElementById("password_error").innerHTML = "Password should be of 8 characters or more";
          return false;
        }
        return true;
    }
    
    validatePhoneNumberFormat(contact_no){
        const regex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
        if(contact_no == ""){
          document.getElementById("phone_number_error").innerHTML = "Please enter Contact Number";
          return false;
        }
        else if(!regex.test(String(contact_no).toLowerCase())){
          document.getElementById("phone_number_error").innerHTML = "Please enter valid Contact Number";
          return false;
        }
        return true;
      }


      updateUser(e) {
        e ? e.preventDefault() : ''

        let firstNameErrorPresent = !this.validateFirstNameFormat(this.state.first_name) ? true : false;
        let emailErrorPresent = !this.validateEmailFormat(this.state.email) ? true : false;
        let zipcodeErrorPresent = !this.validateZipcodeFormat(this.state.zipcode) ? true : false;
        let phoneNumberErrorPresent = !this.validatePhoneNumberFormat(this.state.phone_number) ? true : false;
        let cityErrorPresent = !this.validateCityFormat(this.state.city) ? true : false;
        let passwordErrorPresent = !this.validatePasswordFormat(this.state.password) ? true : false;
        let addressErrorPresent = !this.validateAddressFormat(this.state.password) ? true : false;

        if(firstNameErrorPresent || emailErrorPresent || zipcodeErrorPresent || phoneNumberErrorPresent || cityErrorPresent || passwordErrorPresent 
            || addressErrorPresent){ return; }

        let all_details = {
            id : this.state.update_id,
            first_name : this.state.first_name,
            last_name : this.state.last_name,
            city: this.state.city,
            state_name: this.state.state_name,
            zipcode: this.state.zipcode,
            phone: this.state.phone_number,
            address: this.state.address
        };

        let profiledetails = {
            id : this.state.update_id,
            email : this.state.email,
        };

        axios.post(envURL + 'checkforexistingemail', profiledetails, { withCredentials : true})
        .then(res => {
            if(res.data.errorMsg == "" && all_details.id != res.data.data[0].id){
                document.getElementById("email_error").innerHTML = "Email already present";
                return;
            }
            else {
                axios.post( envURL+'updateprofileemail', profiledetails, { withCredentials : true} )
                    .then( (response) => {
                            axios.post( envURL+'updateprofilebasicinfo', all_details, { withCredentials : true} )
                            .then((res) => {
                                this.setState({
                                    id : '',
                                    first_name : '',
                                    last_name : '',
                                    city: '',
                                    state_name: '',
                                    zipcode: '',
                                    phone_number: '',
                                    address: '',
                                    update: false
                                })
                                this.handleFindAllAdmins();
                                swal( "Profile Updated Successfully!", "", "success" );
                                document.getElementById("password-div").style.display = "block";
                            })
                        }
                    )
            }
        })
    }

    handleFindAllAdmins = () => {
        let url = envURL+'findallmultiplexadmin';
        axios.get( url, {withCredentials : true} )
            .then( (response) => {
                console.log(response.data);

                this.setState({
                    multiplexAdminList:response.data.data?response.data.data:[],
                    searchedAdminList: response.data.data?response.data.data:[],
                    currentPage: 1
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
              this.setState({searchedAdminList: searched_array, currentPage: 1})
          }
        }
        else{
          this.handleFindAllAdmins();
        }
    }

    handleNextPaginationButton(e) {
        const total_pages = this.state.searchedAdminList.length > 0 ? this.state.searchedAdminList.length/this.state.perPageRows : 0;
        if(this.state.searchedAdminList != [] && this.state.currentPage != Math.ceil(total_pages)){
          this.setState({currentPage: Number(this.state.currentPage + 1)})      
        }
      }
    
    handlePrevPaginationButton(e) {
        if(this.state.searchedAdminList != [] && this.state.currentPage != 1){
            this.setState({currentPage: Number(this.state.currentPage - 1)})
        }
    }

    handlePageChange(e) {
        this.setState({currentPage: Number(e.target.dataset.id)})
    }

    handleMultiplexAdminDetail = (e) => {
        console.log("In handleMultiplexAdminDetail, id :", e )
        let display = this.state.multiplexAdminList;
        for( let i = 0; i < display.length; i++) {
            if( display[i].id === e ) {
                console.log("Found Match", display[i] );
                this.setState({
                    UserID : display[i].id,
                    First_Name : display[i].first_name,
                    Last_Name : display[i].last_name,
                    Email : display[i].email,
                    Phone_Number : display[i].phone_number,
                    Address : display[i].address,
                    City : display[i].city,
                    State : display[i].state,
                    Zipcode : display[i].zipcode,
                    Role_Number : display[i].role_number
                })
            }
        }
    };

    handleUserUpdate(e) {
        e ? e.preventDefault() : ''
        document.getElementById("first_name_error").innerHTML = "";
        document.getElementById("last_name_error").innerHTML = "";
        document.getElementById("password_error").innerHTML = "";
        document.getElementById("email_error").innerHTML = "";
        document.getElementById("address_error").innerHTML = "";
        document.getElementById("city_error").innerHTML = "";
        document.getElementById("zipcode_error").innerHTML = "";
        document.getElementById("phone_number_error").innerHTML = "";
        this.state.multiplexAdminList.forEach(element => {
            if (element.id == e.target.id) {
                document.getElementById("password-div").style.display = "none";
                this.setState({
                    update_id: e.target.id,
                    update: !this.state.update,
                    first_name: element.first_name,
                    last_name: element.last_name == null ? "" : element.last_name,
                    email: element.email,
                    city: element.city == null ? "" : element.city,
                    state_name: element.state,
                    zipcode: element.zipcode == null ? "" : element.zipcode,
                    phone_number: element.phone_number == null ? "" : element.phone_number,
                    address: element.address == null ? "" : element.address
                })
                return;
            }
        });

    }

    handleDeleteMultiplexAdmin = (e) => {
        swal({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let id = { id : e };
                    let url = envURL + 'disableaccount';

                    axios.post( url, id, { withCredentials : true } )
                        .then( (response) => {
                            console.log("After Deleting Bill, Response ", response.data);
                            swal({
                                type: 'success',
                                title: 'Multiplex Admin Deleted Successfully',
                                text: "",
                            });
                            this.handleFindAllAdmins();
                        })

                }
            });
        console.log("In handleDeleteMultiplexAdmin, id :", e );

        
    };

    returnMultiplexAdminList(){     
            let pagination_list, currentTodos=null;
            if(this.state.searchedAdminList != []){
                const indexOfLastTodo = this.state.currentPage * this.state.perPageRows;
                const indexOfFirstTodo = indexOfLastTodo - this.state.perPageRows;
                currentTodos = this.state.searchedAdminList.slice(indexOfFirstTodo, indexOfLastTodo);
                const total_pages = this.state.searchedAdminList.length > 0 ? this.state.searchedAdminList.length/this.state.perPageRows : 0;
                const page_numbers = [];
                for (let i = 1; i <= Math.ceil(this.state.searchedAdminList.length / this.state.perPageRows); i++) {
                    page_numbers.push(i);
                }  
                pagination_list = page_numbers.map(number => {
                    return (
                    <li class="page-item" key= {number} data-id={number} onClick={this.handlePageChange.bind(this)}  ><a data-id={number} class="page-link" href="#">{number}</a></li>
                    );
                });
                for(let i = 0; i< currentTodos.length; i++){
                    currentTodos[i].current_index = indexOfFirstTodo + i + 1;
                }
            }
            let rowNodes = currentTodos.map((item, index) => {
                return (
                    // <tr>
                    //     <th scope="row">{item.current_index}</th>
                    //     <td>{item.first_name} {item.last_name}</td>
                    //     <td>{item.email}</td>
                    //     <td>{item.city}</td>
                    //     <td>{item.zipcode}</td>
 
                    // </tr>
                    <tr>
                        <th scope="row"> { item.current_index } </th>
                        {/* <td> <a href = "#mymodal" data-toggle="modal" onClick={this.handleMultiplexAdminDetail.bind(this, item.id )} > { item.id } </a> </td> */}
                        <td> <a href = "#mymodal" data-toggle="modal" onClick={this.handleMultiplexAdminDetail.bind(this, item.id )} > { item.first_name } </a> </td>
                        <td> { item.last_name } </td>
                        <td> { item.email } </td>
                        <td> { item.phone_number } </td>
                        <td>
                            <div class="row">
                                <div className="form-group col-md-2.5">
                                    <input type="button" id={item.id} class="dashboard-form-btn link-style nav-link btn-info action-link"
                                        value="Update" required=""  onClick={this.handleUserUpdate.bind(this)} />
                                </div>

                                <div className="form-group col-md-2">
                                    <button className='btn-danger' style={{backgroundColor: '#F15500'}} onClick={this.handleDeleteMultiplexAdmin.bind(this, item.id )} > Delete </button>
                                </div>
                            </div>
                            
                        </td>

                    </tr>
                )
            });
            return (
                <div>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col"> # </th>
                            {/* <th scope="col"> User ID </th> */}
                            <th scope="col"> First Name</th>
                            <th scope="col"> Last Name</th>
                            <th scope="col"> Email </th>
                            <th scope="col"> Phone Number </th>
                            <th scope="col"> Action </th>
                        </tr>
                        </thead>
                        <tbody>
                            {rowNodes}
                        </tbody>
                    </table>

                    <Pagination handlePrevPaginationButton = {this.handlePrevPaginationButton.bind(this)} handleNextPaginationButton = {this.handleNextPaginationButton.bind(this)}
                    handlePageChange = {this.handlePageChange.bind(this)} pagination_list = {pagination_list}/>
                </div>
                
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
                        <input type="text" class="form-control" placeholder="Search Multiplex Admin By Name" onChange = {this.handleSearchBar.bind(this)}/>
                        </div>
                    </div>
                    </div>
                </div>
                <hr/>
                
                {this.returnMultiplexAdminList()}
                <div>
                    <div>
                        <hr class='mt-5 mb-5' />
                        <h3>{this.state.update ? 'Update' : 'Add New'} Multiplex Admin</h3>
                        <hr />
                        <div class="row gap-20 masonry pos-r" style={{position: 'relative', height: '700px'}}>
                            <div class="masonry-item col-md-6" style={{position: 'absolute', top: '0px'}}>
                                <div class="bgc-white p-20 bd">
                                    <div class="mT-30">
                                        <form id="dashboard-form" className='form-multiplexadmin' >

                                            <div class="form-row">
                                                <div className="form-group col-md-6">
                                                    <label class="dashboard-label">First Name</label>
                                                    <input type="text" value={this.state.first_name} onChange={this.handleChange} placeholder="Enter First Name" className="form-control" id="first_name" name='first_name' pattern='[A-Za-z]*' title='Please enter valid name' />
                                                    <div id = "first_name_error" class= "error"></div>
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label class="dashboard-label">Last Name</label>
                                                    <input type="text" value={this.state.last_name} onChange={this.handleChange} placeholder="Enter Last Name" className="form-control" id="last_name" name='last_name' pattern='[A-Za-z]*' title='Please enter valid name' />
                                                    <div id = "last_name_error" class= "error"></div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label class="dashboard-label">Email</label>
                                                <input type="text" value={this.state.email} placeholder="Enter Email" onChange={this.handleChange} className="form-control" id="email" name='email' />
                                                <div id = "email_error" class= "error"></div>
                                            </div>
                                            <div id="password-div" className="form-group">
                                                <label class="dashboard-label">Password</label>
                                                <input type="password" placeholder="Enter Password" className="form-control" onChange={this.handleChange} id="pwd" name='password' />
                                                <div id = "password_error" class= "error"></div>
                                            </div>
                                            <div className="form-group">
                                                <label class="dashboard-label">Address</label>
                                                <input type="text" value={this.state.address} placeholder="Enter Address" className="form-control" onChange={this.handleChange} id="address" name='address' />
                                                <div id = "address_error" class= "error"></div>
                                            </div>
                                            <div class="form-row">
                                                <div className="form-group col-md-6">
                                                    <label class="dashboard-label">City</label>
                                                    <input type="text" value={this.state.city} placeholder="Enter City" className="form-control" onChange={this.handleChange} id="city" name='city' pattern='[A-Za-z]+[\s]*[A-Za-z]*' title='Please enter valid city' />
                                                    <div id = "city_error" class= "error"></div>
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label class="dashboard-label">State</label>
                                                    <select class="form-control" value={this.state.state_name} onChange={this.handleChange} id="state" name='state_name' >
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
                                                    <div id = "state_name_error" class= "error"></div>
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div className="form-group col-md-6">
                                                    <label class="dashboard-label">ZipCode</label>
                                                    <input type="text" placeholder="Enter ZipCode" value={this.state.zipcode} className="form-control" onChange={this.handleChange} id="zipcode" name='zipcode' title='Please enter 5 Digit Zipcode' />
                                                    <div id = "zipcode_error" class= "error"></div>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label class="dashboard-label">Phone Number</label>
                                                    <input type="text" placeholder="Enter Phone Number" value={this.state.phone_number} className="form-control" onChange={this.handleChange} id="phone_number" name='phone_number' title='Please enter 10 Digit Phone Number' />
                                                    <div id = "phone_number_error" class= "error"></div>
                                                </div>
                                            </div>
                                            {this.state.update ? <input type="submit" class="dashboard-form-btn btn btn-primary"
                                                value="Update Admin" required="" onClick={this.updateUser.bind(this)} /> : <input type="submit" class="dashboard-form-btn btn btn-primary"
                                                    value="Add Admin" required="" onClick={this.handleCreateUser.bind(this)} />}

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mymodal" class="modal fade">
                    <div class="modal-dialog purchase-modal">
                        <div class="modal-content">
                            <div class="modal-body">
                                <section >
                                    <div id="tqpSection" class="showtime">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-xs-12 modal-invoice-header">
                                                    <div class="text-center"><br/>
                                                        <h2 id="transaction-purchase-header"> User Details </h2>
                                                    </div>
                                                    <hr/>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-9">
                                                    <div class="panel panel-default">
                                                        <div class="panel-heading">
                                                            <h3 class="text-center summary-header"><strong> Profile </strong></h3>
                                                        </div>
                                                        <br/>
                                                        <div className='row'>
                                                            <div class="panel-body col-md-6">
                                                                <div className='container-fluid'>
                                                                    <strong> User ID : </strong>
                                                                    { this.state.UserID }
                                                                </div>
                                                                <br/>
                                                                <div className='container-fluid'>
                                                                    <strong> First Name : </strong>
                                                                    { this.state.First_Name }
                                                                </div>
                                                                <br/>
                                                                <div className='container-fluid'>
                                                                    <strong>Last Name : </strong>
                                                                    { this.state.Last_Name}
                                                                </div>
                                                                <br/>
                                                                <div className='container-fluid'>
                                                                    <strong> Email : </strong>
                                                                    { this.state.Email}
                                                                </div>
                                                                <br/>
                                                                <div className='container-fluid'>
                                                                    <strong> Phone Number : </strong>
                                                                    { this.state.Phone_Number}
                                                                </div>
                                                            </div>
                                                            <div class="panel-body col-md-6">
                                                                <div className='container-fluid'>
                                                                    <strong> Address : </strong>
                                                                    { this.state.Address}
                                                                </div>
                                                                <br/>
                                                                <div className='container-fluid'>
                                                                    <strong> City : </strong>
                                                                    { this.state.City}
                                                                </div>
                                                                <br/>
                                                                <div className='container-fluid'>
                                                                    <strong> State : </strong>
                                                                    { this.state.State }
                                                                </div>
                                                                <br/>
                                                                <div className='container-fluid'>
                                                                    <strong> Zipcode : </strong>
                                                                    { this.state.Zipcode }
                                                                </div>
                                                                <br/>
                                                                <div className='container-fluid'>
                                                                    <strong> Role Number : </strong>
                                                                    { this.state.Role_Number }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MultiplexAdmin);