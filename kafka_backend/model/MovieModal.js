/**
*Module dependencies
*/
var MovieModel = require('./movie');
//==============================================================================
/**
*Movie Model Utility functions
*/
function errHandler(err) {
  console.error('There was an error performing the operation');
  console.log(err);
  console.log(err.code);
  console.error(err.message);
}

function validationErr(err, res) {
  Object.keys(err.errors).forEach(function (k) {
    var msg = err.errors[k].message;
    console.error('Validation error for \'%s' + ': %s', k, msg);
    return res.status(404).json({
      msg: 'Please ensure required fields are filled'
    });
  });
}

function createNewMovie(movie, path, callback) {
  MovieModel.create({
    title: movie.title[0],
    synopsis: movie.synopsis[0],
    trailer_link: movie.trailer_link[0],
    release_date: movie.release_date[0],
    mpaa_ratings: movie.mpaa_ratings[0],
    movie_keywords: movie.movie_keywords[0],
    movie_length: movie.movie_length[0],
    movie_definition: movie.movie_definition[0],
    movie_logo: path
  }, function (err, movie) {
    if (err) {
      console.error('There was an error creating the movie');
      errHandler(err);
    } else {
      console.log('New movie successfully created...');
      console.log(movie);
    }
    callback(err, movie);
  })
}

function findMovie(id, callback) {
  MovieModel.findOne({ _id: id },
    function (err, movie) {
      if (err) {
        errHandler(err);
      } else {
        console.log('Movie successfully found...');
      }
      callback(err, movie);
    });
}

function findAllMovie(callback) {
  MovieModel.find({},
    function (err, movies) {
      if (err) {
        errHandler(err);
      } else {
        console.log(movies);
      }
      callback(err, movies)
    });
}

function updateMovie(movie, path, callback) {
  MovieModel.findOne({ _id: movie._id[0] },
    function (err, updateMovie) {
      if (err) {
        errHandler(err);
      }
      if (updateMovie) {
        updateMovie.title = movie.title[0],
          updateMovie.trailer_link = movie.trailer_link[0],
          updateMovie.release_date = movie.release_date[0],
          updateMovie.mpaa_ratings = movie.mpaa_ratings[0],
          updateMovie.movie_keywords = movie.movie_keywords[0],
          updateMovie.movie_length = movie.movie_length[0],
          updateMovie.movie_definition = movie.movie_definition[0],
          updateMovie.movie_logo = path
        updateMovie.save(function (err, movie) {
          if (err) {
            errHandler(err);
          } else {
            console.log('Movie updated= ', movie);
          }
          callback(err, updateMovie)
        });
      } else {
        callback(err, {})
      }

    });
}

function addMovieCharacters(character, path, callback) {
  console.log('abc')

  MovieModel.findOne({ _id: character._id[0] },
    function (err, updateMovie) {
      if (err) {
        errHandler(err);
      }
      if (updateMovie) {
        let movieCharacter = {
          name: character.name[0],
          image_path: path
        }
        updateMovie.movie_characters.push(movieCharacter);
          updateMovie.save(function (err, movie) {
            if (err) {
              errHandler(err);
            } else {
              console.log('Movie updated= ', movie);
            }
            callback(err, movie)
          });
      } else {
        callback(err, {})
      }

    });
}


function addMovieReview(review, callback) {
  console.log(review)

  MovieModel.findOne({ _id: review.data.movie_id },
    function (err, updateMovie) {
      if (err) {
        errHandler(err);
      }
      if (updateMovie) {
        updateMovie.review_ratings.push(review.data.review);
          updateMovie.save(function (err, movie) {
            if (err) {
              errHandler(err);
            } else {
              console.log('Movie updated= ', movie);
            }
            callback(err, movie)
          });
      } else {
        callback(err, {})
        console.log('Movie not found');

      }

    });
}


function findMovieById(id, callback) {
  console.log('Inside Movie Modal :findMovieById');
  MovieModel.findOne({ _id: id.data._id },
    function (err, movie) {
      if (err) {
        errHandler(err);
      }
      if (movie) {
            callback(err, movie)
      } else {
        callback(err, null)
        console.log('Movie not found');
      }

    });
}
// function deleteUser(req, res) {
//    UserModel.findOneAndRemove({email: req.params.email},
//  function (err, user) {
//    if(err) {
//      return errHandler(err);
//    }
//    console.log('User deleted ', user);
//    return res.json(user);
//  });
// }

//==============================================================================
/**
* Export module
*/
module.exports = {
  addMovieCharacters: addMovieCharacters,
  errHandler: errHandler,
  validationErr: validationErr,
  createNewMovie: createNewMovie,
  findMovie: findMovie,
  findAllMovie: findAllMovie,
  updateMovie: updateMovie,
  addMovieReview:addMovieReview,
  findMovieById:findMovieById
  //  deleteUser: deleteUser
};
//==============================================================================