import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Footer from './Footer';
import { Link } from 'react-router-dom';
import LatestMovies from './LatestMovies';
import MovieSlider from './MovieSlider';
import Header from './Header';
var LogAPI = require('../utils/logging');


class Index extends Component {
  componentWillMount(){
    let click = {
      pageClick: {
          email: "anonymous",
          pageName: "Fandango Home",
          timeStamp: new Date().getTime()
      }
  };
  console.log(click);
  LogAPI.logUserClicks(click);

}
    render() {
        return (
            <div>
              <Header/>
              <h1 class="h1-seo">Movie Tickets and Times</h1>
              <section class="home-module">
                <section class="movie-tickets-header">
                  <div class="row">
                    <div class="width-50 mobile-width-60 columns movie-tickets-header--container">
                      <h2 class="movie-tickets-header--heading heading-size-l heading-style-1 inline">BUY MOVIE TICKETS</h2>
                      <a class="movie-tickets-header--see-all inline" href="https://www.fandango.com/moviesintheaters">See All Movies</a>
                    </div>
                  </div>
                </section>
              </section>
              <div id="page-top">
                <div id="page" role="main"> 
                  <section class="home-module">
                    <div class="row layout-content-sidebar">
                      {/* <div class="right sidebar tablet-width-100 homeMovieCarousel--ad-wrapper"> */}
                      <div class="tablet-width-100 homeMovieCarousel--ad-wrapper">
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