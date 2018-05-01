import React, { Component } from 'react';
import axios from 'axios';
import Index from './Index';
import Header from './Header';
import Footer from './Footer';
import { envURL, reactURL } from '../config/environment';
import swal from 'sweetalert';
var LogAPI = require('../utils/logging');

class PurchaseHistory extends Component {
  constructor(props) {
    super(props);
    this.state = ({
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
    })
    this.getBillingDetailsPerUser = this.getBillingDetailsPerUser.bind(this)
    this.renderModal = this.renderModal.bind(this)
    this.getAllMultiplex = this.getAllMultiplex.bind(this)
  }

  componentWillMount() {

    axios.get(envURL + 'isLoggedIn', { withCredentials: true })
      .then((response) => {
        console.log("After checking the session", response.data);
        if (response.data.session === 'valid') {
          if (response.data.result.role_number === 1) {
            //Purchase History.js
            let click = {
              pageClick: {
                email: "anonymous",
                pageName: "Purchase History",
                timeStamp: new Date().getTime()
              }
            };
            console.log(click);
            LogAPI.logUserClicks(click);

            this.getBillingDetailsPerUser()
            this.getAllMultiplex()
          }
          else {
            this.props.history.push('/adminDashboard');
          }
        }        else{
          this.props.history.push('/login');
          swal({
            type: 'error',
            title: 'Login Required',
            text: 'Login to See Transaction History',
        })          
        }
      })

  }

  renderModal(e) {
    e.preventDefault();
    this.state.bills.forEach(bill => {
      debugger

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
              tax: bill.tax
            })
          })
          .catch(err => {
            console.error(err);
          });
      }
    })


    debugger
  }



  getBillingDetailsPerUser() {
    let getBillingDetailsPerUser = envURL + 'getBillingDetailsPerUser';
    axios.post(getBillingDetailsPerUser, null, { withCredentials: true })
      .then(res => {
        if (res.data.results.billing_information !== 0) {
          this.setState({
            bills: res.data.results.billing_information,
            all_bills: res.data.results.billing_information.map(data => {
              var date_time
              this.state.index++;
              return (
                <tr>
                  <td>{this.state.index}</td>
                  <td ><a href="#myModal" id={data.id} onClick={this.renderModal} class="" data-toggle="modal">{data.movie_name}</a></td>
                  <td>{data.show_time}</td>
                  <td>${data.amount}</td>
                  <td>{(Number(data.child_tickets) + Number(data.student_tickets) + Number(data.disabled_tickets) + Number(data.adult_tickets))}</td>
                  <td>{(new Date(data.show_time).getTime() > new Date().getTime() ? <span class="label label-info">Pending </span> : <span class="label label-success">Completed </span>)}</td>
                </tr>
              )
            })

          })
        }
      })
      .catch(err => {
        console.error(err);
      });
  }


  getAllMultiplex() {
    let findAllMultiplex = envURL + 'findAllMultiplex';
    axios.get(findAllMultiplex)
      .then(res => {
        console.log(res.data.data)
        this.setState({
          allMultiplex: res.data.data
        })
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div id="purchase-history">
        <Header />
        <div class="container order-container">
          <div class="row">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Movie Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Ticket Count</th>
                    <th>Movie Staus</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                  <td>1</td>
                  
                  <td><a href="#myModal" class="" data-toggle="modal">Launch Demo Modal</a></td>
                  <td>11/6/2014</td>
                  <td>$899.00</td>
                  <td>10</td>
                  <td><span class="label label-info">Pending</span></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><a href="http://www.mirchu.net/mobiles/lg-g3/" target="_blank">LG G3</a></td>
                  <td>10/6/2014</td>
                  <td>$621.00</td>
                  <td>10</td>
                  <td><span class="label label-success">Completed</span></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td><a href="http://www.mirchu.net/mobiles/samsung-galaxy-s5/" target="_blank">Samsung Galaxy S5</a></td>
                  <td>11/9/2013</td>
                  <td>$640.00</td>
                  <td>10</td>
                  <td><span class="label label-info">Pending</span></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td><a href="http://www.mirchu.net/rook-bootstrap-app-landing-page/" target="_blank">Rook Landing Page</a></td>
                  <td>11/6/2014</td>
                  <td>$12.00</td>
                  <td>10</td>
                  <td><span class="label label-success">Completed</span></td>
                </tr> */}
                  {this.state.all_bills}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
                          <hr />
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
        <Footer />
      </div>
    )
  }
}

export default PurchaseHistory;
