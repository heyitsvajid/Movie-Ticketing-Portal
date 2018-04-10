//Files
var User = require('../model/user.js');
var bcrypt = require('bcrypt');

exports.login_request = function login_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    var resultObject = {
        successMsg: '',
        errorMsg: 'Error uploading image',
        data: {}
    }
    User.findOne({ 'email': msg.email }, function (error, user) {
        if (error) {
            console.log('Catch : ' + error.message);
            resultObject.errorMsg = error.message;
            callback(null, resultObject);
            return;
        }
        if (!user) {
            resultObject.successMsg = ''
            resultObject.errorMsg = 'User Not Found';
            callback(null, resultObject);
            return;

        }
        resultObject.successMsg = 'User Found';
        resultObject.errorMsg = '';
        resultObject.data = user;
        callback(null, resultObject);
        return;
    });


}


exports.getprofile_request = function getprofile_request(msg, callback) {
    var resultObject = {
        successMsg: '',
        errorMsg: 'Error fetching profile',
        data: {}
    }
    if (!msg.id) {
        console.log('No Id provided');
        resultObject.errorMsg = 'No Id provided';
        callback(null, resultObject); return;
    } else {
        try {
            let id = msg.id;
            if (msg.id != '') {
                User.findById(id, function (error, user) {
                    try {
                        if (error) throw error;
                        if (user) {
                            console.log('Profile Found');
                            resultObject.data = user;
                            resultObject.errorMsg = '';
                            resultObject.successMsg = 'Profile Found';
                            callback(null, resultObject);
                        } else {
                            console.log('User not found');
                            resultObject.errorMsg = 'User not found';
                            resultObject.successMsg = '';
                            callback(null, resultObject);
                        }
                        return;

                    } catch (error) {
                        console.log(error);
                        console.log('Catch : ' + error.message);
                        resultObject.errorMsg = error.message;
                        callback(null, resultObject); return;
                    }
                });
            }
        } catch (e) {
            console.log('Error Occured');
            resultObject.errorMsg = 'Error Occured';
            resultObject.successMsg = '';
            callback(null, resultObject);
        }
    }
}

exports.signup_request = function signup_request(msg, callback) {
    var resultObject = {
        successMsg: '',
        errorMsg: 'Error',
        data: {}
    }
    console.log('kafka : signup_request');
    console.log(JSON.stringify(msg));
    if (!msg.name || !msg.email || !msg.password) {
        console.log('No name, email and password');
        resultObject.errorMsg = 'Please Provide name, email and password';
        callback(null, resultObject);
    } else {
        let name = msg.name;
        let email = msg.email;
        var password = bcrypt.hashSync(msg.password, 10);
        console.log('Hashed Password: ' + password);
        //Check Username allready exists
        User.findOne({ 'email': email }, function (error, user) {
            // In case of any error return
            try {
                if (error) throw error;
                if (user) {
                    // already exists
                    console.log('Username allready taken');
                    resultObject.errorMsg = 'Username allready taken';
                    callback(null, resultObject);
                    return;
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.email = email;
                    newUser.password = password;
                    newUser.name = name;
                    // save the user
                    newUser.save(function (err, user) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        } else {
                            console.log('Sign Up Succcessful');
                            resultObject.errorMsg = '';
                            resultObject.successMsg = 'Sign Up Succcessful';
                            resultObject.data = {
                                id: user._id,
                                name: user.name,
                                email: user.email
                            }
                            callback(null, resultObject);
                        }
                    });
                }
            } catch (error) {
                console.log(error);
                console.log('Catch : ' + error.message);
                resultObject.errorMsg = error.message;
                callback(null, resultObject);
            }
        });
    };
}



