var express = require('express');
var request = require('request');
var assert = require('assert');
var http = require('http');
var mocha = require('mocha');


it('Test Login with wrong Credentials', function (done) {
    request.post('http://localhost:3001/login',
        { form: { email: 'test', password: 'test' } },
        function (error, response, body) {
            console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});
console.log("#############################");

it('Test Login with Right Credentials', function (done) {
    request.post('http://localhost:3001/login',
        { form: { email: 'vajid9@gmail.com', password: '123456' } },
        function (error, response, body) {
            console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('Check is logged in', function (done) {
    request.get('http://localhost:3001/isLoggedIn',

        function (error, response, body) {
            //console.log(response.body);
            assert.equal(200, response.statusCode);
            console.log(response.body);
            done();
        });
});

it('Get user projects', function (done) {
    request.post('http://localhost:3001/getUserProjects',
        { form: { id: 1 } },
        function (error, response, body) {
            console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('Check bid for particular user and project', function (done) {
    request.post('http://localhost:3001/checkBid',
        { form: { projectId: 1, userId: 1 } },
        function (error, response, body) {
            console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('Get user bid projects', function (done) {
    request.post('http://localhost:3001/getUserBidProjects',
        { form: { id: 1 } },
        function (error, response, body) {
            console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('Get bids for project id', function (done) {
    request.post('http://localhost:3001/getBids',
        { form: { id: 6 } },
        function (error, response, body) {
            console.log(response.body);
            assert.equal(200, response.statusCode);
            done();
        });
});