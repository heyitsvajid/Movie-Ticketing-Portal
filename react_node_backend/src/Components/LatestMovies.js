import React, { Component } from 'react';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList:[],
    }
  }
  
  componentWillMount(){
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

  getReleaseDate(release_date){
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let day = new Date(release_date).getDate();
    let month_name = monthNames[new Date().getMonth()];
    let year = new Date(release_date).getFullYear()
    const final_date = "" + month_name + " " + day + ", " + year;
    return final_date;
  }

  renderLatestMovies() {
    let eightMovies = [];
    let new_movies = [];

    var movies = this.state.movieList;

    for(i = 0; i < movies.length; i++){
      new Date(movies[i].release_date) <= new Date() ? new_movies.push(movies[i]) : "";
    }

    if(movies.length>0){
      for(var i=0;i<8;i++){
        new_movies[i] != undefined ? eightMovies.push(new_movies[i]) : eightMovies.push("Coming Soon");
      }  
    }
    let moviesNode = eightMovies.map((item, index) => {
      var imageSource = item == "Coming Soon" ? require('../assets/static_images/defaut.jpeg') : require('../images/' + item.movie_logo);
      let movieAnchorTag = null;
      if(item == "Coming Soon"){
        movieAnchorTag = <a href="#" class="visual-container">
            <img class="poster-thumb-size-s visual-thumb" src={imageSource} alt="Coming Soon Poster" />
          </a>
      }
      else{
        movieAnchorTag =  <a data-movieid = {item._id} href="#" onClick = {this.showMovieDetailsPage.bind(this)} class="visual-container">
            <img class="poster-thumb-size-s visual-thumb" data-movieid = {item._id} src={imageSource} alt="Movie Poster" />
          </a>
      }
      const movie_release_date = item == "Coming Soon" ? "" : this.getReleaseDate(item.release_date);
      const movie_title = item == "Coming Soon" ? item : item.title;
      return (
        <li key={item == "Coming Soon" ? "" : item._id}>
          <div class="fluid poster">
            { movieAnchorTag}
            <div>
              <a class="heading-style-1 movie-header heading-size-s heading__movie-carousel" href="#" data-movieid = {item._id} onClick = {this.showMovieDetailsPage.bind(this)}>{movie_title}</a>
              <time datetime="Fri, Apr 13">{movie_release_date}</time> 
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

  render() {
    return (
    <div>
      <div id="homeMovieCarousel" class="upcoming-movies carousel jcarousel carousel-style-strip">
        {this.renderLatestMovies()}
      </div>
    </div>
    )
  }
}



export default Layout;
