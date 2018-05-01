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
            perPageRows: 20,
            allMultiplex : [],
            movie_name: null,
            movieDate: null,
            movieTime: null,
            isLoggedIn: false,
            bills: null,
            all_bills: null,
            index: 0,
            cardNumber: "00000",
            cardExpiry: "00/00",
            multiplexName: null,
            multiplexAddress: null,
            multiplexCity: null,
            multiplexZipcode: null,
            screenNumber: 0,
            bill_no: null,
            allMultiplex: {},
            adult: 0,
            child: 0,
            student: 0,
            disabled: 0,
            adult_count: 0,
            child_count: 0,
            student_count: 0,
            disabled_count: 0,
            total: 0,
            tax: 0
        };
        this.renderModal = this.renderModal.bind(this)
    }

    componentWillMount(){
        this.getAllBillingDetails();
        this.getAllMultiplex()
    }

    getAllMultiplex() {
        let findAllMultiplex = envURL + 'findAllMultiplex';
        axios.get(findAllMultiplex)
          .then(res => {
              console.log("All Multiplex Data")
            console.log(res.data.data)
            this.setState({
              allMultiplex: res.data.data
            })
          })
          .catch(err => {
            console.error(err);
          });
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




    renderModal(e) {
        e.preventDefault();
        this.state.billing_details.forEach(bill => {
    
          if (Number(e.target.id) === bill.id) {
    
            this.state.allMultiplex.forEach(multiplex => {
              multiplex.show_timings.forEach(showTime => {
                if (showTime._id === bill.show_id) {
                  this.setState({
                    adult: showTime.price.adult,
                    child: showTime.price.child,
                    student: showTime.price.student,
                    disabled: showTime.price.disabled
                  })
                }
              });
    
            });
    
    
    
            console.log(bill.screen_number);
            let getCardDetails = envURL + 'getCardDetails';
            let getShowDetails = envURL + 'getShowDetails';
            var cardTransactionNumber = { cardTransactionNumber: bill.transaction_card_id }
            axios.post(getCardDetails, cardTransactionNumber)
              .then(res => {
                this.setState({
                  movie_name: bill.movie_name,
                  movieDate: bill.show_time.split(" ")[0] + " " + bill.show_time.split(" ")[1] + " " + bill.show_time.split(" ")[2] + " " + bill.show_time.split(" ")[3],
                  movieTime: bill.show_time.split(" ")[4] + " " + bill.show_time.split(" ")[5],
                  cardNumber: "***** " + res.data.results.billing_information[0].cardNumber.slice(res.data.results.billing_information[0].cardNumber.length - 4, res.data.results.billing_information[0].cardNumber.length),
                  cardExpiry: res.data.results.billing_information[0].expiryMonth + "/" + res.data.results.billing_information[0].expiryYear,
                  multiplexName: bill.multiplex_name,
                  multiplexAddress: bill.multiplex_address,
                  multiplexCity: bill.multiplex_city,
                  multiplexZipcode: bill.multiplex_zipcode,
                  screenNumber: bill.screen_number,
                  bill_no: bill.id,
                  adult_count: bill.adult_tickets,
                  child_count: bill.child_tickets,
                  student_count: bill.student_tickets,
                  disabled_count: bill.disabled_tickets,
                  total: bill.amount,
                  tax : bill.tax
                })
              })
              .catch(err => {
                console.error(err);
              });
          }
        })
    
    
        debugger
      }


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
        const total_pages = this.state.searchedBillingDetails.length > 0 ? this.state.searchedBillingDetails.length/this.state.perPageRows : 0;
        if(this.state.searchedBillingDetails != [] && this.state.currentPage != Math.ceil(total_pages)){
          this.setState({currentPage: Number(this.state.currentPage + 1)})      
        }
      }
    
    handlePrevPaginationButton(e) {
        if(this.state.searchedBillingDetails != [] && this.state.currentPage != 1){
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
                    <td> <a href="#myModal" id={item.id} data-toggle="modal" onClick={this.renderModal}  > { item.movie_name } </a>  </td>
                    <td> { item.user_name } </td>
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
                        <th scope="col"> User Name</th>
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
                        <div class="modal-content content-width">
                            <div class="modal-body">
                                <section >
                                    <div id="tqpSection" class="showtime">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-xs-12 modal-invoice-header">
                                                    <div class="text-center">
                                                        <h2 id="transaction-purchase-header">Invoice for purchase #{this.state.bill_no}</h2>
                                                    </div>
                                                    <hr/>
                                                    <div class="row invoice-row">
                                                        <div class="col-xs-12 col-md-3 col-lg-3 pull-left">
                                                            <div class="panel panel-default height">
                                                                <div class="panel-heading box-heading">Movie and Screen</div>
                                                                <div class="panel-body billing-body">
                                                                    <strong>Movie:  </strong>
                                                                    {this.state.movie_name}<br />
                                                                    <strong>Date:   </strong>
                                                                    {this.state.movieDate}<br />
                                                                    <strong>Time:    </strong>
                                                                    {this.state.movieTime}<br />
                                                                    <strong>Auditorium:   </strong>
                                                                    {this.state.screenNumber}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-md-3 col-lg-3">
                                                            <div class="panel panel-default height">
                                                                <div class="panel-heading box-heading">Payment Information</div>
                                                                <div class="panel-body billing-body">
                                                                {/* <strong>Card Name:</strong> Visa<br/> */}
                                                                <strong>Card Number:</strong> {this.state.cardNumber}<br />
                                                                <strong>Exp Date:</strong> {this.state.cardExpiry}<br />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-md-3 col-lg-3 pull-right">
                                                            <div class="panel panel-default height">
                                                                <div class="panel-heading box-heading">Multiplex Address</div>
                                                                <div class="panel-body billing-body">
                                                                <strong>{this.state.multiplexName}</strong><br />
                                                                {this.state.multiplexAddress}<br />
                                                                {this.state.multiplexCity} <strong>{this.state.multiplexZipcode}</strong><br />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12 modal-invoice-header">
                                                    <div class="text-center">
                                                        <h2 id="transaction-purchase-header">Invoice for purchase #{this.state.bill_no}</h2>
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
                                                                <td class="text-center"><strong>Price</strong></td>
                                                                <td class="text-center"><strong>Quantity</strong></td>
                                                                <td class="text-right"><strong>Total</strong></td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                <td>Adult</td>
                                                                <td class="text-center">${(typeof this.state.adult !== "undefined" ? this.state.adult : 0).toFixed(2)}</td>
                                                                <td class="text-center">{this.state.adult_count}</td>
                                                                <td class="text-right">${((typeof this.state.adult_count !== "undefined" && typeof this.state.adult !== "undefined") ? ((this.state.adult_count) * (this.state.adult)) : 0).toFixed(2)}</td>
                                                                </tr>
                                                                <tr>
                                                                <td>Students</td>
                                                                <td class="text-center">${(typeof this.state.student !== "undefined" ? this.state.student : 0).toFixed(2)}</td>
                                                                <td class="text-center">{this.state.student_count}</td>
                                                                <td class="text-right">${((typeof this.state.student_count !== "undefined" && typeof this.state.student !== "undefined") ? ((this.state.student_count) * (this.state.student)) : 0).toFixed(2)}</td>
                                                                </tr>
                                                                <tr>
                                                                <td>Child</td>
                                                                <td class="text-center">${(typeof this.state.child !== "undefined" ? this.state.child : 0).toFixed(2)}</td>
                                                                <td class="text-center">{this.state.child_count}</td>
                                                                <td class="text-right">${((typeof this.state.child_count !== "undefined" && typeof this.state.child !== "undefined") ? ((this.state.child_count) * (this.state.child)) : 0).toFixed(2)}</td>
                                                                </tr>
                                                                <tr>
                                                                <td>Disabled</td>
                                                                <td class="text-center">${(typeof this.state.disabled !== "undefined" ? this.state.disabled : 0).toFixed(2)}</td>
                                                                <td class="text-center">{this.state.disabled_count}</td>
                                                                <td class="text-right">${((typeof this.state.disabled_count !== "undefined" && typeof this.state.disabled !== "undefined") ? ((this.state.disabled_count) * (this.state.disabled)) : 0).toFixed(2)}</td>
                                                                </tr>
                                                                <tr>
                                                                <td class="emptyrow"></td>
                                                                <td class="emptyrow"></td>
                                                                <td class="emptyrow text-center"><strong>Convenience Fee</strong></td>
                                                                <td class="emptyrow text-right">${this.state.tax.toFixed(2)}</td>
                                                                </tr>
                                                                <tr>
                                                                <td class="emptyrow"></td>
                                                                <td class="emptyrow"></td>
                                                                <td class="emptyrow text-center"><strong>Total</strong></td>
                                                                <td class="emptyrow text-right">${(this.state.total).toFixed(2)}</td>
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
