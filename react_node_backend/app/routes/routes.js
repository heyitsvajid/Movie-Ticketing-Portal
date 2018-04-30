module.exports = function (app) {

  var api_controller = require('../controllers/controller.js');

  //Login
  app.post('/login', api_controller.login);

  //SignUp
  app.post('/signup', api_controller.signup);

  //logout
  app.post('/logout', api_controller.logout);

  //Check Login
  app.get('/isLoggedIn', api_controller.isLoggedIn);

  //Get Profile Details
  app.post('/getprofiledetails', api_controller.getProfileDetails );

  // Update Profile Details Basic Info
  app.post('/updateprofilebasicinfo', api_controller.updateProfileDetailsBasicInfo );

  // checking for existing email
  app.post('/checkforexistingemail', api_controller.checkforExistingEmail );

  //Update Profile Details Email
  app.post('/updateprofileemail', api_controller.updateProfileDetailsEmail );

  //Update Profile Details Password
  app.post('/updateprofilepassword', api_controller.updateProfileDetailsPassword );


  //Update Profile Details Password
  app.post('/disableaccount', api_controller.disableAccount );

  //Search based on zip, state, city or movie
  app.post('/searchQuery', api_controller.searchQuery );

  //getting all users that is role_number = 1
  app.get('/getAllUsersOnly', api_controller.getAllUsersOnly);

    //Find All Multiplex
  app.get('/findAllMultiplex', api_controller.findAllMultiplex);

  //Find Multiplex By Id
  app.post('/findMultiplexById', api_controller.findMultiplexById);

  //Create Multiplx  
  app.post('/createNewMultiplex', api_controller.createNewMultiplex);

  //update Multiplx  
  app.post('/updateMultiplex', api_controller.updateMultiplex);

  //Find All Movie
  app.get('/findAllMovie', api_controller.findAllMovie);

  //Find Movie By Id
  app.post('/findMovieById', api_controller.findMovieById);

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

  //Finding All Multiplex Admins
  app.get('/findallmultiplexadmin', api_controller.findAllMultiplexAdmins);

  //Finding All Multiplex Admins by ID
  app.post('/findmultiplexadminbyid', api_controller.findMultiplexAdminbyId);

  //Add Movie Review
  app.post('/addMovieReview', api_controller.addMovieReview);

  //Complete payment details
  app.post('/completePayment', api_controller.completePayment);

  //Find details of ticket confirmation
  app.post('/getTicketConfirmation', api_controller.getTicketConfirmation);


  //Admin data fetching

  app.post('/getMovieRevenuePerYear', api_controller.getMovieRevenuePerYear);

  app.post('/getCityRevenuePerYear', api_controller.getCityRevenuePerYear);

  app.post('/getMultiplexSoldTicketsPerMonth', api_controller.getMultiplexSoldTicketsPerMonth);

  app.post('/getAllBillingDetails', api_controller.getAllBillingDetails);

  app.post('/getBillingDetailsPerUser', api_controller.getBillingDetailsPerUser);

  app.post('/getCardDetailsPerUser', api_controller.getCardDetailsPerUser);

  app.post('/getCardDetails', api_controller.getCardDetails);

  app.post('/saveUserCardDetails', api_controller.saveUserCardDetails);

  // app.post('/getShowDetails', api_controller.getShowDetails);
  
  app.get('/getClicksPerPage', api_controller.getClicksPerPage);

  app.get('/getMovieClicks', api_controller.getMovieClicks);


    //Click Analytics
  app.post('/logUserClick', api_controller.logUserClick)

    // Deleting Billing Detail
    app.post('/deletebillingdetail', api_controller.deleteBillingDetail );

    app.get('/getAllSessionDetails', api_controller.getAllSessionDetails);

    
    app.post('/movieClickCount', api_controller.movieClickCount);

    app.post('/updateUserImage', api_controller.updateUserImage);

    app.post('/getMultiplexAdminGraph', api_controller.getMultiplexAdminGraph);
    
};


