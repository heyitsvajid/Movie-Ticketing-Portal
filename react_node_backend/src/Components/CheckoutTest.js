import React, { Component } from 'react';
import axios from 'axios';
import Index from './Index';
import Header from './Header';
import Footer from './Footer';
import { envURL, reactURL } from '../config/environment';
// import SignIn from './SignIn';
// import SignUp from './SignUp';

class CheckoutTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null, 
            email: null, 
            adult_total_amount : null,
            student_total_amount:null,
            da_total_amount:null,
            child_total_amount:null,
            multiplex: {},
            show: {},
            movie:{},
            movie_logo : null,
            price:{adult:0,student:0,disabled:0,child:0},
            showTime : null,
            // ticketPrice : null,
            // totalTickets : null,
            total : null,
            tax : 0,
            movie_id : null,
            movieName : null,
            movieRating : null,
            movieDayDate : null,
            movieTime : null,
            multiplex_id : null,
            multiplexName : null, 
            multiplexAddress : null,
            multiplexCity : null,
            multiplexState : null,
            multiplexZipCode : null,
            cardNumber : null,
            expiryMonth : null,
            expiryYear : null,
            firstName : null,
            lastName : null,
            cardZipCode : null,
            a_tickets : 0,
            c_tickets : 0,
            da_tickets : 0,
            s_tickets : 0,
            paymentSuccess : false,
            cardDetails : null,
            save_card : false
            // cvv : null
        }
        this.getUserDetails = this.getUserDetails.bind(this)
        // this.getMovieDetails = this.getMovieDetails.bind(this)
        this.getMultiplexDetails = this.getMultiplexDetails.bind(this)
        this.getTicketDetails = this.getTicketDetails.bind(this)
        this.handleCardNumber = this.handleCardNumber.bind(this)
        this.handleFirstName = this.handleFirstName.bind(this)
        this.handleLastName = this.handleLastName.bind(this)
        this.handleCardZipCode = this.handleCardZipCode.bind(this)
        this.handleExpiryMonth = this.handleExpiryMonth.bind(this)
        this.handleExpiryYear = this.handleExpiryYear.bind(this)
        this.completePayment = this.completePayment.bind(this)
    }
  
    componentWillMount(){
        this.getUserDetails()
        // this.getMovieDetails()
        this.getMultiplexDetails()
        this.getTicketDetails()
        this.getTicketDetails()
        this.getCardDetails()
    }

    getUserDetails(){
        this.setState({
            name : localStorage.getItem("name"),
            email : localStorage.getItem("email")
        })
    }

      /*   Show Timings and Screen No Fetching has to be done  */


    getTicketDetails(){
        debugger
        this.setState({
            a_tickets : localStorage.getItem("a_tickets"),
            c_tickets : localStorage.getItem("c_tickets"),
            da_tickets : localStorage.getItem("da_tickets"),
            s_tickets : localStorage.getItem("s_tickets"),
            adult_total_amount : localStorage.getItem("adult_total_amount").split("$")[1],
            student_total_amount : localStorage.getItem("student_total_amount").split("$")[1],
            da_total_amount : localStorage.getItem("da_total_amount").split("$")[1],
            child_total_amount : localStorage.getItem("child_total_amount").split("$")[1],
            // totalTickets : this.state.adult_tickets+this.state.child_tickets+this.state.disabled_tickets+this.state.student_tickets,
            // disabled_tickets : localStorage.getItem("da_tickets"),
            // ticketPrice : localStorage.getItem("ticketPrice"),
            // total : Number(this.state.adult_total_amount) + Number(this.state.child_total_amount) + Number(this.state.da_total_amount) + Number(this.state.student_total_amount)
        })
    }

    // getMovieDetails(){
    //     debugger
    //     let findMovieById = envURL + 'findMovieById';
    //     var movie_id = 1;
    //     // localStorage.getItem("movie_id")
    //     console.log(movie_id)
    //     debugger
    //     axios.get(findMovieById, movie_id)
    //         .then(res => {
    //             debugger
    //                 console.log('Fetching Movie Details');
    //                 console.log(res.data.data);
    //                 this.setState({
    //                     movie_id : res.data.data.movie_id,
    //                     movieName: res.data.movieName,
    //                     movieRating : res.data.mpaa_ratings,
    //                     movieTime : res.data.data.time
    //                 })
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
    // }
    getMultiplexDetails(){


    let findMultiplexByIdAPI = envURL + 'findMultiplexById';
    var multiplexId = localStorage.getItem('bookMultiplexId')
    var showId = localStorage.getItem('bookShowId');
    localStorage.removeItem('bookShowId');
    localStorage.removeItem('bookMultiplexId');
    console.log('Fetching multiplex Details');
    if (multiplexId && showId) {
      var payload = {
        _id: multiplexId
      }
      axios.post(findMultiplexByIdAPI, payload)
        .then(res => {
            debugger
          if (res.data.successMsg != '') {
            console.log('Fetching multiplex by id');
            console.log(res.data.data);
            this.setState({
              multiplex: res.data.data ? res.data.data : {},
              multiplex_id : res.data.data._id,
              multiplexName: res.data.data.name,
              multiplexAddress : res.data.data.address,
              multiplexCity : res.data.data.city,
              multiplexState : res.data.data.state,
              multiplexZipCode : res.data.data.zipcode
            })
            console.log("Printing Multiplex Data")
            console.log(this.state.multiplex)
            var multiplex = res.data.data;
            multiplex.show_timings.forEach(element => {
                if(showId == element._id){
                    debugger
                    console.log(element)
                  this.setState({
                    show:element,
                    movie:element.movie,
                    movie_id : element.movie._id,
                    movieName: element.movie.title,
                    movieRating : element.movie.mpaa_ratings,
                    showTime : element.date_time,
                    movieDayDate : element.date_time.split(", ")[0] + " " + element.date_time.split(", ")[1],
                    movieTime : element.date_time.split(", ")[2],
                    movie_logo: element.movie.movie_logo,
                    price:element.price,
            //   screenNumber : res.data.data.screens[0].screen_number
                    
                  },()=>{
                    console.log(this.state)
                    // this.setAddressAndScreen(this.state.show.screen_number)
                    return;
                  })
                }
            });
            debugger
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

/////////////////////////////////////////////////////////////////////



        // let getMultiplexById = envURL + 'getMultiplexById';
        // axios.get(getMultiplexById)
        //     .then(res => {
        //             console.log('Fetching Multiplex Details');
        //             console.log(res.data.data);
        //             this.setState({
        //                 multiplex_id : res.data.data.multiplex_id,
        //                 multiplexName: res.data.data.name,
        //                 multiplexAddress : res.data.data.address,
        //                 multiplexCity : res.data.data.city,
        //                 multiplexState : res.data.data.state,
        //                 multiplexZipCode : res.data.data.zipcode
        //             })
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
    }
    getCardDetails(){
        let getCardDetails = envURL + 'getCardDetails';
        axios.get(getCardDetails)
            .then(res => {
                    console.log('Fetching Movie Details');
                    console.log(res.data.data);
                    this.setState({
                        cardDetails : res.data.data
                    })
            })
            .catch(err => {
                console.error(err);
            });
    }
    handleCardNumber(e){
        e.preventDefault()
        this.setState({
            cardNumber : e.target.value
        })
    }
    handleExpiryMonth(e){
        e.preventDefault()
        this.setState({
            expiryMonth : e.target.value
        })
    }
    handleExpiryYear(e){
        e.preventDefault()
        this.setState({
            expiryYear : e.target.value
        })
    }
    handleFirstName(e){
        e.preventDefault()
        this.setState({
            firstName : e.target.value
        })
    }
    handleLastName(e){
        e.preventDefault()
        this.setState({
            lastName : e.target.value
        })
    }
    // handleCvv(e){
    //     e.preventDefault()
    //     this.setState({
    //         cvv : e.target.value
    //     })
    // }
    handleCardZipCode(e){
        e.preventDefault()
        this.setState({
            cardZipCode : e.target.value
        })
    }
    handleCardSave(e){
        e.preventDefault()
        this.state({

        })
    }

    completePayment(e){
        debugger
        e.preventDefault();
        let completePayment = envURL + 'completePayment';
        var cardInformation  = {    
                                    user_email : this.state.email,
                                    cardNumber : this.state.cardNumber, 
                                    expiryMonth : this.state.expiryMonth,  
                                    expiryYear : this.state.expiryYear,
                                    nameOnCard : this.state.firstName + " " + this.state.lastName, 
                                    card_zipcode : this.state.cardZipCode
                                    // cvv : this.state.cvv,
                                }
        var billingInformation = {  user_email : this.state.email,
                                    user_name : this.state.name,
                                    amount : ( Number(this.state.adult_total_amount) + Number(this.state.child_total_amount) + Number(this.state.da_total_amount) + Number(this.state.student_total_amount)).toFixed(2),
                                    tax : this.state.tax,
                                    movie_id : this.state.movie_id,
                                    movie_name : this.state.movieName,
                                    show_time : this.state.showTime,
                                    multiplex_id : this.state.multiplex_id,
                                    multiplex_name : this.state.multiplexName,
                                    multiplex_address : this.state.multiplexAddress,
                                    multiplex_city : this.state.multiplexCity,
                                    multiplex_zipcode : this.state.multiplexZipCode,
                                    adult_tickets : this.state.a_tickets,
                                    child_tickets : this.state.c_tickets,
                                    disabled_tickets : this.state.da_tickets,
                                    student_tickets : this.state.s_tickets
        }
        var payment_details = {
                                    card_details : cardInformation,
                                    billing_details : billingInformation
        }
        axios.post(completePayment, payment_details)
            .then(res => {
                    debugger
                    console.log('Payment Completed');
                    console.log(res.data.results);
                    this.setState({
                        paymentSuccess : res.data.results.data.payment_successfull
                    })
                    localStorage.setItem("billing_id", res.data.results.data.id)
                    if(this.state.paymentSuccess){ window.location.href = reactURL + "confirmation" }
                    else { alert("Complete the payment to confirm your bookings.") }
            })
            .catch(err => {
                console.error(err);
            });
    }

  render() {
    debugger
    return (
    <div>
      <form  id="form1">
        <div class="aspNetHidden">
          <input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
          <input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
          <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="dAOgwnnRixnRrs53ALjm8KgfLx/llecCbOpiQKpNT2dtzBla+SbKsL4ttMH+JY5Qgoa/UI+Ju5BV2mZqxSsTh3PljRrIanhVj/mteK80ZNws63RzhShLupgUs9zsOvLAvOTfiyAYSaOkE0RuNjHsj71F0a3OC1+B0xWirbKmUfWtPMvGda97sx9/LQ1M+/km05JJGvrKc6wxU1/cRsNJXHQGte4gQUVUiWiOXfbI70I/in6zUIwZncXdO89fa4aSE2kbUbuXBYD7oHOUkwvihfVvcw0QCW6xqs/CeQzC4+LBTEApyd/UbP5oYnoNRKqc7ivl22x1KpP122QO1XOn8Vo8sk7lb5UmVl34Yaopi0bUaAB7w/PewSm1oYWwRHkr0sMz3WMbcNMwn4dje7p1yesUVNTIcPybsjvZcFLnUpZyi+DS4tKodO24Jwf0jofsn8bUa3Mz/ErxCNcMirkrvz62VAf1jWNe+pJ6l1QvCdVYhzQXTdwxcYI7J0pb0Sv06o9kzIMYY2uItzWFGQd8S+/UKXez46s6tmZodNAf7h8kTo/3fwUON8E4xgMwf88shgXxk6dvwy4YmL8eRpeE0VGa2/5iyaDM5lDwTRW3YhxTYTr2jmVIR8xU1GEGLo+sFS/UQZB+Yfb61S55jdw6uGiRok2m6qBCWjmszoPKT74ZoxjTuTr8uzeY2YzLuT2PghyJK/T41wpG4Gy5adh1eh/h9z9uBYTrGoezkQU7vDIvrECjQ9ieXGFE8ewaq74dKPGqGV5hKB4XYV72LNX+lOedm+FBB1XMRKl3Oy6P7mEeGmX/VK8JKsHMIp9za307O3KxoKYMgc0puiFd+e83jIjBtlvftbc1sfT75c8y6JlhQmls8tQc+x6Ig/gwdggdN7rqy24ajbc3gfA+79qswqhVI+o=" />
        </div>
      
        <div id="header-wrapper">
          <div class="AdUnit TopBanner">
              
          </div>
        </div>
        <div id="siteContainer">
          <div id="headerContainer">
              <div class="commonContainer">
                <div id="bannerMessage">You’re almost there…</div>
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
              <div class="checkoutPage">
                <div class="row">
                    <div id="heading" class="main">
                    <h1 class="section-header inline inline heading-style-stub heading-style-1 heading-size-l section-header" >Checkout</h1>
                      <ul class="breadcrumb">
                          <li class="tickets complete"><i class="icon"></i>Tickets</li>
                          <li class="payment complete"><i class="icon"></i>Payment</li>
                          <li class="confirmation "><i class="icon"></i>Confirmation</li>
                      </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="main">
                      <div class="module-stacked">
                          <div class="errorText remove" id="pageError"></div>
                          
                          <div class="module-standard paymentOptions">
                            <div class="inactive remove"></div>
                            <fieldset class="form-stacked">
                                <h2 class="header-secondary payment-header">Payment <span class="paymentlock"></span></h2>
                                <div class="errorText remove" id="genericPaymentError"></div>
                                <h3 class="payment-subheader">Use Credit or Debit Card</h3>
                                <ul class="payment">
                                  <li class="ccPayment js-payment-method creditcard" data-payment-method="creditcard">
                                    <div class="ccPaymentGhost"></div>
                                    <input value="cc" name="ExpressWebCheckout$PaymentView$paymentType" type="radio" id="creditCardPaymentRadioBtn" title="paymentType" class="paymentRadio radio" />
                                    <label id="creditcard">
                                    <span id="creditCardItem-visa" class="visa"></span>
                                    <span id="creditCardItem-amex" class="amex"></span>
                                    <span id="creditCardItem-mastercard" class="mastercard"></span>
                                    <span id="creditCardItem-discover" class="discover"></span>
                                    <span id="creditCardItem-blank" class="chasefreedom"></span>
                                    <span id="creditCardItem-blank" class="branding"></span>
                                    </label>
                                    <div class="paymentMessageText errorText remove"></div>
                                    <div class="errorText card remove" id="ccError"></div>
                                    <div class="cvvDetail card fieldContainer display">
                                        <label for="creditCardNoInput" class="card display">Card number</label>
                                        <input name="ExpressWebCheckout$PaymentView$creditCardNoInput" type="text" id="creditCardNoInput" class="input card display" min="20" maxlength="19" onChange = {this.handleCardNumber} title="Card number" />
                                    </div>
                                    <div class="errorText card remove" id="yearError"></div>
                                    <div class="errorText card remove" id="monthError"></div>
                                    <div class="errorText card remove" id="expDateError"></div>
                                    <div class="card fieldContainer display exp-card">
                                        <label id="expLabel" class="card display" for="expMonthDropdown">Expiration date</label>  
                                        <div class="expiry-latest expMonthDropdown">
                                          <select name="ExpressWebCheckout$PaymentView$expMonthDropdown" id="expMonthDropdown" size="1" onChange = {this.handleExpiryMonth} class="card inline">
                                              <option selected="selected" value="0">Month</option>
                                              <option value="1">01 - January</option>
                                              <option value="2">02 - February</option>
                                              <option value="3">03 - March</option>
                                              <option value="4">04 - April</option>
                                              <option value="5">05 - May</option>
                                              <option value="6">06 - June</option>
                                              <option value="7">07 - July</option>
                                              <option value="8">08 - August</option>
                                              <option value="9">09 - September</option>
                                              <option value="10">10 - October</option>
                                              <option value="11">11 - November</option>
                                              <option value="12">12 - December</option>
                                          </select>
                                        </div>
                                        <div class="expiry-latest expYearDropdown">
                                          <select name="ExpressWebCheckout$PaymentView$expYearDropdown" id="expYearDropdown" onChange = {this.handleExpiryYear} class="card inline">
                                              <option selected="selected" value="Year">Year</option>
                                              <option value="2018">18</option>
                                              <option value="2019">19</option>
                                              <option value="2020">20</option>
                                              <option value="2021">21</option>
                                              <option value="2022">22</option>
                                              <option value="2023">23</option>
                                              <option value="2024">24</option>
                                              <option value="2025">25</option>
                                              <option value="2026">26</option>
                                              <option value="2027">27</option>
                                              <option value="2028">28</option>
                                          </select>
                                        </div>
                                    </div>
                                    <div class="fieldCol2 customerInfo card display">
                                        <div class="fieldContainer  card display">
                                          <div class="errorText remove" id="firstNameError"></div>
                                          <label id="firstNameLabel" class="card name display" for="firstNameInput">First name</label>
                                          <input name="ExpressWebCheckout$PaymentView$firstNameInput" type="text" id="firstNameInput" onChange = {this.handleFirstName} class="input card name display" maxlength="50" title="First Name" />
                                        </div>
                                        <div class="fieldContainer  card display">
                                          <div class="errorText remove" id="lastNameError"></div>
                                          <label id="lastNameLabel" class="card name display" for="lastNameInput">Last name</label>
                                          <input name="ExpressWebCheckout$PaymentView$lastNameInput" type="text" id="lastNameInput" onChange = {this.handleLastName} class="input card name display" maxlength="50" title="Last Name" />
                                        </div>
                                    </div>
                                    <div class="fieldContainer card display">
                                        <div class="errorText remove" id="zipError"></div>
                                        <label id="zipLabel" class="card display" for="zipInput">Billing ZIP code</label>
                                        <input name="ExpressWebCheckout$PaymentView$zipInput" type="text" id="zipInput" onChange = {this.handleCardZipCode} class="input card display" title="Last Name" maxlength="8" />
                                        {/* <label for="saveCreditCardCheckBox" class="save card checkbox inline" id="saveCreditCardCheckBoxContainer">
                                        <input name="ExpressWebCheckout$PaymentView$saveCreditCardCheckBox" type="checkbox" id="saveCreditCardCheckBox" class="save card inline" />
                                        Save my credit card information
                                        </label> */}
                                    </div>
                                    <input name="ExpressWebCheckout$PaymentView$braintreeNonceInput" type="text" id="braintreeNonceInput" class="input remove defaultText" title="Braintree Nonce" />
                                  </li>
                                </ul>
                               
                                {/* <h3 class="payment-subheader">Or Use Other Payment Method</h3>
                                <ul class="payment">
                                  <li class="applepayPayment js-payment-method applepay" data-payment-method="applepay">
                                      <div class="applepayPaymentGhost"></div>
                                      <div class="promo errorText remove" id="applepayError"></div>
                                      <input type="radio" id="applepayPaymentRadioBtn" title="paymentType" value="applepay" name="ExpressWebCheckout$PaymentView$paymentType" class="paymentRadio radio" />
                                      <label id="applepay"><span class="applepay"></span></label>
                                      <a id="applepayTellMeMore">Tell Me More</a>
                                      <div class="applepayMessage remove fieldContainer paymentMessage">If you are planning to use a gift card or promo code with your purchase, make sure to add them before you click the “Apple Pay” button below. After clicking the “Apple Pay” button, you will see the Apple payment sheet where you will finalize your order.</div>
                                      <div class="paymentMessageText errorText remove"></div>
                                  </li>
                                  <li class="paypalonetouchPayment js-payment-method paypalonetouch" data-payment-method="paypalonetouch">
                                      <div class="paypalonetouchPaymentGhost"></div>
                                      <div class="promo errorText remove" id="paypalonetouchError"></div>
                                      <input type="radio" id="paypalonetouchPaymentRadioBtn" title="paymentType" value="paypalonetouch" name="ExpressWebCheckout$PaymentView$paymentType" class="paymentRadio radio" />
                                      <label id="paypalonetouch"><span class="paypalonetouch"></span></label>
                                      <a id="paypalonetouchTellMeMore">Tell Me More</a>
                                      <div class="paypalonetouchMessage remove fieldContainer paymentMessage">After clicking "Continue to Paypal" you will be directed to PayPal and will return to Fandango to finalize your purchase.</div>
                                      <div class="paymentMessageText errorText remove"></div>
                                  </li>
                                  <li class="visaCheckoutPayment js-payment-method visacheckout" data-payment-method="visacheckout">
                                      <div class="visaCheckoutPaymentGhost"></div>
                                      <div class="promo errorText remove" id="visaCheckoutError"></div>
                                      <input value="visacheckout" name="ExpressWebCheckout$PaymentView$paymentType" type="radio" id="visaCheckoutPaymentRadioBtn" title="paymentType" class="paymentRadio radio" />
                                      <label id="visacheckout"><span class="visacheckout">Visa Checkout</span></label>
                                      <a class="link v-learn" href="#" >Tell Me More</a>
                                      <div class="visaCheckoutMessage remove fieldContainer paymentMessage">
                                        After clicking the "Visa Checkout" button below, you will be directed to Visa Checkout and will return to Fandango to finalize your purchase.
                                      </div>
                                      <div class="paymentMessageText errorText remove"></div>
                                  </li>
                                  <li class="masterPassPayment js-payment-method masterpass" data-payment-method="masterpass">
                                      <div class="masterPassPaymentGhost"></div>
                                      <div class="promo errorText remove" id="masterPassError"></div>
                                      <input value="masterPass" name="ExpressWebCheckout$PaymentView$paymentType" type="radio" id="masterPassPaymentRadioBtn" title="paymentType" class="paymentRadio radio" />
                                      <label id="masterPass"><span class="masterPass">MasterPass</span></label>
                                      <a class="link" href="javascript:customPopup('https://www.mastercard.com/mc_us/wallet/learnmore/en/US/','MPWindow','700','700');return false;" onclick="customPopup('https://www.mastercard.com/mc_us/wallet/learnmore/en/US/', 'MPWindow','700','700');return false;" >Tell Me More</a>
                                      <div class="masterPassMessage remove fieldContainer paymentMessage">
                                        After clicking the "Masterpass" button below, you will be directed to Masterpass and will return to Fandango to finalize your purchase.
                                      </div>
                                      <div class="paymentMessageText errorText remove"></div>
                                  </li>
                                  <li class="paymentLink actionContainer fandangoGift">
                                      <div class="paymentLinkFandangoGiftGhost"></div>
                                      <div class="cta ctaDropdown" id="fandangoGiftCard">Use Fandango Gift card</div>
                                      <div class="fieldContainer fandangoGiftcard remove">
                                        <div class="errorText" id="giftcardError"></div>
                                        <p>Please enter your gift card number and PIN or claim code. <a href="http://tickets.fandango.com/GiftCardInfo.aspx" onclick="customPopup('http://tickets.fandango.com/GiftCardInfo.aspx','Fandango', 760,630);return false;">Need help?</a></p>
                                        <div class="fieldControls fandangoGiftcard remove">
                                            <div class="giftCardNumber fandangoGiftcard remove">
                                              <label for="fandangoGiftCardNo" class="fandangoGiftcard remove">Card Number or Claim Code</label>
                                              <input name="ExpressWebCheckout$PaymentView$fandangoGiftCardNo" type="text" id="fandangoGiftCardNo" class="fandangoGiftcard remove" />
                                            </div>
                                            <div class="giftCardPin fandangoGiftcard remove-block">
                                              <label for="fandangoGiftCardPin" class="fandangoGiftcard remove" >PIN <span>(if available)</span></label>
                                              <input name="ExpressWebCheckout$PaymentView$fandangoGiftCardPin" type="text" id="fandangoGiftCardPin" class="fandangoGiftcard remove" size="4" maxlength="4" />
                                            </div>
                                        </div>
                                        <div class="fieldActions applySection fandangoGiftcard remove">
                                            <button class="button small fandangoGiftcard remove" id="applyGift" onclick="javascript:return false;">Apply</button>
                                            <span id="giftcardSpinner" class="spinner fandangoGiftcard remove"></span>
                                        </div>
                                      </div>
                                  </li>
                                  <li class="paymentLink actionContainer promotion">
                                      <div class="paymentLinkPromoGhost"></div>
                                      <div class="cta ctaDropdown" id="promoCode">Use Promo code</div>
                                      <div class="fieldContainer promo remove">
                                        <div class="promo errorText " id="promoError"></div>
                                        <div class="fieldControls">
                                            <input name="ExpressWebCheckout$PaymentView$promoCodeNo" type="text" id="promoCodeNo" class="promo remove" maxlength="20" /> 
                                        </div>
                                        <div class="fieldActions applySection promo remove">
                                            <button class="button small promo remove" id="applyPromo" onclick="javascript:return false;">Apply</button> 
                                            <span id="promoSpinner" class="spinner promo remove"></span>
                                        </div>
                                        <div class="notes " id="promoMsg"></div>
                                        <input type="hidden" id="isnewuserclaimcodeapplied" value="False" />
                                      </div>
                                  </li>
                                </ul> */}
                            </fieldset>
                          </div>
                          <div class="module-standard saveInformationPassword remove">
                            <fieldset class="paymentOptions form-stacked">
                                <h2 class="header-secondary">
                                  Save My Information
                                </h2>
                                <ul class="saveInfo">
                                  <li>
                                      <div id="providePasswordError" class="errorText"></div>
                                      <div class="fieldContainer">
                                        <label for="fandangoPasswordForSaveInfo" class="user display" id="fandangoPasswordForSaveInfoLabel">Enter Password</label>
                                        <input class="input user inlineBlock" type="password" id="fandangoPasswordForSaveInfo" title="password"/>
                                      </div>
                                  </li>
                                </ul>
                            </fieldset>
                          </div>
                          
                          <div class="module-standard">
                            <section class="completePurchasePanel completePurchase">
                                <div class="buttonContainer purchase-button">
                                  <div id="continueToVisaCheckout" class="buttonHolder remove">
                                      <img alt="Visa Checkout" class="v-button" role="button" src="https://secure.checkout.visa.com/wallet-services-web/xo/button.png" />
                                  </div>
                                  <script type="text/javascript" src="https://MasterPass.com/lightbox/Switch/integration/MasterPass.client.js"></script>    
                                  
                                  <button id="applepayContinue" class="button remove">Continue To Apple Pay</button><button id="paypalonetouchContinue" class="button remove">Continue To PayPal</button>
                                  {/* <button onclick="javascript:return false; __doPostBack('ExpressWebCheckout$completePurchaseButton','')" id="completePurchaseButton" disabled="disabled" class="button">Complete My Purchase</button> */}
                                  <button onClick={this.completePayment} id="completePurchaseButton" class="button">Complete My Purchase</button>
                                  
                                  <span id="completePurchaseSpinner" class="spinner user remove"></span>
                                </div>
                                <p class="notes " id="standardNotes">
                                  By clicking the Complete My Purchase button, you agree to the
                                  <a onclick="defaultPopup('http://www.fandango.com/privacypolicy.aspx');return false;" class="purchaseFooterLink" href="http://www.fandango.com/privacypolicy.aspx">Privacy Policy</a> and the 
                                  <a onclick="defaultPopup('http://www.fandango.com/terms-and-policies');return false;" class="purchaseFooterLink" href="http://www.fandango.com/terms-and-policies">Terms and Policies</a>, and will be charged for this order. <span class="signInToAccount">You agree to receive email from Fandango.</span> A confirmation of your order will be e-mailed to you.
                                </p>
                                
                            </section>
                          </div>
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
                                <img id="moviePosterImage" alt="" src = { require('../images/' + (this.state.movie_logo !== null ? this.state.movie_logo : "fandango_poster.png"))} />
                            </div>
                            <div class="movieInfo">
                                <ul class="movie-specs">
                                  <li class="title">
                                      <h3 id="movieTitle">{this.state.movieName} </h3>
                                  </li>
                                  <li class="info"><span id="ratingInfo" class="emptyCheck">{this.state.movieRating}</span><span id="ratingSeparator" class="separator emptyCheck">, </span><span class="emptyCheck" id="runtimeInfo">{('movie_length' in this.state.movie)?this.state.movie.movie_length:''} mins</span></li>
                                </ul>
                                <ul class="movie-other-specs">
                                  <li>
                                      <h2 id="movieDate">{this.state.movieDayDate}</h2>
                                  </li>
                                  <li>
                                      <h2 id = "movieTime">{this.state.movieTime} </h2>
                                      <span class=""></span>                
                                      <div class="emptyCheck" id="lateNightShowtimeMesg"></div>
                                      <p  class="newShowtime">
                                        <a href="/movies">Select new showtime</a>
                                      </p>
                                      <div class="amenities">
                                                                            
        {/* Add Amenities if possible.*/} <a class="amenityPopup" id="0" title="" data-amenitypopupdata="Reserved Seating takes the guaranteed seat that Fandango promises on all orders a step further and ensures you have one of the best seats in the auditorium.">Reserved seating {this.state.amenities}</a>  
                                                                                
                                        | <a class="amenityPopup" id="1" title="" data-amenitypopupdata="Vouchers and coupons for free or discounted admission cannot be used for this showing. Refer to your pass for details.">No passes {this.state.amenities}</a>  
                                                                                
                                        | <a class="amenityPopup" id="2" title="" data-amenitypopupdata="<b>Closed caption</b></br>
                                        Closed Captioning devices display a movie's dialogue and sound effects as text; captions are not shown on the main screen. Devices available by request.
                                        </br></br>
                                        <b>DV</b></br>
                                        Descriptive Video devices provide audio descriptions of the movie to accommodate the needs of visually impaired guests. Devices available by request.">Accessibility devices available {this.state.amenities}</a>  
                                                                                
                                      </div>
                                  </li>
                                </ul>
                                <ul class="movie-other-specs">
                                  <li>
                                      <h2 id="theaterName">{this.state.multiplexName}</h2>
                                  </li>
                                  <li id="theaterAddress"><a id="maplink" href="http://www.fandango.com/maps/drivingdirections.aspx?category=ticketboxoffice_secure&label=Towne 3 Cinemas&icontitles=yes&streetaddress=&zip=&iconid=213&level=8&state=&height=295&country=CA&city=&tid=AAFRF&mouse_mode=center&width=400" target="_blank"  class="emptyCheck">{this.state.multiplexAddress}</a> </li>
                                  <li class="auditorium">
                                      <h2 id="auditoriumInfo" class="emptyCheck">Auditorium: {this.state.screenNumber} </h2>
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
                      <div class="module-standard">
                          <div id="orderSummary">
                            <div id="IDRequiredMessage">
                                <table>
                                  <tr class="ticketTypeRow pricing">
                                      <td class="type heading">
                                        <span class="ticketTypeHeading">Adult</span>
                                      </td>
                                      <td class="price">{this.state.a_tickets+ " x $"+ (typeof this.state.price.adult !== "undefined" ? this.state.price.adult.toFixed(2) : "00.00" )} </td>
                                      <td class="math">${this.state.adult_total_amount}</td>
                                      </tr>
                                      <tr class="ticketTypeRow pricing">
                                      <td class="type heading">
                                        <span class="ticketTypeHeading">Student</span>
                                      </td>
                                      <td class="price">{this.state.s_tickets+ " x $"+ (typeof this.state.price.student !== "undefined" ?  this.state.price.student.toFixed(2) : "00.00" ) }</td>
                                      <td class="math">${this.state.student_total_amount}</td>
                                      </tr>
                                      <tr class="ticketTypeRow pricing">
                                      <td class="type heading">
                                        <span class="ticketTypeHeading">Disabled</span>
                                      </td>
                                      <td class="price">{this.state.da_tickets+ " x $"+ (typeof this.state.price.disabled !== "undefined" ? this.state.price.disabled.toFixed(2) : "00.00" )}</td>
                                      <td class="math">${this.state.da_total_amount}</td>
                                      </tr>
                                      <tr class="ticketTypeRow pricing">
                                      <td class="type heading">
                                        <span class="ticketTypeHeading">Child</span>
                                      </td>
                                      <td class="price">{this.state.c_tickets+ " x $"+ (typeof this.state.price.child !== "undefined" ?  this.state.price.child.toFixed(2) : "00.00" )}</td>
                                      <td class="math">${this.state.child_total_amount}</td>
                                  </tr>
                                  {/* <tr class="feesRow pricing">
                                      <td class="type heading" colspan="2">
                                        <a href="javascript:toggleConvenience()">Convenience Fee</a>
                                        <div  class="convenienceFeeFlyout">
                                            <table>
                                              <tr class="close">
                                                  <td colspan="4"><a href="javascript:toggleConvenience()">X</a></td>
                                              </tr>
                                              <tr>
                                                  <td colspan="4" class="heading">Convenience fee includes:</td>
                                              </tr>
                                              <tr class="feesRow pricing">
                                                  <td class="type">Adult  {this.state.ticketType}</td>
                                                  <td class="amt">1 x {this.state.totalTickets}</td>
                                                  <td class="price">$1.50 = {this.state.ticketPrice}</td>
                                                  <td class="math">$1.50 {this.state.ticketPrice}</td>
                                              </tr>
                                            </table>
                                        </div>
                                      </td>
                                      <td class="math">$1.50 {this.state.ticketPrice}</td>
                                  </tr>
                                  <tr class="feesRow pricing discountRow membersonly ">
                                      <td class="type heading"><a href="#" data-reveal-id="tc_287">150 VIP+ POINTS</a></td>
                                      <td class="price"></td>
                                      <td class="math">INCLUDED</td>
                                  </tr> */}
                                  <tr class="totalRow">
                                      <td class="paymentLogo"><span class=""></span></td>
                                      <td class="total-wrap">Total:</td>
                                      <td class="">
                                        <span class="total" id="purchaseTotal">${ ( Number(this.state.adult_total_amount) + Number(this.state.child_total_amount) + Number(this.state.da_total_amount) + Number(this.state.student_total_amount)).toFixed(2)}</span>
                                        <input name="ExpressWebCheckout$OrderSummaryView$purchaseTotalHidden" type="hidden" id="purchaseTotalHidden" value="11.50" />
                                      </td>
                                  </tr>
                                </table>
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
          <div id="footerContainer">
              <div id="footer" class="commonContainer">
                <div id="contents">
                    <p> 
                      <a onclick="defaultPopup('http://www.fandango.com/privacypolicy.aspx');return false;" class="purchaseFooterLink" href="http://www.fandango.com/privacypolicy.aspx"> Your Privacy Rights - Privacy Policy</a> |                  
                      <a onclick="defaultPopup('http://www.fandango.com/terms-and-policies');return false;" class="purchaseFooterLink" href="http://www.fandango.com/terms-and-policies">Terms and Policies</a> | 
                      <a onclick="defaultPopup('http://www.fandango.com/movie-ticket-policy');return false;" class="purchaseFooterLink" href="http://www.fandango.com/movie-ticket-policy">Movie Ticket Policy</a> | 
                      <a href="#" data-reveal-id="lb_worryFreeTickets">Refunds and Exchanges</a>
                    </p>
                    <p>
                      Copyright &copy; 2018 Fandango. All rights reserved.  Fandango Media, LLC. 12200 W. Olympic Blvd, Suite 400, Los Angeles, CA 90064
                    </p>
                </div>
              </div>
          </div>
          <div id="lb_worryFreeTickets" class="reveal-modal" data-reveal data-dismissmodalclass="close">
              <div class="reveal-header">                
                <a class="close-reveal-modal" href="#"><span class="close-x">X</span></a>
              </div>
              <div class="lb_content">
                <div class="wft-modal-splash-wrapper">
                    <div class="wft-modal-headline"><span>Refunds &amp; Exchanges</span></div>
                </div>
                <h2>Need a refund or exchange? It's easy with worry-free tickets.</h2>
                <br />
                <p>Here's what's included with every worry-free ticket purchase:</p>
                <ul>
                    <li>Enjoy the peace of mind of a guaranteed ticket.</li>
                    <li>We know life happens. You may exchange or request a refund for your entire order minus the convenience fee, through Fandango up until the posted showtime. You'll have to complete your refund and exchange before the posted showtime. For full terms and conditions, please see our Fandango <a target="_blank" href="http://www.fandango.com/movie-ticket-policy">Movie Ticket Policy</a>.</li>
                    <li>We’ll refund your credit card or we can credit your Fandango account to use for another movie. Your choice.</li>
                </ul>
              </div>
              <div class="lb_footer">
                Have more questions? Read our 
                <a target="_blank" href="http://www.fandango.com/help#refunds--exchanges">FAQs</a>
                or reach out to our 
                <a target="_blank" href="http://fandango.custhelp.com/app/ask">customer service team</a>.
              </div>
          </div>

          <div class="nbcuPixels" id="nbcuPixels">
          </div>
          <div id="lb_asyncCheckout" class="reveal-modal" data-reveal data-options="close_on_background_click:false">
              <div class="reveal-header">                
              </div>
              <div class="lb_content">
                <div class="pageProgress inverted">
                    <div class="block1 progress_block"></div>
                    <div class="block2 progress_block"></div>
                    <div class="block3 progress_block"></div>
                </div>
                <p></p>
                <button class="button inline-block">Try Again</button>
              </div>
          </div>
        </div>
        
      </form>
    </div>
    )
  }
}

export default CheckoutTest;
