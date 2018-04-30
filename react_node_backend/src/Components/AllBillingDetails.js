import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';
import '../assets/css/style.css'
import '../assets/css/admin.css'
import swal from "sweetalert";
import Pagination from './Pagination';

class AllBillingDetails extends Component {

    constructor() {
        super();
        this.state = {
            billing_details : [],
            searchedBillingDetails: [],
            adult_tickets : '',
            student_tickets : '',
            child_tickets : '',
            disabled_tickets : '',
            priceof_adult_tickets : '',
            priceof_student_tickets: '',
            priceof_child_tickets : '',
            priceof_disabled_tickets : '',
            currentPage: 1, 
            perPageRows: 20
        };
    }

    componentWillMount(){
        this.getAllBillingDetails();
    }

    getAllBillingDetails(){
        let url = envURL + 'getAllBillingDetails';
        axios.post( url, null, {withCredentials : true} )
        .then( (response) => {
            console.log( "In Get All Billing details, Responce from DB" , response.data);
            this.setState({
                billing_details : response.data.results.billing_information,
                searchedBillingDetails: response.data.results.billing_information,
                currentPage: 1
            }, () => {
                console.log(this.state.billing_details)
            } )
        } );
    }

    handleDeleteBillingDetail = ( e ) => {
        console.log("Delete Clicked", e );


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
                    let url = envURL + 'deletebillingdetail';
                    axios.post( url, id, { withCredentials : true } )
                        .then( (response) => {
                            console.log("After Deleting Bill, Response ", response.data);
                            swal({
                                type: 'success',
                                title: "Bill Detail Deleted Successfully",
                                text: "",
                                icon: "success",
                                buttons: true,
                            });
                            this.getAllBillingDetails();
                        }
                    )
                }
            }
        );


    };

    handleDisplayOrder = (e) => {
        let billdetailsarray = this.state.billing_details;
        let id = e;
        console.log("In Display Bill ", billdetailsarray);
        console.log("Display BIlling Detail", e );
        for( let i =0 ; i < billdetailsarray.length ; i++) {
            if( billdetailsarray[i].id === id ) {
                console.log("Found Billing Details", billdetailsarray[i] );
                let showtime = new Date(billdetailsarray[i].show_time) ;
                this.setState({
                    adult_tickets : billdetailsarray[i].adult_tickets,
                    student_tickets : billdetailsarray[i].student_tickets,
                    child_tickets : billdetailsarray[i].child_tickets,
                    disabled_tickets : billdetailsarray[i].disabled_tickets,
                    movie_name : billdetailsarray[i].movie_name,
                    multiplex_address : billdetailsarray[i].multiplex_address,
                    amount : billdetailsarray[i].amount,
                    time: showtime.getHours() +' : '+ showtime.getMinutes(),
                    date: showtime.getDate()+' : '+parseInt(showtime.getMonth()+1)+' : '+showtime.getUTCFullYear()
                }, () => {
                    console.log(this.state);
                } )
            }
        }
    };

    handleSearchBar(e){
        var searched_array = [];
        if(e.target.value != ""){
          if(this.state.billing_details.length > 0){
              for(let i = 0; i < this.state.billing_details.length; i++){
                var strRegExPattern = new RegExp(e.target.value, 'i');
                let list_element = this.state.billing_details[i];
                const multiplex_zipcode = "" + list_element.multiplex_zipcode + "";
                if(list_element.user_email.match(strRegExPattern) || list_element.movie_name.match(strRegExPattern) || 
                list_element.multiplex_name.match(strRegExPattern) || multiplex_zipcode.match(strRegExPattern)
                || list_element.user_name.match(strRegExPattern) || this.checkDate(strRegExPattern, list_element.booking_date)){
                    searched_array.push(list_element);
                }
              }
              this.setState({searchedBillingDetails: searched_array, currentPage: 1})
          }
        }
        else{
          this.getAllBillingDetails();
        }
    }

    checkDate(regex, booking_date){
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        var date = new Date(booking_date);
        var month_name = monthNames[date.getMonth()];
        var year = date.getFullYear().toString();
        if(year.match(regex) || month_name.match(regex)){ return true };
        return false;
    }

    handleNextPaginationButton(e) {
        const total_pages = this.state.searchedMovieList.length > 0 ? this.state.searchedMovieList.length/this.state.perPageRows : 0;
        if(this.state.searchedMovieList != [] && this.state.currentPage != Math.ceil(total_pages)){
          this.setState({currentPage: Number(this.state.currentPage + 1)})      
        }
      }
    
    handlePrevPaginationButton(e) {
        if(this.state.searchedMovieList != [] && this.state.currentPage != 1){
            this.setState({currentPage: Number(this.state.currentPage - 1)})
        }
    }

    handlePageChange(e) {
        this.setState({currentPage: Number(e.target.dataset.id)})
    }

    render() {
        let pagination_list, currentTodos=null;
        if(this.state.searchedBillingDetails != []){
            const indexOfLastTodo = this.state.currentPage * this.state.perPageRows;
            const indexOfFirstTodo = indexOfLastTodo - this.state.perPageRows;
            currentTodos = this.state.searchedBillingDetails.slice(indexOfFirstTodo, indexOfLastTodo);
            const total_pages = this.state.searchedBillingDetails.length > 0 ? this.state.searchedBillingDetails.length/this.state.perPageRows : 0;
            const page_numbers = [];
            for (let i = 1; i <= Math.ceil(this.state.searchedBillingDetails.length / this.state.perPageRows); i++) {
                page_numbers.push(i);
            }  
            pagination_list = page_numbers.map(number => {
                return (
                <li class="page-item" key= {number} data-id={number} onClick={this.handlePageChange.bind(this)}  ><a data-id={number} class="page-link" href="#">{number}</a></li>
                );
            });
            for(let i = 0; i< currentTodos.length; i++) {
                currentTodos[i].current_index = indexOfFirstTodo + i + 1;
            }
        }
        let billingdetailsArray = currentTodos.map( (item, index) => {

            let number_of_tickets = item.adult_tickets + item.child_tickets + item.disabled_tickets + item.student_tickets  ;

            return (
                <tr>
                    <th scope="row"> {item.current_index} </th>
                    <td> <a href="#myModal" data-toggle="modal" onClick={this.handleDisplayOrder.bind(this, item.id )} > { item.movie_name } </a>  </td>
                    <td> { item.multiplex_name } </td>
                    <td> { item.booking_date } </td>
                    <td> { number_of_tickets } </td>
                    <td>
                        <button className='btn-danger' style={{backgroundColor: '#F15500'}} onClick={this.handleDeleteBillingDetail.bind(this, item.id)} > Delete </button>
                    </td>

                </tr>

            )
        } );

        return(
            <div className='AllBillingDetails container-fluid'>
                <div class="row">
                    <div class="col-lg-2">
                    <h4 class="c-grey-900 mB-20">Billing Details</h4>
                    </div>
                    <div class="col-lg-10">
                    <div id = "search_bar">
                        <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search Movie By Name" onChange={this.handleSearchBar.bind(this)}/>
                        </div>
                    </div>
                    </div>
                </div>
                <hr/>

                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col"> Movie Name</th>
                        <th scope="col"> Multiplex Name</th>
                        <th scope="col"> Booking Date</th>
                        <th scope="col"> Number of Tickets</th>
                        <th scope="col"> Action </th>
                    </tr>
                    </thead>
                    <tbody>
                        {billingdetailsArray}
                    </tbody>
                </table>
                <Pagination handlePrevPaginationButton = {this.handlePrevPaginationButton.bind(this)} handleNextPaginationButton = {this.handleNextPaginationButton.bind(this)}
                        handlePageChange = {this.handlePageChange.bind(this)} pagination_list = {pagination_list}/>
                <div id="myModal" class="modal fade">
                    <div class="modal-dialog purchase-modal">
                        <div class="modal-content">
                            <div class="modal-body">
                                <section >
                                    <div id="tqpSection" class="showtime">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-xs-12 modal-invoice-header">
                                                    <div class="text-center">
                                                        <h2 id="transaction-purchase-header">Invoice for purchase #33221</h2>
                                                    </div>
                                                    <hr/>
                                                    <div class="row invoice-row">
                                                        <div class="col-xs-12 col-md-3 col-lg-3 pull-left">
                                                            <div class="panel panel-default height">
                                                                <div class="panel-heading box-heading">Movie and Screen</div>
                                                                <div class="panel-body billing-body">
                                                                    <strong>Movie:  </strong>
                                                                    { this.state.movie_name } <br/>
                                                                    <strong>Date:   </strong>
                                                                    { this.state.date } <br/>
                                                                    <strong>Time:    </strong>
                                                                    { this.state.time } <br/>
                                                                    <strong>Auditorium:   </strong>
                                                                    Hard-Coded
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-md-3 col-lg-3">
                                                            <div class="panel panel-default height">
                                                                <div class="panel-heading box-heading">Payment Information Hard-Coded</div>
                                                                <div class="panel-body billing-body">
                                                                    <strong>Card Name:</strong> Visa<br/>
                                                                    <strong>Card Number:</strong> ***** 332<br/>
                                                                    <strong>Exp Date:</strong> 09/2020<br/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-md-3 col-lg-3 pull-right">
                                                            <div class="panel panel-default height">
                                                                <div class="panel-heading box-heading">Multiplex Address</div>
                                                                <div class="panel-body billing-body">
                                                                    <p> { this.state.multiplex_address } </p> <br/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12 modal-invoice-header">
                                                    <div class="text-center">
                                                        <h2 id="transaction-purchase-header">Invoice for purchase #</h2>
                                                    </div>
                                                    <hr/>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-8">
                                                    <div class="panel panel-default">
                                                        <div class="panel-heading">
                                                            <h3 class="text-center summary-header"><strong>Order summary</strong></h3>
                                                        </div>
                                                        <div class="panel-body">
                                                            <div class="table-responsive">
                                                                <table class="table table-condensed">
                                                                    <thead>
                                                                    <tr>
                                                                        <td><strong>Ticket Type</strong></td>
                                                                        <td class="text-center"><strong>Quantity</strong></td>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>Adult</td>
                                                                        <td class="text-center"> { this.state.adult_tickets } </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Students</td>
                                                                        <td class="text-center"> { this.state.student_tickets } </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Child</td>
                                                                        <td class="text-center"> { this.state.child_tickets } </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Disabled</td>
                                                                        <td class="text-center"> { this.state.child_tickets } </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="emptyrow"></td>
                                                                        <td class="emptyrow"></td>
                                                                        <td class="emptyrow text-center"><strong>Total</strong></td>
                                                                        <td class="emptyrow text-right"> { this.state.amount } </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
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

export default withRouter(AllBillingDetails);