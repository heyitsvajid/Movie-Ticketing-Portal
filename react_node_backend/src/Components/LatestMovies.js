import React, { Component } from 'react';
import axios from 'axios';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
  
  }

  render() {
    return (
    <div>
      <div id="homeMovieCarousel" class="carousel jcarousel carousel-style-strip">
        <ol class="carousel-items js-items">
          <li>
            <div class="fluid poster">
              <a href="/rampage-2018-207628/movie-overview" class="visual-container">
              <img class="poster-thumb-size-s visual-thumb" src="//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/207628/RMPGE_VERT_ONLINE_TEASER_DOM_2764x4096_master.jpg" alt="Rampage (2018) poster" />
              </a>
              <div>
                <a class="heading-style-1 movie-header heading-size-s heading__movie-carousel" href="/rampage-2018-207628/movie-overview">Rampage (2018)</a>
                <time datetime="Fri, Apr 13">Fri, Apr 13</time>
              </div>
            </div>
          </li>
          <li>
            <div class="fluid poster">
              <a href="/a-quiet-place-207769/movie-overview" class="visual-container">
              <img class="poster-thumb-size-s visual-thumb" src="//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/207769/AQuietPlace2018.jpg" alt="A Quiet Place poster" />
              </a>
              <div>
                <a class="heading-style-1 movie-header heading-size-s heading__movie-carousel" href="/a-quiet-place-207769/movie-overview">A Quiet Place</a>
                <time datetime="Fri, Apr 6">Fri, Apr 6</time>
              </div>
            </div>
          </li>
          <li>
            <div class="fluid poster">
              <a href="/ready-player-one-204139/movie-overview" class="visual-container">
              <img class="poster-thumb-size-s visual-thumb" src="//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/204139/RPO_new_MAIN_VERT_DOM_2764x.jpg" alt="Ready Player One poster" />
              </a>
              <div>
                <a class="heading-style-1 movie-header heading-size-s heading__movie-carousel" href="/ready-player-one-204139/movie-overview">Ready Player One</a>
                <time datetime="Thu, Mar 29">Thu, Mar 29</time>
              </div>
            </div>
          </li>
          <li>
            <div class="fluid poster">
              <a href="/blumhouses-truth-or-dare-2018-208538/movie-overview" class="visual-container">
              <img class="poster-thumb-size-s visual-thumb" src="//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/208538/TruthOrDare2018.jpg" alt="Blumhouse&#39;s Truth or Dare (2018) poster" />
              </a>
              <div>
                <a class="heading-style-1 movie-header heading-size-s heading__movie-carousel" href="/blumhouses-truth-or-dare-2018-208538/movie-overview">Blumhouse&#39;s Truth or Dare (2018)</a>
                <time datetime="Fri, Apr 13">Fri, Apr 13</time>
              </div>
            </div>
          </li>
          <li>
            <div class="fluid poster">
              <a href="/blockers-206654/movie-overview" class="visual-container">
              <img class="poster-thumb-size-s visual-thumb" src="//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/206654/Blockers-Full.jpg" alt="Blockers poster" />
              </a>
              <div>
                <a class="heading-style-1 movie-header heading-size-s heading__movie-carousel" href="/blockers-206654/movie-overview">Blockers</a>
                <time datetime="Fri, Apr 6">Fri, Apr 6</time>
              </div>
            </div>
          </li>
          <li>
            <div class="fluid poster">
              <a href="/isle-of-dogs-205852/movie-overview" class="visual-container">
              <img class="poster-thumb-size-s visual-thumb" src="//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/205852/IOD-rated-one-sheet.jpg" alt="Isle of Dogs poster" />
              </a>
              <div>
                <a class="heading-style-1 movie-header heading-size-s heading__movie-carousel" href="/isle-of-dogs-205852/movie-overview">Isle of Dogs</a>
                <time datetime="Fri, Mar 23">Fri, Mar 23</time>
              </div>
            </div>
          </li>
          <li>
            <div class="fluid poster">
              <a href="/avengers-infinity-war-199925/movie-overview" class="visual-container">
              <img class="poster-thumb-size-s visual-thumb" src="//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/199925/AvengersInfinityWar-postera.jpg" alt="Avengers: Infinity War poster" />
              </a>
              <div>
                <a class="heading-style-1 movie-header heading-size-s heading__movie-carousel" href="/avengers-infinity-war-199925/movie-overview">Avengers: Infinity War</a>
                <time datetime="Fri, Apr 27">Fri, Apr 27</time>
              </div>
            </div>
          </li>
          <li>
            <div class="fluid poster">
              <a href="/chappaquiddick-206369/movie-overview" class="visual-container">
              <img class="poster-thumb-size-s visual-thumb" src="//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/206369/Chappaquiddick_final.jpg" alt="Chappaquiddick poster" />
              </a>
              <div>
                <a class="movie-header heading-style-1 heading-size-s heading__movie-carousel" href="/chappaquiddick-206369/movie-overview">Chappaquiddick</a>
                <time datetime="Fri, Apr 6">Fri, Apr 6</time>
              </div>
            </div>
          </li>
          
          
        </ol>
        
      </div>
    </div>
    )
  }
}



export default Layout;
