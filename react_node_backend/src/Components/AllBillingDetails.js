import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';
import '../assets/css/style.css'
import '../assets/css/admin.css'
import swal from "sweetalert2";

class AllBillingDetails extends Component {

    constructor() {
        super();
        this.state = {
            billing_details : [],
            adult_tickets : '',
            student_tickets : '',
            child_tickets : '',
            disabled_tickets : '',
            priceof_adult_tickets : '',
            priceof_student_tickets: '',
            priceof_child_tickets : '',
            priceof_disabled_tickets : ''
        };
    }

    componentWillMount(){
        let url = envURL + 'getAllBillingDetails';
        axios.post( url, null, {withCredentials : true} )
            .then( (response) => {
                console.log( "In Get All Billing details, Responce from DB" , response.data);
                this.setState({
                    billing_details : response.data.results.billing_information
                }, () => {
                    console.log(this.state.billing_details)
                } )
            } )
    }

    handleDeleteBillingDetail = ( e ) => {
        // e.preventDefault();
        console.log("Delete Clicked", e );
        let id = { id : e };
        let url = envURL + 'deletebillingdetail';
        axios.post( url, id, { withCredentials : true } )
            .then( (response) => {
                console.log("After Deleting Bill, Response ", response.data);
                swal({
                    type: 'success',
                    title: 'Bill Detail Deleted Successfully',
                    text: "",
                });
                window.location.reload(true)
            })
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

    render() {

        let billingdetailsArray = this.state.billing_details.map( (item, index) => {

            let number_of_tickets = item.adult_tickets + item.child_tickets + item.disabled_tickets + item.student_tickets  ;

            return (
                <tr>
                    <th scope="row"> {index + 1} </th>
                    <td> <a href="#myModal" data-toggle="modal" onClick={this.handleDisplayOrder.bind(this, item.id )} > { item.movie_name } </a>  </td>
                    <td> { item.multiplex_name } </td>
                    <td> { item.booking_date } </td>
                    <td> { number_of_tickets } </td>
                    <td>
                        <button className='btn-danger' onClick={this.handleDeleteBillingDetail.bind(this, item.id)} > Delete </button>
                    </td>

                </tr>

            )
        } );

        return(
            <div className='AllBillingDetails container-fluid'>
                <br/>
                <h1> Billing Details </h1>
                <hr/>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col"> Movie Name</th>
                        <th scope="col"> Multiplex Name</th>
                        <th scope="col"> Booking Date</th>
                        <th scope="col"> Number of Tickets</th>
                        <th scope="col"> Delete </th>
                    </tr>
                    </thead>
                    <tbody>
                        {billingdetailsArray}
                    </tbody>
                </table>

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