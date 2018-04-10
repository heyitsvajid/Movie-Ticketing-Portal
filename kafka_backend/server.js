//Files
var connection = new require('./kafka/Connection');
var user = require('./services/user');
var utility = require('./util/util.js');

//Kafka Topics
var login_topic = 'login_request';
var signup_topic = 'signup_request';
var response_topic = 'response_topic';


//Producer
var producer = connection.getProducer();
producer.on('error', function (err) {
    console.log('producer.on error: ' + err);
    process.exit();
});

producer.on('ready', function () {
    producer.createTopics([
        response_topic,
        login_topic,
        signup_topic,
    ], false, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Topics Created");


            //Consumers
            var login_consumer = connection.getConsumer(login_topic);
            var signup_consumer = connection.getConsumer(signup_topic);

            //Login Consumer
             login_consumer.on('message', function (message) {
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
            signup_consumer.on('message', function (message) {
                console.log('Kafka Server signup_consumer : message received');
                console.log(JSON.stringify(message.value));
                var data = JSON.parse(message.value);
                user.signup_request(data.data, function (err, res) {
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

            console.log('server is running');

            process.on("SIGINT", function () {
                signup_consumer.close(true, function () {
                    process.exit();
                });
                login_consumer.close(true, function () {
                    process.exit();
                });
            });
         }
     });
 });


