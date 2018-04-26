import React, { Component } from 'react';
import axios from 'axios';
import Index from './Index';
import Header from './Header';
import Footer from './Footer';
import { envURL, reactURL } from '../config/environment';
// import SignIn from './SignIn';
// import SignUp from './SignUp';

class PurchaseHistory extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
    this.getBillingDetailsPerUser()
  }

  getBillingDetailsPerUser(){
        let getBillingDetailsPerUser = envURL + 'getBillingDetailsPerUser';
        var user_email = localStorage.getItem("email")
        axios.post(getBillingDetailsPerUser, user_email)
            .then(res => {
                    console.log('Payment Completed');
                    console.log(res.data);
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
                <tr>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
