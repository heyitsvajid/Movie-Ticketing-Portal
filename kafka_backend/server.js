//Files
var connection = new require('./kafka/Connection');
var user;
var utility = require('./util/util.js');

var MultiplexModel = require('./model/MultiplexModel');
var MovieModel = require('./model/MovieModal');
let UserModal = require('./model/UserModal');
//Kafka Topics
var user_topic = 'user_request';
var response_topic = 'response_topic';
var multiplex_topic = 'multiplex_request'
var movie_topic = 'movie_request'
var showtiming_topic = 'showtiming_request';



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

//Login Consumer
user_consumer.on('message', function (message) {
    console.log('Kafka Server login_consumer : message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    user.login_request(data.data, function (err, res) {
        console.log('Kafka Server : after handle');
        console.log(res);
        var payloads = utility.createPayload(data, res);
        console.log('is producer ready : ' + producer.ready);
        producer.send(payloads, function (err, data) {
            utility.log(data, err);
        });
        return;
    });
});


//Signup Consumer
user_consumer.on('message', function (message) {
    console.log('Kafka Server signup_consumer : message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    user.signup_request(data.data, function (err, res) {
        console.log('Kafka Server : after handle');
        var payloads = utility.createPayload(data, res);
        console.log('is producer ready : ' + producer.ready);
        producer.send(payloads, function (err, data) {
            utility.log(data, err);
        });
        return;
    });
});

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
            if(err){
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
            console.log(res);
            if(err){
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
    var data;
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
            }
            if(err){
                resultObject.successMsg= '';
                resultObject.errorMsg= 'Error creating Multiplex Admin';
            }else{
                resultObject.successMsg= 'Successfully created Multiplex Admin';
                resultObject.errorMsg= '';
                resultObject.data=res;
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

    }
    //request_code = 3, find all multiplex admins
    else if(request_code === 3) {
        console.log('Data after parsing priting data only', finalrequest_body);
        findallmultiplexadmins.handle_request(finalrequest_body, function(err,res) {
            console.log('after handle', res);
            var payloads = [
                { topic: request_data.replyTo,
                    messages:JSON.stringify({
                        correlationId:request_data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            console.log('is producer ready : ' + producer.ready);
            producer.send(payloads, function (err, data) {
                utility.log(data, err);
            });
            return;
        });

    }

});

console.log('server is running');
process.on("SIGINT", function () {
    login_consumer.close(true, function () {
        process.exit();
    });
    multiplex_consumer.close(true, function () {
        process.exit();
    });    
    movie_consumer.close(true, function () {
        process.exit();
    });

});



