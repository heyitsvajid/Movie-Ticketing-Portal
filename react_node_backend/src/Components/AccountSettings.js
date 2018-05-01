import React, { Component } from 'react';
import axios from 'axios';
import Index from './Index';
import Header from './Header';
import Footer from './Footer';
import swal from 'sweetalert';
import '../assets/css/style.css'
import ProfileImage from './ProfileImage';
import { envURL, reactURL } from '../config/environment';
var LogAPI = require('../utils/logging');

class AccountSettings extends Component {

  constructor(props) {
    super(props);
    this.state = ({
        FirstName : '',
        LastName : '',
        email : '',
        newEmail : '',
        CardNumber : '',
        ExpirationMonth : '',
        ExpirationYear : '',
        ZipCode : '' ,
        error: '',
        oldPassword: '',
        newPassword: '',
        address: '',
        phone: '',
        state_name: 'AL',
        city: '',
        cardZipCode : ''
    });
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveBasicInfo = this.handleSaveBasicInfo.bind(this);
    this.handleSaveEmail = this.handleSaveEmail.bind(this);
    this.handleSavePasswordUpdate = this.handleSavePasswordUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount = () => {
      let url = envURL + 'getprofiledetails';
      let userid = localStorage.getItem('userid');
      if(userid !== null) {
          //AccountSettings.js Logging
          let click = {
            pageClick: {
                email: "anonymous",
                pageName: "Account Settings",
                timeStamp: new Date().getTime()
            }
        };
        console.log(click);
        LogAPI.logUserClicks(click);
          axios.post( url, { userid }, { withCredentials : true } )
              .then( (response) => {
                  console.log("Response from DB in get profiledetails", response.data );
                  this.setState({
                      FirstName : response.data.data.first_name,
                      LastName : response.data.data.last_name,
                      email : response.data.data.email,
                      address : response.data.data.address,
                      phone : response.data.data.phone_number,
                      city : response.data.data.city,
                      state_name : response.data.data.state,
                      ZipCode : response.data.data.zipcode,
                  })
              })
      }
      else {
          swal("Please login first to view your profile", "", "warning");
          this.props.history.push('/login');
      }

      let getCardDetailsPerUser = envURL + 'getCardDetailsPerUser';
      var user_email = { user_email : localStorage.getItem("email") };
      console.log('Sending Card Fetching Request');
      if(user_email){
          axios.post(getCardDetailsPerUser, user_email )
              .then( res => {
                  console.log('Fetching Card Details');
                  console.log(res.data.results.billing_information[0]);
                  if(typeof res.data.results.billing_information[0] !== "undefined"){
                      var card_details = res.data.results.billing_information[0];
                      this.setState({
                          cardDetails : card_details,
                          CardNumber : card_details.cardNumber,
                          ExpirationMonth : card_details.expiryMonth,
                          ExpirationYear : card_details.expiryYear,
                          cardZipCode : card_details.card_zipcode
                      }, () => {
                          console.log("After getting card details", this.state)
                      })
                  }
              })
              .catch(err => {
                  console.error(err);
              });
      }


  };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
                [e.target.id] : e.target.value,
                error : ''
            }, () => {
                console.log(this.state)
            }
        )
    };

    handleSaveBasicInfo = (e) => {
        e.preventDefault();
        let profiledetails = {
            id : localStorage.getItem('userid'),
            first_name : this.state.FirstName,
            last_name : this.state.LastName,
            city: this.state.city,
            state_name: this.state.state_name,
            zipcode: this.state.ZipCode,
            phone: this.state.phone,
            address: this.state.address
        };

        let pattern1 = new RegExp("\\d");
        let test1 = pattern1.test(this.state.FirstName);

        let pattern2 = new RegExp("\\d");
        let test2 = pattern2.test(this.state.LastName);

        let pattern3 = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        let test3 = pattern3.test(this.state.ZipCode);

        let pattern4 = new RegExp(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/);
        let test4 = pattern4.test(this.state.phone);


        if(test4){
            if( !test1 && !test2) {
                console.log("First Name and Last name don't have digits check");
                if( this.state.FirstName !== '' ) {
                    console.log(" First Name is not empty");
                    if( this.state.ZipCode === null || this.state.ZipCode === ''  ) {
                        console.log("Empty Zipcode");
                        this.sendSaveBasicInfo();
                    }
                    else {
                        if( test3 ) {
                            console.log("Zipcode Valid");
                            this.sendSaveBasicInfo();
                        }
                        else {
                            this.setState({
                                error : 'Invalid Zipcode'
                            })
                        }
                    }
                }
                else {
                    this.setState({
                        error : 'First Name can\'t be empty'
                    })
                }
    
                // let url = envURL+'updateprofilebasicinfo';
                // axios.post( url, profiledetails, { withCredentials : true} )
                //     .then( (response) => {
                //         console.log("Response from Db in Update Profile : ", response.data );
                //         swal("Updated Successfully!", "", "success");
                //     } )
            }
            else {
                this.setState({
                    error : 'Please enter valid names'
                })
            }
        }
        else {
            this.setState({
                error : 'Please enter valid contact number'
            })
        }
        
    };

    sendSaveBasicInfo = () => {
        console.log("All test Passed in save Basic Info");
        let profiledetails = {
            id : localStorage.getItem('userid'),
            first_name : this.state.FirstName,
            last_name : this.state.LastName,
            city: this.state.city,
            state_name: this.state.state_name,
            zipcode: this.state.ZipCode,
            phone: this.state.phone,
            address: this.state.address
        };

        let url = envURL+'updateprofilebasicinfo';
        axios.post( url, profiledetails, { withCredentials : true} )
            .then( (response) => {
                console.log("Response from Db in Update Profile : ", response.data );
                swal("Updated Successfully!", "", "success");
            } )
    };

    handleProfileImageClick(e){
        this.setState({
            error : ''
        });
        var basic_info_element = document.getElementById("profile-image-form");
        if(basic_info_element.style.display == "none" || basic_info_element.style.display == ""){
            this.hideDivBoxesAndArrows();
            basic_info_element.style.display = "block";
            document.getElementsByClassName("profile-image-arrow")[0].classList.add("accordion-opened");
        }
        else {
            basic_info_element.style.display = "none";
            document.getElementsByClassName("profile-image-arrow")[0].classList.remove("accordion-opened");
        }
    }

    handleSaveEmail(e) {
      e.preventDefault();
        let patt = new RegExp('[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z]+');
        let res = patt.test(this.state.newEmail);

        if( res ) {
            let profiledetails = {
                id : localStorage.getItem('userid'),
                email : this.state.newEmail,
            };
            if( this.state.email === this.state.newEmail ) {
                console.log("Duplicate Email");
                this.setState({
                    error: 'Please enter an Email other than current Email '
                })
            }
            else {
                let url = envURL + 'checkforexistingemail';
                axios.post( url, profiledetails, { withCredentials : true} )
                    .then((response) => {
                            console.log("In checkforexistingemail ", response.data);
                            if( response.data.errorMsg === ''  ) {
                                this.setState({
                                    error : "Email Already Exists"
                                })
                            }
                            else {
                                let url = envURL+'updateprofileemail';
                                axios.post( url, profiledetails, { withCredentials : true} )
                                    .then( (response) => {
                                            console.log( "Response from Db in Update Profile : ", response.data );
                                            swal( "Email Updated Successfully!", "", "success" );
                                            window.location.reload(true);
                                        }
                                    )
                            }
                        }
                    )
            }
        }
        else {
            this.setState({
                error: 'Please enter valid Email '
            })
        }
    }

    handleSavePasswordUpdate(e) {
        e.preventDefault();
        var data = {
            id: localStorage.getItem('userid'),
            currentPassword: this.state.oldPassword,
            updatedPassword: this.state.newPassword
        };

        if(this.state.newPassword.length >= 8 && this.state.oldPassword.length >= 8) {
            let url = envURL+'updateprofilepassword';
            axios.post(url, data, { withCredentials: true })
                .then((response) => {
                    console.log("After updating password...",response.data);
                    if(response.data.data.code === 1) { //success
                        swal(response.data.successMsg, "", "success");
                    }
                    else {
                        swal(response.data.errorMsg, "", "warning");
                    }
                })
        }
        else {
            this.setState({
                error: 'Password should be at least 8 characters'
            })
        }



    }

    handleUserCardDetails = () => {

        let pattern1 = new RegExp('[0-9]{16}');
        let test1 = pattern1.test(this.state.CardNumber);

        let pattern2 = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        let test2 = pattern2.test(this.state.cardZipCode);

        let visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
        let test3 = visa.test(this.state.CardNumber);

        let mastercard = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
        let test4 = mastercard.test(this.state.CardNumber);

        let amex = /^3[47][0-9]{13}$/;
        let test5 = amex.test(this.state.CardNumber);

        let dinersclub = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;
        let test6 = dinersclub.test(this.state.CardNumber);

        let discover =  /^6(?:011|5[0-9]{2})[0-9]{12}$/;
        let test7 = discover.test(this.state.CardNumber);

        let jcb = /^(?:2131|1800|35\d{3})\d{11}$/;
        let test8 = jcb.test(this.state.CardNumber);

        if(test1) {
            console.log('16 Digit card number entered');
            if( test3 || test4 || test5 || test6 || test7 || test8 ) {
                console.log("Credit card number Test Passed");

                if( this.state.ExpirationMonth !== '' && this.state.ExpirationYear !== '' ) {
                    if( Number(this.state.ExpirationYear) === 2018 ) {
                        console.log("Year selected 2018");
                        console.log('Month selected :', this.state.ExpirationMonth );
                        let date =new Date();
                        if( Number(this.state.ExpirationMonth) < (date.getMonth() + 1) ) {
                            console.log( "Invalid Month" );
                            this.setState ({
                                error : 'Card Expired'
                            })
                        }
                        else {
                            console.log("Regex For month and year passed");
                            if( test2 ) {
                                console.log("All tests passed including Zipcode");

                                let url = envURL + 'saveUserCardDetails';
                                console.log("Save Button Clicked in Profile Save Card Info");

                                let cardInformation  = {
                                    user_email :  this.state.email,
                                    cardNumber : this.state.CardNumber,
                                    expiryMonth : this.state.ExpirationMonth,
                                    expiryYear : this.state.ExpirationYear,
                                    nameOnCard : this.state.FirstName + " " + this.state.LastName,
                                    card_zipcode : this.state.cardZipCode
                                };

                                let payment_details = {
                                    card_details : cardInformation,
                                };
                                console.log(payment_details);

                                axios.post( url, payment_details, { withCredentials : true })
                                    .then((response) => {
                                        console.log("In Response Data of Save User details ", response.data )
                                        if( response.data.results.payment_successfull === true ) {
                                            swal('Card Details Saved', '' , 'success');
                                        }

                                    })
                            }
                            else {
                                this.setState({
                                    error : 'Please enter valid Zipcode'
                                })
                            }
                        }
                    }
                    else {
                        console.log(this.state.ExpirationYear);
                        console.log("Year selected other that 2018");
                        console.log("Regex For month and year passed");
                        if( test2 ) {
                            console.log("All tests passed including Zipcode");

                            let url = envURL + 'saveUserCardDetails';
                            console.log("Save Button Clicked in Profile Save Card Info");

                            let cardInformation  = {
                                user_email :  this.state.email,
                                cardNumber : this.state.CardNumber,
                                expiryMonth : this.state.ExpirationMonth,
                                expiryYear : this.state.ExpirationYear,
                                nameOnCard : this.state.FirstName + " " + this.state.LastName,
                                card_zipcode : this.state.cardZipCode
                            };

                            let payment_details = {
                                card_details : cardInformation,
                            };
                            console.log(payment_details);

                            axios.post( url, payment_details, { withCredentials : true })
                                .then((response) => {
                                    console.log("In Response Data of Save User details ", response.data )
                                    if( response.data.results.payment_successfull === true ) {
                                        swal('Card Details Saved', '' , 'success');
                                    }

                                })
                        }
                        else {
                            this.setState({
                                error : 'Please enter valid Zipcode'
                            })
                        }
                    }
                }
                else {
                    this.setState({
                        error : 'Please Select Expiration Month and Year'
                    })
                }
            }
            else {
                this.setState({
                    error : 'Please enter valid card number'
                })
            }        }
        else {
            this.setState({
                error : 'Please Enter 16 digit card number'
            })
        }


        // let url = envURL + 'saveUserCardDetails';
        // console.log("Save Button Clicked in Profile Save Card Info");
        // let cardInformation  = {
        //     user_email :  this.state.email,
        //     cardNumber : this.state.CardNumber,
        //     expiryMonth : this.state.ExpirationMonth,
        //     expiryYear : this.state.ExpirationYear,
        //     nameOnCard : this.state.FirstName + " " + this.state.LastName,
        //     card_zipcode : this.state.ZipCode
        // };
        // let payment_details = {
        //     card_details : cardInformation,
        // };
        // console.log(payment_details);
        // axios.post( url, payment_details, { withCredentials : true })
        //     .then((response) => {
        //         console.log("In Response Data of Save User details ", response.data )
        //     })

    };


    handleDelete(e) {
        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "We regret leaving you!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    //api to disable the user

                    var data = {
                        id: localStorage.getItem('userid'),
                        email: this.state.email
                    }

                    let url = envURL+'disableaccount';
                    axios.post(url, data, { withCredentials: true})
                        .then((response) => {
                            console.log(response.data);
                            if(response.data.successMsg !== '') {
                                swal("We Regret Leaving You!", {
                                    icon: "success",
                                });
                                localStorage.removeItem('userid');
                                axios.post(envURL + 'logout', null, { withCredentials: true })
                                    .then((response) => {
                                        console.log(response.data);
                                        if(response.data.session === 'logged out') {
                                            this.props.history.push('/');
                                        }
                                    })
                            }

                        })

                } else {
                    swal("Thanks for Staying!");
                }
            });
    }

    handleBasicInfoClick(e){
        this.setState({
            error : ''
        });
        var basic_info_element = document.getElementById("basic-info-form");
        if(basic_info_element.style.display == "none" || basic_info_element.style.display == ""){
            this.hideDivBoxesAndArrows();
            basic_info_element.style.display = "block";
            document.getElementsByClassName("basic-info-arrow")[0].classList.add("accordion-opened");
        }
        else {
            basic_info_element.style.display = "none";
            document.getElementsByClassName("basic-info-arrow")[0].classList.remove("accordion-opened");
        }
    }

  handleEmailChangeClick(e){
      this.setState({
          error : ''
      });
      var email_element = document.getElementById("email-form");
    if(email_element.style.display == "none" || email_element.style.display == ""){
      this.hideDivBoxesAndArrows();
      email_element.style.display = "block";
      email_element.style.height = "200px";
      document.getElementsByClassName("email-change-arrow")[0].classList.add("accordion-opened");
    }
    else{
      email_element.style.display = "none";
      document.getElementsByClassName("email-change-arrow")[0].classList.remove("accordion-opened");
    }
  }

  handlePasswordChangeClick(e){
      this.setState({
          error : ''
      });
      var password_element = document.getElementById("password-form");
    if(password_element.style.display == "none" || password_element.style.display == ""){
      this.hideDivBoxesAndArrows();
      password_element.style.display = "block";
      password_element.style.height = "220px";
      document.getElementsByClassName("password-change-arrow")[0].classList.add("accordion-opened");
    }
    else{
      password_element.style.display = "none";
      document.getElementsByClassName("password-change-arrow")[0].classList.remove("accordion-opened");
    }
  }

  handlePaymentClick(e){
      this.setState({
          error : ''
      });

      var payment_element = document.getElementById("payment-form");
    if(payment_element.style.display == "none" || payment_element.style.display == ""){
      this.hideDivBoxesAndArrows();
      payment_element.style.display = "block";
      payment_element.style.height = "350px";      
      document.getElementsByClassName("payment-arrow")[0].classList.add("accordion-opened");
    }
    else{
      payment_element.style.display = "none";
      document.getElementsByClassName("payment-arrow")[0].classList.remove("accordion-opened");
    }
  }

    handleDeleteClick(e){
        this.setState({
            error : ''
        });
        var basic_info_element = document.getElementById("delete-info-form");
        if(basic_info_element.style.display == "none" || basic_info_element.style.display == ""){
            this.hideDivBoxesAndArrows();
            basic_info_element.style.display = "block";
            document.getElementsByClassName("delete-info-arrow")[0].classList.add("accordion-opened");
        }
        else {
            basic_info_element.style.display = "none";
            document.getElementsByClassName("delete-info-arrow")[0].classList.remove("accordion-opened");
        }
    }

  hideDivBoxesAndArrows(){
    var boxes = document.getElementsByClassName("form-box");
    var arrows = document.getElementsByClassName("accordion-opened");
    for(let i = 0; i < boxes.length; i++){
      boxes[i].style.display = "none";
    }

    for(let i = 0; i< arrows.length; i++){
      arrows[i].classList.remove("accordion-opened");
    }
  }

  render() {
    return (
    <div>
      <Header />
      <div class = "div-spacer"></div>
      <div class="page my-account" role="main">
        <div class="row change-options">
            <div class="large-9 columns">
              <div class="panel-group">
                  <div class="panel accordion-head" data-accordion-target="basic-info-form" onClick = {this.handleBasicInfoClick.bind(this)}>
                    <h2 class="basic-info-header heading-style-1 heading-size-l profile-headers" > Basic Information</h2>
                    <div class="basic-info-arrow accordion-arrow accordion-opened"></div>
                  </div>
                  <div class="panel form-box hidden-basic-form" id="basic-info-form">
                      <div className='text-danger'>
                          {this.state.error}
                      </div>
                      <br/>
                    <div class="row">
                        <div class="large-6 columns">
                          <label >First Name</label>
                          <input name="ctl00$ctl00$GlobalBody$Body$FirstName" placeholder = "Enter First Name" type="text" onChange={this.handleChange}
                                 value={this.state.FirstName} maxlength="80" id="FirstName" />
                        </div>
                        <div class="large-6 columns">
                          <label >Last Name</label>
                          <input name="ctl00$ctl00$GlobalBody$Body$LastName" type="text" placeholder = "Enter Last Name" onChange={this.handleChange}
                                 value={this.state.LastName} maxlength="80" id="LastName" />
                        </div>
                    </div>


                    <div class="row">
                        <div class="large-10 columns">
                          <label >Address</label>
                          <input placeholder = "Enter Address" name="ctl00$ctl00$GlobalBody$Body$FirstName" type="text" onChange={this.handleChange}
                                 value={this.state.address} maxlength="80" id="address" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="large-6 columns">
                          <label >City</label>
                          <input placeholder = "Enter City" name="ctl00$ctl00$GlobalBody$Body$FirstName" type="text" onChange={this.handleChange}
                                 value={this.state.city} maxlength="80" id="city" />
                        </div>
                        <div class="large-6 columns">
                          <label >State</label>
                          <select class="form-control" value={this.state.state_name} onChange={this.handleChange} id="state_name" onChange = {this.handleChange} >
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="large-6 columns">
                          <label >Zipcode</label>
                          <input name="ctl00$ctl00$GlobalBody$Body$FirstName" type="text" onChange={this.handleChange}
                                 placeholder = "Enter Zipcode" value={this.state.ZipCode} maxlength="80" id="ZipCode" />
                        </div>
                        <div class="large-6 columns">
                          <label >Contact Number</label>
                          <input name="ctl00$ctl00$GlobalBody$Body$LastName" type="text" onChange={this.handleChange}
                                 placeholder = "Enter Contact Number" value={this.state.phone} maxlength="80" id="phone" />
                        </div>
                        <div class="large-5 columns">
                        </div>
                        <div class="large-7 columns right-40">
                          <a id="save-basic" class="btn save-button" onClick={this.handleSaveBasicInfo} >Save</a>
                        </div>
                    </div>
                </div>
                  
              </div>

              <div class="panel-group">
                  <div class="panel accordion-head" data-accordion-target="profile-image-form" onClick = {this.handleProfileImageClick.bind(this)}>
                    <h2 class="profile-image-header heading-style-1 heading-size-l profile-headers" > Profile Image</h2>
                    <div class="profile-image-arrow accordion-arrow"></div>
                  </div>
                  <div class="panel form-box accordion-body accordion-closed" id="profile-image-form">
                      <br/>
                    <div class="row">
                    <ProfileImage/>  
                    </div>
                  </div>
              </div>

              <div class="panel-group">
                  <div class="panel accordion-head" data-accordion-target="email-form" onClick={this.handleEmailChangeClick.bind(this)}>
                    <table>
                        <tr>
                          <td class="accordion-header">
                              <h2 class="heading-style-1 heading-size-l profile-headers">Change Email</h2>
                          </td>
                          <td>
                              <div class="sub-head">Change the email address for your Fandango VIP account</div>
                          </td>
                        </tr>
                    </table>
                    <div class="email-change-arrow accordion-arrow"></div>
                  </div>
                  <div class="panel form-box accordion-body accordion-closed" id="email-form">
                    <div class="large-12 columns">
                    </div>
                      <div className='text-danger' >
                          {this.state.error}
                      </div>
                      <br/>
                    <div class="large-6 columns">
                        <label> Current Email </label>
                        <input type="text" id="email" value={this.state.email} disabled />
                    </div>
                    <div class="large-6 columns">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                    <div class="large-6 columns">
                        <label > New Email </label>
                        <input type="text" id="newEmail" onChange={this.handleChange} />
                    </div>
                    <div class="large-6 columns right-25">
                        <a id="save-email" class="btn save-button" onClick={this.handleSaveEmail} >Save</a>
                    </div>
                    
                  </div>
              </div>

              <div class="panel-group">
                  <div class="panel accordion-head" data-accordion-target="password-form" onClick={this.handlePasswordChangeClick.bind(this)}>
                    <table>
                        <tr>
                          <td class="accordion-header">
                              <h2 class="heading-style-1 heading-size-l profile-headers">Change Password</h2>
                          </td>
                          <td>
                              <div class="sub-head">Change the password for your Fandango VIP account</div>
                          </td>
                        </tr>
                    </table>
                    <div class="password-change-arrow accordion-arrow"></div>
                  </div>
                  <div class="panel form-box accordion-body accordion-closed" id="password-form">
                      <div className='text-danger'>
                          {this.state.error}
                      </div>
                      <br/>
                    <div class="large-12 columns">
                        Use 8 or more characters.
                        <br /><br />
                        <label> Current Password </label>
                        <input type="password" id="oldPassword" onChange={this.handleChange} class="vip-password-field" />
                    </div>
                    <div class="large-12 columns">
                        <label> New Password </label>
                        <input type="password" id="newPassword" onChange={this.handleChange} class="vip-password-field" />
                    </div>

                    <div class="large-3 columns right-25 password-save">
                        <a id="save-password" class="btn save-button" onClick={ this.handleSavePasswordUpdate }>Save</a>
                    </div>
                  </div>
              </div>
              
              <div class="panel-group">
                  <div class="panel accordion-head" data-accordion-target="payment-form" onClick = {this.handlePaymentClick.bind(this)}>
                    <table>
                        <tr>
                          <td class="accordion-header">
                              <h2 class="heading-style-1 heading-size-l profile-headers">Payment Method</h2>
                          </td>
                          <td>
                              <div class="sub-head double-line">Save a credit or debit card to your account. We can make checkout even faster for you. (It's optional, of course.)</div>
                          </td>
                        </tr>
                    </table>
                    <div class="payment-arrow accordion-arrow"></div>
                  </div>

                  <div class="panel form-box accordion-body accordion-closed" id="payment-form">
                    <div class="large-12 columns">
                        <div class="credit-card-logos">
                          <span class="visa"></span>                         
                          <span class="amex"></span>                         
                          <span class="mastercard"></span>                         
                          <span class="discover"></span>
                        </div>
                    </div>
                      <div className='text-danger'>
                          {this.state.error}
                      </div>
                      <br/>
                    <div class="large-12 columns">
                    </div>
                    <div class="large-12 columns">
                        <label class="" for="">Card Number</label>
                        <input name="ctl00$ctl00$GlobalBody$Body$CardNumber" type="text" maxlength="19" id="CardNumber"
                               value={this.state.CardNumber} onChange={this.handleChange} class="user-password" />
                    </div>
                    <div class="large-12 columns">
                        <label class="" for="userExpDate">Expiration Date</label>
                        <br/>
                        <div class="form-row">
                            <div className="form-group col-md-2">
                                <select name="ctl00$ctl00$GlobalBody$Body$ExpirationMonth" id="ExpirationMonth" value={this.state.ExpirationMonth} onChange={this.handleChange} class="user-card-month">
                                    <option value="">Month</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                 </select>
                            </div>

                            <div className="form-group col-md-6">
                                <select name="ctl00$ctl00$GlobalBody$Body$ExpirationYear" id="ExpirationYear" value={this.state.ExpirationYear} onChange={this.handleChange} class="user-card-year">
                                    <option value="">Year</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                </select>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div class="large-6 payment-zip columns ">
                        <label class="" for="">Billing ZIP Code</label>
                        <input name="ctl00$ctl00$GlobalBody$Body$ZipCode" type="text" maxlength="10"
                               value={this.state.cardZipCode} id="cardZipCode" onChange={this.handleChange} class="user-zip" />
                    </div>
                    <div class="large-6 columns right-25 payment-zip-columns">
                        <a id="save-cc" class="btn save-button" onClick={this.handleUserCardDetails.bind(this)} >Save</a>
                        <a id="delete-cc" class="btn save-button hide" data-reveal-id="delete-modal">Delete</a>
                    </div>
                    <div id="delete-modal" class="reveal-modal small review-delete-modal" data-reveal>
                        <h3 class="heading-style-1 heading-size-l">Delete Payment Method</h3>
                        <p>
                          Are you sure you want to delete <strong></strong> as your payment method?
                        </p>
                        <a class="btn btn-secondary" id="payment-cancel-link">Cancel</a> &nbsp; <a class="btn" id="delete-cc-confirm">Delete</a>
                        <a class="close-reveal-modal">&#215;</a>
                    </div>
                  </div>
              </div>

                <div class="panel-group">
                    <div class="panel accordion-head" data-accordion-target="delete-info-form" onClick = {this.handleDeleteClick.bind(this)}>
                        <h2 class="delete-info-form heading-style-1 heading-size-l profile-headers" > Delete Account</h2>
                        <div class="delete-info-arrow accordion-arrow"></div>
                    </div>
                    <div class="panel form-box accordion-body accordion-closed" id="delete-info-form">
                        <div className='text-danger'>
                            {this.state.error}
                        </div>
                        <br/>
                        <div class="row">
                            <div class="large-8 columns">
                                <label >Enter Reason to Leave us</label>
                                <br/>
                                <small></small>
                                <br/>
                                <br/>
                                <input name="ctl00$ctl00$GlobalBody$Body$LeaveComment" type="text"
                                        maxlength="80" id="LeaveComment" />
                            </div>
                            <div id="divDeleteAccountButton" class="large-4 columns right-40">
                                <a id="save-basic" class="btn save-button" onClick={this.handleDelete} >Delete Account</a>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
            <div class="large-3 columns">
              
              <div class="ad-unit ad-boxaddt" id="boxaddt">
                  
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
    )
  }
}

export default AccountSettings;
