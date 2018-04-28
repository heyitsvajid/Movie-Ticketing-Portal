import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
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
            First_Name : '',
            Last_Name : '',
            Email : '',
            Phone_Number : '',
            Address : '',
            City : '',
            State : '',
            Zipcode : '',
            Role_Number : '',
            currentPage: 1,
            perPageRows: 5,
            allUserSessionDetails: [],
            currentSessionUserId: "",
            sessionOptions: [],
            currentSessionObject: [],
            finalGraphData: []
        };
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
                this.setState({
                    users : response.data.data,
                    searchedUsers: response.data.data,
                    currentPage: 1
                }, () => {
                    console.log("Users Array set", this.state.users )
                })
            })
    };

    // handleUserDetail = (e) => {
    //     console.log("In handleUserDetail, id :", e )
    //     let display = this.state.users;
    //     for( let i = 0; i < display.length; i++) {
    //         if( display[i].id === e ) {
    //             console.log("Found Match", display[i] );
    //             this.setState({
    //                 UserID : display[i].id,
    //                 First_Name : display[i].first_name,
    //                 Last_Name : display[i].last_name,
    //                 Email : display[i].email,
    //                 Phone_Number : display[i].phone_number,
    //                 Address : display[i].address,
    //                 City : display[i].city,
    //                 State : display[i].state,
    //                 Zipcode : display[i].zipcode,
    //                 Role_Number : display[i].role_number
    //             })
    //         }
    //     }
    // };

    

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
                    <h3>Graph</h3>
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
                            <ComposedChart width={1000} height={400} data={this.state.finalGraphData}>
                                <XAxis label={{ value: "Page Visited", position: 'insideLeft'}} dataKey="page" />
                                <YAxis label={{ value: "Time Spent on Page(sec)", angle: -90, position: 'insideLeft' }}/>
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area type="monotone" dataKey="time" fill="#8884d8" stroke="#8884d8" />
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
                        <button className='btn-danger' style={{backgroundColor: '#F15500'}} onClick={this.handleDeleteUser.bind(this, item.id )} > Delete </button>
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
                
            </div>
        );
    }
}

export default withRouter(ListAllUsers);