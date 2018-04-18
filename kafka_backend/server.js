//Files
var connection = new require('./kafka/Connection');
var user;
var utility = require('./util/util.js');

var MultiplexModel = require('./model/MultiplexModel');
var MovieModel = require('./model/MovieModal');

//Kafka Topics
var user_topic = 'user_request';
var response_topic = 'response_topic';
var multiplex_topic = 'multiplex_request'
var movie_topic = 'movie_request'


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



