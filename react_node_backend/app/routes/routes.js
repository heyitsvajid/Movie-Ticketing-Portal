module.exports = function (app) {

  var api_controller = require('../controllers/controller.js');

  //Login
  app.post('/login', api_controller.login);

  //SignUp
  app.post('/signup', api_controller.signup);

  //Check Login
  app.get('/isLoggedIn', api_controller.isLoggedIn);

  //Get profile
  app.post('/getProfile', api_controller.getprofile);

  //Find All Multiplex
  app.get('/findAllMultiplex', api_controller.findAllMultiplex);

  //Create Multiplx  
  app.post('/createNewMultiplex', api_controller.createNewMultiplex);

  //update Multiplx  
  app.post('/updateMultiplex', api_controller.updateMultiplex);

  //Find All Movie
  app.get('/findAllMovie', api_controller.findAllMovie);

  //Create Movie  
  app.post('/createNewMovie', api_controller.createNewMovie);

  //update Movie  
  app.post('/updateMovie', api_controller.updateMovie);

  //add Movie Character  
  app.post('/addMovieCharacter', api_controller.addMovieCharacter);

  //add Show Timings  
  app.post('/addShowTimings', api_controller.addShowTimings);

  //update Show Timings  
  app.post('/updateShowTimings', api_controller.updateShowTimings);

  //Creating Multiplex Admin
  app.post('/createmultiplexadmin', api_controller.createMultiplexAdmin);

  //Add Movie Review
  app.post('/addMovieReview', api_controller.addMovieReview);


}


