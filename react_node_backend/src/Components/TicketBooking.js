import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import EndFooter from './EndFooter';
import { Link } from 'react-router-dom';
import LatestMovies from './LatestMovies';
import MovieSlider from './MovieSlider';
import { envURL, reactURL } from '../config/environment';
import axios from 'axios';


// import '../assets/css/ticketbooking.css'


class TicketBooking extends Component {

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

  componentWillMount() {
    let findMultiplexByIdAPI = envURL + 'findMultiplexById';
    var multiplexId = localStorage.getItem('bookMultiplexId')
    var showId = localStorage.getItem('bookShowId');
    localStorage.removeItem('bookShowId');
    localStorage.removeItem('bookMultiplexId');

    if (multiplexId && showId) {
      var payload = {
        _id: multiplexId
      }
      axios.post(findMultiplexByIdAPI, payload)
        .then(res => {
          if (res.data.successMsg != '') {
            console.log('Fetching multiplex by id');
            console.log(res.data.data);
            this.setState({
              multiplex: res.data.data ? res.data.data : {}
            })
            var multiplex = res.data.data;
            multiplex.show_timings.forEach(element => {
                if(showId == element._id){
                  this.setState({
                    show:element,
                    movie:element.movie,
                    price:element.price
                  },()=>{
                    console.log(this.state)
                    this.setAddressAndScreen(this.state.show.screen_number)
                    return;
                  })
                }
            });
          } else {
            console.error('Error Fetching all multiplex');
          }
        })
        .catch(err => {
          console.error(err);
        });

    } else {
      this.props.history.push('/movies')
    }

  }

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
              <div id="memberGreeting">hi, {localStorage.getItem('email')}</div>
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
              <div id="heading" class="main">
                <h1 class="section-header inline inline heading-style-stub heading-style-1 heading-size-l section-header" >Checkout</h1>
                <ul class="breadcrumb">
                  <li class="tickets complete"><i class="icon"></i>Tickets</li>
                  <li class="payment "><i class="icon"></i>Payment</li>
                  <li class="confirmation "><i class="icon"></i>Confirmation</li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="main">
                <div class="module-standard">
                  <section class="newShowtimeContainer">
                    <a>Select new showtime</a>
                  </section>
                  <section >
                    <div id="tqpSection" class="showtime">
                      <h2 class="header-secondary tickets-h2">HOW MANY TICKETS?</h2>
                      <span id="IDRequiredMessage">
                        <table class="section quantityTable">
                          <tbody class="ticketTypeTable" ID="0000000001">
                            <tr>
                              <th class="ticketType">
                                <input type="hidden" name="AreaRepeater$ctl00$TicketRepeater$ctl00$TicketCode" id="AreaRepeater_TicketRepeater_0_TicketCode_0" value="0131" />
                                <input type="hidden" name="AreaRepeater$ctl00$TicketRepeater$ctl00$TicketCategory" id="AreaRepeater_TicketRepeater_0_TicketCategory_0" value="Adult" />
                                <input type="hidden" name="pricecode" value="0131" />
                                <input type="hidden" name="pricedesc" value="Adult" />
                                <input type="hidden" name="price" value="10.0000" />
                                Adult
                                                  <input type="hidden" name="quantityControlName" id="quantityControlName" value='AreaRepeater_TicketRepeater_0_quantitytb_0' />
                                <input type="hidden" name="itemTotalControlName" id="itemTotalControlName" value="AreaRepeater_TicketRepeater_0_ItemTotal_0" />
                              </th>
                              <td class="numberofTickets">
                                <input name="AreaRepeater$ctl00$TicketRepeater$ctl00$quantitytb" type="text" id="AreaRepeater_TicketRepeater_0_quantitytb_0" class="input_txt" onChange={this.handleAdultTicketChange.bind(this)} maxlength="2" tabindex="1" value={this.state.a_tickets} />
                              </td>
                              <td class="timesX">x</td>
                              <td class="pricePerTicket">${this.state.price.adult}</td>
                              <td class="equals">=</td>
                              <td class="rowTotal"><input name="AreaRepeater$ctl00$TicketRepeater$ctl00$ItemTotal" type="text" class="sub" size="8" readonly="readonly" tabindex="-1" value={this.state.adult_total_amount} /></td>
                            </tr>
                            <tr>
                              <th class="ticketType">
                                <input type="hidden" name="AreaRepeater$ctl00$TicketRepeater$ctl01$TicketCode" id="AreaRepeater_TicketRepeater_0_TicketCode_1" value="0137" />
                                <input type="hidden" name="AreaRepeater$ctl00$TicketRepeater$ctl01$TicketCategory" id="AreaRepeater_TicketRepeater_0_TicketCategory_1" value="Student" />
                                <input type="hidden" name="pricecode" value="0137" />
                                <input type="hidden" name="pricedesc" value="Student                            " />
                                <input type="hidden" name="price" value="5.0000" />
                                <span class="specialNote">*</span>
                                Student
                                                  <input type="hidden" name="quantityControlName" id="quantityControlName" value='AreaRepeater_TicketRepeater_0_quantitytb_1' />
                                <input type="hidden" name="itemTotalControlName" id="itemTotalControlName" value="AreaRepeater_TicketRepeater_0_ItemTotal_1" />
                              </th>
                              <td class="numberofTickets">
                                <input name="AreaRepeater$ctl00$TicketRepeater$ctl01$quantitytb" type="text" id="AreaRepeater_TicketRepeater_0_quantitytb_1" class="input_txt" onChange={this.handleStudentTicketChange.bind(this)} maxlength="2" tabindex="2" value={this.state.s_tickets} />
                              </td>
                              <td class="timesX">x</td>
                              <td class="pricePerTicket">${this.state.price.student}</td>
                              <td class="equals">=</td>
                              <td class="rowTotal"><input name="AreaRepeater$ctl00$TicketRepeater$ctl01$ItemTotal" type="text" id="AreaRepeater_TicketRepeater_0_ItemTotal_1" class="sub" size="8" readonly="readonly" tabindex="-1" value={this.state.student_total_amount} /></td>
                            </tr>
                            <tr>
                              <th class="ticketType">
                                <input type="hidden" name="AreaRepeater$ctl00$TicketRepeater$ctl02$TicketCode" id="AreaRepeater_TicketRepeater_0_TicketCode_2" value="0135" />
                                <input type="hidden" name="AreaRepeater$ctl00$TicketRepeater$ctl02$TicketCategory" id="AreaRepeater_TicketRepeater_0_TicketCategory_2" value="Senior" />
                                <input type="hidden" name="pricecode" value="0135" />
                                <input type="hidden" name="pricedesc" value="Senior Citizen                     " />
                                <input type="hidden" name="price" value="5.0000" />
                                <span class="specialNote">*</span>
                                Disabled
                                                  <input type="hidden" name="quantityControlName" id="quantityControlName" value='AreaRepeater_TicketRepeater_0_quantitytb_2' />
                                <input type="hidden" name="itemTotalControlName" id="itemTotalControlName" value="AreaRepeater_TicketRepeater_0_ItemTotal_2" />
                              </th>
                              <td class="numberofTickets">
                                <input name="AreaRepeater$ctl00$TicketRepeater$ctl02$quantitytb" type="text" id="AreaRepeater_TicketRepeater_0_quantitytb_2" class="input_txt" onChange={this.handleSeniorTicketChange.bind(this)} maxlength="2" tabindex="3" value={this.state.sc_tickets} />
                              </td>
                              <td class="timesX">x</td>
                              <td class="pricePerTicket">${this.state.price.disabled}</td>
                              <td class="equals">=</td>
                              <td class="rowTotal"><input name="AreaRepeater$ctl00$TicketRepeater$ctl02$ItemTotal" type="text" id="AreaRepeater_TicketRepeater_0_ItemTotal_2" class="sub" size="8" readonly="readonly" tabindex="-1" value={this.state.sc_total_amount} /></td>
                            </tr>
                            <tr>
                              <th class="ticketType">
                                <input type="hidden" name="AreaRepeater$ctl00$TicketRepeater$ctl03$TicketCode" id="AreaRepeater_TicketRepeater_0_TicketCode_3" value="0133" />
                                <input type="hidden" name="AreaRepeater$ctl00$TicketRepeater$ctl03$TicketCategory" id="AreaRepeater_TicketRepeater_0_TicketCategory_3" value="Child" />
                                <input type="hidden" name="pricecode" value="0133" />
                                <input type="hidden" name="pricedesc" value="Child                              " />
                                <input type="hidden" name="price" value="5.0000" />
                                Child
                                                  <input type="hidden" name="quantityControlName" id="quantityControlName" value='AreaRepeater_TicketRepeater_0_quantitytb_3' />
                                <input type="hidden" name="itemTotalControlName" id="itemTotalControlName" value="AreaRepeater_TicketRepeater_0_ItemTotal_3" />
                              </th>
                              <td class="numberofTickets">
                                <input name="AreaRepeater$ctl00$TicketRepeater$ctl03$quantitytb" type="text" id="AreaRepeater_TicketRepeater_0_quantitytb_3" class="input_txt" onChange={this.handleChildTicketChange.bind(this)} maxlength="2" tabindex="4" value={this.state.c_tickets} />
                              </td>
                              <td class="timesX">x</td>
                              <td class="pricePerTicket">${this.state.price.child}</td>
                              <td class="equals">=</td>
                              <td class="rowTotal"><input name="AreaRepeater$ctl00$TicketRepeater$ctl03$ItemTotal" type="text" id="AreaRepeater_TicketRepeater_0_ItemTotal_3" class="sub" size="8" readonly="readonly" tabindex="-1" value={this.state.child_total_amount} /></td>
                            </tr>
                          </tbody>
                        </table>
                        <div class="specialNote">*Valid ID may be required for theater admittance.</div>
                      </span>

                    </div>
                  </section>
                  <div class="buttonContainer">
                    <button id="NewCustomerCheckoutButton" type="button" class="button primary medium">Buy Tickets</button>
                  </div>
                  <section class="offers">
                    <h3 class="offerHeading">For Fandango VIPs</h3>
                    <ul class="offerList">
                      <li class="cookiedPromoListItem"></li>
                    </ul>
                    <div id="offersStackContainer" >
                      <ul class="offerList">
                        <li class="notes" data-reveal-id="tc_287" data-is-loyalty="true">
                          <div class='inactive remove'></div>
                          <span class="offer-icon offer-loyalty"></span>
                          <span class="offer-info">
                            <strong>EARN 150 VIP+ POINTS</strong> per ticket. More points = more movies on us.
                                        <span class="disclaimer"> </span>
                          </span>
                        </li>
                      </ul>
                    </div>

                  </section>
                </div>
              </div>
              <div class="side">
                <div class="module-standard module-timer">
                  <div id="timer"><span class="timerText">Time to complete your order: </span><span class="countdown" id="countdownTimer"></span></div>
                </div>
                <div class="module-standard">
                  <div id="movieTicketSummary">
                    <div class="message note remove"></div>
                    <div class="moviePoster">
                      <img id="moviePosterImage" alt="" 
                      src="https://images.fandango.com/r1.0.589/redesign/static/img/default_poster_128x190.png" />
                    </div>
                    <div class="movieInfo">
                      <ul class="movie-specs">
                        <li class="title">
                          <h3 id="movieTitle">{('title' in this.state.movie)?this.state.movie.title:''}</h3>
                        </li>
                        <li class="info"><span id="ratingInfo" class="emptyCheck"></span><span id="ratingSeparator" class="separator emptyCheck"> </span><span class="emptyCheck" id="runtimeInfo">
                        {('movie_length' in this.state.movie)?this.state.movie.movie_length:''} mins</span></li>
                      </ul>
                      <ul class="movie-other-specs">
                        <li>
                          <span id="movieDate"><strong>
                          {('date_time' in this.state.show)?this.state.show.date_time:''}
                          </strong></span>
                        </li>
                        <li>
                          <span class=""></span>
                          <div class="emptyCheck" id="lateNightShowtimeMesg"></div>
                          <p class="newShowtime">
                            {/* <a href="ticketboxoffice.aspx?mid=211341&tid=AAFRF">Select new showtime</a> */}
                          </p>
                          <div class="amenities">
                            <a class="amenityPopup" id="0" title="" data-amenityPopupData="This film is presented in the Malayalam language.">Malayalam</a>
                          </div>
                        </li>
                      </ul>
                      <ul class="movie-other-specs">
                        <li>
                          <h2 id="theaterName">{('name' in this.state.multiplex)?this.state.multiplex.name:''}</h2>
                        </li>
                        <li id="theaterAddress"><a id="maplink" href="http://www.fandango.com/maps/drivingdirections.aspx?category=ticketboxoffice_secure&label=Towne 3 Cinemas&icontitles=yes&streetaddress=&zip=&iconid=213&level=8&state=&height=295&country=CA&city=&tid=AAFRF&mouse_mode=center&width=400" target="_blank" class="emptyCheck">
                        {this.state.addressLine1}
                        <br />{this.state.addressLine2}</a> </li>
                        <li class="auditorium">
                          <h2 id="auditoriumInfo" class="emptyCheck">{this.state.screen}</h2>
                        </li>
                        <li class="theaterNotes">
                          <h2 class="emptyCheck" id="notesHeader"></h2>
                          <div class="emptyCheck" id="notesBody"></div>
                        </li>
                        <li class="agePolicy emptyCheck"><a href="http://tickets.fandango.com/AgePolicy.aspx?chainID=532&tid=AAFRF" onclick="customPopup('http://tickets.fandango.com/AgePolicy.aspx?chainID=532&tid=AAFRF', 'Fandango - Age Policy',400,295);return false;">Age Policy</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="module-standard module-cutout">
                  <p><a class="help helplink" href="javascript:customPopup('http://www.fandango.com/help?category=generalquestions&question=1','Help',1200,875);return false;" onclick="customPopup('http://www.fandango.com/help?category=generalquestions&question=1','Help',1200,875);return false;">Need Help With Checkout?</a></p>
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
export default withRouter(TicketBooking);