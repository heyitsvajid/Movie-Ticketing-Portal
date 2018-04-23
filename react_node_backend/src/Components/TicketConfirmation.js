import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import EndFooter from './EndFooter';
import { Link } from 'react-router-dom';
import LatestMovies from './LatestMovies';
import MovieSlider from './MovieSlider';
import { envURL, reactURL } from '../config/environment';
import axios from 'axios';


// import '../assets/css/ticketbooking.css'


class TicketConfirmation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      multiplex: {},
      show: {},
      movie:{},
      price:{adult:0,student:0,disabled:0,child:0},
      a_tickets: 0,
      s_tickets: 0,
      sc_tickets: 0,
      c_tickets: 0,
      adult_total_amount: "$0.00",
      student_total_amount: "$0.00",
      child_total_amount: "$0.00",
      sc_total_amount: "$0.00"
    };
  }

  handlePrint(e){
    window.print();
  }

  // componentWillMount() {
  //   let findMultiplexByIdAPI = envURL + 'findMultiplexById';
  //   var multiplexId = localStorage.getItem('bookMultiplexId')
  //   var showId = localStorage.getItem('bookShowId');
  //   localStorage.removeItem('bookShowId');
  //   localStorage.removeItem('bookMultiplexId');

  //   if (multiplexId && showId) {
  //     var payload = {
  //       _id: multiplexId
  //     }
  //     axios.post(findMultiplexByIdAPI, payload)
  //       .then(res => {
  //         if (res.data.successMsg != '') {
  //           console.log('Fetching multiplex by id');
  //           console.log(res.data.data);
  //           this.setState({
  //             multiplex: res.data.data ? res.data.data : {}
  //           })
  //           var multiplex = res.data.data;
  //           multiplex.show_timings.forEach(element => {
  //               if(showId == element._id){
  //                 this.setState({
  //                   show:element,
  //                   movie:element.movie,
  //                   price:element.price
  //                 },()=>{
  //                   console.log(this.state)
  //                   this.setAddressAndScreen(this.state.show.screen_number)
  //                   return;
  //                 })
  //               }
  //           });
  //         } else {
  //           console.error('Error Fetching all multiplex');
  //         }
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });

  //   } else {
  //     this.props.history.push('/movies')
  //   }

  // }

  handleAdultTicketChange(e) {
    var currentTickets = e.target.value == "" ? 0 : parseInt(e.target.value);
    var calculatedPrice = "$" + (currentTickets * 10).toFixed(2);
    this.setState({ a_tickets: currentTickets, adult_total_amount: calculatedPrice })
  }

  handleStudentTicketChange(e) {
    var currentTickets = e.target.value == "" ? 0 : parseInt(e.target.value);
    var calculatedPrice = "$" + (currentTickets * 5).toFixed(2);
    this.setState({ s_tickets: currentTickets, student_total_amount: calculatedPrice })
  }

  handleSeniorTicketChange(e) {
    var currentTickets = e.target.value == "" ? 0 : parseInt(e.target.value);
    var calculatedPrice = "$" + (currentTickets * 5).toFixed(2);
    this.setState({ sc_tickets: currentTickets, sc_total_amount: calculatedPrice })
  }

  handleChildTicketChange(e) {
    var currentTickets = e.target.value == "" ? 0 : parseInt(e.target.value);
    var calculatedPrice = "$" + (currentTickets * 5).toFixed(2);
    this.setState({ c_tickets: currentTickets, child_total_amount: calculatedPrice })
  }

  render() {
    return (
      <div class="ticketBoxoffice">
        <div id="siteContainer">
          <div id="headerContainer" class="purchase detail on-order" name="HeaderContainer">
            <div class="commonContainer">
              <div id="memberGreeting">Congratulations, You've got the movie tickets!</div>
            </div>

            <div id="headerPurchase">
              <div class="commonContainer">
                <div id="logo">
                  <a href='http://www.fandango.com/' title='Click to go to Fandango homepage'>Fandango Home</a>
                </div>
              </div>
            </div>
          </div>
          <div id="container" class="commonContainer">
            <div class="row">
              <div id="heading" class="main ">
                <h1 class="section-header inline inline heading-style-stub heading-style-1 heading-size-l section-header" >Confirmation</h1>
                <ul class="breadcrumb">
                  <li class="tickets complete"><i class="icon"></i>Tickets</li>
                  <li class="payment complete"><i class="icon"></i>Payment</li>
                  <li class="confirmation complete"><i class="icon"></i>Confirmation</li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="main billing_summary" style={{width: "auto !important"}}>
                <div class="module-standard">
                  <section class="confirm-box">
                    <section>
                      <div id="tqpSection" class="showtime">
                        <h2 class="header-secondary tickets-h2">THANK YOU FOR YOUR PURCHASE. YOUR CONFIRMATION HAS BEEN EMAILED TO YOU.</h2>
                        <h2 class="header-secondary tickets-h2">CONFIRMATION #1221121212</h2>
                        

                      </div>
                    </section>

                  
                  
                  </section>


                  <section class="confirm-box">
                    <section>
                      <div id="tqpSection" class="showtime">
                      <h2 class="header-secondary tickets-h2">TO PICK UP YOUR TICKETS WITH YOUR CREDIT CARD:</h2>
                      <ol class = "confirm-list">
                        <li>1. Take your Visa credit card to the theater.</li>
                        <li>2. Avoid the box office line! Retrieve your tickets from the kiosk located Box Office.</li>
                        <li>3. Enjoy the show!</li>
                      </ol>
                      </div>
                    </section>                 
                  </section>

                  <section >
                    <div id="tqpSection" class="showtime">
                    <div class="container">
                      <div class="row">
                          <div class="col-xs-12">
                              <div class="text-center">
                                  <h2 id="purchase-header">Invoice for purchase #33221</h2>
                              </div>
                              <hr/>
                              <div class="row">
                                  <div class="col-xs-12 col-md-3 col-lg-3 pull-left">
                                      <div class="panel panel-default height">
                                          <div class="panel-heading box-heading">Movie and Screen</div>
                                          <div class="panel-body billing-body">
                                              <strong>Movie:  </strong>
                                              Avengers<br/>
                                              <strong>Date:   </strong>
                                              March 28, 2017<br/>
                                              <strong>Time:    </strong>
                                              3:00 P.M<br/>
                                              <strong>Auditorium:   </strong>
                                              6
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col-xs-12 col-md-3 col-lg-3">
                                      <div class="panel panel-default height">
                                          <div class="panel-heading box-heading">Payment Information</div>
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
                                              <strong>Towne 3 Cinemas</strong><br/>
                                              1433 The Alameda<br/>
                                              San Jose, CA <strong>95126</strong><br/>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-md-9">
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
                                                      <td class="text-center">$15.00</td>
                                                      <td class="text-center">3</td>
                                                      <td class="text-right">$45</td>
                                                  </tr>
                                                  <tr>
                                                      <td>Students</td>
                                                      <td class="text-center">$10.00</td>
                                                      <td class="text-center">2</td>
                                                      <td class="text-right">$20.00</td>
                                                  </tr>
                                                  <tr>
                                                      <td>Child</td>
                                                      <td class="text-center">$5.00</td>
                                                      <td class="text-center">2</td>
                                                      <td class="text-right">$10</td>
                                                  </tr>
                                                  <tr>
                                                      <td class="emptyrow"></td>
                                                      <td class="emptyrow"></td>
                                                      <td class="emptyrow text-center"><strong>Total</strong></td>
                                                      <td class="emptyrow text-right">$75.00</td>
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
                  <div class="buttonContainer">
                    <button id="NewCustomerCheckoutButton" onClick = {this.handlePrint.bind(this)} type="button" class="button primary medium checkout-btn">Print</button>
                  </div>
                  
                </div>
              </div>
             
            </div>
          </div>

        </div>
        <EndFooter />
      </div>

    );
  }
  setAddressAndScreen(id){
    debugger;

    this.state.multiplex.screens.forEach(element => {
        if(element._id==id){
          this.setState({
            screen:'Auditorium ' + element.screen_number,
            addressLine1:this.state.multiplex.address,
            addressLine2:this.state.multiplex.city+','+this.state.multiplex.state +','+this.state.multiplex.zipcode
          }) 
        }
    });
  }
}
export default withRouter(TicketConfirmation);