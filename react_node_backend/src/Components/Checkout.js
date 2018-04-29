import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import { envURL, reactURL } from '../config/environment';
import swal from "sweetalert2";
// import '../assets/css/foundation.css'
// import '../assets/css/checkout.css'
// import '../assets/css/style.css'

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null, 
            email: null, 
            ticketType : null,
            ticketPrice : null,
            totalTickets : null,
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
            adult_tickets : 0,
            child_tickets : 0,
            disabled_tickets : 0,
            student_tickets : 0,
            paymentSuccess : false,
            cardDetails : null,
            save_card : false
            // cvv : null
        }
        this.getUserDetails = this.getUserDetails.bind(this)
        this.getMovieDetails = this.getMovieDetails.bind(this)
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
        this.getMovieDetails()
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
        this.setState({
            adult_tickets : localStorage.getItem("adult_tickets"),
            child_tickets : localStorage.getItem("child_tickets"),
            disabled_tickets : localStorage.getItem("disabled_tickets"),
            student_tickets : localStorage.getItem("student_tickets"),
            ticketType : localStorage.getItem("ticketType"),
            totalTickets : localStorage.getItem("totalTickets"),
            ticketPrice : localStorage.getItem("ticketPrice"),
            total : this.state.ticketPrice * this.state.totalTickets
        })
        localStorage.clear()
    }

    getMovieDetails(){
        let findMovieById = envURL + 'findMovieById';
        axios.get(findMovieById)
            .then(res => {
                    console.log('Fetching Movie Details');
                    console.log(res.data.data);
                    this.setState({
                        movie_id : res.data.data.movie_id,
                        movieName: res.data.movieName,
                        movieRating : res.data.mpaa_ratings,
                        movieTime : res.data.data.time
                    })
            })
            .catch(err => {
                console.error(err);
            });
    }
    getMultiplexDetails(){
        let getMultiplexById = envURL + 'getMultiplexById';
        axios.get(getMultiplexById)
            .then(res => {
                    console.log('Fetching Multiplex Details');
                    console.log(res.data.data);
                    this.setState({
                        multiplex_id : res.data.data.multiplex_id,
                        multiplexName: res.data.data.name,
                        multiplexAddress : res.data.data.address,
                        multiplexCity : res.data.data.city,
                        multiplexState : res.data.data.state,
                        multiplexZipCode : res.data.data.zipcode
                    })
            })
            .catch(err => {
                console.error(err);
            });
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
                                    amount : this.state.total,
                                    tax : this.state.tax,
                                    movie_id : this.state.movie_id,
                                    movie_name : this.state.movieName,
                                    multiplex_id : this.state.multiplex_id,
                                    multiplex_name : this.state.multiplexName,
                                    multiplex_address : this.state.multiplexAddress,
                                    multiplex_city : this.state.multiplexCity,
                                    multiplex_zipcode : this.state.multiplexZipCode,
                                    adult_tickets : this.state.adult_tickets,
                                    child_tickets : this.state.child_tickets,
                                    disabled_tickets : this.state.disabled_tickets,
                                    student_tickets : this.state.student_tickets
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
                    else { 
                        swal({
                            type: 'error',
                            title: 'Payment',
                            text: "Complete the payment to confirm your bookings",
                        })
                    }
            })
            .catch(err => {
                console.error(err);
            });
    }
    render() {
        return(
            <div>
                <form >
                    {/* <div class="aspNetHidden">
                        <input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value=""/>
                        <input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value=""/>
                        <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="ek5xXXcg1cviSYUrg8gwPrYeXHQCgTCXwqwDKh83z3DKNcPE7lEkTYxliLQErhB8y23oA/ELI6PGkJ3tz2MzFBQeWpmtyoIEjznmffycl61pU3FS4xp62R3dqL5UnmoYnPgWdBvY5B+GkgFUneEtbvOHk5hoC9w0Y09Zb6iSI8uM+8Pszt4vr5sjgH+4DeAtTjWpXUq8oM4viDy36NyNrs2ynCsem8+DhvCX19SJcrxB8l53SnHam5T1Xfq8zf3ZOzB0oQXxsIBesfTagdpR9vDgaQ9nEpRJJMW35RKXM0Rq+VQDtrye2bvDcKZ96m+XNAjphfCT2s2QbHKXfTrwiefSoalYy+t54LOd6LPTVfaEYYXpXUriR4V3mdddNwbMUKcEDtPmS4AgYnA5sbtJQh4QdCJaRt1uUwh0M9NBYRrIzCCDKceifk4f4LCLoiuYZyTgCkQpO/e9h34nCJ5VKins8Z0b5cOH0Iivc81cXt/fO13/VygIUYyu6az/8tNzoh1v02pOQ6GyN0kc8gOxxCIND1BvyXlD8xoM33ygKcDlY2fu+n788aw3FnYhnXnYciWjZbTpBKsHKcrFct4JF+rGjTzZXSbHHTTrdBszzl8nUUu6tsNmPJ4diq4Nqhj/puGXYg=="/>
                    </div> */}

                    {/* <div id="header-wrapper">
                        
                        <div class="AdUnit TopBanner"><div id="mps-getad-TopBanner" class="mps-wrapper" data-mps-fill-slot="Top Banner"></div></div>

                    </div> */}
                    <div id="siteContainer">
                        <div id="headerContainer">
                            <div class="commonContainer">
                                <div id="bannerMessage">You’re almost there…</div>
                            </div>


                            <div id="headerPurchase">
                                <div class="commonContainer"> 
                                    <div id="logo">
                                        <a href="http://www.fandango.com/" title="Click to go to Fandango homepage">Fandango Home</a>   
                                    </div>
                        
                                    <div id="container" class="commonContainer">

                                        <div class="checkoutPage">

                                            <div class="row">
                                                    <div id="heading" class="main">
                                                        <h1 class="section-header inline">Checkout</h1> 
                                                        <ul class="breadcrumb">
                                                            <li class="tickets complete"><i class="icon"></i>Tickets</li> 
                                                            <li class="payment complete"><i class="icon"></i>Payment</li> 
                                                            <li class="confirmation "><i class="icon"></i>Confirmation</li> 
                                                        </ul>
                                                </div>
                                            </div>
                                            <div class="row" style={{position: "relative"}}>
                                                <div class="main">
                                                    <div class="module-stacked">
                                                        <div class="errorText remove" id="pageError"></div>                
                                                        <div class="module-standard">
                                                            <fieldset class="loginOptions form-stacked">
                                                                <ul><div id="welcomeMessage" class="welcome messageTop" style={{display: "block"}}>
                                                                <a id="logoutButton" class="signOut" href="javascript:void(0)">Not Jaykumar? Sign Out</a>
                                                                <span id="signOutSpinner" class="spinner signOutSpinner user remove"></span>
                    {/* User's Name and User's Email*/}         Hi, {this.state.name} Jaykumar (<span id="customerEmail"> {this.state.email} pateljay134@gmail.com</span>)
                    {/* User's Name */}                         <h2>Hi {this.state.name} Jaykumar</h2> (<span id="customerEmail"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="03736277666f69627a32303743646e626a6f2d606c6e">[email&nbsp;protected]</a></span>)
                                                                </div></ul>
                                                            </fieldset>
                                                                


                                                            {/* <fieldset class="fandangoCredit form-stacked">
                                                                <div class="errorText remove" id="fandangoCreditApplicationError"></div>
                                                            </fieldset> */}


                                                              

                                                            {/* <fieldset class="loginOptions form-stacked">	
                                                            </fieldset> */}


                                        
                                                        </div>
                                                        
                                                        
                                                        
                                                        
                                                        

                                                        <div class="module-standard paymentOptions">
                                                            <div class="inactive remove"></div>
                                                            <fieldset class="form-stacked">
                                                                <h2 class="header-secondary">Payment <span class="paymentlock"></span></h2>
                                                                <div class="errorText remove" id="genericPaymentError"></div>
                                                                
                                                                    <h3 class="payment-subheader">Use Credit or Debit Card</h3>
                                                                
                                                                <ul class="payment">
                                                                    <li class="ccPayment js-payment-method creditcard" data-payment-method="creditcard">
                                                                        <div class="ccPaymentGhost"></div>
                                                                            
                                                                            {/* <input value="cc" name="ExpressWebCheckout$PaymentView$paymentType" type="radio" id="creditCardPaymentRadioBtn" title="paymentType" class="paymentRadio radio"/> */}
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
                                                                                <input type="text" id="creditCardNoInput" class="input card display" min="20" maxlength="19" onChange = {this.handleCardNumber} title="Card number"/>
                                                                            </div>
                                                                            <div class="errorText card remove" id="yearError"></div>
                                                                            <div class="errorText card remove" id="monthError"></div> 
                                                                            <div class="errorText card remove" id="expDateError"></div>
                                                                            <div class="card fieldContainer display">

                                                                                <label id="expLabel" class="card display" for="expMonthDropdown">Expiration date</label>  
                                                                                <div class="expMonthDropdown">   
                                                                                        
                                                                                    <select id="expMonthDropdown" size="1" onChange = {this.handleExpiryMonth} class="card inline">
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
                                                                                <div class="expYearDropdown"> 
                                                                                    
                                                                                    <select id="expYearDropdown" onChange = {this.handleExpiryYear} class="card inline">
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
                                                                                    <input type="text" id="firstNameInput" onChange = {this.handleFirstName} class="input card name display" maxlength="50" title="First Name"/>
                                                                                </div>
                                                                                <div class="fieldContainer  card display">
                                                                                    <div class="errorText remove" id="lastNameError"></div>
                                                                                    <label id="lastNameLabel" class="card name display" for="lastNameInput">Last name</label>
                                                                                    <input type="text" id="lastNameInput" onChange = {this.handleLastName} class="input card name display" maxlength="50" title="Last Name"/>
                                                                                </div>
                                                                            </div>
                                                                            <div class="fieldContainer card display">
                                                                                <div class="errorText remove" id="zipError"></div>
                                                                                <label id="zipLabel" class="card display" for="zipInput">Billing ZIP code</label>
                                                                                <input type="text" id="zipInput" onChange = {this.handleCardZipCode} class="input card display" title="Last Name" maxlength="8"/>
                                                                                
                                                                                
                                                                                <label for="saveCreditCardCheckBox" class="save card checkbox inline" id="saveCreditCardCheckBoxContainer">
                                                                                    <input name="ExpressWebCheckout$PaymentView$saveCreditCardCheckBox" type="checkbox" id="saveCreditCardCheckBox" onChange = {this.handleCardSave} class="save card inline"/>
                                                                                    Save my credit card information

                                                                                </label>
                                                                            </div>
                                                                            {/* <input name="ExpressWebCheckout$PaymentView$braintreeNonceInput" type="text" id="braintreeNonceInput" class="input remove defaultText" title="Braintree Nonce"/> */}
                                                                    </li>
                                                                    
                                                                </ul>

                                                                
                                                            </fieldset>
                                                        </div>


                                                        {/* <div class="module-standard saveInformationPassword remove">
                                                            <fieldset class="paymentOptions form-stacked">
                                                                <h2 class="header-secondary">
                                                                    Save My Information
                                                                </h2>  
                                                                <ul class="saveInfo">
                                                                    <li>
                                                                        <div id="providePasswordError" class="errorText remove"></div>               
                                                                        <div class="fieldContainer">
                                                                    
                                                                            <label for="fandangoPasswordForSaveInfo" class="user display" id="fandangoPasswordForSaveInfoLabel">Enter Password</label>
                                                                            <input class="input user inlineBlock" type="password" id="fandangoPasswordForSaveInfo" title="password"/>
                                                                        </div>  
                                                                    </li> 
                                                                </ul>
                                                            </fieldset>
                                                        </div> */}

                                                        {/* <div class="module-standard fanmailsection remove" style={{display: "none"}}>                    
                                                            
                                                        </div> */}

                                                        {/* <div class="module-standard"> */}
                                                                {/* <section class="completePurchasePanel completePurchase"> */}
                                                                <div class="buttonContainer">
                                                                    <button onClick={this.completePayment} class="button inline-block">Complete My Purchase</button>
                                                                    {/* <span id="completePurchaseSpinner" class="spinner user remove"></span> */}
                
                                                                </div>
                                                                
                                                                    {/* <p class="notes display" id="standardNotes">
                                                                        By clicking the Complete My Purchase button, you agree to the
                                                                        <a onclick="defaultPopup('http://www.fandango.com/privacypolicy.aspx');return false;" class="purchaseFooterLink" href="http://www.fandango.com/privacypolicy.aspx">Privacy Policy</a> and the 
                                                                        <a onclick="defaultPopup('http://www.fandango.com/terms-and-policies');return false;" class="purchaseFooterLink" href="http://www.fandango.com/terms-and-policies">Terms and Policies</a>, and will be charged for this order. <span class="signInToAccount" style={{display: "none"}}>You agree to receive email from Fandango.</span> A confirmation of your order will be e-mailed to you.
                                                                    </p>
                                                                    <p class="applepayNotes remove">
                                                                        By clicking Buy with Apple Pay, you agree to the
                                                                        <a onclick="defaultPopup('http://www.fandango.com/privacypolicy.aspx');return false;" class="purchaseFooterLink" href="http://www.fandango.com/privacypolicy.aspx" target="_blank">Privacy Policy</a> and the 
                                                                        <a onclick="defaultPopup('http://www.fandango.com/terms-and-policies');return false;" class="purchaseFooterLink" href="http://www.fandango.com/terms-and-policies" target="_blank">Terms of Use</a>, and will be charged for this order.
                                                                    </p> */}
                                                                {/* </section> */}
                                                        </div>
                                                        
                                                    {/* </div> */}
                                                </div>
                                                <div class="side" style={{}}>
                                                    
                                                            
                                                            {/* CountDown :  Add the same time to complete order part if possible*/}
                                                    <div class="module-standard module-timer">  
                                                        <div id="timer"><span class="timerText">Time to complete your order: </span><span class="countdown" id="countdownTimer">NaN:NaN</span></div>
                                                    </div>
                                                    <div class="module-standard">  
                                                        <div id="movieTicketSummary"> 
                                                        
                                                        <div class="message note remove"></div>

                                                        <div class="moviePoster">
                                                            <img id="moviePosterImage" alt="" src="https://images.fandango.com/r1.0.589/ImageRenderer/180/272/redesign/static/img/default_poster_128x190.png/199925/images/masterrepository/fandango/199925/avengersinfinitywar-postera.jpg"/>
                                                        </div>
                                                        <div class="movieInfo"> 
                                                            <ul class="movie-specs">
                                                                <li class="title"><h3 id="movieTitle">Avengers: Infinity War {this.state.movieName}</h3></li>
                                                                <li class="info"><span id="ratingInfo" class="emptyCheck">PG-13 {this.state.movieRating} </span><span id="ratingSeparator" class="separator emptyCheck">, </span><span class="emptyCheck" id="runtimeInfo">2 hr 36 min</span></li>
                                                            </ul>
                                                    
                                                            <ul class="movie-other-specs">
    {/* yet to fetch movie date and day */}                                                            <li><h2 id="movieDate">Thursday, Apr 26 {this.state.movieDayDate} </h2></li>
                                                                 <li>
    {/* yet to fetch movie time */}                                                                <h2 id="movieTime">{this.state.movieTime}  7:00 PM</h2>
                                                                    <span class="reserved"></span>                
                                                                    <div class="emptyCheck remove" id="lateNightShowtimeMesg"></div>
                                                                    
                                                                    {/* <p class="newShowtime">
                                                                        <a href="ticketboxoffice.aspx?mid=199925&amp;tid=AAFQQ">Select new showtime</a>
                                                                    </p> */}
                                                                    
                                                                    <div class="amenities">
                                                                        
    {/* Add Amenities if possible.*/}                                                                        <a class="amenityPopup" id="0" title="" data-amenitypopupdata="Reserved Seating takes the guaranteed seat that Fandango promises on all orders a step further and ensures you have one of the best seats in the auditorium.">Reserved seating {this.state.amenities}}</a>  
                                                                            
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
                                                                <li><h2 id="theaterName">CineLux Almaden Cafe &amp; Lounge  {this.state.movieName}</h2></li>
                                                                <li id="theaterAddress"><a id="maplink" href="http://www.fandango.com/maps/drivingdirections.aspx?category=ticketboxoffice_secure&amp;label=CineLux Almaden Cafe %26 Lounge&amp;icontitles=yes&amp;streetaddress=&amp;zip=&amp;iconid=213&amp;level=8&amp;state=&amp;height=295&amp;country=CA&amp;city=&amp;tid=AAFQQ&amp;mouse_mode=center&amp;width=400" target="_blank" class="emptyCheck">2306 Almaden Road<br/>San Jose, CA 95125</a> </li>

                                                                <li class="auditorium"><h2 id="auditoriumInfo" class="emptyCheck">Auditorium 1 {this.state.screenNumber}  </h2></li>
                                                                
                                                                
                                                                    {/* <li class="seats"><div id="selectedSeatIDsLabel">Seats:</div> <div id="selectedSeatIDs">C11</div></li> */}
                                                                

                                                                
                                                                <li class="theaterNotes">
                                                                    <h2 class="emptyCheck remove" id="notesHeader"></h2>
                                                                    <div class="emptyCheck remove" id="notesBody"></div>
                                                                </li>
                                                                <li class="agePolicy emptyCheck"><a href="http://tickets.fandango.com/AgePolicy.aspx?chainID=516&amp;tid=AAFQQ" onclick="customPopup('http://tickets.fandango.com/AgePolicy.aspx?chainID=516&amp;tid=AAFQQ', 'Fandango - Age Policy',400,295);return false;">Cinelux Theatres Age Policy</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    </div>

                                                        <div class="module-standard">
                                                                    

                                                            <div id="orderSummary">
                                                                <div id="IDRequiredMessage">
                                                                    <table>
                                                                            <tbody>
                                                                                <tr class="ticketTypeRow pricing">
                                                                                
                                                                                    <td class="type heading">
                                                                                        <span class="ticketTypeHeading">General {this.state.ticketType}  </span>
                                                                                    </td>
{/* Need to randomize this options * price command or we can show the full total with total tickets */}
                                                                                    <td class="price">1 x $10.00  = {this.state.ticketDetails}</td>   

                                                                                    <td class="math">$10.00    {this.state.ticketTotal}</td>

                                                                                </tr>
                                                                        

                                                                                <tr class="feesRow pricing">
                                                                                    <td class="type heading" colspan="2">
                                                                                        <a href="javascript:toggleConvenience()">Convenience Fee</a>
                                                                                        <div class="convenienceFeeFlyout">
                                                                                        <table>
                                                                                            <tbody>
                                                                                                {/* <tr class="close">
                                                                                                    <td colspan="4"><a href="javascript:toggleConvenience()">X</a></td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td colspan="4" class="heading">Convenience fee includes:</td>
                                                                                                </tr> */}
                                                                                                <tr class="feesRow pricing">
                                                                                                    <td class="type">General {this.state.ticketType}</td>
                                                                                                    <td class="amt">1 x {this.state.totalTickets}</td>
                                                                                                    <td class="price">$1.50 =  {this.state.ticketPrice}</td>
                                                                                                    <td class="math">$1.50   {this.state.ticketPrice}</td>
                                                                                                </tr>

                                                                                            </tbody>
                                                                                        </table>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td class="math">$1.50   {this.state.ticketPrice} </td>
                                                                                </tr>
                                                                    
                                                                    
                                                                            
                                                                                <tr class="totalRow">
                                                                                    <td class="paymentLogo"><span class=""></span></td>
                                                                                    <td class="total-wrap">Total:</td>
                                                                                    <td class="">
                                                                                        <span class="total" id="purchaseTotal">$11.50  {this.state.total} {/* or */} {this.state.totalTickets * this.state.ticketPrice}</span>
                                                                                        {/* <input name="ExpressWebCheckout$OrderSummaryView$purchaseTotalHidden" type="hidden" id="purchaseTotalHidden" value="11.50"/> */}
                                                                                    </td>
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
                                                Copyright © 2018 Fandango. All rights reserved.  Fandango Media, LLC. 12200 W. Olympic Blvd, Suite 400, Los Angeles, CA 90064
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="lb_worryFreeTickets" class="reveal-modal" data-reveal="" data-dismissmodalclass="close">
                                        <div class="reveal-header">                
                                            <a class="close-reveal-modal" href="#"><span class="close-x">X</span></a>
                                        </div>
                                        <div class="lb_content">
                                            <div class="wft-modal-splash-wrapper">
                                                <div class="wft-modal-headline"><span>Refunds &amp; Exchanges</span></div>
                                            </div>
                                            <h2>Need a refund or exchange? It's easy with worry-free tickets.</h2>
                                            <br/>
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



                                    <div id="lb_asyncCheckout" class="reveal-modal" data-reveal="" data-options="close_on_background_click:false">
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


                                {/* <input type="hidden" id="transactionHiddenField" value="89173143-E55D-4C00-9F48-A54F1ED419F4"/>
                                <input type="hidden" id="statusApiUrl" value="https://lyemfaiu5f.execute-api.us-west-1.amazonaws.com/status"/>
                                <input type="hidden" id="asyncTransactionTimeout" value="30000"/>
                                <input type="hidden" id="asyncPollIntervalMilliSeconds" value="1000"/>
                                <input type="hidden" id="asyncLongTransactionMilliSeconds" value="10000"/>
                                <input type="hidden" id="asyncCheckoutEnabled" value="False"/>
                                <input type="hidden" id="useTargetCookie" value="False"/>
                                <input type="hidden" id="asyncCheckoutWalletsEnabled" value="False"/>
                                <input type="hidden" id="useTargetCookieForWallets" value="False"/>
                                <input type="hidden" name="async" id="async" value="false"/>
                            
                                <div class="aspNetHidden">
                                    <input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="E7FE2932"/>
                                    <input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value=""/>
                                    <input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="Y+/mlPd318+hvS2Y6WyqgZN03GAu3f1xJKWQwik1m5W5rReDo17F2XvCmbjEFi4Fu3C0AmBET3yoKfc6lD+6WEQWymyrufivzDPg/UeA++/XdZAC3WAc2cLpMfrg9PIMPxeOpY5XPAar0B7TzNzSOyjW7lGCzfmSdIsQMUjnrCCx98/Wu4ZKR+XBZ24L5yLNSfy6KOoUw5L1ChE3r7jdKKd2AsMtxkpDZC8TaqIWKbeATQODVoSJ7+fkWvlSNglfwMaryQpLZdwNhNXa6h/vKMN1Ph8eFgf83Z4mEjY4pZ00fDrxFIfzaZwJLc0vgiXdHmN1DD6fpveFw9T4wcAiz6Pi399gzQ1UluKI6HAfSBnwjbInSvu3T8aZWmNOAYfULvN5LeXoZjEI7RZUwwCMGAk7Pa0newnbF7HjlOtNSf8iAwpyCAJwaMRG9DtZiKsBgYJPUpuongXyGG/BnL8AlOG7ZhnGVgk3Xk6uOo0IeECU/HcScQqKeTIynit/jCNBcNkQu6TF/3YmP271nXQbFQK3NuA+1l9G1aXt1lj8RCjT9AJgOqbeIAj8e9ZbyGM4yP+4nSnGK3otG9kuUoF2Z6Ps4rWZDaMgy83f2YlQPrESgCZE8fDF5N89y3kBc1hfKiOhpFDAIbw1hYoREA0rN0Ng3CnrnVeErbPqpkrR4Ax5+T4XJGidDBQgqw0IWZHtXnJuqZ6uxH/ZRLIVjrSYWfO64Cc="/>
                                </div> */}
                            </div>
                        </div>
                    </div>
        
                </form>

                {/* <iframe src="https://masterpass.com/switchui/warm-cache.html" aria-hidden="true" style={{display: "none", height: 1, width: 1}}></iframe>
                    <object type="application/x-shockwave-flash" id="cc_swf" data="http://www.cdn-net.com/s.swf?t=AQuzoZPmn6bsym%2Bs7ac49Njp&amp;cm=999419&amp;sid=65f46890-18ae-4998-9706-7c18bf6707b7&amp;tid=b704b2e4-87e8-46ad-975c-7fddc892f6b7" style={{position: "absolute", top: -9999, left: -9999,}} width="1" height="1">
                        <param name="allowScriptAccess" value="always"/><param flashvars="t=AQuzoZPmn6bsym%2Bs7ac49Njp&amp;cm=999419&amp;sid=65f46890-18ae-4998-9706-7c18bf6707b7&amp;tid=b704b2e4-87e8-46ad-975c-7fddc892f6b7"/>
                    </object>
                    <div style={{visibility: "hidden", position: "absolute", top: 0, left: -999}}></div>
                    <iframe name="AQuzoZPmn6bsym%2Bs7ac49Njp-1" id="AQuzoZPmn6bsym%2Bs7ac49Njp-1" width="0" height="0" style={{display: "none"}}>
                </iframe> */}
            </div>
                
            
        )
    }
}

export default withRouter(Checkout);