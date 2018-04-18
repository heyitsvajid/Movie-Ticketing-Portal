import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Footer from './Footer';
import '../assets/css/home1.css';
import '../assets/css/home2.css';
import { Link } from 'react-router-dom';
import LatestMovies from './LatestMovies';
import MovieSlider from './MovieSlider';
import Header from './Header';


class Index extends Component {

    render() {
        return (
            <div>
              <Header/>
              <div id="page-top">
                <div id="page" role="main"> 
                  <section class="home-module">
                    <div class="row layout-content-sidebar">
                      <div class="right sidebar tablet-width-100 homeMovieCarousel--ad-wrapper">
                        <div class="ad" data-unit="boxadm" data-responsive="true" data-media="mobile">
                        </div>
                        <div class="ad" data-unit="boxaddt" data-responsive="true" data-media="desktop,tablet">
                        </div>
                      </div>
                      <div class="tablet-width-100 content homeMovieCarousel--wrapper">
                        <LatestMovies />
                      </div>
                    </div>
                  </section>
                  <MovieSlider />               
                </div>
              </div>
              <Footer/>
            </div>
            
        );
    }
}
export default withRouter(Index);