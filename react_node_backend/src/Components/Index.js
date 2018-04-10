import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Footer from './Footer';
import '../assets/css/home1.css';
import '../assets/css/home2.css';
import { Link } from 'react-router-dom';



class Index extends Component {

    render() {
        return (
            <div id="page-top">

    {/* <!-- Navigation --> */}
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
      <img className="logo" src="https://cdn6.f-cdn.com/build/icons/fl-logo.svg" alt="" height="40" width="170" />
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
            <Link to="/signup">  <a class="nav-link js-scroll-trigger btn btn-warning" href="#about">Sign Up</a></Link>
            </li>
            <li class="nav-item">
            <Link to="/login">   <a class="nav-link js-scroll-trigger btn btn-warning ml-3" href="#download">Log In</a></Link>
            </li>
            {/* <li class="nav-item ml-2">
            <Link to="/postproject"> <button type="button" class="btn btn-warning">Post a Project</button></Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>

    <header class="masthead">
      <div class="intro-body">
        <div class="container">
          <div class="row">
            <div class="mx-auto mr-5">
              <h1 class="main-heading" >Hire expert freelancers<br/>for any job, online</h1>
              <p class="intro-text">Millions of small businesses use Freelancer to turn their ideas into reality.</p>
              <a href="#about" class="btn btn-circle js-scroll-trigger">
                <i class="fa fa-angle-double-down animated"></i>
              </a>
            </div>
          </div>
        </div>
      </div><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer />
      
    </header>
 

  </div>


        );
    }
}
export default withRouter(Index);