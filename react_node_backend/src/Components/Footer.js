import React, { Component } from 'react';
import axios from 'axios';
import Index from './Index';
import EndFooter from './EndFooter';

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
  
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
                <a href="https://www.fandango.com/ready-player-one-204139/movie-times?intcmp=IMA_RPOGWP_merch">
                <img src="https://images.fandango.com/images/spotlight/FD_ReadyPlayerOne_300x150_offerstrip_v1.png" alt="&lt;b&gt;&#39;Ready Player One&#39; Gift With Purchase&lt;/b&gt;" />
                </a>
                <div>
                  <h3 class="heading-style-2 heading-size-s bold">&#39;Ready Player One&#39; Gift With Purchase</h3>
                  <p>
                    Receive a FREE* exclusive 'Ready Player One' poster with ticket purchase (*shipping & handling not included).
                    <a href="https://www.fandango.com/ready-player-one-204139/movie-times?intcmp=IMA_RPOGWP_merch">BUY TICKETS</a>
                  </p>
                </div>
              </div>
            </li>
            <li class="width-25">
              <div class="media media-footer">
                <a href="https://www.fandango.com/a-wrinkle-in-time-203789/movie-times?intcmp=IMA_WrinkleinTimeGWP_merch">
                <img src="https://images.fandango.com/images/spotlight/FD_Wrinkle_300x150_offerstrip_v1.png" alt="&lt;b&gt;&#39;A Wrinkle in Time&#39; Gift With Purchase&lt;/b&gt;" />
                </a>
                <div>
                  <h3 class="heading-style-2 heading-size-s bold">&#39;A Wrinkle in Time&#39; Gift With Purchase</h3>
                  <p>
                    Receive a FREE* exclusive 'A Wrinkle in Time' poster with ticket purchase (*shipping & handling not included).
                    <a href="https://www.fandango.com/a-wrinkle-in-time-203789/movie-times?intcmp=IMA_WrinkleinTimeGWP_merch">BUY TICKETS</a>
                  </p>
                </div>
              </div>
            </li>
            <li class="width-25">
              <div class="media media-footer">
                <a href="https://www.fandango.com/thoroughbreds-205562/movie-times?intcmp=IMA_ThoroughbredsGWP_merch">
                <img src="https://images.fandango.com/images/spotlight/fd_Thoroughbred_300x150_offerstrip_v2.png" alt="&lt;b&gt;&#39;Thoroughbreds&#39; Gift With Purchase&lt;/b&gt;" />
                </a>
                <div>
                  <h3 class="heading-style-2 heading-size-s bold">&#39;Thoroughbreds&#39; Gift With Purchase</h3>
                  <p>
                    Receive a FREE* exclusive 'Thoroughbreds' t-shirt brought to you by Betches with ticket purchase (*shipping & handling not included).
                    <a href="https://www.fandango.com/thoroughbreds-205562/movie-times?intcmp=IMA_ThoroughbredsGWP_merch">BUY TICKETS</a>
                  </p>
                </div>
              </div>
            </li>
            <li class="width-25">
              <div class="media media-footer">
                <a href="https://www.fandango.com/midnight-sun-2018-201176/movie-times?intcmp=IMA_MidnightSunGWP_merch">
                <img src="https://images.fandango.com/images/spotlight/FD_MidnightSun_300x150_offerstrip_v1.png" alt="&lt;b&gt;&#39;Midnight Sun&#39; Gift With Purchase&lt;/b&gt;" />
                </a>
                <div>
                  <h3 class="heading-style-2 heading-size-s bold">&#39;Midnight Sun&#39; Gift With Purchase</h3>
                  <p>
                    Receive a FREE* song download of 'Burn so Bright' performed by Bella Thorne with ticket purchase.
                    <a href="https://www.fandango.com/midnight-sun-2018-201176/movie-times?intcmp=IMA_MidnightSunGWP_merch">BUY TICKETS</a>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section class="footer-coming-soon row width-100 hide-on-mobile">
          <h2 class="inline heading-style-stub heading-style-1 heading-size-l section-header">New + Coming soon</h2>
          <ul class="inline-items panel footer-coming-soon--list">
            <li class="media narrow footer-coming-soon--list-item">
              <a class="visual-container poster-thumb-size-s" href="http://www.fandango.com/pacificrimuprising2018_183505/movieoverview">
              <img class="visual-thumb" src="https://images.fandango.com/r1.0.409/ImageRenderer/131/200/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/183505/pru_advrtd1sheet_rgb_1.jpg" alt="Pacific Rim Uprising (2018) poster" />
              </a>
              <div class="footer-coming-soon--info-block poster-thumb-size-s">
                <a class="heading-style-1 movie-header footer-coming-soon--heading" href="http://www.fandango.com/pacificrimuprising2018_183505/movieoverview">Pacific Rim Uprising (2018)</a>
              </div>
            </li>
            <li class="media narrow footer-coming-soon--list-item">
              <a class="visual-container poster-thumb-size-s" href="http://www.fandango.com/readyplayerone_204139/movieoverview">
              <img class="visual-thumb" src="https://images.fandango.com/r1.0.409/ImageRenderer/131/200/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/204139/rpo_new_main_vert_dom_2764x.jpg" alt="Ready Player One poster" />
              </a>
              <div class="footer-coming-soon--info-block poster-thumb-size-s">
                <a class="heading-style-1 movie-header footer-coming-soon--heading" href="http://www.fandango.com/readyplayerone_204139/movieoverview">Ready Player One</a>
              </div>
            </li>
            <li class="media narrow footer-coming-soon--list-item">
              <a class="visual-container poster-thumb-size-s" href="http://www.fandango.com/aquietplace_207769/movieoverview">
              <img class="visual-thumb" src="https://images.fandango.com/r1.0.409/ImageRenderer/131/200/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/207769/aquietplace2018.jpg" alt="A Quiet Place poster" />
              </a>
              <div class="footer-coming-soon--info-block poster-thumb-size-s">
                <a class="heading-style-1 movie-header footer-coming-soon--heading" href="http://www.fandango.com/aquietplace_207769/movieoverview">A Quiet Place</a>
              </div>
            </li>
            <li class="media narrow footer-coming-soon--list-item">
              <a class="visual-container poster-thumb-size-s" href="http://www.fandango.com/rampage2018_207628/movieoverview">
              <img class="visual-thumb" src="https://images.fandango.com/r1.0.409/ImageRenderer/131/200/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/207628/rmpge_vert_online_teaser_dom_2764x4096_master.jpg" alt="Rampage (2018) poster" />
              </a>
              <div class="footer-coming-soon--info-block poster-thumb-size-s">
                <a class="heading-style-1 movie-header footer-coming-soon--heading" href="http://www.fandango.com/rampage2018_207628/movieoverview">Rampage (2018)</a>
              </div>
            </li>
            <li class="media narrow footer-coming-soon--list-item">
              <a class="visual-container poster-thumb-size-s" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
              <img class="visual-thumb" src="https://images.fandango.com/r1.0.409/ImageRenderer/131/200/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/199925/avengersinfinitywar-postera.jpg" alt="Avengers: Infinity War poster" />
              </a>
              <div class="footer-coming-soon--info-block poster-thumb-size-s">
                <a class="heading-style-1 movie-header footer-coming-soon--heading" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">Avengers: Infinity War</a>
              </div>
            </li>
            <li class="media narrow footer-coming-soon--list-item">
              <a class="visual-container poster-thumb-size-s" href="http://www.fandango.com/deadpool2_200520/movieoverview">
              <img class="visual-thumb" src="https://images.fandango.com/r1.0.409/ImageRenderer/131/200/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/200520/untitleddeadpoolsequel2018.jpg" alt="Deadpool 2 poster" />
              </a>
              <div class="footer-coming-soon--info-block poster-thumb-size-s">
                <a class="heading-style-1 movie-header footer-coming-soon--heading" href="http://www.fandango.com/deadpool2_200520/movieoverview">Deadpool 2</a>
              </div>
            </li>
            <li class="media narrow footer-coming-soon--list-item">
              <a class="visual-container poster-thumb-size-s" href="http://www.fandango.com/solo:astarwarsstory_203806/movieoverview">
              <img class="visual-thumb"  src="https://images.fandango.com/r1.0.409/ImageRenderer/131/200/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/203806/solo2018.jpg" alt="Solo: A Star Wars Story poster" />
              </a>
              <div class="footer-coming-soon--info-block poster-thumb-size-s">
                <a class="heading-style-1 movie-header footer-coming-soon--heading" href="http://www.fandango.com/solo:astarwarsstory_203806/movieoverview">Solo: A Star Wars Story</a>
              </div>
            </li>
            <li class="media narrow footer-coming-soon--list-item">
              <a class="visual-container poster-thumb-size-s" href="http://www.fandango.com/theincredibles2_185805/movieoverview">
              <img class="visual-thumb" src="https://images.fandango.com/r1.0.409/ImageRenderer/131/200/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/185805/theincredibles2.jpg" alt="The Incredibles 2 poster" />
              </a>
              <div class="footer-coming-soon--info-block poster-thumb-size-s">
                <a class="heading-style-1 movie-header footer-coming-soon--heading" href="http://www.fandango.com/theincredibles2_185805/movieoverview">The Incredibles 2</a>
              </div>
            </li>
          </ul>
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
                        <button class="fan-btn fan-btn-style-default fan-btn-size-slim" id="footer-fanmail-submit" type="button">Submit</button>
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
