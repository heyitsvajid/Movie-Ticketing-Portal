import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios'
import { post } from 'axios';
import { envURL, reactURL } from '../config/environment';
import '../assets/css/style.css'
import '../assets/css/admin.css'
import swal from "sweetalert";
import Pagination from './Pagination';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, Line, AreaChart, LineChart} from 'recharts';

class ListAllUsers extends Component {

    constructor() {
        super();
        this.state = {
            multiplex_admins : [],
            users: [],
            searchedUsers: [],
            UserID : '',
            first_name : '',
            last_name : '',
            email : '',
            phone_number : '',
            address : '',
            city : '',
            state_name : 'AL',
            zipcode : '',
            Role_Number : '',
            currentPage: 1,
            perPageRows: 5,
            allUserSessionDetails: [],
            currentSessionUserId: "",
            sessionOptions: [],
            currentSessionObject: [],
            finalGraphData: [],
            update_id: 0,
            update: false,
        };
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
        document.getElementById(e.target.name + "_error").innerHTML = "";
        console.log(this.state)
    }

    componentWillMount(){
        this.getAllUsers();
        this.loadSessionAnalytics();
    }

    loadSessionAnalytics(){
        let findAllSessionDetails = envURL + 'getAllSessionDetails';
        axios.get(findAllSessionDetails)
            .then(res => {
                if (res.data.successMsg != '') {
                    console.log('Fetching all SessionDetails');
                    console.log(res.data.data);
                     this.setState({allUserSessionDetails: res.data.data})
                } else {
                    console.error('Error Fetching all movie');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }    
    
    getAllUsers = () => {
        let url = envURL + 'getAllUsersOnly';
        axios.get( url, { withCredentials : true } )
            .then((response) => {
                console.log("In Get All Users", response.data);
                debugger
                this.setState({
                    users : response.data.data,
                    searchedUsers: response.data.data,
                    currentPage: 1
                }, () => {
                    console.log("Users Array set", this.state.users )
                })
            })
    };

    updateUser(e) {
        e ? e.preventDefault() : ''
        // if (!this.state.name || !this.state.address || !this.state.state_name || !this.state.city || !this.state.zipcode
        //     || !this.state.multiplex_owner_id || !this.state.amenities || !this.state.screens.length > 0 || !this.state.file) {
        //     swal({
        //         type: 'error',
        //         title: 'Add Multiplex',
        //         text: 'Provide all fields.',
        //     })
        //     return;
        // }
        // if (!String(this.state.zipcode).match(/(^\d{5}$)|(^\d{5}-\d{4}$)/i)) {
        //     swal({
        //         type: 'error',
        //         title: 'Add Multiplex',
        //         text: 'Invalid Zipcode',
        //     })
        //     return;
        // }
        // if (!(String(this.state.contact_number).length == 10)) {
        //     swal({
        //         type: 'error',
        //         title: 'Add Multiplex',
        //         text: 'Invalid Contact Number',
        //     })
        //     return;
        // }

        let firstNameErrorPresent = !this.validateFirstNameFormat(this.state.first_name) ? true : false;
        let emailErrorPresent = !this.validateEmailFormat(this.state.email) ? true : false;
        let zipcodeErrorPresent = !this.validateZipcodeFormat(this.state.zipcode) ? true : false;
        let phoneNumberErrorPresent = !this.validatePhoneNumberFormat(this.state.phone_number) ? true : false;

        if(firstNameErrorPresent || emailErrorPresent || zipcodeErrorPresent || phoneNumberErrorPresent){ return; }

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
                                    phone: '',
                                    address: ''
                                })
                                this.getAllUsers();
                                swal( "Profile Updated Successfully!", "", "success" );
                                document.getElementById("user-update").style.display = "none";
                            })
                        }
                    )
            }
        })
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

    validatePhoneNumberFormat(contact_no){
        const regex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
        debugger
        if(contact_no==""){
            return true;
        }
        else if(!regex.test(String(contact_no).toLowerCase())){
          document.getElementById("phone_number_error").innerHTML = "Please enter valid Contact Number";
          return false;
        }
        return true;
      }

    validateZipcodeFormat(zipcode){
        const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        if(zipcode==""){
            return true;
        }
        else if(!regex.test(String(zipcode).toLowerCase())){
          document.getElementById("zipcode_error").innerHTML = "Please enter valid Zipcode";
          return false;
        }
        return true;
    }    
  
    validateFirstNameFormat(first_name){
        if(first_name.trim() == ""){
          document.getElementById("first_name_error").innerHTML = "Please enter first name";
          return false;
        }
        return true;
    }
    
    handleDeleteUser = (e) => {
        swal({
            title: "Are you sure?",
            text: "We regret leaving you!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    console.log("In handleDeleteUser, id :", e );
                    let id = { id : e };
                    let url = envURL + 'disableaccount';
                    axios.post( url, id, { withCredentials : true } )
                    .then( (response) => {
                        console.log("After Deleting Bill, Response ", response.data);
                        swal({
                            type: 'success',
                            title: 'User Deleted Successfully',
                            text: "",
                        });
                        this.getAllUsers();
                    })
                }
            });
    };
    
    handleNextPaginationButton(e) {
        const total_pages = this.state.searchedUsers.length > 0 ? this.state.searchedUsers.length/this.state.perPageRows : 0;
        if(this.state.searchedUsers != [] && this.state.currentPage != Math.ceil(total_pages)){
            this.setState({currentPage: Number(this.state.currentPage + 1)})
        }
    }
    
    handlePrevPaginationButton(e) {
        if(this.state.searchedUsers != [] && this.state.currentPage != 1){
            this.setState({currentPage: Number(this.state.currentPage - 1)})
        }
    }
    
    handlePageChange(e) {
        this.setState({currentPage: Number(e.target.dataset.id)})
    }

    handleSearchBar(e){
        var searched_array = [];
        if(e.target.value != ""){
          if(this.state.users.length > 0){
              for(let i = 0; i < this.state.users.length; i++){
                var strRegExPattern = new RegExp(e.target.value, 'i');
                let list_element = this.state.users[i]
                if(list_element.first_name.match(strRegExPattern) || list_element.email.match(strRegExPattern)){
                    searched_array.push(list_element);
                }
              }
              this.setState({searchedUsers: searched_array, currentPage: 1})
          }
        }
        else{
          this.getAllUsers();
        }
    }

    setGraphData(e){
        let finalData=[]
        var session = this.state.currentSessionObject.session[e.target.value]

        session.pages.forEach((element,index) => {
            finalData.push({
                page:session.pages[index],
                time:parseInt(session.pageTime[index])/1000 
            });     
        });
        this.setState({finalGraphData: finalData});
    }

    getSessionChart(){
        if(this.state.currentSessionUserId != ""){
            return(
                <div>
                    <h3>Session Graph</h3>
                    <hr />
                    <div class="row gap-20 masonry pos-r" style={{position: 'relative', height: '800px'}}>
                        <div class="masonry-item col-md-12" style={{position: 'absolute', top: '0px'}}>
                            <div class="user-session-graph bgc-white p-20 bd">
                                <div class="mT-30">
                                    <div className="form-group">
                                        <label class="dashboard-label">User Session</label>
                                        <br/>
                                        <select id = "select-session" class="form-control col-sm-5"
                                                    name="mpaa_ratings" onChange = {this.setGraphData.bind(this)}>
                                            <option value="#" disabled selected>Select Session</option>
                                            {
                                                this.state.currentSessionObject.session.map(function (s, index) {
                                                    return <option key={index}
                                                        value={index}>{"Session on " + new Date(s.date_added)}</option>;
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <h3  style={ {marginLeft : 295}}>Pages Visited By User in a Session</h3>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            <ComposedChart width={1000} height={400} data={this.state.finalGraphData}>
                                <XAxis label={{ position: 'insideLeft'}} dataKey="page" />
                                <YAxis label={{ value: "Time Spent on Page(sec)", angle: -90, position: 'insideLeft' }}/>
                                <Tooltip />

                                <defs>
                                    <linearGradient id="colorUv6" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="30%" stopColor="#8884d8" stopOpacity={0.9}/>
                                        <stop offset="70%" stopColor="#8884d8" stopOpacity={0.5}/>
                                    </linearGradient>

                                </defs>

                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area type="monotone" dataKey="time" fill="url(#colorUv6)" stroke="#8884d8" />
                            </ComposedChart>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
        
        
        
    }

    handleShowUserSessionGraph(e){
        e.preventDefault();
        this.setState( {currentSessionObject: {session:[]}});
        console.log(this.state.allUserSessionDetails);
        var user_id = e.target.dataset.userid;
        this.state.allUserSessionDetails.forEach(element => {
            if(element.user_id == e.target.dataset.userid){
                this.setState({currentSessionObject: element},() =>{
                    this.setState({currentSessionUserId: user_id});
                });
                return;
            }
        });
        this.setState({finalGraphData: []});
        if(document.getElementById("select-session") != null){
            document.getElementById("select-session").value = "#";
        }
    }

    handleUserUpdate(e) {
        e ? e.preventDefault() : ''
        this.state.users.forEach(element => {
            if (element.id == e.target.id) {
                document.getElementById("user-update").style.display = 'block';
                debugger
                this.setState({
                    update_id: e.target.id,
                    first_name: element.first_name,
                    last_name: element.last_name,
                    email: element.email,
                    city: element.city,
                    state_name: element.state,
                    zipcode: element.zipcode,
                    phone_number: element.phone_number,
                    address: element.address
                })
                return;
            }
        });

    }

    handleCancel(e){
        document.getElementById("user-update").style.display = "none";
    }

    returnUserList() {
        let pagination_list, currentTodos=null;
        if(this.state.searchedUsers != []){
            const indexOfLastTodo = this.state.currentPage * this.state.perPageRows;
            const indexOfFirstTodo = indexOfLastTodo - this.state.perPageRows;
            currentTodos = this.state.searchedUsers.slice(indexOfFirstTodo, indexOfLastTodo);
            const total_pages = this.state.searchedUsers.length > 0 ? this.state.searchedUsers.length/this.state.perPageRows : 0;
            const page_numbers = [];
            for (let i = 1; i <= Math.ceil(this.state.searchedUsers.length / this.state.perPageRows); i++) {
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
                <tr>
                    <th scope="row"> { item.current_index } </th>
                    <td> <a href = "" data-userId = {item.id} onClick={this.handleShowUserSessionGraph.bind(this)} > { item.first_name } </a> </td>
                    <td> { item.last_name } </td>
                    <td> { item.email } </td>
                    
                    <td>
                        <div class="row">
                            <div className="form-group col-md-2.5">
                                <input type="button" id={item.id} class="dashboard-form-btn link-style nav-link btn-info action-link"
                                    value="Update" required=""  onClick={this.handleUserUpdate.bind(this)} />
                            </div>

                            <div className="form-group col-md-2">
                                <button className='btn-danger' style={{backgroundColor: '#F15500'}} onClick={this.handleDeleteUser.bind(this, item.id )} > Delete </button>
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
            <div className='AllBillingDetails container-fluid'>
                <br/>
                <div class="row">
                    <div class="col-lg-2">
                    <h4 class="c-grey-900 mB-20">All Users</h4>
                    </div>
                    <div class="col-lg-10">
                    <div id = "search_bar">
                        <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search User By Name or Email" onChange = {this.handleSearchBar.bind(this)}/>
                        </div>
                    </div>
                    </div>
                </div>
                <hr/>

                {this.returnUserList()}
                <hr/>
                {this.getSessionChart()}
                <hr class='mt-5 mb-5' />
                <div id = "user-update">
                    <h3>Update User</h3>
                    <hr />


                    <div class="row gap-20 masonry pos-r" style={{position: 'relative', height: '606px'}}>
                        <div class="masonry-item col-md-6" style={{position: 'absolute', top: '0px'}}>
                            <div class="bgc-white p-20 bd">
                                <div class="mT-30">
                                    <form id="dashboard-form" className='form-multiplexadmin'>

                                        <div class="form-row">
                                            <div className="form-group col-md-6">
                                                <label class="dashboard-label">First Name</label>
                                                <input type="text" onChange={this.handleChange} value = {this.state.first_name} placeholder="Enter First Name" className="form-control" id="first_name" name='first_name' pattern='[A-Za-z]*' title='Please enter valid name' />
                                                <div id = "first_name_error" class= "error"></div>
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label class="dashboard-label">Last Name</label>
                                                <input type="text" onChange={this.handleChange} value = {this.state.last_name} placeholder="Enter Last Name" className="form-control" id="last_name" name='last_name' pattern='[A-Za-z]*' title='Please enter valid name' />
                                                <div id = "last_name_error" class= "error"></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label class="dashboard-label">Email</label>
                                            <input type="text" placeholder="Enter Email" value = {this.state.email} onChange={this.handleChange} className="form-control" id="email" name='email' />
                                            <div id = "email_error" class= "error"></div>
                                        </div>
                                        {/* <div className="form-group">
                                            <label class="dashboard-label">Password</label>
                                            <input type="password" placeholder="Enter Password" value = {this.state.first_name} className="form-control" onChange={this.handleChange} id="pwd" name='password' />
                                            <div id = "password_error" class= "error"></div>
                                        </div> */}
                                        <div className="form-group">
                                            <label class="dashboard-label">Address</label>
                                            <input type="text" placeholder="Enter Address"  value = {this.state.address} className="form-control" onChange={this.handleChange} id="address" name='address' />
                                            <div id = "address_error" class= "error"></div>
                                        </div>
                                        <div class="form-row">
                                            <div className="form-group col-md-6">
                                                <label class="dashboard-label">City</label>
                                                <input type="text" placeholder="Enter City"  value = {this.state.city} className="form-control" onChange={this.handleChange} id="city" name='city' pattern='[A-Za-z]+[\s]*[A-Za-z]*' title='Please enter valid city' />
                                                <div id = "city_error" class= "error"></div>
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label class="dashboard-label">State</label>
                                                <select class="form-control" onChange={this.handleChange} id="state" name='state_name' >
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
                                                <input value = {this.state.zipcode} type="text" placeholder="Enter ZipCode" className="form-control" onChange={this.handleChange} id="zipcode" name='zipcode' title='Please enter 5 Digit Zipcode' />
                                                <div id = "zipcode_error" class= "error"></div>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label class="dashboard-label">Phone Number</label>
                                                <input value = {this.state.phone_number} type="text" placeholder="Enter Phone Number" className="form-control" onChange={this.handleChange} id="phone_number" name='phone_number' title='Please enter 10 Digit Phone Number' />
                                                <div id = "phone_number_error" class= "error"></div>
                                            </div>
                                        </div>

                                        {/* <div className="form-group">
                                            <label class="dashboard-label">Multiplex Logo</label>
                                            <input id="file-upload" type="file" onChange={ this._handleChangeFile.bind(this) } />
                                            <div id = "file_error" class= "error"></div>
                                        </div> */}

                                        <div class="form-row">
                                            <div className="form-group col-md-3">
                                            <input type="submit" class="dashboard-form-btn btn btn-primary"
                                            value="Update User" required="" onClick={this.updateUser.bind(this)} /> 
                                            </div>

                                            <div className="form-group col-md-3">
                                                <input type="reset" class="dashboard-form-btn btn btn-default" value="Cancel" onClick = {this.handleCancel.bind(this)} />
                                            </div>
                                        </div>
                                    
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default withRouter(ListAllUsers);