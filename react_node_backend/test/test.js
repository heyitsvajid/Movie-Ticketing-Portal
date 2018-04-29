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

// it('Check bid for particular user and project', function (done) {
//     request.post('http://localhost:3001/checkBid',
//         { form: { projectId: 1, userId: 1 } },
//         function (error, response, body) {
//             console.log(response.body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
// });
//
// it('Get user bid projects', function (done) {
//     request.post('http://localhost:3001/getUserBidProjects',
//         { form: { id: 1 } },
//         function (error, response, body) {
//             console.log(response.body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
// });
//
// it('Get bids for project id', function (done) {
//     request.post('http://localhost:3001/getBids',
//         { form: { id: 6 } },
//         function (error, response, body) {
//             console.log(response.body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
// });