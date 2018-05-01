
import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import Footer from './Footer'
import { envURL, reactURL } from '../config/environment';
import swal from 'sweetalert2'

var LogAPI = require('../utils/logging');

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state={
      movie:{},
      reviews:[],
      img:'',
      rating: 0,
      title: "",
      review_content: "",
      isLoggedIn: false
    }
  }
  
  componentWillMount(){
 //MovieDetails.js
 let click = {
  pageClick: {
      email: "anonymous",
      pageName: "Movie Detail",
      timeStamp: new Date().getTime()
  }
};
console.log(click);
LogAPI.logUserClicks(click);
    this.fetchDataFromServer();
  }

  fetchDataFromServer(){

    axios.get(envURL + 'isLoggedIn', {withCredentials: true})
            .then((response) => {
                console.log("After checking the session", response.data);
                if(response.data.session === 'valid') {
                    this.setState({isLoggedIn: true})
                }
            }
        )
    let findMovieByIdAPI = envURL + 'findMovieById';
    //var movieId = localStorage.getItem('movieIdforDetails')
    var movieId = localStorage.getItem("movieID");
    debugger
    if (movieId) {
      var payload = {
        _id: movieId
      }
      axios.post(findMovieByIdAPI, payload)
        .then(res => {
          if (res.data.successMsg != '') {
            console.log('Fetching movie by id');
            console.log(res.data.data);

            //AccountSettings.js Logging
              let click = {
                      movieClick: {
                          name: res.data.data ? res.data.data.title : '',
                      }
                  };
                  console.log(click);
                  LogAPI.logMovieClicks(click);
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
    if(this.state.movie.trailer_link != undefined){
      window.open(this.state.movie.trailer_link);
    }
  }

  addReview() {
    var review = {
        rating: this.state.rating,
        review: this.state.review_content != "" ? this.state.review_content : "No Content Supplied!",
        title: this.state.title != "" ? this.state.title : "Untitled",
        user_id: localStorage.userid,
        //oca,
        user_name: localStorage.getItem('first_name')
    }

    var apiPayload = { review: review, movie_id: localStorage.getItem("movieID") };
    let addShowTimingsAPI = envURL + 'addMovieReview';

    axios.post(addShowTimingsAPI, apiPayload)
        .then(res => {
            if (res.data.errorMsg != '') {
                swal({
                    type: 'error',
                    title: 'Add Review',
                    text: res.data.errorMsg,
                })
            } else if (res.data.successMsg != '') {
                swal({
                    type: 'success',
                    title: 'Add Review',
                    text: res.data.successMsg,
                })
            }
            this.fetchDataFromServer();
        })
        .catch(err => {
            console.error(err);
        });
  }
  
  getReleaseDate(release_date){
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let day = new Date(this.state.movie.release_date).getDate();
    let month_name = monthNames[new Date(this.state.movie.release_date).getMonth()];
    let year = new Date(this.state.movie.release_date).getFullYear()
    const final_date = "" + month_name + " " + day + ", " + year;
    return final_date;
  }

  renderMovieCharacters() {
    let nineCharacters = [];
    var movieCharacters = this.state.movie.movie_characters;
    if(movieCharacters != undefined){
      if(movieCharacters.length > 0){
        for(let i = 0; i < 9;i++){
          movieCharacters[i] != undefined ? nineCharacters.push(movieCharacters[i]) : nineCharacters.push("Coming Soon");
        }  
      }
      let moviesNode = nineCharacters.map((item, index) => {
        var imageSource = item == "Coming Soon" ? require('../assets/static_images/defaut.jpeg'): require('../images/' + item.image_path);
        return (
          <li>
            <div class="fluid poster">
                <a href="#">
                  <img class="carousel-cast-crew__portrait visual-thumb" src={imageSource} aria-label="Landon Liboiron portrait" role="img"/>
                </a>
                <div>
                  <a href="#" class="heading-style-1 heading-size-s heading__movie-carousel">
                  <span class="heading-style-1 movie-header heading-size-s heading__movie-carousel">
                  {item == "Coming Soon" ? "Coming Soon": item.name}
                  </span>
                  </a>
                </div>
            </div>
          </li>
        )
      });

      return (
        <ol class="carousel-items js-items">
          { moviesNode }
        </ol>
        
      )
    }
  }

  getMovieReviews(){
    var movieReviews = this.state.movie.review_ratings;
    if(movieReviews != undefined){
      let reviews = movieReviews.map((item, index) => {
        let ratingsHash = { 1: "", 2: "",  3: "", 4: "", 5: "" };
        var item_ratings = item.rating;
        for(let i = Object.keys(ratingsHash).length; i > 0 ; i--){
          if(item_ratings > 0){
            ratingsHash[i] = "checked"
            item_ratings-=1;
          }
        }
        return (
          <li class="fan-reviews__item">
            <div class="stars-large__star-rating--no-hover" data-star-rating="4">
              <span className={'fa fa-star ' + ratingsHash[1]}></span>
              <span className={'fa fa-star ' + ratingsHash[2]}></span>
              <span className={'fa fa-star ' + ratingsHash[3]}></span>
              <span className={'fa fa-star ' + ratingsHash[4]}></span>
              <span className={'fa fa-star ' + ratingsHash[5]}></span>
            </div>
            <div class="user-review-heading fan-reviews__headline heading-style-1 heading-size-l">
                {item.title}
            </div>
            <div class="fan-reviews__user-name">
                By {item.user_name}
            </div>
            <div class="fan-reviews__review">{item.review}</div>
          </li>
        )
      });
      return (
        <ul class="fan-reviews__list">
          { reviews }
        </ul>        
      )
    }
  }

  handleStarClick(e){
    this.setState({rating: parseInt(e.target.dataset.rating)});
  }

  handleTitleChange(e){
    this.setState({ title: e.target.value });
  }

  handleReviewContentChange(e){
    this.setState({ review_content: e.target.value });
  }

  handleBooking(){
    console.log("search clicked", this.state.searchQuery);
    if(window.location.href.includes('/movies')){
      this.props.onSearchData(this.state.searchQuery);
    }else{
      localStorage.setItem('search','title' in this.state.movie? this.state.movie.title: '')
      this.props.history.push('/movies');
    
    }
  }


  handleSessionChange(e){
    this.props.history.push("/login")
  }


  render() {
    let movie_image, trailer_link, keywords_list, review_link = null;
    if(this.state.movie.movie_logo != undefined){
      movie_image = <img class="movie-details__movie-img visual-thumb" src = {require('../images/' + this.state.movie.movie_logo)} alt="Blumhouse's Truth or Dare (2018) Movie Poster" />
      trailer_link = <a href = "https://www.youtube.com/embed/tgbNymZ7vqY"><img id="img-link" src={require('../images/' + this.state.movie.movie_logo)} alt="Truth or Dare: Trailer 1" itemprop="image" /></a>
    }
    if(this.state.movie.movie_keywords != undefined){
      let keywords =  this.state.movie.movie_keywords.toString().split(",");

      keywords_list = keywords.map((keyword) => {
        return (
          <li>{keyword}
          </li>
        )
    });

    if(this.state.isLoggedIn){
      review_link = <a data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" class="fan-review__write-review-cta cta" href="https://www.fandango.com/blumhouses-truth-or-dare-2018_208538/writeuserreviews">
      Tell Us What You Think</a>
    }
    else{
      review_link =<a href="#" class="fan-review__write-review-cta cta" onClick={this.handleSessionChange.bind(this)}>
      Tell Us What You Think</a>
    }

    
      
    }
    debugger
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
                              <li class=" subnav__link-item"><a class="below-header-link subnav__link" href="#">Overview</a></li>
                              <li class="subnav__link-item"><a class="below-header-link subnav__link" href="#" onClick={this.handleBooking.bind(this)}>Movie Times + Tickets</a></li>
                              <li class="subnav__link-item"><a class="below-header-link subnav__link" href="#">Synopsis</a></li>
                              <li class="subnav__link-item"><a class="below-header-link subnav__link" href="#">Movie Reviews</a></li>
                              <li class="subnav__link-item"><a class="below-header-link subnav__link" href="#">Trailers</a></li>
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
                        <a class="movie-details__mop-link" href="#">
                        {movie_image}
                        </a>
                        <ul class="movie-details__detail">
                          <li>{'release_date' in this.state.movie ?
                          (new Date())>=(new Date(this.state.movie.release_date))?'Released':'Coming Soon':''
                        }
                        </li>
                          <li class="release-date movie-details__release-date">
                          {'release_date' in this.state.movie? this.getReleaseDate(this.state.movie.release_date) :''}
                          </li>
                          <li>
                          {'mpaa_ratings' in this.state.movie?this.state.movie.mpaa_ratings+' ':''}, 
                          {'movie_length' in this.state.movie?this.state.movie.movie_length+' min':''}, 

                          </li>
                          {keywords_list}
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
                          <div class="contact-info" >Contact us on +1-(213)-245-3398 or email us at support@fanfdango.com</div>
                        </div>
                    </div>
                    <div class="js-movie-showtimes__container mop__showtimes-container hide">
                        <div class="js-spinner csspinner"></div>
                    </div>
                    
                  </div>
                    <div class="mop__content-container"  onClick = {this.handleTrailerClick.bind(this)}>
                      <section id="trailer-section" class="mop__content">
                          <div class="mop-video">
                            <div id="vdlpVideoPlayerWrap" class="media-player" data-width="" data-height="350">
                                <div class="media-player__placeholder js-video-placeholder" >
                                  {trailer_link}
                                </div>
                            </div>
                            <div class="mop-video__summary-wrapper">
                                
                                <h2 class="mop-video__title js-summary-video-title">
                                  {'title' in this.state.movie? this.state.movie.title: ''}: Trailer
                                </h2>
                                <div class="mop-video__description js-summary-video-description">
                                </div>
                            </div>
                          </div>
                      </section>
                      <div class="mop__ad-unit">
                        <img src={require('../assets/static_images/static_add.png')} alt="Chicago"  />
                      </div>
                      
                    </div>

                  </div>
              </div>
            </div>
            <div
              class="mop__synopsis "
              >
              <div class="mop__synopsis-inner">
                  <h2 class="mop__synopsis-title">Blumhouse&#39;s {'title' in this.state.movie? this.state.movie.title: ''} (2018) Synopsis</h2>
                  <p class="mop__synopsis-content">{'synopsis' in this.state.movie? this.state.movie.synopsis: 'There is no Synopsis present for this movie'}</p>
              </div>
            </div>
            <div class="row ad-unit--shop-ad">
              <div class="ad" data-unit="shopad" data-responsive="true" data-media="desktop,tablet">
              </div>
            </div>
            <section class="row">
              <div class="">
                  <h3 class="cast-crew-heading inline heading-style-stub heading-style-1 heading-size-l section-header">
                    Cast + Crew
                  </h3>
                  <div class="carousel jcarousel carousel-style-strip row js-carousel-cast-crew">
                    {this.renderMovieCharacters()}
                  </div>
                    <a class="carousel-cast-crew__see-full cta right" href="/blumhouses-truth-or-dare-2018-208538/cast-and-crew">
                    {/* See Full Cast + Crew for Blumhouse&#39;s Truth or Dare (2018) */}
                    </a>
              </div>
            </section>
            <div class="row width-100">
              <h3 id = "review-list" class="inline heading-style-stub heading-style-1 heading-size-l">Movie Reviews</h3>
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
                          {this.getMovieReviews()}
                        </div>
                        <div class="fan-reviews__decoration-bottom"></div>
                    </div>
                    {review_link}
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
                      <input class="star star-5" id="star-5" type="radio" name="star" />
                      <label class="star star-5" for="star-5" data-rating = "5" onClick = {this.handleStarClick.bind(this)}></label>
                      <input class="star star-4" id="star-4" type="radio" name="star"/>
                      <label class="star star-4" for="star-4" data-rating = "4" onClick = {this.handleStarClick.bind(this)}></label>
                      <input class="star star-3" id="star-3" type="radio" name="star"/>
                      <label class="star star-3" for="star-3" data-rating = "3" onClick = {this.handleStarClick.bind(this)}></label>
                      <input class="star star-2" id="star-2" type="radio" name="star"/>
                      <label class="star star-2" for="star-2" data-rating = "2" onClick = {this.handleStarClick.bind(this)}></label>
                      <input class="star star-1" id="star-1" type="radio" name="star"/>
                      <label class="star star-1" for="star-1" data-rating = "1" onClick = {this.handleStarClick.bind(this)}></label>
                      </div>
                    </div>
                </div>
                <hr class="write-review-form__line" />
                <h2 class="heading-style-1 heading-size-l">Write a review</h2>
                <ul id="writeReviewForm__errors"></ul>
                <section class="write-review-form__group">
                    <label for="writeReviewForm__title">Title:</label>
                    <input type="text" maxlength="200" id="writeReviewForm__title" onChange = {this.handleTitleChange.bind(this)}/>
                </section>
                <section class="write-review-form__group">
                    <textarea rows="12" cols="200" id="writeReviewForm__body" onChange = {this.handleReviewContentChange.bind(this)} ></textarea>
                </section>
                <p class="write-review-form__save-btn">
                    <a id="writeReviewForm__cancel-button" class="btn-cancel" href="/blumhouses-truth-or-dare-2018-208538/movie-reviews">Cancel</a>
                    <button class="btn-cta" id="writeReviewForm__button" onClick = {this.addReview.bind(this)}>Save Review</button>
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
              