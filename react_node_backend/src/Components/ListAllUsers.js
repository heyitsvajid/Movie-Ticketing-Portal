import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';
import '../assets/css/style.css'
import '../assets/css/admin.css'
import swal from "sweetalert2";
import Pagination from './Pagination';

class ListAllUsers extends Component {

    constructor() {
        super();
        this.state = {
            multiplex_admins : [],
            users: [],
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
            perPageRows: 20
        };
    }

    componentWillMount(){
        this.getAllMultiplexAdmins();
        this.getAllUsers();
        // this.getAllBillingDetails();
    }

    getAllMultiplexAdmins = () => {
       let url = envURL + 'findallmultiplexadmin';
        axios.get(url, { withCredentials : true } )
            .then((response) => {
                console.log("In Get Multiplex Admins", response.data)
                this.setState({
                    multiplex_admins : response.data.data
                }, () => {
                    console.log("Multiplex Admins Array set", this.state.multiplex_admins )
                })
            })
    };

    getAllUsers = () => {
        let url = envURL + 'getAllUsersOnly';
        axios.get( url, { withCredentials : true } )
            .then((response) => {
                console.log("In Get All Users", response.data);
                this.setState({
                    users : response.data.data
                }, () => {
                    console.log("Users Array set", this.state.users )
                })
            })
    };

    handleMultiplexAdminDetail = (e) => {
        console.log("In handleMultiplexAdminDetail, id :", e )
        let display = this.state.multiplex_admins;
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

    handleUserDetail = (e) => {
        console.log("In handleUserDetail, id :", e )
        let display = this.state.users;
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

    handleDeleteMultiplexAdmin = (e) => {
        console.log("In handleDeleteMultiplexAdmin, id :", e );

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
                this.getAllMultiplexAdmins();
            })
    };

    handleDeleteUser = (e) => {
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
    };

    // getAllBillingDetails(){
    //     let url = envURL + 'getAllBillingDetails';
    //     axios.post( url, null, {withCredentials : true} )
    //         .then( (response) => {
    //             console.log( "In Get All Billing details, Responce from DB" , response.data);
    //             this.setState({
    //                 billing_details : response.data.results.billing_information,
    //                 searchedBillingDetails: response.data.results.billing_information,
    //                 currentPage: 1
    //             }, () => {
    //                 console.log(this.state.billing_details)
    //             } )
    //         } );
    // }
    // handleDeleteBillingDetail = ( e ) => {
    //     console.log("Delete Clicked", e );
    //     let id = { id : e };
    //     let url = envURL + 'deletebillingdetail';
    //
    //     axios.post( url, id, { withCredentials : true } )
    //         .then( (response) => {
    //             console.log("After Deleting Bill, Response ", response.data);
    //             swal({
    //                 type: 'success',
    //                 title: 'Bill Detail Deleted Successfully',
    //                 text: "",
    //             });
    //             this.getAllBillingDetails();
    //         })
    // };
    //
    // handleDisplayOrder = (e) => {
    //     let billdetailsarray = this.state.billing_details;
    //     let id = e;
    //     console.log("In Display Bill ", billdetailsarray);
    //     console.log("Display BIlling Detail", e );
    //     for( let i =0 ; i < billdetailsarray.length ; i++) {
    //         if( billdetailsarray[i].id === id ) {
    //             console.log("Found Billing Details", billdetailsarray[i] );
    //             let showtime = new Date(billdetailsarray[i].show_time) ;
    //             this.setState({
    //                 adult_tickets : billdetailsarray[i].adult_tickets,
    //                 student_tickets : billdetailsarray[i].student_tickets,
    //                 child_tickets : billdetailsarray[i].child_tickets,
    //                 disabled_tickets : billdetailsarray[i].disabled_tickets,
    //                 movie_name : billdetailsarray[i].movie_name,
    //                 multiplex_address : billdetailsarray[i].multiplex_address,
    //                 amount : billdetailsarray[i].amount,
    //                 time: showtime.getHours() +' : '+ showtime.getMinutes(),
    //                 date: showtime.getDate()+' : '+parseInt(showtime.getMonth()+1)+' : '+showtime.getUTCFullYear()
    //             }, () => {
    //                 console.log(this.state);
    //             } )
    //         }
    //     }
    // };
    //
    // handleSearchBar(e){
    //     var searched_array = [];
    //     if(e.target.value != ""){
    //         if(this.state.billing_details.length > 0){
    //             for(let i = 0; i < this.state.billing_details.length; i++){
    //                 var strRegExPattern = new RegExp(e.target.value, 'i');
    //                 let list_element = this.state.billing_details[i];
    //                 const multiplex_zipcode = "" + list_element.multiplex_zipcode + "";
    //                 if(list_element.user_email.match(strRegExPattern) || list_element.movie_name.match(strRegExPattern) ||
    //                     list_element.multiplex_name.match(strRegExPattern) || multiplex_zipcode.match(strRegExPattern)
    //                     || list_element.user_name.match(strRegExPattern) ){
    //                     searched_array.push(list_element);
    //                 }
    //             }
    //             this.setState({searchedBillingDetails: searched_array, currentPage: 1})
    //         }
    //     }
    //     else{
    //         this.getAllBillingDetails();
    //     }
    // }
    //
    // handleNextPaginationButton(e) {
    //     const total_pages = this.state.searchedMovieList.length > 0 ? this.state.searchedMovieList.length/this.state.perPageRows : 0;
    //     if(this.state.searchedMovieList != [] && this.state.currentPage != Math.ceil(total_pages)){
    //         this.setState({currentPage: Number(this.state.currentPage + 1)})
    //     }
    // }
    //
    // handlePrevPaginationButton(e) {
    //     if(this.state.searchedMovieList != [] && this.state.currentPage != 1){
    //         this.setState({currentPage: Number(this.state.currentPage - 1)})
    //     }
    // }
    //
    // handlePageChange(e) {
    //     this.setState({currentPage: Number(e.target.dataset.id)})
    // }

    render() {

        let MultiplexAdmins = this.state.multiplex_admins;

        MultiplexAdmins = MultiplexAdmins.map( ( item, index ) => {

                return (
                    <tr>
                        <th scope="row"> { index + 1 } </th>
                        <td> <a href = "#mymodal" data-toggle="modal" onClick={this.handleMultiplexAdminDetail.bind(this, item.id )} > { item.id } </a> </td>
                        <td> { item.first_name } </td>
                        <td> { item.last_name } </td>
                        <td> { item.email } </td>
                        <td> { item.phone_number } </td>
                        <td>
                            <button className='btn-danger' style={{backgroundColor: '#F15500'}} onClick={this.handleDeleteMultiplexAdmin.bind(this, item.id )} > Delete </button>
                        </td>

                    </tr>

                )

        } );

        let Users = this.state.users;

        Users = Users.map( ( item, index ) => {

            return (
                <tr>
                    <th scope="row"> { index + 1 } </th>
                    <td> <a href = "#mymodal" data-toggle="modal" onClick={this.handleUserDetail.bind(this, item.id )} > { item.id } </a> </td>
                    <td> { item.first_name } </td>
                    <td> { item.last_name } </td>
                    <td> { item.email } </td>
                    <td> { item.phone_number } </td>
                    <td>
                        <button className='btn-danger' style={{backgroundColor: '#F15500'}} onClick={this.handleDeleteUser.bind(this, item.id )} > Delete </button>
                    </td>

                </tr>

            )

        } );


        return(
            <div className='AllBillingDetails container-fluid'>
                <br/>
                <br/>
                <h2>Multiplex Admins</h2>
                <hr/>

                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col"> # </th>
                        <th scope="col"> User ID </th>
                        <th scope="col"> First Name</th>
                        <th scope="col"> Last Name</th>
                        <th scope="col"> Email </th>
                        <th scope="col"> Phone Number </th>
                        <th scope="col"> Action </th>
                    </tr>
                    </thead>
                    <tbody>
                        { MultiplexAdmins }
                    </tbody>
                </table>

                <br/>
                <h2>Users</h2>
                <hr/>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col"> # </th>
                        <th scope="col"> User ID </th>
                        <th scope="col"> First Name</th>
                        <th scope="col"> Last Name</th>
                        <th scope="col"> Email </th>
                        <th scope="col"> Phone Number </th>
                        <th scope="col"> Action </th>
                    </tr>
                    </thead>
                    <tbody>
                    { Users }
                    </tbody>
                </table>

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
                                                <div class="col-md-8">
                                                    <div class="panel panel-default">
                                                        <div class="panel-heading">
                                                            <h3 class="text-center summary-header"><strong> User Profile </strong></h3>
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

export default withRouter(ListAllUsers);