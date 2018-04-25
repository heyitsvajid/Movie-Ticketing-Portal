
import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import Footer from './Footer'
import { envURL, reactURL } from '../config/environment';
import swal from 'sweetalert2'

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state={
      movie:{},
      reviews:[],
      img:''
    }
  }
  
  componentWillMount(){
    let findMovieByIdAPI = envURL + 'findMovieById';
    //var movieId = localStorage.getItem('movieIdforDetails')
    var movieId = localStorage.getItem("movieID");
    if (movieId) {
      var payload = {
        _id: movieId
      }
      axios.post(findMovieByIdAPI, payload)
        .then(res => {
          if (res.data.successMsg != '') {
            console.log('Fetching movie by id');
            console.log(res.data.data);
            this.setState({
              movie: res.data.data ? res.data.data : {},
              reviews: res.data.data.review_ratings ? res.data.data.review_ratings : {},
              img:require('../images/' + res.data.data.movie_logo)? require('../images/' + res.data.data.movie_logo):''
            })
          } else {
            console.error('Error Fetching all movie');
          }
        })
        .catch(err => {
          console.error(err);
        });

    }
  }

  handleTrailerClick(e){
    window.open('https://www.youtube.com/embed/tgbNymZ7vqY;');
  }

  addReview() {
    var review = {
        rating: 4,
        review: "sdjbsdljvbsjkdvb",
        user_id: 12,
        user_name: "Vajid"
    }

    var apiPayload = { review: review, movie_id: 2 };
    let addShowTimingsAPI = envURL + 'addMovieReview';

    axios.post(addShowTimingsAPI, apiPayload)
        .then(res => {
            if (res.data.errorMsg != '') {
                swal({
                    type: 'error',
                    title: 'Add Show Time',
                    text: res.data.errorMsg,
                })
            } else if (res.data.successMsg != '') {
                swal({
                    type: 'success',
                    title: 'Add Show',
                    text: res.data.successMsg,
                })
            }
        })
        .catch(err => {
            console.error(err);
        });
  }

  getReleaseDate(release_date){
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let day = new Date(this.state.movie.release_date).getDate();
    let month_name = monthNames[new Date().getMonth()];
    let year = new Date(this.state.movie.release_date).getFullYear()
    const final_date = "" + month_name + " " + day + ", " + year;
    return final_date;
  }


  render() {
    debugger
    let movie_image = null;
    if(this.state.movie.movie_logo != undefined){
      
    }
    return (
    <div>
      <Header/>
      <div id="page" role="main">
        <div class="mop">
            <div class="mop__details mop__details--has-image">
              <div class="mop__background js-backgroundBlur">
                  <svg width="100%" height="100%">
                    <defs>
                        <filter id="backgroundBlur" width="150%" height="150%" x="-25%" y="-25%" color-interpolation-filters="sRGB">
                          <feGaussianBlur stdDeviation="7"/>
                          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0 0 0 0 10 0"/>
                          <feComposite in2="SourceGraphic" operator="in"></feComposite>
                        </filter>
                    </defs>
                    <img class="js-backgroundBlur-image" x="0" y="0" width="100%" height="110%" src={this.state.img} preserveAspectRatio="xMidYMid slice"/>
                  </svg>
              </div>
              <div class="mop__details-inner">
                  <section class="subnav">
                    <div class="row">
                        <div class="width-100">
                          <h1 class="subnav__title movie-detail-header heading-style-1 heading-size-xl">
                              {'title' in this.state.movie? this.state.movie.title: ''}
                              
                          </h1>
                          <ul class="subnav__link-list">
                              <li class=" subnav__link-item"><a class="below-header-link subnav__link" href="/blumhouses-truth-or-dare-2018-208538/movie-overview">Overview</a></li>
                              <li class="subnav__link-item"><a class="below-header-link subnav__link" href="/blumhouses-truth-or-dare-2018-208538/movie-times">Movie Times + Tickets</a></li>
                              <li class="subnav__link-item"><a class="below-header-link subnav__link" href="/blumhouses-truth-or-dare-2018-208538/plot-summary">Synopsis</a></li>
                              <li class="subnav__link-item"><a class="below-header-link subnav__link" href="/movie_details#review-list">Movie Reviews</a></li>
                              <li class="subnav__link-item"><a class="below-header-link subnav__link" href="https://www.fandango.com/movie-trailer/blumhousestruthordare2018-trailer/208538">Trailers</a></li>
                              <li class="subnav__link-item vertical-dropdown">
                                <a class="below-header-link subnav__link" href="#">More</a>
                                <ul class="dropdown-nav">
                                    <li class="subnav__link-item"><a class="subnav__link" href="https://www.fandango.com/blumhousestruthordare2018_208538/moviephotosposters">Photos + Posters</a></li>
                                    <li class="subnav__link-item"><a class="subnav__link" href="/blumhouses-truth-or-dare-2018-208538/cast-and-crew">Cast + Crew</a></li>
                                </ul>
                              </li>
                          </ul>
                        </div>
                    </div>
                  </section>
                  <div class="row mop__layout">
                  <div class="mop__details-container">
                    <section class="movie-details">
                        <a class="movie-details__mop-link" href="/blumhouses-truth-or-dare-2018-208538/movie-overview">
                        <img class="movie-details__movie-img visual-thumb" src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/208538/TruthOrDare2018.jpg" alt="Blumhouse's Truth or Dare (2018) Movie Poster" />
                        </a>
                        <ul class="movie-details__detail">
                          <li>{'release_date' in this.state.movie?
                          (new Date())>(new Date(this.state.movie.release_date))?'Released':'':'Coming Soon'
                        }
                        Released</li>
                          <li class="release-date movie-details__release-date">
                          {'release_date' in this.state.movie? this.getReleaseDate(this.state.movie.release_date) :''}
                          </li>
                          <li>
                          {'mpaa_ratings' in this.state.movie?this.state.movie.mpaa_ratings+' ':''}, 
                          {'movie_length' in this.state.movie?this.state.movie.movie_length+' min':''}, 

                          </li>
                          <li>{'movie_keywords' in this.state.movie?this.state.movie.movie_keywords.join('/'):''}, 
</li>
                          <li class="fd-star-rating__container">
                              <div class="js-fd-star-rating fd-star-rating" data-star-rating="2">
                                <a class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="208538" data-isnew="true" data-rate-movie="true" data-show-caption="true" data-value="5" title="Loved It">
                                </a>

                              </div>
                          </li>
                          <li class="movie-details__fan-ratings">
                          {'review_ratings' in this.state.movie?this.state.movie.review_ratings.length +' ':''}
                           Fan Ratings</li>
                          <li>
                          </li>
                          {/* <div class="rotten-tomatoes">
                              <a class="rotten-tomatoes__link" href="http://rottentomatoes.com/m/blumhouses_truth_or_dare" target="_blank" rel="noopener" title="View more reviews and scores">
                                <span class="icon icon-rottom-rotten rotten-tomatoes__icon"></span>
                                <span class="rotten-tomatoes__score">
                                15%
                                </span>
                                <h3 class="rotten-tomatoes__brand">
                                    Rotten Tomatoes™
                                </h3>
                              </a>
                          </div> */}
                        </ul>
                    </section>
                    <div class="js-movie-showtimes__location-form mop__location-form">
                        <div class="date-picker__location">
                          <div class="date-picker__error js-date-picker__error hide"></div>
                          <div class="date-picker__message">
                              <h3 class="date-picker__message-title message-title heading-size-l heading-style-1">
                                <i class="icon icon-location-white"></i>
                                Want to buy tickets?
                              </h3>
                              <p class="date-picker__details">
                                Looking for cheaper movie tickets? Enter coupon code to see what offers
                                can you avail for this movie.
                              </p>
                          </div>
                          <span class="date-picker__location-text">Need Help?</span>
                          <div class="contact-info" >Contact us on 123-456-7890 or email us at support@fanfdango.com</div>
                        </div>
                    </div>
                    <div class="js-movie-showtimes__container mop__showtimes-container hide">
                        <div class="js-spinner csspinner"></div>
                    </div>
                    <section class="fan-alert js-fan-alert hide" data-movie-id="208538" data-fan-alert-from="">
                        <h3 class="fan-alert__header font-sans-serif font-lg uppercase">
                          <span class="icon icon-alarm-white fan-alert__icon"></span> Fandango Fanalert™
                        </h3>
                        <div class="fan-alert__wrap js-fan-alert-wrap">
                          <p class="fan-alert__description">Sign up for a FanAlert and be the first to know when tickets and other exclusives are available in your area.</p>
                          <div class="js-fan-alert-error page-header-emphasis fan-alert__error"></div>
                          <input type="text" class="fan-alert__input fan-alert__input-email js-fan-alert-email js-keyup" placeholder="Email Address" autocomplete="off" />
                          <input type="text" class="fan-alert__input fan-alert__input-location js-fan-alert-location js-keyup" placeholder="Zip Code or City, State" maxlength="200" />
                          <label class="fan-alert__fan-mail-label">
                          <input type="checkbox" class="fan-alert__fan-mail-checkbox js-checkbox" />
                          Also sign me up for FanMail to get updates on all things movies: tickets, special offers, screenings + more.
                          </label>
                          <a class="fan-alert__privacy-link" href="/policies/privacy-policy">Privacy Policy</a>
                          <button class="fan-alert__btn btn-cta js-fan-alert-btn" type="button" name="button">Sign Up For FanAlert™</button>
                        </div>
                        <div class="js-fan-alert-msg hide fan-alert__link-wrap">
                          <a href="/movietimes">CHECK OUT WHAT'S PLAYING NEAR YOU</a>
                        </div>
                    </section>
                  </div>
                    <div class="mop__content-container"  onClick = {this.handleTrailerClick.bind(this)}>
                      <section class="mop__content">
                          <div class="mop-video">
                            <div id="vdlpVideoPlayerWrap" class="media-player" data-width="" data-height="350" src="https://www.youtube.com/embed/tgbNymZ7vqY">
                                >
                                <div class="media-player__placeholder js-video-placeholder" >
                                  <a href = "https://www.youtube.com/embed/tgbNymZ7vqY"><img  src="https://images.fandango.com/imagerelay/500/0/video.fandango.com/MPX/image/NBCU_Fandango/961/727/thumb_2E972604-B3C7-478B-85C3-248588DCDD23.jpg/image.jpg/redesign/static/img/noxSquare.jpg" alt="Truth or Dare: Trailer 1" itemprop="image" /></a>
                                </div>
                            </div>
                            <div class="mop-video__summary-wrapper">
                                <div class="mop-video__share-button-wrap">
                                  <div class="js-share share-button invert-hover ">
                                      <a class="js-share-click share-button__click style-cta"><span class="share"></span> Share</a>
                                      <ul class="js-share-network share-button__network invisible">
                                        <li><a href="//www.facebook.com/sharer/sharer.php?u=" data-shared-network="facebook" target="_blank" class="share-button__network-btn icon icon-share-facebook">Share on Facebook</a></li>
                                        <li><a href="//twitter.com/share?url=" data-shared-network="twitter" target="_blank" class="share-button__network-btn icon icon-share-twitter">Share on Twitter</a></li>
                                        <li><a href="//plus.google.com/share?url=" data-shared-network="google-plus" target="_blank" class="share-button__network-btn icon icon-share-google-plus">Share on Google+</a></li>
                                        <li><a href="//www.tumblr.com/widgets/share/tool?canonicalUrl=" data-shared-network="tumblr" target="_blank" class="share-button__network-btn icon icon-share-tumblr">Share on Tumblr</a></li>
                                        <li><a href="//www.pinterest.com/pin/create/button/?url=" data-shared-network="pinterest" target="_blank" class="share-button__network-btn icon icon-share-pinterest">Share on Pinterest</a></li>
                                        <li><a href="mailto:?subject=" data-shared-network="email" class="share-button__network-btn icon icon-share-email">Share by Email</a></li>
                                      </ul>
                                  </div>
                                </div>
                                <h2 class="mop-video__title js-summary-video-title">
                                  Truth or Dare: Trailer 1
                                </h2>
                                <div class="mop-video__description js-summary-video-description">
                                </div>
                            </div>
                          </div>
                      </section>
                      <div class="mop__ad-unit">
                          <div class="ad" data-unit="boxadm" data-responsive="true" data-media="mobile">
                          </div>
                          <div class="ad" data-unit="boxaddt" data-responsive="true" data-media="desktop,tablet">
                          </div>
                      </div>
                    </div>

                  </div>
              </div>
            </div>
            <div
              class="mop__synopsis "
              >
              <div class="mop__synopsis-inner">
                  <h2 class="mop__synopsis-title">Blumhouse&#39;s Truth or Dare (2018) Synopsis</h2>
                  <p class="mop__synopsis-content">A harmless game of “Truth or Dare” among friends turns deadly when someone—or something—begins to punish those who tell a lie—or refuse the dare.</p>
                  <a class="mop__synopsis-link" href="/blumhouses-truth-or-dare-2018-208538/plot-summary">
                  Read Full Synopsis
                  </a>
              </div>
            </div>
            <div class="row ad-unit--shop-ad">
              <div class="ad" data-unit="shopad" data-responsive="true" data-media="desktop,tablet">
              </div>
            </div>
            <section class="row">
              <div class="">
                  <h3 class="inline heading-style-stub heading-style-1 heading-size-l section-header">
                    Cast + Crew
                  </h3>
                  <div class="carousel jcarousel carousel-style-strip row js-carousel-cast-crew">
                    <ol class="carousel-items js-items">
                        
                        <li>
                          <div class="fluid poster">
                              <a
                                href="/people/Sophia-Taylor-Ali-10572/overview"
                                class="
                                visual-container
                                "
                                >
                                <img
                                    class="carousel-cast-crew__portrait visual-thumb"
                                    src="https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/MasterRepository/performer%20images/P780158/SophiaAli-2018.jpg"
                                    aria-label="Sophia Taylor Ali portrait"
                                    role="img"
                                    />
                              </a>
                              <div>
                                <a
                                    href="/people/Sophia-Taylor-Ali-10572/overview"
                                    class="
                                    heading-style-1
                                    heading-size-s
                                    heading__movie-carousel
                                    "
                                    >
                                <span class="heading-style-1 movie-header heading-size-s heading__movie-carousel">
                                Sophia Taylor Ali
                                </span>
                                </a>
                                <span class="carousel-cast-crew__sub-title">
                                Penelope
                                </span>
                              </div>
                          </div>
                        </li>
                        <li>
                          <div class="fluid poster">
                              <a
                                href="/people/Landon-Liboiron-394122/overview"
                                class="
                                visual-container
                                "
                                >
                                <img
                                    class="carousel-cast-crew__portrait visual-thumb"
                                    src="https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/MasterRepository/performer%20images/P518117/LandonLiboiron-2012.jpg"
                                    aria-label="Landon Liboiron portrait"
                                    role="img"
                                    />
                              </a>
                              <div>
                                <a
                                    href="/people/Landon-Liboiron-394122/overview"
                                    class="
                                    heading-style-1
                                    heading-size-s
                                    heading__movie-carousel
                                    "
                                    >
                                <span class="heading-style-1 movie-header heading-size-s heading__movie-carousel">
                                Landon Liboiron
                                </span>
                                </a>
                                <span class="carousel-cast-crew__sub-title">
                                Carter
                                </span>
                              </div>
                          </div>
                        </li>
                        <li>
                          <div class="fluid poster">
                              <a
                                href="/people/Aurora-Perrineau-526802/overview"
                                class="
                                visual-container
                                "
                                >
                                <img
                                    class="carousel-cast-crew__portrait visual-thumb"
                                    src="https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/MasterRepository/performer%20images/P771865/AURORAPERRINEAU.jpg"
                                    aria-label="Aurora Perrineau portrait"
                                    role="img"
                                    />
                                
                              </a>
                              <div>
                                <a
                                    href="/people/Aurora-Perrineau-526802/overview"
                                    class="
                                    heading-style-1
                                    heading-size-s
                                    heading__movie-carousel
                                    "
                                    >
                                <span class="heading-style-1 movie-header heading-size-s heading__movie-carousel">
                                Aurora Perrineau
                                </span>
                                </a>
                                <span class="carousel-cast-crew__sub-title">
                                Giselle
                                </span>
                              </div>
                          </div>
                        </li>
                        <li>
                          <div class="fluid poster">
                              <a
                                href="/people/Sam-Lerner-392098/overview"
                                class="
                                visual-container
                                "
                                >
                                <img
                                    class="carousel-cast-crew__portrait visual-thumb"
                                    src="https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/MasterRepository/performer%20images/P467783/samlernerfeat.jpg"
                                    aria-label="Sam Lerner portrait"
                                    role="img"
                                    />
                                
                              </a>
                              <div>
                                <a
                                    href="/people/Sam-Lerner-392098/overview"
                                    class="
                                    heading-style-1
                                    heading-size-s
                                    heading__movie-carousel
                                    "
                                    >
                                <span class="heading-style-1 movie-header heading-size-s heading__movie-carousel">
                                Sam Lerner
                                </span>
                                </a>
                                <span class="carousel-cast-crew__sub-title">
                                Ronnie
                                </span>
                              </div>
                          </div>
                        </li>
                        <li>
                          <div class="fluid poster">
                              <a
                                href="/people/Brady-Smith-628252/overview"
                                class="
                                visual-container
                                "
                                >
                                <img
                                    class="carousel-cast-crew__portrait visual-thumb"
                                    src="https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/MasterRepository/performer%20images/P437723/bradysmith-1.jpg"
                                    aria-label="Brady Smith portrait"
                                    role="img"
                                    />
                                
                              </a>
                              <div>
                                <a
                                    href="/people/Brady-Smith-628252/overview"
                                    class="
                                    heading-style-1
                                    heading-size-s
                                    heading__movie-carousel
                                    "
                                    >
                                <span class="heading-style-1 movie-header heading-size-s heading__movie-carousel">
                                Brady Smith
                                </span>
                                </a>
                                <span class="carousel-cast-crew__sub-title">
                                Roy Cameron
                                </span>
                              </div>
                          </div>
                        </li>
                        <li>
                          <div class="fluid poster">
                              <a
                                href="/people/Morgan-Lindholm-824432/overview"
                                class="
                                visual-container
                                "
                                >
                                <img
                                    class="carousel-cast-crew__portrait visual-thumb"
                                    src="https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/MasterRepository/performer%20images/P874299/MorganLindholm-2018.jpg"
                                    aria-label="Morgan Lindholm portrait"
                                    role="img"
                                    />
                              
                              </a>
                              <div>
                                <a
                                    href="/people/Morgan-Lindholm-824432/overview"
                                    class="
                                    heading-style-1
                                    heading-size-s
                                    heading__movie-carousel
                                    "
                                    >
                                <span class="carousel-cast-crew__title">
                                Morgan Lindholm
                                </span>
                                </a>
                                <span class="carousel-cast-crew__sub-title">
                                Alexis Podell
                                </span>
                              </div>
                          </div>
                        </li>
                        <li>
                          <div class="fluid poster">
                              <a
                                href="/people/Tom-Choi-117517/overview"
                                class="
                                visual-container
                                "
                                >
                                <img
                                    class="carousel-cast-crew__portrait visual-thumb"
                                    src="https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/MasterRepository/performer%20images/P477928/TomChoi-2018.jpg"
                                    aria-label="Tom Choi portrait"
                                    role="img"
                                    />
                                
                              </a>
                              <div>
                                <a
                                    href="/people/Tom-Choi-117517/overview"
                                    class="
                                    heading-style-1
                                    heading-size-s
                                    heading__movie-carousel
                                    "
                                    >
                                <span class="heading-style-1 movie-header heading-size-s heading__movie-carousel">
                                Tom Choi
                                </span>
                                </a>
                                <span class="carousel-cast-crew__sub-title">
                                Officer Han Chang
                                </span>
                              </div>
                          </div>
                        </li>
                        <li>
                          <div class="fluid poster">
                              <a
                                href="/people/Carlo-Sciortino-820165/overview"
                                class="
                                visual-container
                                "
                                >
                                <img
                                    class="carousel-cast-crew__portrait visual-thumb"
                                    src="https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/masterrepository/other/temp.jpg"
                                    aria-label="Carlo Sciortino portrait"
                                    role="img"
                                    />
                                
                              </a>
                              <div>
                                <a
                                    href="/people/Carlo-Sciortino-820165/overview"
                                    class="
                                    heading-style-1
                                    heading-size-s
                                    heading__movie-carousel
                                    "
                                    >
                                <span class="heading-style-1 movie-header heading-size-s heading__movie-carousel">
                                Carlo Sciortino
                                </span>
                                </a>
                                <span class="carousel-cast-crew__sub-title">
                                Markie&#39;s Kisser
                                </span>
                              </div>
                          </div>
                        </li>
                        <li>
                          <div class="fluid poster">
                              <a
                                href="/people/Lesley-Stratton-651881/overview"
                                class="
                                visual-container
                                "
                                >
                                <img
                                    class="carousel-cast-crew__portrait visual-thumb"
                                    src="https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/MasterRepository/performer%20images/P359480/LeslieStratton-2018.jpg"
                                    aria-label="Lesley Stratton portrait"
                                    role="img"
                                    />
                                
                              </a>
                              <div>
                                <a
                                    href="/people/Lesley-Stratton-651881/overview"
                                    class="
                                    heading-style-1
                                    heading-size-s
                                    heading__movie-carousel
                                    "
                                    >
                                <span class="heading-style-1 movie-header heading-size-s heading__movie-carousel">
                                Lesley Stratton
                                </span>
                                </a>
                                <span class="carousel-cast-crew__sub-title">
                                Student
                                </span>
                              </div>
                          </div>
                        </li>
                    </ol>
                   
                  </div>
                  <a class="carousel-cast-crew__see-full cta right" href="/blumhouses-truth-or-dare-2018-208538/cast-and-crew">
                  See Full Cast + Crew for Blumhouse&#39;s Truth or Dare (2018)
                  </a>
              </div>
            </section>
            
            <div class="row width-100">
              <h3 id= "review-list" class="inline heading-style-stub heading-style-1 heading-size-l">Movie Reviews</h3>
              <div class="row">
                  <section class="rt-reviews js-reviews__rt-container width-50">
                    <div class="rt-reviews__headline-wrap">
                        <h2 class=" review-heading rt-reviews__title heading-style-1 heading-size-l">ROTTEN TOMATOES™</h2>
                        <span class="rt-reviews__icon icon-rottom-rotten"></span>
                        
                    </div>
                    <ul class="rt-reviews-list__wrap rt-reviews-list--grid">
                        <li class="rt-reviews-list__item width-50 tablet-width-100">
                          <div class="rt-reviews-list__icon icon-rottom-rotten"></div>
                          <div class="rt-reviews-list__date">April  18, 2018</div>
                          <div class="rt-reviews-list__quote">Those brief bits of digitally inserted spookiness are the only glints of interest in a plot that otherwise makes more Mexican border crossings (it's where the game starts) than an alarmist Trump speech.</div>
                          <a class="rt-reviews-list__full-link" href="https://www.timeout.com/us/film/truth-or-dare" target="_blank" rel="noopener">Full Review</a>
                          <div class="rt-reviews-list__reviewer">
                              <div class="rt-reviews-list__reviewer-img" aria-label="image for Joshua Rothkopf" >
                                {/* <img src = "https://resizing.flixster.com/vGLrQdMSgxI_vkxdoKGEti9IDWk=/150x150/v1.YzsyNjcwO2c7MTc2ODU7MTIwMDsxNTA7MTUw" /> */}
                              </div>
                              <span class="rt-reviews-list__reviewer-name">Joshua Rothkopf</span>
                              <span class="rt-reviews-list__publication">Time Out</span>
                              <span class="rt-reviews-list__top-critic-label">Top Critic</span>
                          </div>
                        </li>
                        <li class="rt-reviews-list__item width-50 tablet-width-100">
                          <div class="rt-reviews-list__icon icon-rottom-rotten"></div>
                          <div class="rt-reviews-list__date">April  13, 2018</div>
                          <div class="rt-reviews-list__quote">Horror fans trust Blumhouse, so why waste the brand on a flick as lame as Truth or Dare?</div>
                          <a class="rt-reviews-list__full-link" href="https://www.villagevoice.com/2018/04/13/the-truth-about-blumhouses-truth-or-dare-is-pretty-sorry/" target="_blank" rel="noopener">Full Review</a>
                          <div class="rt-reviews-list__reviewer">
                              <div class="rt-reviews-list__reviewer-img" aria-label="no critic image available"></div>
                              <span class="rt-reviews-list__reviewer-name">Chuck Wilson</span>
                              <span class="rt-reviews-list__publication">Village Voice</span>
                              <span class="rt-reviews-list__top-critic-label">Top Critic</span>
                          </div>
                        </li>
                        <li class="rt-reviews-list__item width-50 tablet-width-100">
                          <div class="rt-reviews-list__icon icon-rottom-rotten"></div>
                          <div class="rt-reviews-list__date">April  13, 2018</div>
                          <div class="rt-reviews-list__quote">Everything here...feels slotted into an existing template.</div>
                          <a class="rt-reviews-list__full-link" href="http://www.vulture.com/2018/04/which-horror-movie-should-you-see-this-friday-the-13th.html" target="_blank" rel="noopener">Full Review</a>
                          <div class="rt-reviews-list__reviewer">
                              <div class="rt-reviews-list__reviewer-img" aria-label="image for David Edelstein" >
                              </div>
                              <span class="rt-reviews-list__reviewer-name">David Edelstein</span>
                              <span class="rt-reviews-list__publication">New York Magazine/Vulture</span>
                              <span class="rt-reviews-list__top-critic-label">Top Critic</span>
                          </div>
                        </li>
                        <li class="rt-reviews-list__item width-50 tablet-width-100">
                          <div class="rt-reviews-list__icon icon-rottom-rotten"></div>
                          <div class="rt-reviews-list__date">April  12, 2018</div>
                          <div class="rt-reviews-list__quote">The Showgirls of post-Scream slasher movies: it's not campy nor emotionally involving enough to be more than the sum of its ungainly parts.</div>
                          <a class="rt-reviews-list__full-link" href="https://www.rogerebert.com/reviews/truth-or-dare-2018" target="_blank" rel="noopener">Full Review</a>
                          <div class="rt-reviews-list__reviewer">
                              <div class="rt-reviews-list__reviewer-img" aria-label="no critic image available"></div>
                              <span class="rt-reviews-list__reviewer-name">Simon Abrams</span>
                              <span class="rt-reviews-list__publication">RogerEbert.com</span>
                              <span class="rt-reviews-list__top-critic-label">Top Critic</span>
                          </div>
                        </li>
                        <li class="rt-reviews-list__item width-50 tablet-width-100">
                          <div class="rt-reviews-list__icon icon-rottom-rotten"></div>
                          <div class="rt-reviews-list__date">April  11, 2018</div>
                          <div class="rt-reviews-list__quote">A low-budget kids-gruesomely-dying romp that is decidedly same-old.</div>
                          <a class="rt-reviews-list__full-link" href="https://www.theglobeandmail.com/arts/film/reviews/article-review-truth-or-dare-poses-some-forgettable-questions/" target="_blank" rel="noopener">Full Review</a>
                          <div class="rt-reviews-list__reviewer">
                              <div class="rt-reviews-list__reviewer-img" aria-label="no critic image available"></div>
                              <span class="rt-reviews-list__reviewer-name">Brad Wheeler</span>
                              <span class="rt-reviews-list__publication">Globe and Mail</span>
                              <span class="rt-reviews-list__top-critic-label">Top Critic</span>
                          </div>
                        </li>
                        <li class="rt-reviews-list__item width-50 tablet-width-100">
                          <div class="rt-reviews-list__icon icon-rottom-rotten"></div>
                          <div class="rt-reviews-list__date">April  11, 2018</div>
                          <div class="rt-reviews-list__quote">"Truth or Dare" is foolish to the point of incoherence. Don't get played.</div>
                          <a class="rt-reviews-list__full-link" href="https://www.detroitnews.com/story/entertainment/movies/2018/04/12/movie-review-truth-dare-game-worth-playing/33784361/" target="_blank" rel="noopener">Full Review</a>
                          <div class="rt-reviews-list__reviewer">
                              <div class="rt-reviews-list__reviewer-img" aria-label="image for Adam Graham" >
                              </div>
                              <span class="rt-reviews-list__reviewer-name">Adam Graham</span>
                              <span class="rt-reviews-list__publication">Detroit News</span>
                              <span class="rt-reviews-list__top-critic-label">Top Critic</span>
                          </div>
                        </li>
                        <li class="rt-reviews-list__item width-50 tablet-width-100">
                          <div class="rt-reviews-list__icon icon-rottom-rotten"></div>
                          <div class="rt-reviews-list__date">April  19, 2018</div>
                          <div class="rt-reviews-list__quote">[Truth or Dare] swings between the predictable and the ridiculous.</div>
                          <a class="rt-reviews-list__full-link" href="https://www.theaustralian.com.au/arts/review/ifeel-pretty-truth-or-dare-films-see-what-others-cant/news-story/e4a29c5b1ee4d5b9b39ea2deb50b2344" target="_blank" rel="noopener">Full Review</a>
                          <div class="rt-reviews-list__reviewer">
                              <div class="rt-reviews-list__reviewer-img" aria-label="no critic image available"></div>
                              <span class="rt-reviews-list__reviewer-name">Stephen Romei</span>
                              <span class="rt-reviews-list__publication">The Australian</span>
                          </div>
                        </li>
                        <li class="rt-reviews-list__item width-50 tablet-width-100">
                          <div class="rt-reviews-list__icon icon-rottom-rotten"></div>
                          <div class="rt-reviews-list__date">April  19, 2018</div>
                          <div class="rt-reviews-list__quote">The film is called Truth Or Dare and it's the truths that are more interesting, bringing skeletons out of everyone's closet and driving a dent in relationships. The dare part of it is pure horror kitsch and doesn't affect you really. </div>
                          <a class="rt-reviews-list__full-link" href="https://www.filmfare.com/reviews/hollywood-movies/movie-review-truth-or-dare-27770.html" target="_blank" rel="noopener">Full Review</a>
                          <div class="rt-reviews-list__reviewer">
                              <div class="rt-reviews-list__reviewer-img" aria-label="no critic image available"></div>
                              <span class="rt-reviews-list__reviewer-name">Devesh Sharma</span>
                              <span class="rt-reviews-list__publication">Filmfare</span>
                          </div>
                        </li>
                        <li class="rt-reviews-list__item width-50 tablet-width-100">
                          <div class="rt-reviews-list__icon icon-rottom-rotten"></div>
                          <div class="rt-reviews-list__date">April  18, 2018</div>
                          <div class="rt-reviews-list__quote">Precious little craft or care is involved, and even less logic. Subtlety is clearly not director Jeff Wadlow's strong suit.</div>
                          <a class="rt-reviews-list__full-link" href="https://www.hindustantimes.com/movie-reviews/a-frightful-mess-rashid-irani-reviews-truth-or-dare/story-ZeImSOtsG03DGIb3iRQYqL.html" target="_blank" rel="noopener">Full Review</a>
                          <div class="rt-reviews-list__reviewer">
                              <div class="rt-reviews-list__reviewer-img" aria-label="no critic image available"></div>
                              <span class="rt-reviews-list__reviewer-name">Rashid Irani</span>
                              <span class="rt-reviews-list__publication">Hindustan Times</span>
                          </div>
                        </li>
                        <li class="rt-reviews-list__item width-50 tablet-width-100">
                          <div class="rt-reviews-list__icon icon-rottom-rotten"></div>
                          <div class="rt-reviews-list__date">April  18, 2018</div>
                          <div class="rt-reviews-list__quote">A Blumhouse addition that's so boring it may induce bouts of narcolepsy.</div>
                          <a class="rt-reviews-list__full-link" href="https://theplaylist.net/lucy-hale-truth-dare-review-20180413/" target="_blank" rel="noopener">Full Review</a>
                          <div class="rt-reviews-list__reviewer">
                              <div class="rt-reviews-list__reviewer-img" aria-label="image for Valerie Complex" >
                              </div>
                              <span class="rt-reviews-list__reviewer-name">Valerie Complex</span>
                              <span class="rt-reviews-list__publication">The Playlist</span>
                          </div>
                        </li>
                    </ul>
                  </section>
                  


                  <div id="myModal" class="modal fade" role="dialog">
                  <div class="modal-dialog">


                  <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Feedback</h4>
                  </div>
                  <div class="modal-body">
                  <div id="message"></div>
                                                  <div class="form-group"> 
                                                  <span id="updatecapacitymodalerrortext" ></span> 
                                                    </div>
                                                      <div class="form-group" >
                                                      <label  class="col-md-4">Your Name : </label>
                                                      <div  class="col-md-6"><input type="text" class="form-control" size="10" id="capacity_txt_modal" />
                                                      </div>

                  </div>
                  <label for="input-1" class="control-label">Rate This</label>
                  <div id="rateYo"></div>
                  <input type="hidden" name="rating" id="rating_input"/>
                  <br/>
                  <button type="button" id="updateCapacityBtn" class="btn btn-info ">Save</button>
                  <button type="button" id="capacityModalClose" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                  </div> 
                  <div class="modal-footer">
                  </div>

                  </div>
                  </div>
                  <section class="fan-reviews width-50">
                    <div class="fan-reviews__header">
                        <h2 class="review-heading fan-reviews__title heading-style-1 heading-size-l">Fan Reviews</h2>
                        <div class="
                          
                          " data-star-rating="3.5">
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                        </div>
                        <a class="cta fan-reviews__all-reviews" href="/blumhouses-truth-or-dare-2018-208538/movie-reviews">See All Fan Reviews</a>
                    </div>
                    <div class="fan-reviews__content-wrap">
                        <div class="fan-reviews__decoration-top"></div>
                        <div class="js-reviews__fan-container">
                          <ul class="fan-reviews__list">
                              <li class="fan-reviews__item">
                                <div class="stars-large__star-rating--no-hover" data-star-rating="4">
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                </div>
                                <div class="user-review-heading fan-reviews__headline heading-style-1 heading-size-l">
                                    its alright
                                </div>
                                <div class="fan-reviews__user-name">
                                    By reyesjaja44
                                </div>
                                <div class="fan-reviews__review">i've seen better definitely, but overall it was pretty good. i would recommend seeing it.</div>
                              </li>
                              <li class="fan-reviews__item">
                                <div class="stars-large__star-rating--no-hover" data-star-rating="5">
                                <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                </div>
                                <div class="user-review-heading fan-reviews__headline heading-style-1 heading-size-l">&nbsp;</div>
                                <div class="fan-reviews__user-name">
                                    By preciouscrockett30
                                </div>
                              </li>
                              <li class="fan-reviews__item">
                                <div class="stars-large__star-rating--no-hover" data-star-rating="4">
                                <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                </div>
                                <div class="user-review-heading fan-reviews__headline heading-style-1 heading-size-l">
                                    Untitled
                                </div>
                                <div class="fan-reviews__user-name">
                                    By Llamas1974
                                </div>
                                <div class="fan-reviews__review">The beginning was a good part! It was so intense</div>
                              </li>
                              <li class="fan-reviews__item">
                                <div class="stars-large__star-rating--no-hover" data-star-rating="3">
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                </div>
                                <div class="user-review-heading user-review-heading fan-reviews__headline heading-style-1 heading-size-l">
                                    Ok
                                </div>
                                <div class="fan-reviews__user-name">
                                    By gretterdiaz
                                </div>
                                <div class="fan-reviews__review">It was an Ok movie but I still ******* watching it. Very freaky too</div>
                              </li>
                              <li class="fan-reviews__item">
                                <div class="stars-large__star-rating--no-hover" data-star-rating="2">
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                </div>
                                <div class="user-review-heading fan-reviews__headline heading-style-1 heading-size-l">
                                    Ehh. Save your money.
                                </div>
                                <div class="fan-reviews__user-name">
                                    By Cksenior3
                                </div>
                                <div class="fan-reviews__review">Despite not being into the trailer I gave this a shot. It has a solid start but got ridiculous pretty quickly. And they basically threw the end away. Felt like the writers themselves got bored and wanted to hurry and wrap it up.</div>
                              </li>
                              <li class="fan-reviews__item">
                                <div class="stars-large__star-rating--no-hover" data-star-rating="5">
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                    
                                </div>
                                <div class="user-review-heading fan-reviews__headline heading-style-1 heading-size-l">
                                    Yes es10101010
                                </div>
                                <div class="fan-reviews__user-name">
                                    By Hannahrose24
                                </div>
                                <div class="fan-reviews__review">I loved this movie</div>
                              </li>
                              <li class="fan-reviews__item">
                                <div class="stars-large__star-rating--no-hover" data-star-rating="3">
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                </div>
                                <div class="user-review-heading fan-reviews__headline heading-style-1 heading-size-l">
                                    Untitled
                                </div>
                                <div class="fan-reviews__user-name">
                                    By nataliee290
                                </div>
                                <div class="fan-reviews__review">Good movie, bad ending</div>
                              </li>
                              <li class="fan-reviews__item">
                                <div class="stars-large__star-rating--no-hover" data-star-rating="4">
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                </div>
                                <div class="user-review-heading fan-reviews__headline heading-style-1 heading-size-l">
                                    Not what I expected
                                </div>
                                <div class="fan-reviews__user-name">
                                    By shortdog2k
                                </div>
                                <div class="fan-reviews__review">The facial features were very similar to the first Purge and I spent a majority of the movie laughing. But all in all the script was pretty original</div>
                              </li>
                              <li class="fan-reviews__item">
                                <div class="stars-large__star-rating--no-hover" data-star-rating="1">
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                </div>
                                <div class="user-review-heading fan-reviews__headline heading-style-1 heading-size-l">
                                    Dont even bother.
                                </div>
                                <div class="fan-reviews__user-name">
                                    By drzlinda09
                                </div>
                              </li>
                              <li class="fan-reviews__item">
                                <div class="stars-large__star-rating--no-hover" data-star-rating="3">
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                </div>
                                <div class="user-review-heading fan-reviews__headline heading-style-1 heading-size-l">
                                    Untitled
                                </div>
                                <div class="fan-reviews__user-name">
                                    By vincentgonzales199011262016160
                                </div>
                                <div class="fan-reviews__review">Didn’t like how it ended</div>
                              </li>
                          </ul>
                        </div>
                        <div class="fan-reviews__decoration-bottom"></div>
                    </div>
                    <a data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" class="fan-review__write-review-cta cta" href="https://www.fandango.com/blumhouses-truth-or-dare-2018_208538/writeuserreviews">
                    Tell Us What You Think</a>
                  </section>
                  
                 
              </div>
            </div>
        </div>
        <section class="favoriteFlyout js-heartsAndStars-flyout">
            <div class="favoriteFlyout__message js-heartsAndStars-flyout-message"></div>
        </section>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <section id="writeReviewForm" class="movie-section write-review-form">
                <h2 class="write-review-form__heading heading-style-1 heading-size-l">Please rate this movie from 1-5 stars</h2>
                <div id="writeReviewForm__ratingInput" class="write-review-form__rating-input">
                    <div class="fd-star-rating__container">
                      <div class="js-rating-input__star-wrap fd-star-rating " data-star-rating="" >
                      <input class="star star-5" id="star-5" type="radio" name="star"/>
                      <label class="star star-5" for="star-5"></label>
                      <input class="star star-4" id="star-4" type="radio" name="star"/>
                      <label class="star star-4" for="star-4"></label>
                      <input class="star star-3" id="star-3" type="radio" name="star"/>
                      <label class="star star-3" for="star-3"></label>
                      <input class="star star-2" id="star-2" type="radio" name="star"/>
                      <label class="star star-2" for="star-2"></label>
                      <input class="star star-1" id="star-1" type="radio" name="star"/>
                      <label class="star star-1" for="star-1"></label>
                      </div>
                    </div>
                </div>
                <hr class="write-review-form__line" />
                <h2 class="heading-style-1 heading-size-l">Write a review</h2>
                <ul id="writeReviewForm__errors"></ul>
                <section class="write-review-form__group">
                    <label for="writeReviewForm__title">Title:</label>
                    <input type="text" maxlength="200" id="writeReviewForm__title"/>
                </section>
                <section class="write-review-form__group">
                    
                    <textarea rows="12" cols="200" id="writeReviewForm__body"></textarea>
                </section>
                <p class="write-review-form__save-btn">
                    <a id="writeReviewForm__cancel-button" class="btn-cancel" href="/blumhouses-truth-or-dare-2018-208538/movie-reviews">Cancel</a>
                    <button class="btn-cta" id="writeReviewForm__button">Save Review</button>
                </p>
              </section>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
    </div>
    )
  }
}



export default MovieDetails;
              