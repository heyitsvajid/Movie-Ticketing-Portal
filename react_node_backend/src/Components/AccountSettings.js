import React, { Component } from 'react';
import axios from 'axios';
import Index from './Index';
import Header from './Header';
import Footer from './Footer';
// import SignIn from './SignIn';
// import SignUp from './SignUp';

class AccountSettings extends Component {
  constructor(props) {
    super(props);
  }

  handleBasicInfoClick(e){
    var basic_info_element = document.getElementById("basic-info-form");
    if(basic_info_element.style.display == "none" || basic_info_element.style.display == ""){
      this.hideDivBoxesAndArrows();
      basic_info_element.style.display = "block";
      document.getElementsByClassName("basic-info-arrow")[0].classList.add("accordion-opened");
    }
    else{
      basic_info_element.style.display = "none";
      document.getElementsByClassName("basic-info-arrow")[0].classList.remove("accordion-opened");
    }
  }

  handleEmailChangeClick(e){
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
                    <h2 class="basic-info-header heading-style-1 heading-size-l profile-headers" >Basic Information</h2>
                    <div class="basic-info-arrow accordion-arrow accordion-opened"></div>
                  </div>
                  <div class="panel form-box hidden-basic-form" id="basic-info-form">
                    <div class="row">
                        <div class="large-6 columns">
                          <label class="" for="">First Name</label>
                          <input name="ctl00$ctl00$GlobalBody$Body$FirstName" type="text" value="Murtaza" maxlength="80" id="FirstName" />
                        </div>
                        <div class="large-6 columns">
                          <label class="" for="">Last Name</label>
                          <input name="ctl00$ctl00$GlobalBody$Body$LastName" type="text" maxlength="80" id="LastName" />
                        </div>
                        <div class="large-5 columns">
                          <label class="" for="">Display Name</label>
                          <div class="special-note">This name will appear publicly when you rate and review movies.</div>
                          <input name="ctl00$ctl00$GlobalBody$Body$DisplayName" type="text" value="murtazamanasawala110" maxlength="25" id="DisplayName" />
                        </div>
                        <div class="large-7 columns right-40">
                          <a id="save-basic" class="btn save-button">Save</a>
                        </div>
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
                    <div class="large-6 columns">
                        <label class="" for="email">New Email<span id="new-email-asterisk">*</span></label>
                        <input type="text" id="email" />
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
                        <label class="" for="userEmailConfirm">Confirm Email</label>
                        <input type="text" id="confEmail" />
                    </div>
                    <div class="large-6 columns right-25">
                        <a id="save-email" class="btn save-button">Save</a>
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
                    <div class="large-12 columns">
                        Use 8 or more characters with a letter and a number or symbol. No more than 3 of the same character in a row.
                        <br /><br />
                        <label class="" for="oldPassword">Current Password</label>
                        <input type="password" id="oldPassword" class="vip-password-field" />
                    </div>
                    <div class="large-12 columns">
                        <label class="" for="newPassword">New Password</label>
                        <input type="password" id="newPassword" class="vip-password-field" />
                    </div>
                    {/* <div class="large-9 columns">
                        <label class="" for="confPassword">Confirm Password</label>
                        <input type="password" id="confPassword" class="vip-password-field" />
                    </div> */}
                    <div class="large-3 columns right-25 password-save">
                        <a id="save-password" class="btn save-button">Save</a>
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
                    <div class="large-12 columns">
                    </div>
                    <div class="large-12 columns">
                        <label class="" for="">Card Number</label>
                        <input name="ctl00$ctl00$GlobalBody$Body$CardNumber" type="text" maxlength="19" id="CardNumber" class="user-password" />
                    </div>
                    <div class="large-12 columns">
                        <label class="" for="userExpDate">Expiration Date</label>
                        <br/>
                        <select name="ctl00$ctl00$GlobalBody$Body$ExpirationMonth" id="ExpirationMonth" class="user-card-month">
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
                        <select name="ctl00$ctl00$GlobalBody$Body$ExpirationYear" id="ExpirationYear" class="user-card-year">
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
                    <div class="large-6 payment-zip columns ">
                        <label class="" for="">Billing ZIP Code</label>
                        <input name="ctl00$ctl00$GlobalBody$Body$ZipCode" type="text" maxlength="10" id="ZipCode" class="user-zip" />
                    </div>
                    <div class="large-6 columns right-25 payment-zip-columns">
                        <a id="save-cc" class="btn save-button">Save</a>
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
