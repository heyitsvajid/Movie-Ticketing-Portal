import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import EndFooter from './EndFooter';
import { Link } from 'react-router-dom';
import LatestMovies from './LatestMovies';
import MovieSlider from './MovieSlider';
import { envURL, reactURL } from '../config/environment';
import axios from 'axios';
var LogAPI = require('../utils/logging');


// import '../assets/css/ticketbooking.css'


class TicketConfirmation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ticket_details: {},
      movieTime: '',
      a_tickets: 0,
      c_tickets: 0,
      da_tickets: 0,
      s_tickets: 0,
      adult_total_amount: 0,
      student_total_amount: 0,
      da_total_amount: 0,
      child_total_amount: 0,
      total: 0,
      tax : 0
    };
  }

  componentWillMount() {
    var multiplexId = localStorage.getItem('bookMultiplexId')
    var showId = localStorage.getItem('bookShowId');
    var screenId = localStorage.getItem('bookScreenId');
    localStorage.removeItem('bookShowId');
    localStorage.removeItem('bookMultiplexId');
    if (multiplexId && showId) {
      //Ticket Confirmation
      let click = {
        pageClick: {
          email: "anonymous",
          pageName: "Ticket Confirmation",
          timeStamp: new Date().getTime()
        }
      };
      console.log(click);
      LogAPI.logUserClicks(click);
      this.getUserDetails()
      this.getBillingDetails()
      this.getTicketDetails()
    } else {
      this.props.history.push('/movies')
    }
  }

  getUserDetails() {
    this.setState({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      cards_last_four_digits: localStorage.getItem("cards_last_four_digits"),
      card_expiry: localStorage.getItem("card_expiry")
    })
    localStorage.removeItem("cards_last_four_digits")
    localStorage.removeItem("card_expiry")
  }

  getBillingDetails() {
    let getTicketConfirmation = envURL + 'getTicketConfirmation';
    var payment_details = { id: localStorage.getItem("billing_id") }
    axios.post(getTicketConfirmation, payment_details)
      .then(res => {
        this.setState({
          ticket_details: res.data.results.billing_information[0],
          movieDate: res.data.results.billing_information[0].show_time.split(" ")[0] + " " + res.data.results.billing_information[0].show_time.split(" ")[1] + " " + res.data.results.billing_information[0].show_time.split(" ")[2] + " " + res.data.results.billing_information[0].show_time.split(" ")[3],
          movieTime: res.data.results.billing_information[0].show_time.split(" ")[4] + " " + res.data.results.billing_information[0].show_time.split(" ")[5]
        }, () => { localStorage.removeItem("billing_id") }
        )
      })
      .catch(err => {
        console.error(err);
      });
  }
  getTicketDetails() {
    this.setState({
      a_tickets: localStorage.getItem("a_tickets"),
      c_tickets: localStorage.getItem("c_tickets"),
      da_tickets: localStorage.getItem("da_tickets"),
      s_tickets: localStorage.getItem("s_tickets"),
      adult_total_amount: localStorage.getItem("adult_total_amount"),
      student_total_amount: localStorage.getItem("student_total_amount"),
      da_total_amount: localStorage.getItem("da_total_amount"),
      child_total_amount: localStorage.getItem("child_total_amount"),
      tax :  Number(localStorage.getItem("tax")),
      total: Number(localStorage.getItem("adult_total_amount")) + Number(localStorage.getItem("student_total_amount")) + Number(localStorage.getItem("da_total_amount")) + Number(localStorage.getItem("child_total_amount"))
    }
      , () => {
        localStorage.removeItem("a_tickets")
        localStorage.removeItem("c_tickets")
        localStorage.removeItem("da_tickets")
        localStorage.removeItem("s_tickets")
        localStorage.removeItem("adult_total_amount")
        localStorage.removeItem("student_total_amount")
        localStorage.removeItem("da_total_amount")
        localStorage.removeItem("child_total_amount")
        localStorage.removeItem("tax")
      }
    )
  }

  handlePrint(e) {
    window.print();
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
                  <a href={reactURL} title='Click to go to Fandango homepage'>Fandango Home</a>
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
              <div class="main billing_summary" style={{ width: "auto !important" }}>
                <div class="module-standard">
                  <section class="confirm-box">
                    <section>
                      <div id="tqpSection" class="showtime">
                        <h2 class="header-secondary tickets-h2">THANK YOU FOR YOUR PURCHASE. YOUR CONFIRMATION HAS BEEN EMAILED TO YOU.</h2>
                        <h2 class="header-secondary tickets-h2">CONFIRMATION: #{this.state.ticket_details.id}</h2>


                      </div>
                    </section>



                  </section>


                  <section class="confirm-box">
                    <section>
                      <div id="tqpSection" class="showtime">
                        <h2 class="header-secondary tickets-h2">TO PICK UP YOUR TICKETS WITH YOUR CREDIT CARD:</h2>
                        <ol class="confirm-list">
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
                              <h2 id="purchase-header">Invoice for purchase #{this.state.ticket_details.id}</h2>
                            </div>
                            <hr />
                            <div class="row">
                              <div class="col-xs-12 col-md-3 col-lg-3 pull-left">
                                <div class="panel panel-default height">
                                  <div class="panel-heading box-heading">Movie and Screen</div>
                                  <div class="panel-body billing-body">
                                    <strong>Movie:  </strong>
                                    {this.state.ticket_details.movie_name}<br />
                                    <strong>Date:   </strong>
                                    {this.state.movieDate}<br />
                                    <strong>Time:    </strong>
                                    {this.state.movieTime}<br />
                                    <strong>Auditorium:   </strong>
                                    {this.state.ticket_details.screen_number}
                                  </div>
                                </div>
                              </div>
                              <div class="col-xs-12 col-md-3 col-lg-3">
                                <div class="panel panel-default height">
                                  <div class="panel-heading box-heading">Payment Information</div>
                                  <div class="panel-body billing-body">
                                    {/* <strong>Card Name:</strong> Visa<br/> */}
                                    <strong>Card Number:</strong> ***** {this.state.cards_last_four_digits}<br />
                                    <strong>Exp Date:</strong> {this.state.card_expiry} <br />
                                  </div>
                                </div>
                              </div>
                              <div class="col-xs-12 col-md-3 col-lg-3 pull-right">
                                <div class="panel panel-default height">
                                  <div class="panel-heading box-heading">Multiplex Address</div>
                                  <div class="panel-body billing-body">
                                    <strong>{this.state.ticket_details.multiplex_name}</strong><br />
                                    {this.state.ticket_details.multiplex_address}<br />
                                    {this.state.ticket_details.multiplex_city}<strong> {this.state.ticket_details.multiplex_zipcode}</strong><br />
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
                                        <td class="text-center">${(this.state.a_tickets !== "0" ? (this.state.adult_total_amount / this.state.a_tickets).toFixed(2) : "00.00")}</td>
                                        <td class="text-center">{this.state.a_tickets}</td>
                                        <td class="text-right">${this.state.adult_total_amount}</td>
                                      </tr>
                                      <tr>
                                        <td>Students</td>
                                        <td class="text-center">${(this.state.s_tickets !== "0" ? (this.state.student_total_amount / this.state.s_tickets).toFixed(2) : "00.00")}</td>
                                        <td class="text-center">{this.state.s_tickets}</td>
                                        <td class="text-right">${this.state.student_total_amount}</td>
                                      </tr>
                                      <tr>
                                        <td>Child</td>
                                        <td class="text-center">${(this.state.c_tickets !== "0" ? (this.state.child_total_amount / this.state.c_tickets).toFixed(2) : "00.00")}</td>
                                        <td class="text-center">{this.state.c_tickets}</td>
                                        <td class="text-right">${this.state.child_total_amount}</td>
                                      </tr>
                                      <tr>
                                        <td>Disabled</td>
                                        <td class="text-center">${(this.state.da_tickets !== "0" ? (this.state.da_total_amount / this.state.da_tickets).toFixed(2) : "00.00")}</td>
                                        <td class="text-center">{this.state.da_tickets}</td>
                                        <td class="text-right">${this.state.da_total_amount}</td>
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
                                        <td class="emptyrow text-right">${Number(Number(this.state.total.toFixed(2)) + Number(this.state.tax.toFixed(2)))}</td>
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
                    <button id="NewCustomerCheckoutButton" onClick={this.handlePrint.bind(this)} type="button" class="button primary medium checkout-btn">Print</button>
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
  setAddressAndScreen(id) {

    this.state.multiplex.screens.forEach(element => {
      if (element._id == id) {
        this.setState({
          screen: 'Auditorium ' + element.screen_number,
          addressLine1: this.state.multiplex.address,
          addressLine2: this.state.multiplex.city + ',' + this.state.multiplex.state + ',' + this.state.multiplex.zipcode
        })
      }
    });
  }
}
export default withRouter(TicketConfirmation);