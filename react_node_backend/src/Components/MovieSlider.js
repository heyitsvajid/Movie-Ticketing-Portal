
import React, { Component } from 'react';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
  
  }

  handleMovieClick(e){
    localStorage.setItem("movieID", 9);
    window.location.href = reactURL + "movie_details";
  }

  handleBooking(){
    if(window.location.href.includes('/movies')){
    this.props.onSearchData(this.state.searchQuery);
    }else{
    localStorage.setItem('search','Avengers' )
    window.location.href = reactURL + "movies";
    }
  }

  render() {
    return (
    <div>
      <section class="home-module">
        <section id="heroCarousel" class="nosferatu js-nosferatu">
          <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="item active">
                <img src={require('../assets/static_images/img5.png')} alt="Los Angeles"  />
              </div>
              <div class="item">
                <img src={require('../assets/static_images/img6.png')} alt="Chicago"  />
              </div>
              <div class="item">
                <img src={require('../assets/static_images/img7.png')} alt="New york" />
              </div>
              <div class="item">
                <img src={require('../assets/static_images/img8.png')} alt="New york" />
              </div>
              <div class="item">
                <img src={require('../assets/static_images/img9.png')} alt="New york" />
              </div>
            </div>
            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left arrows"></span>
            <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right arrows"></span>
            <span class="sr-only">Next</span>
            </a>
          </div>
        </section>
      </section>
      <img class="index-image" src="https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKCb8NH00AEQARgBMgjihkt96GxsUw" border="0"/>
      <br/>
      <br/>
      <br/>
      <br/>

      <section class="row width-100">
        <h2 class="inline heading-style-stub heading-style-1 heading-size-l section-header">Avengers: Infinity War</h2>
        <ul class="spotlight-content">
            <div class="width-75 mobile-width-100">
              <li class="spotlight-item  width-66 ">
                  <a href="#" onClick={this.handleMovieClick.bind(this)}>
                  <img class=" collection-card-1 " src="https://images.fandango.com/images/spotlight/collection_MOP_AvengersInfinityWar.jpg" alt="avengers infinity war"/>
                  </a>
              </li>

              <li class="spotlight-item  width-33 ">
                  <a href="#" onClick={this.handleMovieClick.bind(this)}>
                  <img class="" src="https://images.fandango.com/images/spotlight/collection_WhyGo_AvengersInfinityWar.jpg" alt="why go" />
                  </a>
                  <a href="#" onClick={this.handleMovieClick.bind(this)} class="spotlight-caption icon-caption">
                    <h3 class="heading-size-l heading-style-1">Assemble!</h3>
                    <p class="heading-size-s heading-style-2">Reasons to see Marvel's biggest movie yet</p>
                    <i class="icon icon-type-play-white"></i>
                  </a>
              </li>
              <li class="spotlight-item  width-33 ">
                  <a href="#" onClick={this.handleMovieClick.bind(this)}>
                  <img class="" src="https://images.fandango.com/images/spotlight/collection_AvengersInfinityWar_Writers_Interview.jpg" alt="josh brolin as thanos in avengers infinity war" />
                  </a>
                  <a href="#" onClick={this.handleMovieClick.bind(this)} class="spotlight-caption icon-caption">
                    <h3 class="heading-size-l heading-style-1">Thanos Mashups and More</h3>
                    <p class="heading-size-s heading-style-2">Screenwriters confessions</p>
                    <i class="icon icon-type-news-white"></i>
                  </a>
              </li>
              <li class="spotlight-item  width-33 ">
                  <a href="#" onClick={this.handleMovieClick.bind(this)}>
                  <img class="" src="https://images.fandango.com/images/spotlight/collection_AvengersInfinityWar_MCUEncryptedFiles.jpg" alt="avengers infinity war encrypted files" />
                  </a>
                  <a href="#" onClick={this.handleMovieClick.bind(this)} class="spotlight-caption icon-caption">
                    <h3 class="heading-size-l heading-style-1">The Avengers Files</h3>
                    <p class="heading-size-s heading-style-2">Top secret who's who</p>
                    <i class="icon icon-type-news-white"></i>
                  </a>
              </li>
              <li class="spotlight-item  width-33 ">
                  <a href="#" onClick={this.handleMovieClick.bind(this)}>
                  <img class="" src="https://images.fandango.com/images/spotlight/collection_AvengersInfinityWar_JoeRusso_Interview.jpg" alt="the russo brothers" />
                  </a>
                  <a href="https://www.fandango.com/movie-news/exclusive-interview-avengers-infinity-war-co-director-joe-russo-on-the-avengers-the-guardians-and-the-return-of-black-panther-753060" class="spotlight-caption icon-caption">
                    <h3 class="heading-size-l heading-style-1">Interview: Joe Russo</h3>
                    <p class="heading-size-s heading-style-2">Our exclusive conversation</p>
                    <i class="icon icon-type-news-white"></i>
                  </a>
              </li>
            </div>
            <li class="spotlight-showtime width-25 mobile-width-100 large-item-right">
              <h3 class="spotlight-showtime-title heading-style-1 heading-size-l">Buy movie tickets</h3>
              <div class="tablet-width-25">
                  <img src="https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/199925/AvengersInfinityWar-postera.jpg" alt="Avengers: Infinity War" class="spotlight-showtime-poster spotlight-showtime-mb" />
              </div>
              <div class="tablet-width-75">
                  <div class="spotlight-showtime-info">
                    <h4 class="spotlight-showtime-movie-title heading-style-1 heading-size-l">Avengers: Infinity War</h4>
                    <p class="spotlight-showtime-mb heading-style-2 heading-size-s">
                        PG-13
                        , 2 hr 29 min
                    </p>
                    <p class="spotlight-showtime-synopsis spotlight-showtime-mb heading-style-2 heading-size-s">Iron Man, Thor, the Hulk and the rest of the Avengers unite to battle their most powerful enemy yet -- the evil Thanos. On a mission to collect all six Infinity Stones, Thanos plans to use the artifacts to inflict his twisted will on reality. The fate of the planet and existence itself has never been more uncertain as everything the Avengers have fought for has led up to this moment.</p>
                    <a href="#" onClick={this.handleBooking.bind(this)} class="btn">Buy Tickets</a>
                  </div>
              </div>
            </li>
        </ul>
      </section>

      <img class="index-image" src="https://images.fandango.com/images/spotlight/FD_Avengers_1680x350_homestrip_v2.jpg" alt="Fandango Avengers: Infinity War Gift with Purchase" class="index-image offer-tout-img" />
    </div>
    )
  }
}



export default Layout;
              