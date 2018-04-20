var db_controller;
var bcrypt = require('bcrypt');
var multiparty = require('multiparty');
let fs = require('fs');
var User = require('../model/user.js');
var passport = require('../config/passport.js');
var kafka = require('../kafka/client');



//Creating New Multiplex Admin
exports.createMultiplexAdmin =  ( req, res ) => {
    console.log("In Node Backend, Creating new multiplex admin", req.body);
    let data = { data: req.body, request_code: 1};
    kafka.make_request('multiplexadmin_request', data, (err, result) => {
        console.log("###########################3");
        console.log(err);

        console.log(result);
        var resultObject = {
            successMsg: '',
            errorMsg: '',
            data: {}
        };
        if(err) {
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
exports.findAllMultiplexAdmins =  ( req, res ) => {
    console.log("In Node Backend, finding all multiplex admin", req.body);
    let data = { data: req.body, request_code: 3};
    kafka.make_request('multiplexadmin_request', data, (err, result) => {
        console.log(result);
        var resultObject = {
            successMsg: '',
            errorMsg: '',
            data: {}
        };
        if(err) {
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
exports.findMultiplexAdminbyId =  ( req, res ) => {
    console.log("In Node Backend, finding multiplex admin by ID", req.body);
    let data = { data: req.body, request_code: 2 };
    kafka.make_request('multiplexadmin_request', data, (err, result) => {
        console.log(result);
        var resultObject = {
            successMsg: '',
            errorMsg: '',
            data: {}
        };
        if(err) {
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

//Movie Reviews
exports.addMovieReview= function (req, res) {
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

exports.updateShowTimings= function (req, res) {
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


exports.findMultiplexById =  ( req, res ) => {
    console.log("In Node Backend, finding multiplex by ID", req.body);
    let data = { data: req.body, request_code: 4 };
    kafka.make_request('multiplex_request', data, (err, result) => {
        console.log(result);
        var resultObject = {
            successMsg: '',
            errorMsg: '',
            data: {}
        };
        if(err || result==null) {
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

    console.log(data);
    kafka.make_request('movie_request', data, function (err, results) {
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

exports.findMovieById =  ( req, res ) => {
    console.log("In Node Backend, finding movie by ID", req.body);
    let data = { data: req.body, request_code: 5 };
    kafka.make_request('movie_request', data, (err, result) => {
        console.log(result);
        var resultObject = {
            successMsg: '',
            errorMsg: '',
            data: {}
        };
        if(err || result==null) {
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

exports.addMovieCharacter= function (req, res) {
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
        if(err || user == false) {
            resultObject.successMsg = '';
            resultObject.errorMsg = 'Error Signing user in';
        }
        else if(user) {
            resultObject.successMsg = user.successMsg;
            resultObject.errorMsg = user.errorMsg;
            resultObject.data = user.data;
        }
        console.log("In passport authenticate...after forming the resultobject", resultObject);
        req.session.email = resultObject.data.email;
        req.session.id = resultObject.data.id;
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
        res.json(resultObject);


    })(req, res, next);

}

exports.signup = function (req, res) {
    console.log("signup_request : node backend");

    let data = req.body;
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
}


//method converted
exports.isLoggedIn = function (req, res) {
    console.log('Check Login');

    if(req.session.email) {
        console.log("Session is still valid", req.session);
        var data = {
            id: req.session.id,
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
        res.json(data);
    }
    else {
        console.log("Session is invalid");
        res.json("Session Invalid...Please Login Again");
    }

    // if (req.isAuthenticated()) {
    //
    //     console.log(req.user);
    //     console.log('is logged in');
    //     let responsePayload = {
    //         responseCode: 0,
    //         responseMsg: 'Allready Logged In',
    //         name: req.session.name,
    //         email: req.session.email,
    //         id: req.session.passport.user
    //     }
    //     res.json(responsePayload);
    //     return;
    // } else {
    //     console.log('Not logged in');
    //     let responsePayload = {
    //         responseCode: 1,
    //         responseMsg: 'Log In Required',
    //     }
    //     res.json(responsePayload);
    //     return;
    // }


};

//method converted
exports.logout = function (req, res) {
    console.log('Destroying Session');
    console.log('Session Destroyed');
    req.logout();
    req.session.destroy();
    res.send('Logout');
    return;
};


