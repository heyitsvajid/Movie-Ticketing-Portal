import React, { Component } from 'react';
import axios from 'axios';
import Index from './Index';
import Header from './Header';
import Footer from './Footer';
// import SignIn from './SignIn';
// import SignUp from './SignUp';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount(){
    document.getElementById("scroll-date-picker__list").style.left = "0px";
  }

  handleRightClick(){
    if(parseInt(document.getElementById("scroll-date-picker__list").style.left) != -6027){
      let new_pixel = parseInt(document.getElementById("scroll-date-picker__list").style.left) - 861;
      document.getElementById("scroll-date-picker__list").style.left = new_pixel + "px";
      var right_element = document.getElementById("date-right");
      var left_element = document.getElementById("date-left");
      left_element.classList.remove("flipper--hide");
      new_pixel == -6027 ? right_element.classList.add("flipper--hide") : right_element.classList.remove("flipper--hide");
    }
  }

  handleLeftClick(){
    if(parseInt(document.getElementById("scroll-date-picker__list").style.left) != 0){
      let new_pixel = parseInt(document.getElementById("scroll-date-picker__list").style.left) + 861
      document.getElementById("scroll-date-picker__list").style.left = new_pixel + "px";
      var right_element = document.getElementById("date-right");
      var left_element = document.getElementById("date-left");
      right_element.classList.remove("flipper--hide");
      new_pixel == 0 ? left_element.classList.add("flipper--hide") : left_element.classList.remove("flipper--hide");
    }
  }

  render() {
    return (
    <div>
      <Header />
      <div id="page" role="main">
        <div class="tsp">
            <section class="subnav">
              <div class="row">
                  <div class="width-100">
                    <h1 class="subnav__title heading-style-1 heading-size-xl timing-header">
                        Movie times + Tickets
                        <span class="subnav__title--accent">
                        near You
                        <span class="js-subnav__user-location"></span>
                        </span>
                    </h1>
                    <ul class="subnav__link-list">
                        <li class="subnav__link-item">
                          <a class="subnav__link subnav__link--active" href="/95101_movietimes">
                          All theaters
                          </a>
                        </li>
                        <li class="subnav__link-item">
                          <a class="subnav__link" href="/95101_movietimes?ticketedonly=true">
                          Fandango Ticketing Theaters
                          </a>
                        </li>
                        <li class="subnav__link-item">
                          <a class="subnav__link" href="/95101_movietimes?mytheaters=true">
                          My theaters
                          </a>
                        </li>
                    </ul>
                  </div>
              </div>
            </section>
            <section class="row">
              <div class="width-75 tablet-width-100">
                  {/* <div class="date-picker__location">
                    <div class="date-picker__error js-date-picker__error hide"></div>
                    <div class="date-picker__message js-date-picker-msg hide">
                        <h3 class="date-picker__message-title heading-size-l heading-style-1">
                          <i class="icon icon-location-white"></i>
                          Looking for movie tickets? Tell us where you are.
                        </h3>
                    </div>
                    <span class="date-picker__location-text">ENTER CITY, STATE OR ZIP CODE</span>
                    <input
                        class="date-picker__location-input js-date-input"
                        placeholder="City, State or Zip Code"
                        type="text"
                        />
                    <a href="#" class="date-picker__location-submit js-date-picker-btn">GO</a>
                  </div> */}
                  <div class="date-picker__wrap">
                    <section class="date-picker carousel js-movie-calendar carousel-style-strip" data-jcarousel="true">
                        <ul id="scroll-date-picker__list" class="carousel-items" >
                          <li class="date-picker__date date-picker__date--selected" data-show-time-date="2018-04-18">
                              <a href="?date=2018-04-18" class="date-picker__link">
                              <span class="date-picker__date-weekday">Today</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">18</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-04-19">
                              <a href="?date=2018-04-19" class="date-picker__link">
                              <span class="date-picker__date-weekday">Thur</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">19</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-04-20">
                              <a href="?date=2018-04-20" class="date-picker__link">
                              <span class="date-picker__date-weekday">Fri</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">20</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-04-21">
                              <a href="?date=2018-04-21" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sat</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">21</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-04-22">
                              <a href="?date=2018-04-22" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sun</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">22</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-04-23">
                              <a href="?date=2018-04-23" class="date-picker__link">
                              <span class="date-picker__date-weekday">Mon</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">23</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-04-24">
                              <a href="?date=2018-04-24" class="date-picker__link">
                              <span class="date-picker__date-weekday">Tues</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">24</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-04-25">
                              <a href="?date=2018-04-25" class="date-picker__link">
                              <span class="date-picker__date-weekday">Wed</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">25</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-04-26">
                              <a href="?date=2018-04-26" class="date-picker__link">
                              <span class="date-picker__date-weekday">Thur</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">26</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-04-27">
                              <a href="?date=2018-04-27" class="date-picker__link">
                              <span class="date-picker__date-weekday">Fri</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">27</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-04-28">
                              <a href="?date=2018-04-28" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sat</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">28</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-04-29">
                              <a href="?date=2018-04-29" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sun</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">29</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-04-30">
                              <a href="?date=2018-04-30" class="date-picker__link">
                              <span class="date-picker__date-weekday">Mon</span>
                              <span class="date-picker__date-month">Apr</span>
                              <span class="date-picker__date-day">30</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-01">
                              <a href="?date=2018-05-01" class="date-picker__link">
                              <span class="date-picker__date-weekday">Tues</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">01</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-02">
                              <a href="?date=2018-05-02" class="date-picker__link">
                              <span class="date-picker__date-weekday">Wed</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">02</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-03">
                              <a href="?date=2018-05-03" class="date-picker__link">
                              <span class="date-picker__date-weekday">Thur</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">03</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-04">
                              <a href="?date=2018-05-04" class="date-picker__link">
                              <span class="date-picker__date-weekday">Fri</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">04</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-05">
                              <a href="?date=2018-05-05" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sat</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">05</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-06">
                              <a href="?date=2018-05-06" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sun</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">06</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-07">
                              <a href="?date=2018-05-07" class="date-picker__link">
                              <span class="date-picker__date-weekday">Mon</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">07</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-08">
                              <a href="?date=2018-05-08" class="date-picker__link">
                              <span class="date-picker__date-weekday">Tues</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">08</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-09">
                              <a href="?date=2018-05-09" class="date-picker__link">
                              <span class="date-picker__date-weekday">Wed</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">09</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-10">
                              <a href="?date=2018-05-10" class="date-picker__link">
                              <span class="date-picker__date-weekday">Thur</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">10</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-11">
                              <a href="?date=2018-05-11" class="date-picker__link">
                              <span class="date-picker__date-weekday">Fri</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">11</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-12">
                              <a href="?date=2018-05-12" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sat</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">12</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-13">
                              <a href="?date=2018-05-13" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sun</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">13</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-14">
                              <a href="?date=2018-05-14" class="date-picker__link">
                              <span class="date-picker__date-weekday">Mon</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">14</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-15">
                              <a href="?date=2018-05-15" class="date-picker__link">
                              <span class="date-picker__date-weekday">Tues</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">15</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-16">
                              <a href="?date=2018-05-16" class="date-picker__link">
                              <span class="date-picker__date-weekday">Wed</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">16</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-17">
                              <a href="?date=2018-05-17" class="date-picker__link">
                              <span class="date-picker__date-weekday">Thur</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">17</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-18">
                              <a href="?date=2018-05-18" class="date-picker__link">
                              <span class="date-picker__date-weekday">Fri</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">18</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-19">
                              <a href="?date=2018-05-19" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sat</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">19</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-20">
                              <a href="?date=2018-05-20" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sun</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">20</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-21">
                              <a href="?date=2018-05-21" class="date-picker__link">
                              <span class="date-picker__date-weekday">Mon</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">21</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-22">
                              <a href="?date=2018-05-22" class="date-picker__link">
                              <span class="date-picker__date-weekday">Tues</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">22</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-23">
                              <a href="?date=2018-05-23" class="date-picker__link">
                              <span class="date-picker__date-weekday">Wed</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">23</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-24">
                              <a href="?date=2018-05-24" class="date-picker__link">
                              <span class="date-picker__date-weekday">Thur</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">24</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-25">
                              <a href="?date=2018-05-25" class="date-picker__link">
                              <span class="date-picker__date-weekday">Fri</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">25</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-26">
                              <a href="?date=2018-05-26" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sat</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">26</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-27">
                              <a href="?date=2018-05-27" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sun</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">27</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-28">
                              <a href="?date=2018-05-28" class="date-picker__link">
                              <span class="date-picker__date-weekday">Mon</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">28</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-29">
                              <a href="?date=2018-05-29" class="date-picker__link">
                              <span class="date-picker__date-weekday">Tues</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">29</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-30">
                              <a href="?date=2018-05-30" class="date-picker__link">
                              <span class="date-picker__date-weekday">Wed</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">30</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-05-31">
                              <a href="?date=2018-05-31" class="date-picker__link">
                              <span class="date-picker__date-weekday">Thur</span>
                              <span class="date-picker__date-month">May</span>
                              <span class="date-picker__date-day">31</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-06-01">
                              <a href="?date=2018-06-01" class="date-picker__link">
                              <span class="date-picker__date-weekday">Fri</span>
                              <span class="date-picker__date-month">Jun</span>
                              <span class="date-picker__date-day">01</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-06-02">
                              <a href="?date=2018-06-02" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sat</span>
                              <span class="date-picker__date-month">Jun</span>
                              <span class="date-picker__date-day">02</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-06-03">
                              <a href="?date=2018-06-03" class="date-picker__link">
                              <span class="date-picker__date-weekday">Sun</span>
                              <span class="date-picker__date-month">Jun</span>
                              <span class="date-picker__date-day">03</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-06-04">
                              <a href="?date=2018-06-04" class="date-picker__link">
                              <span class="date-picker__date-weekday">Mon</span>
                              <span class="date-picker__date-month">Jun</span>
                              <span class="date-picker__date-day">04</span>
                              </a>
                          </li>
                          <li class="
                              date-picker__date 
                              " data-show-time-date="2018-06-05">
                              <a href="?date=2018-06-05" class="date-picker__link">
            <span class="date-picker__date-weekday">Tues</span>
            <span class="date-picker__date-month">Jun</span>
            <span class="date-picker__date-day">05</span>
            </a>
         </li>
         <li class="
            date-picker__date 
            " data-show-time-date="2018-06-06">
            <a href="?date=2018-06-06" class="date-picker__link">
            <span class="date-picker__date-weekday">Wed</span>
            <span class="date-picker__date-month">Jun</span>
            <span class="date-picker__date-day">06</span>
            </a>
         </li>
         <li class="
            date-picker__date 
            " data-show-time-date="2018-06-07">
            <a href="?date=2018-06-07" class="date-picker__link">
            <span class="date-picker__date-weekday">Thur</span>
            <span class="date-picker__date-month">Jun</span>
            <span class="date-picker__date-day">07</span>
            </a>
         </li>
         <li class="
            date-picker__date 
            " data-show-time-date="2018-06-08">
            <a href="?date=2018-06-08" class="date-picker__link">
            <span class="date-picker__date-weekday">Fri</span>
            <span class="date-picker__date-month">Jun</span>
            <span class="date-picker__date-day">08</span>
            </a>
         </li>
         <li class="
            date-picker__date 
            " data-show-time-date="2018-06-09">
            <a href="?date=2018-06-09" class="date-picker__link">
            <span class="date-picker__date-weekday">Sat</span>
            <span class="date-picker__date-month">Jun</span>
            <span class="date-picker__date-day">09</span>
            </a>
         </li>
         <li class="
            date-picker__date 
            " data-show-time-date="2018-06-10">
            <a href="?date=2018-06-10" class="date-picker__link">
            <span class="date-picker__date-weekday">Sun</span>
            <span class="date-picker__date-month">Jun</span>
            <span class="date-picker__date-day">10</span>
            </a>
         </li>
         <li class="
            date-picker__date 
            " data-show-time-date="2018-06-11">
            <a href="?date=2018-06-11" class="date-picker__link">
            <span class="date-picker__date-weekday">Mon</span>
            <span class="date-picker__date-month">Jun</span>
            <span class="date-picker__date-day">11</span>
            </a>
         </li>
         <li class="
            date-picker__date 
            " data-show-time-date="2018-06-12">
            <a href="?date=2018-06-12" class="date-picker__link">
            <span class="date-picker__date-weekday">Tues</span>
            <span class="date-picker__date-month">Jun</span>
            <span class="date-picker__date-day">12</span>
            </a>
         </li>
         <li class="
            date-picker__date 
            " data-show-time-date="2018-06-13">
            <a href="?date=2018-06-13" class="date-picker__link">
            <span class="date-picker__date-weekday">Wed</span>
            <span class="date-picker__date-month">Jun</span>
            <span class="date-picker__date-day">13</span>
            </a>
         </li>
         <li class="
            date-picker__date 
            " data-show-time-date="2018-06-14">
            <a href="?date=2018-06-14" class="date-picker__link">
            <span class="date-picker__date-weekday">Thur</span>
            <span class="date-picker__date-month">Jun</span>
            <span class="date-picker__date-day">14</span>
            </a>
         </li>
         <li class="
            date-picker__date 
            " data-show-time-date="2018-06-15">
            <a href="?date=2018-06-15" class="date-picker__link">
            <span class="date-picker__date-weekday">Fri</span>
            <span class="date-picker__date-month">Jun</span>
            <span class="date-picker__date-day">15</span>
            </a>
         </li>
         <li class="
            date-picker__date 
            " data-show-time-date="2018-06-16">
            <a href="?date=2018-06-16" class="date-picker__link">
            <span class="date-picker__date-weekday">Sat</span>
            <span class="date-picker__date-month">Jun</span>
            <span class="date-picker__date-day">16</span>
            </a>
         </li>
      </ul>
      <button id = "date-left" class="icon style-none left js-calendar-flipper-left flipper--hide" data-jcarouselcontrol="true" onClick = {this.handleLeftClick.bind(this)}>Previous</button>
      <button id = "date-right" class="icon style-none right js-calendar-flipper-right" data-jcarouselcontrol="true" onClick={this.handleRightClick.bind(this)}>Next</button>
   </section>
</div>
                  <div class="worry-free-cta__wrap">
                    <a href="#" class="cta worry-free-cta js-worry-free-cta">
                    <img src="https://images.fandango.com/fandango-www/screenplay/assets/images/desktop/global/wft-badge.be9fca955da.png" alt="Worry Free Ticketing" />
                    <span class="worry-free-cta__text">Refunds and Exchanges Now Available</span>
                    </a>
                  </div>
                  <div class="js-worry-free-modal worry-free-modal offer-dialog dialog hide-on-mobile style-lightbox animate-fade-in animate-speed-slow">
                    <div class="width-60 tablet-width-60 dialog-content animate-slide-down animate-speed-normal font-sans-serif-cond">
                        <button class="style-none close-modal"><span class="close-x icon-close">X</span></button>
                        <div class="worry-free-modal__content">
                          <div class="worry-free-modal__headline-wrapper">
                              <div class="worry-free-modal__headline"><span class="worry-free-modal__headline-text">Refunds &amp; Exchanges</span></div>
                          </div>
                          <h3 class="worry-free-modal__sub-title heading-size-s heading-style-2">Need a refund or exchange?  It's easy with our worry-free tickets.</h3>
                          <p class="worry-free-modal__text">Here's what's included with every worry-free ticket purchase:</p>
                          <ul class="worry-free-modal__list">
                              <li class="worry-free-modal__list-item">Peace of mind of a guaranteed ticket.</li>
                              <li class="worry-free-modal__list-item">We know life happens. You may exchange or request a refund for your entire order, less the convenience fee, through Fandango up until the posted showtime. You'll have to complete your refund and exchange before the posted showtime indicated
                                on your ticket.
                              </li>
                              <li class="worry-free-modal__list-item">We'll refund your credit card or we can credit your Fandango account to use for another movie. Your choice.</li>
                          </ul>
                        </div>
                        <div class="worry-free-modal__footer">
                          <p class="worry-free-modal__footer-text">Have more questions? Read our <a href="https://www.fandango.com/help">FAQs</a> or reach out to our <a href="https://fandango.custhelp.com/app/new_ask">customer service team</a>.</p>
                        </div>
                    </div>
                  </div>
                  <div class="js-spotlight-ad"></div>
                  <label class="nearby-theaters__label">Nearby Theaters: </label>
                  <select class="nearby-theaters__select js-nearby-theaters">
                    <option value="#">Select Theater</option>
                    <option value="/towne-3-cinemas-AAFRF/theater-page?date=2018/4/18">Towne 3 Cinemas</option>
                    <option value="/cinelux-almaden-cafe-and-lounge-AAFQQ/theater-page?date=2018/4/18">CineLux Almaden Cafe &amp; Lounge</option>
                    <option value="/cinearts-santana-row-AASUR/theater-page?date=2018/4/18">CinéArts @ Santana Row</option>
                    <option value="/amc-eastridge-15-AATUL/theater-page?date=2018/4/18">AMC Eastridge 15</option>
                    <option value="/pruneyard-cinemas-AAQND/theater-page?date=2018/4/18">Pruneyard Cinemas</option>
                    <option value="/century-20-great-mall-and-xd-AAPCG/theater-page?date=2018/4/18">Century 20 Great Mall and XD</option>
                    <option value="/cinelux-plaza-theatre-AAFQS/theater-page?date=2018/4/18">CineLux Plaza Theatre</option>
                    <option value="/8k-cinemas-milpitas-AAWTK/theater-page?date=2018/4/18">8K Cinemas Milpitas</option>
                    <option value="/amc-mercado-20-AADYN/theater-page?date=2018/4/18">AMC Mercado 20</option>
                    <option value="/century-20-oakridge-and-xd-AARBX/theater-page?date=2018/4/18">Century 20 Oakridge and XD</option>
                    <option value="/amc-saratoga-14-AAECU/theater-page?date=2018/4/18">AMC Saratoga 14</option>
                    <option value="/los-gatos-theatre-AAFRG/theater-page?date=2018/4/18">Los Gatos Theatre</option>
                    <option value="/century-cinemas-16-AACFX/theater-page?date=2018/4/18">Century Cinemas 16</option>
                    <option value="/century-at-pacific-commons-and-xd-AAWQB/theater-page?date=2018/4/18">Century at Pacific Commons and XD</option>
                    <option value="/amc-newpark-12-AAXSE/theater-page?date=2018/4/18">AMC NewPark 12</option>
                    <option value="/cinearts-palo-alto-square-AAPZL/theater-page?date=2018/4/18">CinéArts @ Palo Alto Square</option>
                    <option value="/hackworth-imax-dome-AANCI/theater-page?date=2018/4/18">Hackworth IMAX Dome</option>
                    <option value="/capitol-drive-in-AACFK/theater-page?date=2018/4/18">Capitol Drive-In</option>
                  </select>
                  <div class="fd-showtimes js-theaterShowtimes-loading">
                    <div class="printer-friendly">
                        <a class="cta" href="//www.fandango.com/theaterlistings-prn.aspx?location=95101&amp;pn=1&amp;sdate=4-18-2018&amp;tid=AAFRF,AAFQQ,AASUR,AATUL,AAQND,AAPCG,AAFQS,AAWTK,AANCI,AACFK">
                            Printer Friendly
                        </a>
                    </div>
                    <ul>
                      <li class="fd-theater" data-theater-id="AAFRF">
                        <div class="fd-theater__header">
                            <div class="fd-theater__promoted-amenity-wrap">
                              <span class="icon icon-amenity-print-at-home-tickets fd-theater__promoted-amenity js-amenity" data-amenity-name="Print at Home Tickets" data-amenity-desc="Print your tickets, go directly to the ticket taker and skip the box office line at many theaters.">Print at Home Tickets
                              </span>
                              <span class="icon icon-amenity-mobile-tickets fd-theater__promoted-amenity js-amenity" data-amenity-name="Mobile Tickets" data-amenity-desc="Send your ticket to your mobile device, go directly to the ticket taker and skip the box office line at many theaters.">Mobile Tickets
                              </span>
                            </div>
                            <div class="fd-theater__name-wrap">
                              <h3 class="fd-theater__name font-sans-serif font-lg font-300 uppercase">
                                  <a class="light" href="/towne-3-cinemas-AAFRF/theater-page">Towne 3 Cinemas</a>
                                  <button class="icon icon-follow-white fd-theater__follow-icon js-heartsAndStars-heart" data-type="Theater" data-id="AAFRF" data-name="Towne 3 Cinemas" data-is-favorite="false">
                                  </button>
                              </h3>
                            </div>
                            <div class="fd-theater__address-wrap">
                              <span>1433 The Alameda,</span>
                              <span>
                              San Jose,
                              CA
                              95126
                              </span>
                            </div>
                            <div class="fd-theater__links">
                              <a href="//www.fandango.com/maps/DrivingDirections.aspx?tid=AAFRF" target="_blank" rel="nofollow" class="font-sans-serif-cond font-sm">MAP</a>
                              <a class="fd-theater__amenities js-amenity font-sans-serif-cond font-sm" href="#" data-amenity-name="Theater Amenities" data-amenity-desc="<ul class=&quot;fd-theater__amenities-list&quot;><li>Print at Home Tickets</li><li>Mobile Tickets</li></ul>">AMENITIES</a>
                            </div>
                        </div>
                        <ul>
                            <li class="fd-movie">
                              <div class="fd-movie__poster">
                                  <a href="/ameerpet-2-america-211110/movie-overview">
                                  <img src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images.fandango.com/ImageRenderer/100/0/redesign/static/img/default_poster.png/0/redesign/static/img/default_poster.png" alt="" />
                                  </a>
                              </div>
                              <div class="fd-movie__details">
                                  <h3 class="fd-movie__title font-sans-serif font-lg font-300 uppercase">
                                    <a class="dark" href="/ameerpet-2-america-211110/movie-overview">AMEERPET 2 AMERICA</a>
                                    <button class="icon icon-follow-gray fd-movie__follow-icon js-heartsAndStars-heart" data-type="Movie" data-id="211110" data-name="AMEERPET 2 AMERICA" data-is-favorite="false">
                                    </button>
                                  </h3>
                                  <div class="fd-star-rating__container">
                                    <div class="js-fd-star-rating fd-star-rating " data-star-rating="4">
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211110" data-isnew="true" data-show-caption="true" data-value="5" title="Loved It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211110" data-isnew="true" data-show-caption="true" data-value="4" title="Really Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211110" data-isnew="true" data-show-caption="true" data-value="3" title="Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211110" data-isnew="true" data-show-caption="true" data-value="2" title="Disliked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211110" data-isnew="true" data-show-caption="true" data-value="1" title="Hated It">
                                        </a>
                                    </div>
                                  </div>
                                  <p class="fd-movie__rating-runtime">
                                    2 hr  <br />
                                    Drama
                                  </p>
                              </div>
                              <ul class="fd-movie__showtimes">
                                  <li class="fd-movie__showtimes-variant">
                                    <h3 class="fd-movie__showtimes__tick-headline font-serif">
                                        <span class="icon icon-ticket"></span>
                                        Select a movie time to buy Standard Showtimes
                                    </h3>
                                    <ul class="fd-movie__amentiy-list">
                                        <li class="fd-movie__amenity-icon-wrap">
                                          <a href="#" class=" fd-movie__amenity-icon js-amenity" data-amenity-desc="This film is presented in Telugu." data-amenity-name="Telugu">Telugu</a>
                                        </li>
                                    </ul>
                                    <ol class="fd-movie__btn-list">
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221139443&amp;tid=AAFRF&amp;sdate=2018-04-18+23:00&amp;mid=211110&amp;from=mov_det_showtimes">11:00p</a>
                                        </li>
                                    </ol>
                                  </li>
                              </ul>
                            </li>
                            <li class="fd-movie">
                              <div class="fd-movie__poster">
                                  <a href="/mercury-2018-210358/movie-overview">
                                  <img src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/MasterRepository/fandango/210358/mercury-Vertical3.jpg" alt="" />
                                  </a>
                              </div>
                              <div class="fd-movie__details">
                                  <h3 class="fd-movie__title font-sans-serif font-lg font-300 uppercase">
                                    <a class="dark" href="/mercury-2018-210358/movie-overview">Mercury (2018)</a>
                                    <button class="icon icon-follow-gray fd-movie__follow-icon js-heartsAndStars-heart" data-type="Movie" data-id="210358" data-name="Mercury (2018)" data-is-favorite="false">
                                    </button>
                                  </h3>
                                  <div class="fd-star-rating__container">
                                    <div class="js-fd-star-rating fd-star-rating " data-star-rating="5">
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="210358" data-isnew="true" data-show-caption="true" data-value="5" title="Loved It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="210358" data-isnew="true" data-show-caption="true" data-value="4" title="Really Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="210358" data-isnew="true" data-show-caption="true" data-value="3" title="Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="210358" data-isnew="true" data-show-caption="true" data-value="2" title="Disliked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="210358" data-isnew="true" data-show-caption="true" data-value="1" title="Hated It">
                                        </a>
                                    </div>
                                  </div>
                                  <p class="fd-movie__rating-runtime">
                                    1 hr 48 min <br />
                                    Drama, Suspense/Thriller
                                  </p>
                              </div>
                              <ul class="fd-movie__showtimes">
                                  <li class="fd-movie__showtimes-variant">
                                    <h3 class="fd-movie__showtimes__tick-headline font-serif">
                                        <span class="icon icon-ticket"></span>
                                        Select a movie time to buy Standard Showtimes
                                    </h3>
                                    <ul class="fd-movie__amentiy-list">
                                    </ul>
                                    <ol class="fd-movie__btn-list">
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221019557&amp;tid=AAFRF&amp;sdate=2018-04-18+13:45&amp;mid=210358&amp;from=mov_det_showtimes">1:45p</a>
                                        </li>
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221019553&amp;tid=AAFRF&amp;sdate=2018-04-18+16:00&amp;mid=210358&amp;from=mov_det_showtimes">4:00p</a>
                                        </li>
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221019554&amp;tid=AAFRF&amp;sdate=2018-04-18+18:15&amp;mid=210358&amp;from=mov_det_showtimes">6:15p</a>
                                        </li>
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221019555&amp;tid=AAFRF&amp;sdate=2018-04-18+20:30&amp;mid=210358&amp;from=mov_det_showtimes">8:30p</a>
                                        </li>
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221019556&amp;tid=AAFRF&amp;sdate=2018-04-18+22:45&amp;mid=210358&amp;from=mov_det_showtimes">10:45p</a>
                                        </li>
                                    </ol>
                                  </li>
                              </ul>
                            </li>
                            <li class="fd-movie">
                              <div class="fd-movie__poster">
                                  <a href="/orayiram-kinakkalal-211126/movie-overview">
                                  <img src="https//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images.fandango.com/ImageRenderer/100/0/redesign/static/img/default_poster.png/0/redesign/static/img/default_poster.png" alt=""/>
                                  </a>
                              </div>
                              <div class="fd-movie__details">
                                  <h3 class="fd-movie__title font-sans-serif font-lg font-300 uppercase">
                                    <a class="dark" href="/orayiram-kinakkalal-211126/movie-overview">Orayiram Kinakkalal</a>
                                    <button class="icon icon-follow-gray fd-movie__follow-icon js-heartsAndStars-heart" data-type="Movie" data-id="211126" data-name="Orayiram Kinakkalal" data-is-favorite="false">
                                    </button>
                                  </h3>
                                  <div class="fd-star-rating__container">
                                    <div class="js-fd-star-rating fd-star-rating " data-star-rating="">
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211126" data-isnew="true" data-show-caption="true" data-value="5" title="Loved It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211126" data-isnew="true" data-show-caption="true" data-value="4" title="Really Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211126" data-isnew="true" data-show-caption="true" data-value="3" title="Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211126" data-isnew="true" data-show-caption="true" data-value="2" title="Disliked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211126" data-isnew="true" data-show-caption="true" data-value="1" title="Hated It">
                                        </a>
                                    </div>
                                  </div>
                                  <p class="fd-movie__rating-runtime">
                                    2 hr 15 min <br/>
                                    Comedy
                                  </p>
                              </div>
                              <ul class="fd-movie__showtimes">
                                  <li class="fd-movie__showtimes-variant">
                                    <h3 class="fd-movie__showtimes__tick-headline font-serif">
                                        <span class="icon icon-ticket"></span>
                                        Select a movie time to buy Standard Showtimes
                                    </h3>
                                    <ul class="fd-movie__amentiy-list">
                                        <li class="fd-movie__amenity-icon-wrap">
                                          <a href="#" class=" fd-movie__amenity-icon js-amenity" data-amenity-desc="This film is presented in the Malayalam language." data-amenity-name="Malayalam">Malayalam</a>
                                        </li>
                                    </ul>
                                    <ol class="fd-movie__btn-list">
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221139440&amp;tid=AAFRF&amp;sdate=2018-04-18+20:00&amp;mid=211126&amp;from=mov_det_showtimes">8:00p</a>
                                        </li>
                                    </ol>
                                  </li>
                              </ul>
                            </li>
                            <li class="fd-movie">
                              <div class="fd-movie__poster">
                                  <a href="/subedar-joginder-singh-208979/movie-overview">
                                  <img src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/MasterRepository/fandango/208979/subedarjogindersingh-posterart.jpg" alt="" />
                                  </a>
                              </div>
                              <div class="fd-movie__details">
                                  <h3 class="fd-movie__title font-sans-serif font-lg font-300 uppercase">
                                    <a class="dark" href="/subedar-joginder-singh-208979/movie-overview">Subedar Joginder Singh</a>
                                    <button class="icon icon-follow-gray fd-movie__follow-icon js-heartsAndStars-heart" data-type="Movie" data-id="208979" data-name="Subedar Joginder Singh" data-is-favorite="false">
                                    </button>
                                  </h3>
                                  <div class="fd-star-rating__container">
                                    <div class="js-fd-star-rating fd-star-rating " data-star-rating="4.5">
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="208979" data-isnew="true" data-show-caption="true" data-value="5" title="Loved It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="208979" data-isnew="true" data-show-caption="true" data-value="4" title="Really Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="208979" data-isnew="true" data-show-caption="true" data-value="3" title="Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="208979" data-isnew="true" data-show-caption="true" data-value="2" title="Disliked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="208979" data-isnew="true" data-show-caption="true" data-value="1" title="Hated It">
                                        </a>
                                    </div>
                                  </div>
                                  <p class="fd-movie__rating-runtime">
                                    2 hr 20 min <br />
                                    Action/Adventure, Drama
                                  </p>
                              </div>
                              <ul class="fd-movie__showtimes">
                                  <li class="fd-movie__showtimes-variant">
                                    <h3 class="fd-movie__showtimes__tick-headline font-serif">
                                        <span class="icon icon-ticket"></span>
                                        Select a movie time to buy Standard Showtimes
                                    </h3>
                                    <ul class="fd-movie__amentiy-list">
                                        <li class="fd-movie__amenity-icon-wrap">
                                          <a href="#" class=" fd-movie__amenity-icon js-amenity" data-amenity-desc="This film is presented in Punjabi." data-amenity-name="Punjabi">Punjabi</a>
                                        </li>
                                    </ul>
                                    <ol class="fd-movie__btn-list">
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221139439&amp;tid=AAFRF&amp;sdate=2018-04-18+14:00&amp;mid=208979&amp;from=mov_det_showtimes">2:00p</a>
                                        </li>
                                    </ol>
                                  </li>
                              </ul>
                            </li>
                            <li class="fd-movie">
                              <div class="fd-movie__poster">
                                  <a href="/chal-mohan-ranga-telugu-210447/movie-overview">
                                  <img src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/MasterRepository/fandango/210447/Chal%20Mohan%20Ranga%20Thumbnail.jpg" alt="" />
                                  </a>
                              </div>
                              <div class="fd-movie__details">
                                  <h3 class="fd-movie__title font-sans-serif font-lg font-300 uppercase">
                                    <a class="dark" href="/chal-mohan-ranga-telugu-210447/movie-overview">Chal Mohan Ranga (Telugu)</a>
                                    <button class="icon icon-follow-gray fd-movie__follow-icon js-heartsAndStars-heart" data-type="Movie" data-id="210447" data-name="Chal Mohan Ranga (Telugu)" data-is-favorite="false">
                                    </button>
                                  </h3>
                                  <div class="fd-star-rating__container">
                                    <div class="js-fd-star-rating fd-star-rating " data-star-rating="4">
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="210447" data-isnew="true" data-show-caption="true" data-value="5" title="Loved It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="210447" data-isnew="true" data-show-caption="true" data-value="4" title="Really Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="210447" data-isnew="true" data-show-caption="true" data-value="3" title="Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="210447" data-isnew="true" data-show-caption="true" data-value="2" title="Disliked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="210447" data-isnew="true" data-show-caption="true" data-value="1" title="Hated It">
                                        </a>
                                    </div>
                                  </div>
                                  <p class="fd-movie__rating-runtime">
                                    2 hr 20 min <br />
                                    Comedy, Drama, Family
                                  </p>
                              </div>
                              <ul class="fd-movie__showtimes">
                                  <li class="fd-movie__showtimes-variant">
                                    <h3 class="fd-movie__showtimes__tick-headline font-serif">
                                        <span class="icon icon-ticket"></span>
                                        Select a movie time to buy Standard Showtimes
                                    </h3>
                                    <ul class="fd-movie__amentiy-list">
                                        <li class="fd-movie__amenity-icon-wrap">
                                          <a href="#" class=" fd-movie__amenity-icon js-amenity" data-amenity-desc="This film is presented in Telugu." data-amenity-name="Telugu">Telugu</a>
                                        </li>
                                    </ul>
                                    <ol class="fd-movie__btn-list">
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221139437&amp;tid=AAFRF&amp;sdate=2018-04-18+14:00&amp;mid=210447&amp;from=mov_det_showtimes">2:00p</a>
                                        </li>
                                    </ol>
                                  </li>
                              </ul>
                            </li>
                            <li class="fd-movie">
                              <div class="fd-movie__poster">
                                  <a href="/gultoo-211109/movie-overview">
                                  <img src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images.fandango.com/ImageRenderer/100/0/redesign/static/img/default_poster.png/0/redesign/static/img/default_poster.png" alt="" />
                                  </a>
                              </div>
                              <div class="fd-movie__details">
                                  <h3 class="fd-movie__title font-sans-serif font-lg font-300 uppercase">
                                    <a class="dark" href="/gultoo-211109/movie-overview">Gultoo</a>
                                    <button class="icon icon-follow-gray fd-movie__follow-icon js-heartsAndStars-heart" data-type="Movie" data-id="211109" data-name="Gultoo" data-is-favorite="false">
                                    </button>
                                  </h3>
                                  <div class="fd-star-rating__container">
                                    <div class="js-fd-star-rating fd-star-rating " data-star-rating="">
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211109" data-isnew="true" data-show-caption="true" data-value="5" title="Loved It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211109" data-isnew="true" data-show-caption="true" data-value="4" title="Really Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211109" data-isnew="true" data-show-caption="true" data-value="3" title="Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211109" data-isnew="true" data-show-caption="true" data-value="2" title="Disliked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="211109" data-isnew="true" data-show-caption="true" data-value="1" title="Hated It">
                                        </a>
                                    </div>
                                  </div>
                                  <p class="fd-movie__rating-runtime">
                                    <br/>
                                    Drama
                                  </p>
                              </div>
                              <ul class="fd-movie__showtimes">
                                  <li class="fd-movie__showtimes-variant">
                                    <h3 class="fd-movie__showtimes__tick-headline font-serif">
                                        <span class="icon icon-ticket"></span>
                                        Select a movie time to buy Standard Showtimes
                                    </h3>
                                    <ul class="fd-movie__amentiy-list">
                                        <li class="fd-movie__amenity-icon-wrap">
                                          <a href="#" class=" fd-movie__amenity-icon js-amenity" data-amenity-desc="This film is presented in the Kannada language." data-amenity-name="Kannada">Kannada</a>
                                        </li>
                                    </ul>
                                    <ol class="fd-movie__btn-list">
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221139438&amp;tid=AAFRF&amp;sdate=2018-04-18+17:00&amp;mid=211109&amp;from=mov_det_showtimes">5:00p</a>
                                        </li>
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221139441&amp;tid=AAFRF&amp;sdate=2018-04-18+20:00&amp;mid=211109&amp;from=mov_det_showtimes">8:00p</a>
                                        </li>
                                    </ol>
                                  </li>
                              </ul>
                            </li>
                            <li class="fd-movie">
                              <div class="fd-movie__poster">
                                  <a href="/rangasthalam-telugu-209878/movie-overview">
                                  <img src="https//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images.fandango.com/ImageRenderer/100/0/redesign/static/img/default_poster.png/0/redesign/static/img/default_poster.png" alt=""/>
                                  </a>
                              </div>
                              <div class="fd-movie__details">
                                  <h3 class="fd-movie__title font-sans-serif font-lg font-300 uppercase">
                                    <a class="dark" href="/rangasthalam-telugu-209878/movie-overview">Rangasthalam (Telugu)</a>
                                    <button class="icon icon-follow-gray fd-movie__follow-icon js-heartsAndStars-heart" data-type="Movie" data-id="209878" data-name="Rangasthalam (Telugu)" data-is-favorite="false">
                                    </button>
                                  </h3>
                                  <div class="fd-star-rating__container">
                                    <div class="js-fd-star-rating fd-star-rating " data-star-rating="4.5">
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="209878" data-isnew="true" data-show-caption="true" data-value="5" title="Loved It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="209878" data-isnew="true" data-show-caption="true" data-value="4" title="Really Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="209878" data-isnew="true" data-show-caption="true" data-value="3" title="Liked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="209878" data-isnew="true" data-show-caption="true" data-value="2" title="Disliked It">
                                        </a>
                                        <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="209878" data-isnew="true" data-show-caption="true" data-value="1" title="Hated It">
                                        </a>
                                    </div>
                                  </div>
                                  <p class="fd-movie__rating-runtime">
                                    2 hr 54 min <br/>
                                  </p>
                              </div>
                              <ul class="fd-movie__showtimes">
                                  <li class="fd-movie__showtimes-variant">
                                    <h3 class="fd-movie__showtimes__tick-headline font-serif">
                                        <span class="icon icon-ticket"></span>
                                        Select a movie time to buy Standard Showtimes
                                    </h3>
                                    <ul class="fd-movie__amentiy-list">
                                    </ul>
                                    <ol class="fd-movie__btn-list">
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221139436&amp;tid=AAFRF&amp;sdate=2018-04-18+16:35&amp;mid=209878&amp;from=mov_det_showtimes">4:35p</a>
                                        </li>
                                        <li class="fd-movie__btn-list-item">
                                          <a class="btn showtime-btn showtime-btn--available" href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=221139442&amp;tid=AAFRF&amp;sdate=2018-04-18+22:50&amp;mid=209878&amp;from=mov_det_showtimes">10:50p</a>
                                        </li>
                                    </ol>
                                  </li>
                              </ul>
                            </li>
                        </ul>
                        <div class="fd-theater__future-dates">
                            <h3 class="fd-theater__future-dates-text heading-size-s font-serif">More movies available on future dates.</h3>
                            <a href="/towne-3-cinemas-AAFRF/theater-page" class="btn">See Coming Attractions</a>
                        </div>
                      </li>
                    </ul>
                    {/* <div class="csspinner js-spinner"></div> */}
                    <div class="hide fd-showtimes__error-msg js-fd-showtimes__error-msg"></div>
                  </div>
                  <section class="more-theaters-links">
                    <a href="/movietimes/movies-by-city" class="dark more-theaters-links__link">Movie Times by Cities</a>
                    <a href="/movietimes/movies-by-state" class="dark more-theaters-links__link">Movie Times by States</a>
                    <a href="/movietimes/movies-by-zipcode" class="dark more-theaters-links__link">Movie Times by Zip Codes</a>
                    <a href="/movie-theaters" class="dark more-theaters-links__link">Movie Times by Theaters</a>
                  </section>
              </div>
              <div class="width-25 tablet-width-100">
                  <div class="ad-unit--sidebar">
                    <img class = "advertise" src={require('../assets/static_images/img12.png')} alt="Los Angeles"  />  
                  </div>
                  <div class="ad-unit--sidebar">
                    <div class="ad" data-unit="smallboxad" data-responsive="true" data-media="desktop,tablet">
                    </div>
                  </div>
                  <div class="ad-unit--sidebar">
                    <div class="ad" data-unit="boxadtwo" data-responsive="true" data-media="desktop,tablet">
                    </div>
                  </div>
              </div>
              <div class="js-flyout fd-amenity-flyout">
                  <span class="js-flyout__close fd-amenity-flyout__close">X</span>
                  <div class="js-flyout__title fd-amenity-flyout__title"></div>
                  <div class="js-flyout__desc fd-amenity-flyout__desc"></div>
              </div>
              <section class="favoriteFlyout js-heartsAndStars-flyout">
                  <div class="favoriteFlyout__message js-heartsAndStars-flyout-message"></div>
              </section>
            </section>
        </div>
      </div>
      <Footer />
    </div>
    )
  }
}

export default Layout;
