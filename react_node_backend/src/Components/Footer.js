import React, { Component } from 'react';
import axios from 'axios';
import Index from './Index';
import EndFooter from './EndFooter';
import { envURL, reactURL } from '../config/environment';
import swal from 'sweetalert2'


class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList:[],
    }
  }

  componentWillMount() {
    let findAllMovieAPI = envURL + 'findAllMovie';
    axios.get(findAllMovieAPI)
      .then(res => {
        if (res.data.successMsg != '') {
          console.log('Fetching all movies');
          console.log(res.data.data);
          this.setState({
            movieList: res.data.data ? res.data.data : []
          })
        } else {
          console.error('Error Fetching all movie');
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  showMovieDetailsPage(e){
    const movieId = e.target.dataset.movieid;
    localStorage.setItem("movieID", movieId);
    window.location.href = reactURL + "movie_details";
  }

  renderLatestMovies() {
    let eightMovies = [];
    let new_movies = [];
    var movies = this.state.movieList;

    for(i = 0; i < movies.length; i++){
      new Date(movies[i].release_date) >= new Date() ? new_movies.push(movies[i]) : "";
    }

    if(movies.length>0){
      for(var i=0;i<8;i++){
        new_movies[i] != undefined ? eightMovies.push(new_movies[i]) : eightMovies.push("Coming Soon")
      }  
    }
    let moviesNode = eightMovies.map((item, index) => {
      var imageSource = item == "Coming Soon" ? require('../assets/static_images/defaut.jpeg') : require('../images/' + item.movie_logo);
      let movieAnchorTag = null;
      if(item == "Coming Soon"){
        movieAnchorTag = <a class="visual-container poster-thumb-size-s" href="#" >
            <img class="visual-thumb" style={{width: 131, height: 200, position: 'absolute', top: this.props.top, left: this.props.left}}
             src={imageSource} />
          </a>
      }
      else{
        movieAnchorTag = <a class="visual-container poster-thumb-size-s" data-movieID = {item._id} href="#" onClick = {this.showMovieDetailsPage.bind(this)}>
            <img class="visual-thumb" style={{width: 131, height: 200, position: 'absolute', top: this.props.top, left: this.props.left}}
             src={imageSource} alt={item.title} data-movieID = {item._id} onClick = {this.showMovieDetailsPage.bind(this)} />
          </a>
      }
      return (
        <li key={item == "Coming Soon" ? "" : item._id} class="media narrow footer-coming-soon--list-item">
          { movieAnchorTag}
          <div class="footer-coming-soon--info-block poster-thumb-size-s">
            <a class="heading-style-1 movie-header footer-coming-soon--heading" href="#" data-movieID = {item._id} onClick = {item == "Coming Soon" ? "" : this.showMovieDetailsPage.bind(this)}>{item == "Coming Soon" ? "Coming Soon" : item.title}</a>
          </div>
        </li>
      )
    });

    return (
      <ul class="footer-movies inline-items panel footer-coming-soon--list">
      { moviesNode }
      </ul>
    )
  }

  handleFanButtonClick(e){
    swal({
      type: 'success',
      title: 'Congratulations',
      text: 'You have successfully subscribed your movie updates'
    })
  }

  render() {
    return (
      <div>
        <footer id="global-footer">
          <section class="row width-100 hide-on-mobile">
            <h2 class="inline heading-style-stub heading-style-1 heading-size-l section-header">Offers</h2>
            <ul class="row panel footer-panel">
              <li class="width-25">
                <div class="media media-footer">
                  <a href="https://www.fandango.com/VIP-Plus?intcmp=IMA_VIPPLUS_merch">
                    <img src="https://images.fandango.com/images/spotlight/FND_Loyalty_300x150_v01.png" alt="&lt;b&gt;&#39;Ready Player One&#39; Gift With Purchase&lt;/b&gt;" />
                  </a>
                  <div>
                    <h3 class="heading-style-2 heading-size-s bold">WELCOME TO THE SUMMER OF MORE</h3>
                    <p>
			EARN 150 VIP+ POINTS FOR EVERY TICKET YOU BUY. 600 VIP+ Points unlocks a $6 reward.
			
				
                    <a href="https://www.fandango.com/ready-player-one-204139/movie-times?intcmp=IMA_RPOGWP_merch">BUY TICKETS</a>
                    </p>
                  </div>
                </div>
              </li>
              <li class="width-25">
                <div class="media media-footer">
                  <a href="https://www.fandango.com/a-wrinkle-in-time-203789/movie-times?intcmp=IMA_WrinkleinTimeGWP_merch">
                    <img src="https://images.fandango.com/images/spotlight/FD_Deadpool2_300x150_offerstrip_v1.png" alt="&lt;b&gt;&#39;A Wrinkle in Time&#39; Gift With Purchase&lt;/b&gt;" />
                  </a>
                  <div>
                    <h3 class="heading-style-2 heading-size-s bold">'Deadpool 2' Gift With Purchase</h3>
                    <p>
                      Receive a FREE* exclusive 'Deadpool 2' poster with ticket purchase (*shipping & handling not included).
                    <a href="https://www.fandango.com/a-wrinkle-in-time-203789/movie-times?intcmp=IMA_WrinkleinTimeGWP_merch">BUY TICKETS</a>
                    </p>
                  </div>
                </div>
              </li>
              <li class="width-25">
              
                <div class="media media-footer">
                  <a href="https://www.fandango.com/thoroughbreds-205562/movie-times?intcmp=IMA_ThoroughbredsGWP_merch">
                    <img src="https://images.fandango.com/images/spotlight/FD_Avengers_300x150_offerstrip_v1.png" alt="&lt;b&gt;&#39;Thoroughbreds&#39; Gift With Purchase&lt;/b&gt;" />
                  </a>
                  <div>
                    <h3 class="heading-style-2 heading-size-s bold">'Avengers: Infinity War' Gift With Purchase</h3>
                    <p>
                      Choose 1 of 5 FREE* exclusive posters with ticket purchase (*shipping & handling not included).
                    <a href="https://www.fandango.com/thoroughbreds-205562/movie-times?intcmp=IMA_ThoroughbredsGWP_merch">BUY TICKETS</a>
                    </p>
                  </div>
                </div>
              </li>
              <li class="width-25">
                <div class="media media-footer">
                  <a href="https://www.fandango.com/midnight-sun-2018-201176/movie-times?intcmp=IMA_MidnightSunGWP_merch">
                    <img src="https://images.fandango.com/images/spotlight/FNOW_April_300x150_NCO_v2.png" alt="&lt;b&gt;&#39;Midnight Sun&#39; Gift With Purchase&lt;/b&gt;" />
                  </a>
                  <div>
                    <h3 class="heading-style-2 heading-size-s bold">20% Off Your First Month on FandangoNOW</h3>
                    <p>
                    Watch the newest movies not available on Netflix, Hulu or Amazon Prime subscriptions. New customers get 20% off for 1 month!
                    <a href="https://www.fandango.com/midnight-sun-2018-201176/movie-times?intcmp=IMA_MidnightSunGWP_merch">BUY TICKETS</a>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </section>
          <section class="footer-coming-soon row width-100 hide-on-mobile">
            <h2 class="inline heading-style-stub heading-style-1 heading-size-l section-header">New + Coming soon</h2>
   
            {this.renderLatestMovies()}
          </section>
          <nav class="hide-on-mobile">
            <div class="row">
              <div class="width-25">
                <h3 class="heading-style-1 heading-size-m">Experience + Explore</h3>
                <ul class="footer-nav-list">
                  <li>
                    <a class="light" href="/moviesintheaters">Movies In Theaters</a>
                  </li>
                  <li>
                    <a class="light" href="/famous-actors-and-actresses">Movie Actors and Actresses</a>
                  </li>
                  <li>
                    <a class="light" href="/mobilemovietickets" rel="nofollow">Mobile</a>
                  </li>
                  <li>
                    <a class="light" href="/new-dvd-releases">New DVD Releases</a>
                  </li>
                  <li>
                    <a class="light" href="/freemovietickets">Special Offers</a>
                  </li>
                  <li>
                    <a class="light" href="/fandango-gift-cards">Gift Cards</a>
                  </li>
                </ul>
              </div>
              <div class="width-25">
                <h3 class="heading-style-1 heading-size-m">Editorial Features</h3>
                <ul>
                  <li>
                    <a class="light" href="http://www.fandango.com/movies/indie">Indie Movie Guide</a>
                  </li>
                  <li>
                    <a class="light" href="http://www.fandango.com/movies/family">Family Guide</a>
                  </li>
                  <li>
                    <a class="light" href="http://www.fandango.com/movie-news">Movie News</a>
                  </li>
                </ul>
              </div>
              <div class="width-25">
                <h3 class="heading-style-1 heading-size-m">Videos</h3>
                <ul>
                  <li>
                    <a class="light" href="http://www.fandango.com/movie-trailer/">Movie Trailers</a>
                  </li>
                  <li>
                    <a class="light" href="http://www.fandango.com/weekend-ticket/video_25">Weekend Ticket</a>
                  </li>
                  <li>
                    <a class="light" href="http://www.fandango.com/video-galleries/awards/81">Frontrunners</a>
                  </li>
                  <li>
                    <a class="light" href="http://www.fandango.com/moms-movie-minute/video_92">Mom&#39;s Movie Minute</a>
                  </li>
                </ul>
              </div>
              <div class="width-25">
                <h3 class="heading-style-1 heading-size-m">Photos</h3>
                <ul>
                  <li>
                    <a class="light" href="http://www.fandango.com/movie-photos/Red-Carpet-Premieres-36">Red Carpet Premieres</a>
                  </li>
                  <li>
                    <a class="light" href="http://www.fandango.com/movie-photos/april-celebrity-birthdays-760">April Celebrity Birthdays</a>
                  </li>
                  <li>
                    <a class="light" href="http://www.fandango.com/movie-photos/2018-award-red-carpets-1332">Award Shows Red Carpets</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <section id="site-utility-links" class="hide-on-mobile">
            <div class="row">
              <div class="width-25 tablet-width-40">
                <h3 class="heading-size-s heading-style-2">Get Updates On All Things Movies:</h3>
                <div id="fanmail-signup" class="fanmail-module">
                  <label for="footer-fanmail-email">Sign up for FanMail:</label>
                  <button onClick = {this.handleFanButtonClick.bind(this)} class="fan-btn fan-btn-style-default fan-btn-size-slim" id="footer-fanmail-submit" type="button">Submit</button>
                  <div>
                    <input id="footer-fanmail-email" type="email" placeholder="Enter Email Address" />
                  </div>
                  <div id="footer-fanmail-error" class="hide error-msg"></div>
                </div>
                <h3 class="heading-style-1 heading-size-m hide" id="fanmail-module-success">Thanks for signing up!</h3>
              </div>
              <div class="width-25 tablet-width-30">
                <h3 class="heading-size-s heading-style-2">Follow Us</h3>
                <a class="icon social-icon facebook" href="//facebook.com/fandango" rel="nofollow">Fandango on Facebook</a>
                <a class="icon social-icon twitter" href="//twitter.com/fandango" rel="nofollow">Fandango on Twitter</a>
                <a class="icon social-icon instagram" href="//instagram.com/fandango" rel="nofollow">Fandango on Instagram</a>
                <a class="icon social-icon google-plus" href="//plus.google.com/+fandango" rel="nofollow">Fandango on Google+</a>
                <a class="icon social-icon tumblr" href="//fandango.tumblr.com" rel="nofollow">Fandango on Tumblr</a>
                <a class="icon social-icon youtube" href="//youtube.com/fandangomovies" rel="nofollow">Fandango on Youtube</a>
              </div>
              <div class="width-25 tablet-width-30">
                <h3 class="heading-size-s heading-style-2">Get Fandango Apps</h3>
                <a class="icon apple-app-store" href="//itunes.apple.com/app/fandango-movies-times-tickets/id307906541?mt=8">Fandango iOS App</a>
                <a class="icon google-play-store" href="//play.google.com/store/apps/details?id=com.fandango">Fandango Android App</a>
              </div>
              <div class="width-25 tablet-width-100">
                <p id="site-narrative">
                  Guarantee the perfect movie night with tickets from Fandango.
                  Find theater showtimes, watch trailers, read reviews and buy movie tickets in advance.
                      </p>
              </div>
            </div>
          </section>
          <EndFooter />
        </footer>
      </div>
    )
  }
}

export default Footer;
