var db_controller;
var bcrypt = require('bcrypt');
var multiparty = require('multiparty');
let fs = require('fs');
var User = require('../model/user.js');
var passport = require('../config/passport.js');
var kafka = require('../kafka/client');
var redisClient = require('../config/redis').getClient();

var winston = require('../config/winston');

//Creating New Multiplex Admin
exports.createMultiplexAdmin = (req, res) => {
    console.log("In Node Backend, Creating new multiplex admin", req.body);
    let data = { data: req.body, request_code: 1 };
    kafka.make_request('multiplexadmin_request', data, (err, result) => {
        console.log("###########################3");
        console.log(err);

        console.log(result);
        var resultObject = {
            successMsg: '',
            errorMsg: '',
            data: {}
        };
        if (err) {
            console.log(err);
            resultObject.errorMsg = 'Error creating Multiplex Admin';
            res.json(resultObject);
            return;
        }
        else {
            console.log(result);
            res.json(result);
            return;
        }
    })
};

//Finding all multiplex admins
exports.findAllMultiplexAdmins = (req, res) => {
    console.log("In Node Backend, finding all multiplex admin", req.body);
    let data = { data: req.body, request_code: 3 };
    kafka.make_request('multiplexadmin_request', data, (err, result) => {
        console.log(result);
        var resultObject = {
            successMsg: '',
            errorMsg: '',
            data: {}
        };
        if (err) {
            console.log(err);
            resultObject.errorMsg = 'Error in finding all Multiplex Admins';
            res.json(resultObject);
            return;
        }
        else {
            console.log(result);
            res.json(result);
            return;
        }
    })
};

//Finding multiplex admin by ID
exports.findMultiplexAdminbyId = (req, res) => {
    console.log("In Node Backend, finding multiplex admin by ID", req.body);
    let data = { data: req.body, request_code: 2 };
    kafka.make_request('multiplexadmin_request', data, (err, result) => {
        console.log(result);
        var resultObject = {
            successMsg: '',
            errorMsg: '',
            data: {}
        };
        if (err) {
            console.log(err);
            resultObject.errorMsg = 'Error in finding Multiplex Admin by ID';
            res.json(resultObject);
            return;
        }
        else {
            console.log(result);
            res.json(result);
            return;
        }
    })
};

// Get Profile Details
exports.getProfileDetails = (req, res) => {
    console.log("Node Backend : Get Profile Details ", req.body);
    var data = {
        id: req.body.userid,
        request_code: 3 // Get Profile Details
    };
    console.log(data);

    kafka.make_request('user_request', data, (err, result) => {
        console.log('Kafka Response in Get Profile :');
        if (err) {
            console.log('After Kafka response : User Profile Not found');
            console.log(err);
            res.json(result);
        }
        else {
            console.log(result);
            res.json(result);
            return;
        }
    })
};

// Update Profile Details Basic Info
exports.updateProfileDetailsBasicInfo = (req, res) => {
    console.log("Node Backend : Update Profile Details ", req.body);
    var data = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        request_code: 4,
        city: req.body.city,
        state_name: req.body.state_name,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        address: req.body.address
    };
    console.log(data);

    kafka.make_request('user_request', data, (err, result) => {
        console.log('Kafka Response in Update Profile - Basic Info :');
        if (err) {
            console.log('After Kafka response : User Profile Not Updated');
            console.log(err);
            res.json(result);
        }
        else {
            console.log(result);
            res.json(result);
            return;
        }
    })
};

// Check for Existing Email
exports.checkforExistingEmail = (req, res) => {
    console.log("Node Backend : Checking for Existing Email ", req.body);
    var data = {
        id: req.body.id,
        email: req.body.email,
        request_code: 9 // Checking for Existing Email
    };
    console.log(data);

    kafka.make_request('user_request', data, (err, result) => {
        console.log('Kafka Response in Update Profile - Email :');
        if (err) {
            console.log('After Kafka response : User Profile Email Not Updated');
            console.log(err);
            res.json(result);
        }
        else {
            console.log(result);
            res.json(result);
            return;
        }
    })

};

// Update Profile Details Email
exports.updateProfileDetailsEmail = (req, res) => {
    console.log("Node Backend : Update Profile Details Email ", req.body);
    var data = {
        id: req.body.id,
        email: req.body.email,
        request_code: 5 // Update Profile Details - Email
    };
    console.log(data);

    kafka.make_request('user_request', data, (err, result) => {
        console.log('Kafka Response in Update Profile - Email :');
        if (err) {
            console.log('After Kafka response : User Profile Email Not Updated');
            console.log(err);
            res.json(result);
        }
        else {
            console.log(result);
            res.json(result);
            return;
        }
    })
};


// Update Profile Details Password
exports.updateProfileDetailsPassword = (req, res) => {
    console.log("Node Backend : Update Profile Details Password ", req.body);
    var data = {
        id: req.body.id,
        currentPassword: req.body.currentPassword,
        updatedPassword: req.body.updatedPassword,
        request_code: 6 // Update Profile Details - Password
    };
    console.log(data);

    kafka.make_request('user_request', data, (err, result) => {
        console.log('Kafka Response in Update Profile - Password :');
        if (err) {
            console.log('After Kafka response : User Profile Password Not Updated');
            console.log(err);
            res.json(result);
        }
        else {
            console.log(result);
            res.json(result);
            return;
        }
    })
};


//disable user account
exports.disableAccount = (req, res) => {
    console.log("Node Backend : disableAccount ", req.body);
    var data = {
        id: req.body.id,
        email: req.body.email,
        request_code: 7 // disableAccount
    };
    console.log(data);

    kafka.make_request('user_request', data, (err, result) => {
        console.log('Kafka Response in disableAccount :', result);
        if (result.errorMsg !== '') {
            console.log('After Kafka response : disableAccount failed');
            console.log(err);
            res.json(result);
        }
        else {
            console.log(result);
            res.json(result);
            return;
        }
    })
};


exports.getAllUsersOnly = function (req, res) {
    console.log("getAllUsersOnly : node backend");

    var data = {
        request_code: 8 //get all users
    };
    console.log("getAllUsersOnly", data);

    kafka.make_request('user_request', data, function (err, results) {
        console.log('Kafka Response:after getAllUsersOnly');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred in getAllUsersOnly ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json(results);
            return;
        }
    });

};

//search
exports.searchQuery = (req, res) => {
    console.log("In Node Backend, searching by state, zip, moviename, city", req.body);
    let data = { data: req.body, request_code: 5 };
    var redisHashKey = req.body.searchQuery;
    var resultObject = {
        successMsg: '',
        errorMsg: '',
        data: {}
    };

    //implementation of redis for search string
    //checking whether the search key already exists with redis
    redisClient.get(redisHashKey, (err, reply) => {
        if (err) {
            console.log("Error connecting to redis in searchQuery controller");
        } else if (reply === null) { //we could not find the key in redis as the key is expired

            //making request to kafka to get the search results as the key does not exist
            kafka.make_request('multiplex_request', data, (err, result) => {
                console.log("After the kafka search results", result);

                //creating the resultObject
                resultObject.successMsg = result.successMsg;
                resultObject.errorMsg = result.errorMsg;
                resultObject.data = result.data;
                var redisData = JSON.stringify(resultObject);

                //setting this result to a search key in redis for 50 seconds
                redisClient.set(redisHashKey, redisData, 'EX', 50);

                //responding here with any result either got from kafka or redis
                res.json(resultObject);

            })
        } else {
            var redisReplyObject = JSON.parse(reply);
            console.log("Printing redisReplyObject without request to kafka:", redisReplyObject);

            //creating the resultObject
            resultObject.successMsg = redisReplyObject.successMsg;
            resultObject.errorMsg = redisReplyObject.errorMsg;
            resultObject.data = redisReplyObject.data;
            //responding here with any result either got from kafka or redis
            res.json(resultObject);
        }


    });

};


//Movie Reviews
exports.addMovieReview = function (req, res) {
    console.log("addMovieReview_request : node backend");
    let data = { data: req.body, request_code: 1 };
    console.log(data);
    kafka.make_request('review_request', data, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json(results);
            return;
        }
    });
}


//Show timing Operations
exports.addShowTimings = function (req, res) {
    console.log("addShowTimings_request : node backend");
    let data = { data: req.body, request_code: 1 };

    console.log(data);
    kafka.make_request('showtiming_request', data, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json(results);
            return;
        }
    });
}

exports.updateShowTimings = function (req, res) {
    console.log("updateShowTimings_request : node backend");
    let data = { data: req.body, request_code: 2 };

    console.log(data);
    kafka.make_request('showtiming_request', data, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json(results);
            return;
        }
    });
}



//Multiplex Operations
exports.findAllMultiplex = function (req, res) {
    console.log("findAllMultiplex_request : node backend");
    let data = { data: req.body, request_code: 1 };

    console.log(data);
    kafka.make_request('multiplex_request', data, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json(results);
            return;
        }
    });
}

exports.createNewMultiplex = function (req, res) {
    // Post Project API
    console.log('createNewMultiplex API Called');
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        var resultObject = {
            successMsg: '',
            errorMsg: 'Error adding Multiplex',
            data: {}
        }
        if (err) {
            console.log(err);
            resultObject.errorMsg = 'Error adding Multiplex';
            res.json(resultObject);
            return;

        } else {
            try {
            let dbPath = 'default.jpeg';
            if(files.file){
                let { path: tempPath, originalFilename } = files.file[0];
                let copyToPath = "./src/images/_" + Date.now() + '_' + originalFilename;
                dbPath = '_' + Date.now() + '_' + originalFilename;
                    fs.readFile(tempPath, (err, data) => {
                        if (err) throw err;
                        fs.writeFile(copyToPath, data, (err) => {
                            if (err) throw err;
                            // delete temp image
                            fs.unlink(tempPath, () => {
                            });
                        });
                    });
            }            
                console.log("createNewMultiplex_request : node backend");
                let data = fields;
                data.dbPath = dbPath;
                data.request_code = 2;
                console.log(data);
                kafka.make_request('multiplex_request', data, function (err, results) {
                    responseUtil(err, results, res);
                });
            } catch (e) {
                console.log('Catch');
                console.log(e);
                resultObject.errorMsg = 'Error Uploading Image';
                res.json(resultObject);
                return;
            }

        }

    })
}
exports.updateMultiplex = function (req, res) {
    // Post Project API
    console.log('update Multiplex API Called');
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        var resultObject = {
            successMsg: '',
            errorMsg: 'Error Posting Project',
            data: {}
        }
        if (err) {
            resultObject.errorMsg = 'Error updating multiplex';
            res.json(resultObject);
            return;
        } else {
            try {
                let dbPath = fields.multiplex_logo;
                if(files.file){
                    let { path: tempPath, originalFilename } = files.file[0];
                    let copyToPath = "./src/images/_" + Date.now() + '_' + originalFilename;
                    dbPath = '_' + Date.now() + '_' + originalFilename;
                    fs.readFile(tempPath, (err, data) => {
                        if (err) throw err;
                        fs.writeFile(copyToPath, data, (err) => {
                            if (err) throw err;
                            // delete temp image
                            fs.unlink(tempPath, () => {
                            });
                        });
                    });    
                }
                console.log("createNewMultiplex_request : node backend");
                let data = fields;
                data.dbPath = dbPath;
                data.request_code = 3;
                console.log(data);
                kafka.make_request('multiplex_request', data, function (err, results) {
                    responseUtil(err, results, res);
                });
            } catch (e) {
                console.log('Catch');
                console.log(e);
                resultObject.errorMsg = 'Error updating multiplex';
                res.json(resultObject);
                return;
            }
        }

    })
}


exports.findMultiplexById = (req, res) => {
    console.log("In Node Backend, finding multiplex by ID", req.body);
    let data = { data: req.body, request_code: 4 };
    kafka.make_request('multiplex_request', data, (err, result) => {
        console.log(result);
        var resultObject = {
            successMsg: '',
            errorMsg: '',
            data: {}
        };
        if (err || result == null) {
            console.log(err);
            resultObject.errorMsg = 'Error in finding Multiplex Admin by ID';
            res.json(resultObject);
            return;
        }
        else {
            console.log(result);
            res.json(result);
            return;
        }
    })
};



//Movie Operations
exports.findAllMovie = function (req, res) {
    console.log("findAllMovie_request : node backend");
    let data = { data: req.body, request_code: 1 };

//    console.log(data);
    kafka.make_request('movie_request', data, function (err, results) {
        console.log('Kafka Response:');
  //      console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json(results);
            return;
        }
    });
}

exports.findMovieById = (req, res) => {
    console.log("In Node Backend, finding movie by ID", req.body);
    let data = { data: req.body, request_code: 5 };
    kafka.make_request('movie_request', data, (err, result) => {
        console.log(result);
        var resultObject = {
            successMsg: '',
            errorMsg: '',
            data: {}
        };
        if (err || result == null) {
            console.log(err);
            resultObject.errorMsg = 'Error in finding movie by ID';
            res.json(resultObject);
            return;
        }
        else {
            console.log(result);
            res.json(result);
            return;
        }
    })
};


exports.createNewMovie = function (req, res) {
    // Post Project API
    console.log('createNewMovie API Called');
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        var resultObject = {
            successMsg: '',
            errorMsg: 'Error adding Movie',
            data: {}
        }
        if (err) {
            console.log(err);
            resultObject.errorMsg = 'Error adding Movie';
            res.json(resultObject);
            return;

        } else {
            let { path: tempPath, originalFilename } = files.file[0];
            let copyToPath = "./src/images/_" + Date.now() + '_' + originalFilename;
            let dbPath = '_' + Date.now() + '_' + originalFilename;
            try {
                fs.readFile(tempPath, (err, data) => {
                    if (err) throw err;
                    fs.writeFile(copyToPath, data, (err) => {
                        if (err) throw err;
                        // delete temp image
                        fs.unlink(tempPath, () => {
                        });
                    });
                });

                console.log("createNewMovie_request : node backend");
                let data = fields;
                data.dbPath = dbPath;
                data.request_code = 2;
                console.log(data);
                kafka.make_request('movie_request', data, function (err, results) {
                    responseUtil(err, results, res);
                });
            } catch (e) {
                console.log('Catch');
                console.log(e);
                resultObject.errorMsg = 'Error Uploading Image';
                res.json(resultObject);
                return;
            }

        }

    })
}
exports.updateMovie = function (req, res) {
    // Post Project API
    console.log('update Movie API Called');
    let form = new multiparty.Form();
    
    
    form.parse(req, (err, fields, files) => {
        var resultObject = {
            successMsg: '',
            errorMsg: 'Error Posting Project',
            data: {}
        }
        if (err) {
            resultObject.errorMsg = 'Error updating movie';
            res.json(resultObject);
            return;
        } else {
            let dbPath = fields.movie_logo[0];
            try {
                if(files.file){
                    console.log("updateMovie_request : updating image");

                    let { path: tempPath, originalFilename } = files.file[0];
                    let copyToPath = "./src/images/_" + Date.now() + '_' + originalFilename;
                    dbPath = '_' + Date.now() + '_' + originalFilename;
                    fs.readFile(tempPath, (err, data) => {
                        if (err) throw err;
                        fs.writeFile(copyToPath, data, (err) => {
                            if (err) throw err;
                            // delete temp image
                            fs.unlink(tempPath, () => {
                            });
                        });
                    });    
                }

                console.log("updateMovie_request : node backend");
                let data = fields;
                data.dbPath = dbPath;
                data.request_code = 3;
                console.log(data);
                kafka.make_request('movie_request', data, function (err, results) {
                    responseUtil(err, results, res);
                });
            } catch (e) {
                console.log('Catch');
                console.log(e);
                resultObject.errorMsg = 'Error updating movie';
                res.json(resultObject);
                return;
            }
        }

    })
}

exports.addMovieCharacter = function (req, res) {
    // Post Project API
    console.log('addMovieCharacter API Called');
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        var resultObject = {
            successMsg: '',
            errorMsg: 'Error Adding Movie Characters',
            data: {}
        }
        if (err) {
            resultObject.errorMsg = 'Error updating movie character';
            res.json(resultObject);
            return;
        } else {
            try {
                let { path: tempPath, originalFilename } = files.file[0];
                let copyToPath = "./src/images/_" + Date.now() + '_' + originalFilename;
                let dbPath = '_' + Date.now() + '_' + originalFilename;
                fs.readFile(tempPath, (err, data) => {
                    if (err) throw err;
                    fs.writeFile(copyToPath, data, (err) => {
                        if (err) throw err;
                        // delete temp image
                        fs.unlink(tempPath, () => {
                        });
                    });
                });

                console.log("updateMovie_request : node backend");
                let data = fields;
                data.dbPath = dbPath;
                data.request_code = 4;
                console.log(data);
                kafka.make_request('movie_request', data, function (err, results) {
                    responseUtil(err, results, res);
                });
            } catch (e) {
                console.log('Catch');
                console.log(e);
                resultObject.errorMsg = 'Error Adding Movie Characters';
                res.json(resultObject);
                return;
            }
        }
    })
}

function responseUtil(err, results, res) {
    console.log('Kafka Response:');
    console.log(results);
    if (err) {
        console.log('Controller : Error Occurred : ');
        console.log(err);
        res.json(results);
    }
    else {
        res.json(results);
        return;
    }
}



//New method with passport
exports.login = function (req, res, next) {
    passport.authenticate('local-login', function (err, user) {
        var resultObject = {
            successMsg: '',
            errorMsg: 'Error Signing user in',
            data: {}
        }
        if (err || user == false) {
            resultObject.successMsg = '';
            resultObject.errorMsg = 'Error Signing user in';
        }
        else if (user) {
            resultObject.successMsg = user.successMsg;
            resultObject.errorMsg = user.errorMsg;
            resultObject.data = user.data;
            console.log("In passport authenticate...after forming the resultobject", resultObject);

            //setting passport session starts
            //    req.login(resultObject.data, (err) => {
            //        console.log("Session Started with new Passport method");
            //    })
            //ends

            req.session.previousTime = new Date().getTime();
            req.session.pageTime = [];
            req.session.pages = [];
            req.session.lastPage = "Fandango Home";
            req.session.flag = true;
            req.session.email = resultObject.data.email;

            req.session.userid = resultObject.data.id;
            req.session.first_name = resultObject.data.first_name;
            req.session.last_name = resultObject.data.last_name;
            req.session.address = resultObject.data.address;
            req.session.profile_image_path = resultObject.data.profile_image_path;
            req.session.city = resultObject.data.city;
            req.session.state = resultObject.data.state;
            req.session.zipcode = resultObject.data.zipcode;
            req.session.phone_number = resultObject.data.phone_number;
            req.session.disable = resultObject.data.disable;
            req.session.role_number = resultObject.data.role_number;
            console.log("Session Started...", req.session);
        }

        res.json(resultObject);


    })(req, res, next);

}

exports.signup = function (req, res) {
    console.log("signup_request : node backend");

    var data = {
        first_name: req.body.first_name,
        email: req.body.username,
        password: req.body.password,
        role_number: req.body.role_number,
        request_code: 2 //signup_request
    };
    console.log(data);

    kafka.make_request('user_request', data, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json(results);
            return;
        }
    });
};


//method converted
exports.isLoggedIn = function (req, res) {
    console.log('Check Login');

    if (req.session.email) {
        console.log("Session is still valid", req.session);
        var data = {
            id: req.session.userid,
            email: req.session.email,
            first_name: req.session.first_name,
            last_name: req.session.last_name,
            address: req.session.address,
            profile_image_path: req.session.profile_image_path,
            city: req.session.city,
            state: req.session.state,
            zipcode: req.session.zipcode,
            phone_number: req.session.phone_number,
            disable: req.session.disable,
            role_number: req.session.role_number
        }
        res.json({ "session": "valid", "result": data });
    }
    else {
        console.log("Session is invalid");
        res.json({ "session": "invalid", "result": [] });
    }

    //passport authentication by venky starts
    // if(req.isAuthenticated()) {
    //     console.log("In is logged in ...session is valid", req.user);
    // } else {
    //     console.log("In is logged in ...session is invalid");
    // }
    //passport authentication by venky ends


};


//Complete the transaction and book tickets
exports.completePayment = function (req, res) {
    console.log("completePayment : node backend");
    let data = req.body;
    console.log(data + "Hello");
    kafka.make_request('completePayment', data, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json({ results: results });
            return;
        }
    });
}

//fetch billing details
// exports.fetchBillingDetails = function (req, res) {
//     console.log("Fetching Bill : node backend");
//     let data = req.body;
//     console.log(data+ "Hello");
//     kafka.make_request('fetchBillingDetails', data, function (err, results) {
//         console.log('Kafka Response:');
//         console.log(results);
//         if (err) {
//             console.log('Controller : Error Occurred : ');
//             console.log(err);
//             res.json(results);
//         }
//         else {
//             res.json({results: results});
//             return;
//         }
//     });
// }


exports.getAllBillingDetails = function (req, res) {
    console.log("Fetch Billing Details : node backend");
    var request_id = { request_id: 1 };
    kafka.make_request('fetchBillingDetails', request_id, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json({ results: results });
            return;
        }
    });
}

exports.getBillingDetailsPerUser = function (req, res) {
    if(req.session.email) {
        var request_id = {request_id : 2, user_email : req.session.email};
        kafka.make_request('fetchBillingDetails', request_id, function (err, results) {
            console.log('Kafka Response: in fetching Billing details per user');
            console.log(results);
            if (err) {
                console.log('Controller : Error Occurred : ');
                console.log(err);
                res.json(results);
            }
            else {
                console.log(results)
                res.json({results: results});
                return;
            }
        });
    }
    else {
        console.log("Session is invalid");
        res.json({"session": "invalid" , "result": []});
    }
}

exports.getCardDetailsPerUser = function (req, res) {
    console.log("Fetch Billing Details per User : node backend");
    console.log(req.body.user_email)
    console.log("UserName:" + req.body);
    var request_id = { request_id: 3, user_email: req.body.user_email };
    kafka.make_request('fetchBillingDetails', request_id, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            console.log(results)
            res.json({ results: results });
            return;
        }
    });
}

exports.getMultiplexSoldTicketsPerMonth = function (req, res) {
    console.log("Fetch Billing Details per User : node backend");
    console.log(req.body.multiplex_id)
    console.log("UserName:" + req.body);
    var request_id = { request_id: 4, multiplex_id: req.body.multiplex_id };
    kafka.make_request('fetchBillingDetails', request_id, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            console.log(results)
            res.json({ results: results });
            return;
        }
    });
}

exports.getCityRevenuePerYear = function (req, res) {
    console.log("Fetch Billing Details per User : node backend");
    console.log(req.body.multiplex_id)
    console.log("UserName:" + req.body);
    var request_id = { request_id: 5, multiplex_id: req.body.multiplex_id };
    kafka.make_request('fetchBillingDetails', request_id, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            console.log(results)
            res.json({ results: results });
            return;
        }
    });
}

exports.getMovieRevenuePerYear = function (req, res) {
    console.log("Fetch Billing Details per User : node backend");
    console.log(req.body.multiplex_id)
    console.log("UserName:" + req.body);
    var request_id = { request_id: 6, multiplex_id: req.body.multiplex_id };
    kafka.make_request('fetchBillingDetails', request_id, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            console.log(results)
            res.json({ results: results });
            return;
        }
    });
}

exports.getTicketConfirmation = function (req, res) {
    console.log("Fetching Ticket Confirmation : node backend");
    console.log(req.body)
    var request_id = { request_id: 7, billing_id: req.body.id };
    kafka.make_request('fetchBillingDetails', request_id, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json({ results: results });
            return;
        }
    });
}

exports.deleteBillingDetail = ( req, res) => {
    console.log("In Node Backend, Delete Billing detail", req.body);
    let request_id = { request_id : 8, id : req.body.id };
    kafka.make_request( 'fetchBillingDetails', request_id, (err, result) => {
        console.log('Kafka Response:');
        console.log(result);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(result);
        }
        else {
            console.log("Billing Details Deleted");
            res.json({result: result});
            return;
        }
    } )
};

exports.getCardDetails = function (req, res) {
    console.log("Fetching Ticket Confirmation : node backend");
    console.log(req.body)
    var request_id = { request_id: 9, billing_id: req.body.cardTransactionNumber };
    kafka.make_request('fetchBillingDetails', request_id, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json({ results: results });
            return;
        }
    });
}
//Movie Click Analytics:
exports.movieClickCount = function (req, res) {
    console.log('Logging for movie :' + req.body.movieClick.name);
    console.log(req.body);  
    console.log("Adding Log for movie click");
    winston.info({ movieClick: req.body.movieClick });

}

//Upload User Profile Image
exports.updateUserImage = function (req, res) {
    console.log('API: uploadImage ' + 'STEP: Start');

    var resultObject = {
        successMsg: '',
        errorMsg: 'Error Uploading Image',
        data: {}
    }
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        resultObject = {
            successMsg: '',
            errorMsg: 'Error Uploading Image',
            data: {}
        }
        console.log(files);
        console.log(fields.user_id);
        let { path: tempPath, originalFilename } = files.file[0];
        let copyToPath = "./src/images/" + fields.user_id + originalFilename;
        let dbPath = fields.user_id + originalFilename;
        fs.readFile(tempPath, (err, data) => {
            if (err) throw err;
            fs.writeFile(copyToPath, data, (err) => {
                if (err) throw err;
                fs.unlink(tempPath, () => {
                    console.log('API: uploadImage ' + 'STEP: FIle save to new path');
                });
            });
        });
        let data = {
            image_path: dbPath,
            id: fields.user_id,
            request_code:10
        };
        console.log(data);
        kafka.make_request('user_request', data, function (err, results) {
            console.log('Kafka Response:');
            console.log(results);
            if (err) {
                console.log('Controller : Error Occurred : ');
                console.log(err);
                res.json(results);
            }
            else {
                res.json(results);
                return;
            }
        });
    })
}

exports.getMultiplexAdminGraph = function (req, res) {
    console.log("getMultiplexAdminGraph_request : node backend");
    let data = {
        id: req.body.multiplex_id,
        request_code:6
    };

    kafka.make_request('multiplex_request', data, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json(results);
            return;
        }
    });
};

exports.saveUserCardDetails = function (req, res) {
    console.log("Fetching Ticket Confirmation : node backend");
    console.log(req.body)
    let data = req.body;
    var request_id = { request_id: 10, data };
    kafka.make_request('fetchBillingDetails', request_id, function (err, results) {
        console.log('Kafka Response:');
        console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json({ results: results });
            return;
        }
    });
}


//User Analytics:
exports.logUserClick = function (req, res) {
    console.log('Logging for user :' + req.session.email);
    let username = req.session.email;
    console.log(req.body);
    if (req.session.email) {
        req.body.pageClick.email = username;
    }
    console.log("Adding Log");
    winston.info({ pageClick: req.body.pageClick });
    try {
        if (req.session.email !== null && req.session.email !== undefined && req.session.email !== 'admin@fandango.com') {
            let nwTime = new Date().getTime();
            if (req.session.flag) {
                req.session.flag = false;
            }
            else {
                console.log('Session Flag: ' + req.session.flag);
                let prvTime = req.session.previousTime;
                let timeSpentOnPage = nwTime - prvTime;

                req.session.previousTime = nwTime;
                console.log('Time Spent On Page ' + req.session.lastPage + ' : ' + timeSpentOnPage)
                //Add code for user inactivity period
                req.session.pages.push(req.session.lastPage);
                req.session.pageTime.push(timeSpentOnPage);
                req.session.lastPage = req.body.pageClick.pageName;
                console.log(req.session);
                res.send("Log added for " + username + " for page - " + req.body.pageClick.pageName + " at " + req.body.pageClick.timeStamp);
            }
        } else {
            res.json("No Username provided")
        }
    }
    catch (err) {
    console.log(err);
    }

}


//method converted
exports.logout = function (req, res) {
    console.log('Destroying Session');
    console.log('Session Destroyed');

    console.log(req.session.email);
    console.log(req.session);

    if (req.session.email !== null && req.session.email !== undefined) {

        let nwTime = new Date().getTime();
        let prvTime = req.session.previousTime;
        let timeSpentOnPage = nwTime - prvTime;
        req.session.pages.push(req.session.lastPage);
        req.session.pageTime.push(timeSpentOnPage);


        let track = {
            user_id: req.session.userid,
            email: req.session.email,
            name: req.session.first_name,
            session: [{
                pages: req.session.pages,
                pageTime: req.session.pageTime
            }]
        };
        console.log(" -- Tree -- " + track);
        winston.info(track);
        try {
            let data = { data: track, request_code: 2 };
            console.log(data);
            kafka.make_request('logUserTrack_topic', data, function (err, results) {
                console.log('Kafka Response:');
                console.log(results);
                if (err) {
                    console.log('Controller : Error Occurred : ');
                    console.log(err);
                    res.json(results);
                }
                else {
                    console.log("Added track data to mongoDB");
                    req.session.destroy();
                    req.logout();
                    console.log('Session Destroyed');
                    res.status(200).send();
                }
            });
        }
        catch (err) {
            console.log();
        }
    }
    else {
        console.log('Session does not exist');
        res.status(400).send();
    }
    return;
};

// exports.getClicksPerPage = function (req, res) {
//     var pageNumbers = {"Fandango Home": 0, "MovieShowTime": 1}

//     var pageClicks = [{pageName: "Fandango Home", count: 0}, {pageName: "MovieShowTime", count: 0}]
//     // var pageClicks = [{"Fandango Home": 0, "MovieShowTime": 0}];
//     var lineReader = require('readline').createInterface({
//         input: require('fs').createReadStream('./logging/useranalytics.log')
//     });

//     lineReader.on('line', function (line) {
//         var jsonConvert = JSON.parse(line);
//         if(jsonConvert["message"]["pageClick"] != undefined){
//             if(pageClicks["" + jsonConvert["message"]["pageClick"]["pageName"] +""] != undefined){
//                 pageClicks["" + jsonConvert["message"]["pageClick"]["pageName"] +""] += 1;
//             }
//         }
//     }).on('close', function () {
//         res.json(pageClicks)
//     });
// };

exports.getAllSessionDetails = function (req, res) {
    console.log("findAllMovie_request : node backend");
    let data = { request_code: 1 };

    //console.log(data);
    kafka.make_request('logUserTrack_topic', data, function (err, results) {
        console.log('Kafka Response:');
        //console.log(results);
        if (err) {
            console.log('Controller : Error Occurred : ');
            console.log(err);
            res.json(results);
        }
        else {
            res.json(results);
            return;
        }
    });
};
    

exports.getClicksPerPage = function (req, res) {
    var pageNumbers = {"Fandango Home": 0, "Account Settings": 1, "Check Out": 2, "Log In": 3,
                        "Sign Up": 4, "Movie Detail": 5, "Purchase History": 6, "Ticket Booking": 7, "Ticket Confirmation": 8}
    var pageClicks = [{pageName: "Fandango Home", count: 0}, {pageName: "Account Settings", count: 0}, {pageName: "Check Out", count: 0},
                     {pageName: "Log In", count: 0}, {pageName: "Sign Up", count: 0}, {pageName: "Movie Detail", count: 0},
                     {pageName: "Purchase History", count: 0}, {pageName: "Ticket Booking", count: 0}, {pageName: "Ticket Confirmation", count: 0}]
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('./logging/useranalytics.log')
    });
    lineReader.on('line', function (line) {
        var jsonConvert = JSON.parse(line);
        if(jsonConvert["message"]["pageClick"] != undefined){
            var page_number = pageNumbers["" + jsonConvert["message"]["pageClick"]["pageName"] +""];
            if(pageClicks[page_number] != undefined){
                pageClicks[page_number].count += 1;
            }
        }
    }).on('close', function () {
        res.json(pageClicks)
    });
};

exports.getMovieClicks = function (req, res) {
    var movies = [];
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('./logging/useranalytics.log')
    });
    lineReader.on('line', function (line) {
        var jsonConvert = JSON.parse(line);
        if(jsonConvert["message"]["movieClick"] != undefined){
            var moviePresent = false;
            if(movies.length == 0){
                var movieObject = {movieName: jsonConvert["message"]["movieClick"]["name"], count: 1};
                movies.push(movieObject);
                console.log("Now movies " + movies)
            }
            else{
                movies.forEach(element => {
                    if(element["movieName"] == jsonConvert["message"]["movieClick"]["name"]){
                        console.log("this is same movie" + element["movieName"])
                        moviePresent = true;
                        element.count += 1;
                    }
                });
                if(!moviePresent){
                    var movieObject = {movieName: jsonConvert["message"]["movieClick"]["name"], count: 1};
                    movies.push(movieObject);
                }
            }
        }
    }).on('close', function () {
        res.json(movies)
    });
};
