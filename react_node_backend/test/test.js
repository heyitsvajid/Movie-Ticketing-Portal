var express = require('express');
var request = require('request');
var assert = require('assert');
var http = require('http');
var mocha = require('mocha');


it('\nTest Login with wrong Credentials', function (done) {
    request.post('http://localhost:3001/login',
        { form: { username : 'asd@a.com', password: '1qaz2wsx' } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});


it('\nTest Login with Right Credentials', function (done) {
    request.post('http://localhost:3001/login',
        { form: { username : 'p@p.com', password: '1qaz2wsx' } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});


it('\nGet Profile Details', function (done) {
    request.post('http://localhost:3001/getprofiledetails',
        { form: { userid : 90 } },
        function (error, response, body) {
            //console.log(response.body);
            assert.equal(200, response.statusCode);
            // console.log(response.body);
            done();
        });
});



it('\nFinding All Multiplex', function (done) {
    request.get('http://localhost:3001/findAllMultiplex',
        { form: {  } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});


it('\nFinding All Multiplex Admins', function (done) {
    request.get('http://localhost:3001/findallmultiplexadmin',
        { form: {  } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});


it('\nFinding All Multiplex Admin By ID', function (done) {
    request.post('http://localhost:3001/findmultiplexadminbyid',
        { form: { id : 108 } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('\nFinding All Users( Role Number = 1) ', function (done) {
    request.get('http://localhost:3001/getAllUsersOnly',
        { form: {  } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('\nGetting Clicks per Page ', function (done) {
    request.get('http://localhost:3001/getClicksPerPage',
        { form: {  } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('\nGetting Movies Clicks per Page' , function (done) {
    request.get('http://localhost:3001/getMovieClicks',
        { form: {  } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('\nGetting All session Details' , function (done) {
    request.get('http://localhost:3001/getAllSessionDetails',
        { form: {  } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});


it('\nGetting User Card Details' , function (done) {
    request.post('http://localhost:3001/getCardDetails',
        { form: { billing_id : '144' } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('\nGetting User Card Details' , function (done) {
    request.post('http://localhost:3001/getCardDetails',
        { form: { billing_id : '144' } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});


it('\nGetting Billing Details per User' , function (done) {
    request.post('http://localhost:3001/getBillingDetailsPerUser',
        { form: { user_email : 'jay1@gmail.com' } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});


it('\nGetting All Billing Details' , function (done) {
    request.post('http://localhost:3001/getAllBillingDetails',
        { form: {  } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});


it('\nGetting Ticket Confirmation Details' , function (done) {
    request.post('http://localhost:3001/getTicketConfirmation',
        { form: { billing_id :  '100' } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});


it('\nFinding Movie by ID' , function (done) {
    request.post('http://localhost:3001/findMovieById',
        { form: { _id :  8 } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});


it('\nFinding All Movies ' , function (done) {
    request.get('http://localhost:3001/findAllMovie',
        { form: {  } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});



it('\nChecking for existing Email' , function (done) {
    request.post('http://localhost:3001/checkforexistingemail',
        { form: { email :  'pradnyesh.patil@sjsu.edu' } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('\nFinding user card ( email = "jay1@gmail.com" ) ', function (done) {
    request.post('http://localhost:3001/getCardDetailsPerUser',
        { form: { user_email : 'jay1@gmail.com' } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('\nFetching Multiplex total revenue per month', function (done) {
    request.post('http://localhost:3001/getMultiplexSoldTicketsPerMonth',
        { form: { } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('\nFetching Movie revenue per month', function (done) {
    request.post('http://localhost:3001/getMovieRevenuePerYear',
        { form: { } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('\nFetching City revenue per month', function (done) {
    request.post('http://localhost:3001/getCityRevenuePerYear',
        { form: { } },
        function (error, response, body) {
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});


it('\nCreating 1000 User Account ', function (done) {

    for( let i=0; i < 1000 ; i++) {
        request.post('http://localhost:3001/signup',
            { form: {
                    first_name : 'Test User',
                    username: 'test@test.asdasd',
                    password: '123123123123',
                    role_number : 1 } },
            function (error, response, body) {
                // console.log(response.body);
                assert.equal(200, response.statusCode);
            });
    }
    done();

});

it('\nCreating 1000 Movies ', function (done) {

    for( let i=0; i < 1000 ; i++) {
        request.post('http://localhost:3001/createNewMovie',
            { form: {
                    title: 'Test Movie',
                    trailer_link: 'www.youtube.com',
                    synopsis: 'its a great movie',
                    release_date: '123123123123',
                    mpaa_ratings: 'PG',
                    movie_keywords: 'Horror',
                    movie_length: 120,
                    movie_definition: 'HDD',
                } },
            function (error, response, body) {
                // console.log(response.body);
                assert.equal(200, response.statusCode);
            });
    }
    done();

});