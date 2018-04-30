//Files
var connection = new require('./kafka/Connection');
var user;
var utility = require('./util/util.js');

var MultiplexModel = require('./model/MultiplexModel');
var MovieModel = require('./model/MovieModal');
var UserModal = require('./model/UserModal');
var PaymentModel = require('./model/PaymentModel');
var AnalyticsModel = require('./model/AnalyticsModal');

//Kafka Topics
var user_topic = 'user_request';
var response_topic = 'topic_response';
var multiplex_topic = 'multiplex_request';
var movie_topic = 'movie_request';
var showtiming_topic = 'showtiming_request';
var review_topic = 'review_request';
var complete_payment = 'completePayment';
var fetchBillingDetails = 'fetchBillingDetails';
var logUserTrack_topic = 'logUserTrack_topic';


//Producer
var producer = connection.getProducer();
producer.on('error', function (err) {
    console.log('producer.on error: ' + err);
    process.exit();
});

//Consumers
var user_consumer = connection.getConsumer(user_topic);
var multiplex_consumer = connection.getConsumer(multiplex_topic);
var movie_consumer = connection.getConsumer(movie_topic);
var showtiming_consumer = connection.getConsumer(showtiming_topic);
var multiplexadmin_consumer = connection.getConsumer('multiplexadmin_request');
var review_consumer = connection.getConsumer(review_topic);
var completePayment = connection.getConsumer(complete_payment);
var fetchBillingDetails = connection.getConsumer(fetchBillingDetails);
var logUserTrack_consumer = connection.getConsumer(logUserTrack_topic);

//User Consumer
user_consumer.on('message', function (message) {
    console.log('Kafka Server login_consumer : message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data after parsing in user_consumer ", data );
    if(data.data.request_code === 1) {
        UserModal.login_request(data.data, function (err, res) {
            console.log('Kafka Server : after handle in login');
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };
            if(res !== null) {
                resultObject.successMsg = 'User Found';
                resultObject.errorMsg = '';
                resultObject.data = res
            } else {
                resultObject.successMsg = '';
                resultObject.errorMsg = 'User not found or Password mismatch';
                resultObject.data =  {};
            }
            console.log("After formation of resultobject in login_request in serverjs",resultObject);
            var payloads = utility.createPayload(data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }
    else if(data.data.request_code === 2 ) {
        console.log("Inside request code number 2 ", data.data)
        UserModal.signup_request(data.data, function ( err, res) {
            console.log('Kafka Server : after handle in SignUp');
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error creating User';
            }
            else{
                if( res.code === 1) {
                    resultObject.successMsg = '';
                    resultObject.errorMsg = res.message;
                }
                else if (  res.code === 2 ) {
                    resultObject.successMsg= res.message;
                    resultObject.errorMsg= '';
                }
            }
            console.log("After formation of resultobject in signup_request in serverjs", resultObject);
            var payloads = utility.createPayload(data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }
    else if(data.data.request_code === 3) {
        console.log("Inside request code 3 : Get Profile details", data.data);
        UserModal.get_profile_request( data.data, function (err, res) {
            console.log('Kafka Server : after handle in Get Profile Details');
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };
            if(res !== null) {
                resultObject.successMsg = 'Got User Profile Successfully';
                resultObject.errorMsg = '';
                resultObject.data = res
            }
            else {
                resultObject.successMsg = '';
                resultObject.errorMsg = 'User not found';
                resultObject.data =  {};
            }
            console.log("After formation of resultobject in get_profile_request in serverjs",resultObject);
            var payloads = utility.createPayload(data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }
    else if(data.data.request_code === 4) {
        console.log("In Request Code 4 : Update Basic Info" , data.data);
        UserModal.update_basic_information_profile_request( data.data, function (err, res) {
            console.log('Kafka Server : after handle in update_basic_information_profile_request');
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };
            if( res !== null) {
                resultObject.successMsg = 'Updated Users Basic Profile Successfully';
                resultObject.errorMsg = '';
                resultObject.data = res
            } else {
                resultObject.successMsg = '';
                resultObject.errorMsg = 'User not found or Error updating the profile';
                resultObject.data =  {};
            }
            console.log("After formation of resultobject in update_basic_information_profile_request in serverjs",resultObject);
            var payloads = utility.createPayload(data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }
    else if(data.data.request_code === 5) {
        console.log("In Request Code 5 : Update Email " , data.data );
        UserModal.update_email_profile_request(data.data, function (err, res) {
            console.log('Kafka Server : after handle in update_email_profile_request');
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };
            if(res !== null) {
                resultObject.successMsg = 'Updated Users email Successfully';
                resultObject.errorMsg = '';
                resultObject.data = res
            } else {
                resultObject.successMsg = '';
                resultObject.errorMsg = 'User not found or Error updating email';
                resultObject.data =  {};
            }
            console.log("After formation of resultobject in update_email_profile_request in serverjs",resultObject);
            var payloads = utility.createPayload(data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err) ;
            } );
            return;
        });
    }
    else if(data.data.request_code === 6) {
        console.log("In Request Code 6 : Update Password " , data.data );
        UserModal.update_password_profile_request(data.data, function (err, res) {
            console.log('Kafka Server : after handle in update_password_profile_request', res.code, res.message);
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };

            if(res.code === 1) {

                resultObject.successMsg = res.message;
                resultObject.errorMsg = '';
                resultObject.data = res
            }
            else if(res.code === 2) {
                resultObject.successMsg = '';
                resultObject.errorMsg = res.message;
                resultObject.data =  {};
            }
            console.log("After formation of resultobject in update_password_profile_request in serverjs",resultObject);
            var payloads = utility.createPayload(data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err) ;
            } );
            return;
        });
    }
    else if(data.data.request_code === 7) {
        console.log("In Request Code 7 : Disable Account " , data.data );
        UserModal.disable_account_request(data.data, function (err, res) {
            console.log('Kafka Server : after handle in disable_account_request', res);
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };

            if(res !== null) {

                resultObject.successMsg = res;
                resultObject.errorMsg = '';
                resultObject.data = res
            }
            else {
                resultObject.successMsg = '';
                resultObject.errorMsg = 'Error disabling user';
                resultObject.data =  {};
            }
            console.log("After formation of resultobject in disable_account_request in serverjs",resultObject);
            var payloads = utility.createPayload(data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err) ;
            } );
            return;
        });
    }
    else if(data.data.request_code === 8) {
        console.log("In Request Code 8 : Get All Normal user only " , data.data );
        UserModal.getAllNormalUsers_request(data.data, function (err, res) {
            console.log('Kafka Server : after handle in getAllNormalUsers_request', res);
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };

            if(res !== null) {

                resultObject.successMsg = "Got All Users only";
                resultObject.errorMsg = '';
                resultObject.data = res
            }
            else {
                resultObject.successMsg = '';
                resultObject.errorMsg = 'Error getting users';
                resultObject.data =  {};
            }
            console.log("After formation of resultobject in getAllNormalUsers_request in serverjs",resultObject);
            var payloads = utility.createPayload(data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err) ;
            } );
            return;
        });
    }
    else if(data.data.request_code === 9) {
        console.log("In Request Code 9 : Checking for Existing Email " , data.data );
        UserModal.checkfor_existing_email(data.data, function (err, res) {
            console.log('Kafka Server : after handle in for_existing_email', res);
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };

            if( res.length === 0 ) {
                resultObject.successMsg = '';
                resultObject.errorMsg = 'email not present in DB';
                resultObject.data =  {};
            }
            else {
                resultObject.successMsg = "Got existing_email ";
                resultObject.errorMsg = '';
                resultObject.data = res
            }

            console.log("After formation of resultobject in for_existing_email in serverjs",resultObject);
            var payloads = utility.createPayload(data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err) ;
            } );
            return;
        });
    }else if(data.data.request_code === 10) {
        console.log("In Request Code 10 : Saving User mail " , data.data );
        UserModal.save_user_image(data.data, function (err, res) {
            console.log('Kafka Server : after handle in save_user_image', res);
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };

            if( res === "success" ) {
                resultObject.successMsg = "Image updated Successfully";
                resultObject.errorMsg = '';
                resultObject.data = {};
            }
            else {
                resultObject.successMsg = '';
                resultObject.errorMsg = 'Error in image updating';
                resultObject.data =  {};
            }

            console.log("After formation of resultobject in save_user_image in serverjs",resultObject);
            var payloads = utility.createPayload(data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err) ;
            } );
            return;
        });
    }


});


// Signup Consumer
// user_consumer.on('message', function (message) {
//     console.log('Kafka Server signup_consumer : message received');
//     console.log(JSON.stringify(message.value));
//     var data = JSON.parse(message.value);
//     user.signup_request(data.data, function (err, res) {
//         console.log('Kafka Server : after handle');
//         var payloads = utility.createPayload(data, res);
//         console.log('is producer ready : ' + producer.ready);
//         producer.send(payloads, function (err, data) {
//             utility.log(data, err);
//         });
//         return;
//     });
// });

//Multiplex Consumer
multiplex_consumer.on('message', function (message) {
    console.log('Kafka Server multiplex_consumer : message received');
    var request_data = JSON.parse(message.value);
    console.log(request_data);
    if (request_data.data.request_code == 1) {
        MultiplexModel.findAllMultiplex(function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error fetching all multiplex';
            }else{
                resultObject.successMsg= 'Fetching all Multiplexes';
                resultObject.errorMsg= '';
                resultObject.data=res;
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }
    else if (request_data.data.request_code == 2) {
        console.log(JSON.parse(request_data.data.screen));
        MultiplexModel.createNewMultiplex(request_data.data, request_data.data.dbPath,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error adding multiplex';
            }else{
                resultObject.successMsg= 'Multiplex added successfully';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });    
        });
        return;    
    }
    else if (request_data.data.request_code == 3) {
        console.log(JSON.parse(request_data.data.screen));
        MultiplexModel.updateMultiplex(request_data.data, request_data.data.dbPath,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error updating multiplex';
            }else{
                resultObject.successMsg= 'Multiplex updated successfully';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });    
        });
        return;    
    }
    if (request_data.data.request_code == 4) {
        MultiplexModel.findMultiplexById(request_data.data,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err || !res){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error fetching multiplex';
            }else{
                resultObject.successMsg= 'Fetching Multiplex';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }
    if (request_data.data.request_code == 5) {
        console.log('Kafka Server multiplex_consumer : message received inside request code 5 for searching', request_data.data);
        MultiplexModel.multiplexSearch(request_data.data,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err || !res){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error fetching search results';
            }else{
                resultObject.successMsg= 'Fetching Search Results';
                resultObject.errorMsg= '';
                resultObject.data=res;
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }else if (request_data.data.request_code == 6) {
        console.log('Kafka Server multiplex_consumer : message received inside request code 6 for revenueByEachMovie', request_data.data);
        MultiplexModel.revenueByEachMovie(request_data.data,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err || !res){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error fetching results';
            }else{
                resultObject.successMsg= 'Fetching Results';
                resultObject.errorMsg= '';
                resultObject.data=res;
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }
});

//Movie Consumer
movie_consumer.on('message', function (message) {
    console.log('Kafka Server movie_consumer : message received');
    var request_data = JSON.parse(message.value);
    console.log(request_data);
    if (request_data.data.request_code == 1) {
        MovieModel.findAllMovie(function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error fetching all movie';
            }else{
                resultObject.successMsg= 'Fetching all Moviees';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }
    else if (request_data.data.request_code == 2) {
        MovieModel.createNewMovie(request_data.data, request_data.data.dbPath,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error adding movie';
            }else{
                resultObject.successMsg= 'Movie added successfully';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });    
        });
        return;    
    }
    else if (request_data.data.request_code == 3) {
        MovieModel.updateMovie(request_data.data, request_data.data.dbPath,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err  || !res){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error updating movie';
            }else{
                resultObject.successMsg= 'Movie updated successfully';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });    
        });
        return;    
    }
    else if (request_data.data.request_code == 4) {
        MovieModel.addMovieCharacters(request_data.data, request_data.data.dbPath,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error adding movie character';
            }else{
                resultObject.successMsg= 'Movie character added successfully';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });    
        });
        return;    
    }
    else if (request_data.data.request_code == 5) {
        MovieModel.findMovieById(request_data.data,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err || !res){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error fetching movie';
            }else{
                resultObject.successMsg= 'Fetching Movie';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }


});

//Multiplex Consumer
showtiming_consumer.on('message', function (message) {
    console.log('Kafka Server showtiming_consumer : message received');
    var request_data = JSON.parse(message.value);
    console.log(request_data);
    if (request_data.data.request_code == 1) {
        MultiplexModel.addShowTiming(request_data.data,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error  adding show';
            }else{
                resultObject.successMsg= 'Successfully added show';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }
    else     if (request_data.data.request_code == 2) {
        MultiplexModel.updateShowTiming(request_data.data,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res );
            if(err || !res){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error updating show';
            }else{
                resultObject.successMsg= 'Successfully updated show';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }

});

//Multiplex Admin
multiplexadmin_consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var request_data = JSON.parse(message.value);
    console.log('Data after parsing', request_data);
    var finalrequest_body = request_data.data;
    var request_code = request_data.data.request_code;
    console.log("Final Data...", finalrequest_body, request_code );
    //request_code = 1, create a multiplex admin
    if(request_code === 1) {
        console.log('Data after parsing priting data only', finalrequest_body);
        UserModal.createMultiplexAdmin(finalrequest_body, function(err,res) {
            console.log('after handle', res);
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error creating Multiplex Admin';
            }
            else{
                if( res.code === 1) {
                    resultObject.successMsg = '';
                    resultObject.errorMsg = res.message;
                }
                else if (  res.code === 2 ) {
                    resultObject.successMsg= res.message;
                    resultObject.errorMsg= '';
                }
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log(payloads);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }

    //request_code = 2, find multiplex admin by id
    else if(request_code === 2) {
        console.log('Data after parsing priting data only', finalrequest_body);
        UserModal.findMultiplexAdminbyId( finalrequest_body, function(err,res) {
            console.log('after handle', res);
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error in finding Multiplex Admin';
            }else{
                resultObject.successMsg= 'Successfully found Multiplex Admin by id';
                resultObject.errorMsg= '';
                resultObject.data = res ;
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log(payloads);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }

    //request_code = 3, find all multiplex admins
    else if(request_code === 3) {
        console.log('Data after parsing priting data only', finalrequest_body);
        UserModal.findAllMultiplexAdmins( finalrequest_body, function(err,res) {
            console.log('after handle', res);
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            };
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error in finding Multiplex Admin';
            }else{
                resultObject.successMsg= 'Successfully found all Multiplex Admins';
                resultObject.errorMsg= '';
                resultObject.data = res ;
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log(payloads);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });

    }

});


//Movie Reviews Consumer
review_consumer.on('message', function (message) {
    console.log('Kafka Server review_consumer : message received');
    var request_data = JSON.parse(message.value);
    console.log(request_data);
    if (request_data.data.request_code == 1) {
        MovieModel.addMovieReview(request_data.data,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error adding review';
            }else{
                resultObject.successMsg= 'Review added successfully';
                resultObject.errorMsg= '';
                resultObject.data=res;
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }
});

completePayment.on('message', function (message) {
    console.log('Kafka Server Complete Payment: Card Information Received');
    var payment_data = JSON.parse(message.value);
    console.log("Hello")
    console.log(payment_data);
        PaymentModel.complete_Payment(payment_data,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error completing payment';
            }else{
                resultObject.successMsg= 'Payment successfully done.';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(payment_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
});


fetchBillingDetails.on('message', function (message) {
    // console.log('Kafka Server Complete Payment: Card Information Received');
    var billing_data = JSON.parse(message.value);
    console.log("Fetching Card Details")
    console.log(billing_data)
    console.log("Hello compare request id")
    console.log(billing_data.data.request_id);
    var request_id = billing_data.data.request_id;
        if(request_id==1){
            PaymentModel.fetchBillingDetails(billing_data,function (err, res) {
                var resultObject = {
                    successMsg: '',
                    errorMsg: '',
                    data: {}
                }
                console.log('Kafka Server : after handle');
                console.log(res );
                if(err){
                    resultObject.successMsg= '';
                    resultObject.errorMsg= 'Error completing payment';
                }else{
                    resultObject.successMsg= 'Data successfully fetched.';
                    resultObject.errorMsg= '';
                    resultObject.data=res;         
                }

                console.log(resultObject );
                let payloads = utility.createPayload(billing_data,res,resultObject);
                console.log('is producer ready : ' + producer.ready);
                producer.send(payloads, function (err, data) {
                    utility.log(data, err);
                });
                return;
            });
        }
        else if(request_id==2){
            console.log("request_id : "+ request_id)
            PaymentModel.fetchBillingDetailsPerUser(billing_data,function (err, res) {
                var resultObject = {
                    successMsg: '',
                    errorMsg: '',
                    data: {}
                }
                console.log('Kafka Server : after handle');
                console.log(res );
                if(err){
                    resultObject.successMsg= '';
                    resultObject.errorMsg= 'Error completing payment';
                }else{
                    resultObject.successMsg= 'Data successfully fetched.';
                    resultObject.errorMsg= '';
                    resultObject.data=res;         
                }

                console.log(resultObject );
                let payloads = utility.createPayload(billing_data,res,resultObject);
                console.log('is producer ready : ' + producer.ready);
                producer.send(payloads, function (err, data) {
                    utility.log(data, err);
                });
                return;
            });
        }
        else if(request_id==3){
            console.log("request_id : "+ request_id)
            PaymentModel.getCardDetailsPerUser(billing_data,function (err, res) {
                var resultObject = {
                    successMsg: '',
                    errorMsg: '',
                    data: {}
                }
                console.log('Kafka Server : after handle');
                console.log(res );
                if(err){
                    resultObject.successMsg= '';
                    resultObject.errorMsg= 'Error completing payment';
                }else{
                    resultObject.successMsg= 'Data successfully fetched.';
                    resultObject.errorMsg= '';
                    resultObject.data=res;         
                }

                console.log(resultObject );
                let payloads = utility.createPayload(billing_data,res,resultObject);
                console.log('is producer ready : ' + producer.ready);
                producer.send(payloads, function (err, data) {
                    utility.log(data, err);
                });
                return;
            });
        }
        else if(request_id==4){
            console.log("request_id : "+ request_id)
            PaymentModel.getMultiplexSoldTicketsPerMonth(billing_data,function (err, res) {
                var resultObject = {
                    successMsg: '',
                    errorMsg: '',
                    data: {}
                }
                console.log('Kafka Server : after handle');
                console.log(res );
                if(err){
                    resultObject.successMsg= '';
                    resultObject.errorMsg= 'Error completing payment';
                }else{
                    resultObject.successMsg= 'Data successfully fetched.';
                    resultObject.errorMsg= '';
                    resultObject.data=res;         
                }

                console.log(resultObject );
                let payloads = utility.createPayload(billing_data,res,resultObject);
                console.log('is producer ready : ' + producer.ready);
                producer.send(payloads, function (err, data) {
                    utility.log(data, err);
                });
                return;
            });
        }
        else if(request_id==5){
            console.log("request_id : "+ request_id)
            PaymentModel.getCityRevenuePerYear(billing_data,function (err, res) {
                var resultObject = {
                    successMsg: '',
                    errorMsg: '',
                    data: {}
                }
                console.log('Kafka Server : after handle');
                console.log(res );
                if(err){
                    resultObject.successMsg= '';
                    resultObject.errorMsg= 'Error completing payment';
                }else{
                    resultObject.successMsg= 'Data successfully fetched.';
                    resultObject.errorMsg= '';
                    resultObject.data=res;         
                }

                console.log(resultObject );
                let payloads = utility.createPayload(billing_data,res,resultObject);
                console.log('is producer ready : ' + producer.ready);
                producer.send(payloads, function (err, data) {
                    utility.log(data, err);
                });
                return;
            });
        }
        else if(request_id==6){
            console.log("request_id : "+ request_id)
            PaymentModel.getMovieRevenuePerYear(billing_data,function (err, res) {
                var resultObject = {
                    successMsg: '',
                    errorMsg: '',
                    data: {}
                }
                console.log('Kafka Server : after handle');
                console.log(res );
                if(err){
                    resultObject.successMsg= '';
                    resultObject.errorMsg= 'Error completing payment';
                }else{
                    resultObject.successMsg= 'Data successfully fetched.';
                    resultObject.errorMsg= '';
                    resultObject.data=res;         
                }

                console.log(resultObject );
                let payloads = utility.createPayload(billing_data,res,resultObject);
                console.log('is producer ready : ' + producer.ready);
                producer.send(payloads, function (err, data) {
                    utility.log(data, err);
                });
                return;
            });
        }
        else if(request_id==7){
            console.log("request_id : "+ request_id)
            PaymentModel.getTicketConfirmation(billing_data,function (err, res) {
                var resultObject = {
                    successMsg: '',
                    errorMsg: '',
                    data: {}
                }
                console.log('Kafka Server : after handle');
                console.log(res );
                if(err){
                    resultObject.successMsg= '';
                    resultObject.errorMsg= 'Error completing payment';
                }else{
                    resultObject.successMsg= 'Data successfully fetched.';
                    resultObject.errorMsg= '';
                    resultObject.data=res;         
                }

                console.log(resultObject );
                let payloads = utility.createPayload(billing_data,res,resultObject);
                console.log('is producer ready : ' + producer.ready);
                producer.send(payloads, function (err, data) {
                    utility.log(data, err);
                });
                return;
            });
        }
        else if(request_id==8){
            console.log("In Request_id : "+ request_id);
            PaymentModel.deleteBillingDetail(billing_data,function ( err, res) {
                var resultObject = {
                    successMsg: '',
                    errorMsg: '',
                    data: {}
                };
                console.log('Kafka Server : after handle');
                console.log(res );
                if(err){
                    resultObject.successMsg= '';
                    resultObject.errorMsg= 'Error deleting billing details';
                }else{
                    resultObject.successMsg= 'Billing details successfully deleted.';
                    resultObject.errorMsg= '';
                    resultObject.data=res;
                }
                console.log(resultObject );
                let payloads = utility.createPayload(billing_data,res,resultObject);
                console.log('is producer ready : ' + producer.ready);
                producer.send(payloads, function (err, data) {
                    utility.log(data, err);
                });
                return;
            });
        }
        else if(request_id==9){
            console.log("In Request_id : "+ request_id);
            PaymentModel.getCardDetails(billing_data,function ( err, res) {
                var resultObject = {
                    successMsg: '',
                    errorMsg: '',
                    data: {}
                };
                console.log('Kafka Server : after handle');
                console.log(res );
                if(err){
                    resultObject.successMsg= '';
                    resultObject.errorMsg= 'Error deleting billing details';
                }else{
                    resultObject.successMsg= 'Billing details successfully deleted.';
                    resultObject.errorMsg= '';
                    resultObject.data=res;
                }
                console.log(resultObject );
                let payloads = utility.createPayload(billing_data,res,resultObject);
                console.log('is producer ready : ' + producer.ready);
                producer.send(payloads, function (err, data) {
                    utility.log(data, err);
                });
                return;
            });
        }
        else if(request_id==10){
            console.log("In Request_id : "+ request_id);
            PaymentModel.saveUserCardDetails(billing_data,function ( err, res) {
                var resultObject = {
                    successMsg: '',
                    errorMsg: '',
                    data: {}
                };
                console.log('Kafka Server : after handle');
                console.log(res );
                if(err){
                    resultObject.successMsg= '';
                    resultObject.errorMsg= 'Error entering saving user card details';
                }else{
                    resultObject.successMsg= 'User card details added successfully.';
                    resultObject.errorMsg= '';
                    resultObject.data=res;
                }
                console.log(resultObject );
                let payloads = utility.createPayload(billing_data,res,resultObject);
                console.log('is producer ready : ' + producer.ready);
                producer.send(payloads, function (err, data) {
                    utility.log(data, err);
                });
                return;
            });
        }
});

//Movie Consumer
 
logUserTrack_consumer.on('message', function (message) {
    console.log('Kafka Server logUserTrack_consumer : message received');
    var request_data = JSON.parse(message.value);
    console.log(request_data);
    if (request_data.data.request_code == 1) {
        AnalyticsModel.findAllTracks(function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error fetching all tracks';
            }else{
                resultObject.successMsg= 'Fetching all user tracks';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });
    }
    else if (request_data.data.request_code == 2) {
        AnalyticsModel.addUserTrack(request_data.data,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error adding track';
            }else{
                resultObject.successMsg= 'USer Track added successfully';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });    
        });
        return;    
    }
    else if (request_data.data.request_code == 3) {
        AnalyticsModel.findByUserId(request.data._id,function (err, res) {
            var resultObject = {
                successMsg: '',
                errorMsg: '',
                data: {}
            }
            console.log('Kafka Server : after handle');
            console.log(res);
            if(err  || !res){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error fetching track for user';
            }else{
                resultObject.successMsg= 'Track found';
                resultObject.errorMsg= '';
                resultObject.data=res;         
            }
            let payloads = utility.createPayload(request_data, resultObject);
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });    
        });
        return;    
    }
});

console.log('server is running');
process.on("SIGINT", function () {
    multiplexadmin_consumer.close(true, function () {
        process.exit();
    });
    multiplex_consumer.close(true, function () {
        process.exit();
    });
    movie_consumer.close(true, function () {
        process.exit();
    });
    review_consumer.close(true, function () {
        process.exit();
    });
    showtiming_consumer.close(true, function () {
        process.exit();
    });
    user_consumer.close(true, function () {
        process.exit();
    });

});



