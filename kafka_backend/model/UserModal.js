var mysql = require('mysql');
var pool = require('../services/mysql')
var bcrypt = require('bcrypt');
const saltRounds = 10;
var mongoURL = 'mongodb://root:root@ds243059.mlab.com:43059/fandango';
var MongoClient = require('mongodb').MongoClient;

function errHandler(err) {
    console.error('There was an error performing the operation');
    console.log(err);
    console.log(err.code);
    console.error(err.message);
}

function createMultiplexAdmin( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    let fname = msg.data.first_name;
    let lname = msg.data.last_name;
    let email =  msg.data.email;
    let pwd = msg.data.password;
    let add = msg.data.address;
    let pimagepath = msg.data.profile_image_path;
    let city = msg.data.city;
    let state = msg.data.state;
    let zip = msg.data.zipcode;
    let phn = msg.data.phone_number;
    let disable = msg.data.disable;
    let role = msg.data.role_number;

    pool.connect((err, db) => {
        if(err) {
            console.log("Failed connection to mysql");
            errHandler(err);
        }
        let sql1 = 'select * from user where email = ? and role_number = ? ';
        db.query( sql1 , [ email, role ], (err, result) => {
            if(err) {
                console.log("Error in checking existing email");
                errHandler(err);
            }
            else {
                console.log(result);
                if( result.length > 0 ) {
                    console.log("Admin with same email already exists", result);
                    var multiplexAdminObject = {
                        code : 1,
                        message : "Admin with same email already exists"
                    };
                    callback( null, multiplexAdminObject );
                }
                else {
                    bcrypt.hash(pwd, saltRounds, (err, hash) => {
                        if(err) {
                            console.log("Error hasing the password");
                        }
                        else {
                            console.log("Hashed the password", hash);
                            let sql2 = 'insert into user ( first_name, last_name, email, password, address, profile_image_path, city, state, zipcode, phone_number, disable , role_number ) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ';
                            db.query( sql2 ,  [ fname, lname, email, hash, add, pimagepath, city, state, zip, phn, disable, role ] , (err, result) => {
                                db.release();
                                if(err) {
                                    console.log("Error in inserting user in mysql in creating multiplex admin");
                                    callback(null, 'Error in inserting user in mysql in creating multiplex admin');
                                }
                                else {
                                    console.log('Created Multiplex Admin', result );
                                    multiplexAdminObject = {
                                        code : 2 ,
                                        message : "Multiplex admin created successfully"
                                    };
                                    callback(null, multiplexAdminObject );
                                }
                            })
                        }
                    }
                )

                }
            }
        })
    })

    // pool.getConnection( (err, db) => {
    //     if (err){
    //         throw err;
    //     }
    //     else {
    //         let sql = 'insert into user ( first_name, email, password ) values ( ?, ?, ?) ';
    //         let fname = msg.first_name;
    //         let email =  msg.email;
    //         let pwd = msg.password;
    //         db.query( sql ,  [fname, email, pwd ] , (err, result) => {
    //             if(err) throw err;
    //             else {
    //                 console.log('Created Multiplex Admin', result);
    //                 callback(null, result);
    //             }
    //         })
    //     }
    // } )

    // mongo.connect( (err, db) => {
    //     if(err) throw err;
    //     else {
    //             db.collection('users').insert( admin, (err, result ) => {
    //                 if(err) throw err;
    //                 else {
    //                     dbo.collection('users').insertOne({
    //                         name : msg.name,
    //                         username: msg.username,
    //                         password: resultpass,
    //                         email: msg.email,
    //                         balance : 10000,
    //                         image_name : "default",
    //                     }).then( (result) => {
    //                         // console.log("User Details Inserted Successfully");
    //                         // console.log(result.insertedId);
    //                         // connection.close();
    //                         // res.json('SIGNUP_SUCCESS');
    //                         callback(null, result)
    //                     })
    //                 }
    //             } )
    //     }
    // })

}

function findAllMultiplexAdmins( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));
    pool.connect((err, db) => {
        if(err) {
            console.log("Failed connection to mysql");
            callback(err,"Error connecting to database");
        }
        else {
            let sql = ' select * from user where role_number = ? ' ;
            let role = 2;
            db.query( sql ,  [ role ] , (err, result) => {
                db.release();
                if(err) {
                    console.log("Error in finding users in multiplex admin");
                    callback(null, 'Error in finding users in multiplex admin');
                }
                else {
                    console.log('Found all Multiplex Admins', result );
                    callback(null, result );
                }
            })
        }
    })

    // pool.getConnection( (err, db) => {
    //     if (err){
    //         throw err;
    //     }
    //     else {
    //         let sql = 'insert into user ( first_name, email, password ) values ( ?, ?, ?) ';
    //         let fname = msg.first_name;
    //         let email =  msg.email;
    //         let pwd = msg.password;
    //         db.query( sql ,  [fname, email, pwd ] , (err, result) => {
    //             if(err) throw err;
    //             else {
    //                 console.log('Created Multiplex Admin', result);
    //                 callback(null, result);
    //             }
    //         })
    //     }
    // } )

    // mongo.connect( (err, db) => {
    //     if(err) throw err;
    //     else {
    //             db.collection('users').insert( admin, (err, result ) => {
    //                 if(err) throw err;
    //                 else {
    //                     dbo.collection('users').insertOne({
    //                         name : msg.name,
    //                         username: msg.username,
    //                         password: resultpass,
    //                         email: msg.email,
    //                         balance : 10000,
    //                         image_name : "default",
    //                     }).then( (result) => {
    //                         // console.log("User Details Inserted Successfully");
    //                         // console.log(result.insertedId);
    //                         // connection.close();
    //                         // res.json('SIGNUP_SUCCESS');
    //                         callback(null, result)
    //                     })
    //                 }
    //             } )
    //     }
    // })

}

function findMultiplexAdminbyId( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));
    pool.connect((err, db) => {
        if(err) {
            console.log("Failed connection to mysql");
            callback(err,"Error connecting to database");
        }
        else {
            let sql = ' select * from user where id = ? ' ;
            let id = msg.data.id;
            db.query( sql ,  [ id ] , (err, result) => {
                db.release();
                if(err) {
                    console.log("Error in finding users in multiplex admin");
                    callback(null, 'Error in finding users in multiplex admin');
                }
                else {
                    console.log('Found Multiplex Admin by Id', result );
                    callback(null, result );
                }
            })
        }
    })
}

function login_request( msg, callback ) {
    console.log("In login_request user modal", msg);
    var email = msg.email;
    var password = msg.password;
    pool.connect((err, db) => {
        if(err) {
            console.log("Error in UserModal login_request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in login_request in usermodal");
            var sql = 'select * from user where email = ' + mysql.escape(email);
            db.query(sql, (err, result) => {
                db.release();
                if(err) {
                    console.log("Error in UserModal login_request while retrieving user from MySQLDB");
                    errHandler(err);
                } else {
                    if(result.length > 0) {
                        console.log("Result after getting the user..", result);
                        var hash = result[0].password;

                        bcrypt.compare(password, hash, (err, doesMatch) => {
                            console.log(doesMatch);
                            if(doesMatch) {

                                //remove the user from disbaledusers collection from mongodb
                                // MongoClient.connect(mongoURL, function(err, db) {
                                //     if (err) { console.log("Error connecting to mongodb in disabling user..."); errHandler(err); }
                                //     else {
                                //         console.log("Connected to mongodb in login_request to check and delete from disabledusers collection");
                                //         var dbo = db.db("fandango");
                                //         var disabledUser = { email: email };
                                //         dbo.collection("disabledusers").findOneAndDelete(disabledUser, function(err, res) {
                                //             if (err) { console.log("Error deleting user from mongodb in disabledusers..."); errHandler(err); }
                                //             else {
                                //                 console.log("1 document deleted and that is:", res);
                                //                 db.close();
                                //             }
                                //         });
                                //     }
                                // });

                                //update mysql disbalility
                                //var sqlUpdateDisability = 'update user set disable = 0 where email = ' + mysql.escape(email);
                                // db.query(sqlUpdateDisability, (err, result1) => {
                                //     db.release();
                                //     if(err) console.log("Error updating the user's disability...");
                                //     else {
                                //         console.log("Successfully activated the user");
                                //     }
                                // });
                                callback(null, result[0]);
                            } else {
                                console.log("Password Mismatch");
                                callback(null, null);
                            }
                        })

                    } else {
                        console.log("User not found");
                        callback(null, null);
                    }
                }
            })

        }
    })

}

function signup_request( msg, callback ) {
    console.log("In signup_request of user modal", msg );
    let fname = msg.first_name;
    let email = msg.email;
    let pwd = msg.password;
    let role = msg.role_number;
    pool.connect( (err, db) => {
        if(err) {
            console.log("Error in UserModal signup_request while connecting to DB");
            errHandler(err);
        }
        else {
            console.log("Connected to MYSQL in signup_request in usermodal");
            // validation for existing email
            let sql1 = 'select * from user where email = ? ' ;
            db.query( sql1, email ,(err, result) => {
                if( result.length > 0  ) {
                    console.log( "Admin with same email already exists", result );
                    var userObject = {
                        code : 1,
                        message : "User with same email already exists"
                    };
                    callback( null, userObject );
                }
                else {
                    bcrypt.hash(pwd, saltRounds, (err, hash) => {
                        if(err) {
                            console.log("Error hasing the password");
                        } else {
                            console.log("Hashed the password", hash);
                            let sql2 = 'insert into user ( first_name, email, password, role_number ) values ( ?, ?, ?, ? ) ';
                            db.query( sql2 ,  [ fname, email, hash, role ] , (err, result) => {
                                db.release();
                                if(err) {
                                    console.log("Error in inserting user in mysql in creating user");
                                    callback( null, 'Error in inserting user in mysql in creating user');
                                }
                                else {
                                    console.log( 'Created User', result );
                                    userObject = {
                                        code : 2 ,
                                        message : "User created successfully"
                                    };
                                    callback( null, userObject );
                                }
                            })
                        }
                    })
                }
            })
        }
    })

}

//UserModal getprofile
function get_profile_request( msg, callback) {
    console.log("Inside get profile in kafkabackend UserModal", msg);
    var id = msg.id;

    pool.connect((err, db) => {
        if(err) {
            console.log("Error in UserModal get_profile_request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in get_profile_request in usermodal");
            var sql = "select * from user where id = " + mysql.escape(id);
            db.query(sql, (err, result) => {
                if(err) {
                    console.log("Error in UserModal get_profile_request while update query to DB");
                    errHandler(err);
                }
                else if (result.length > 0) {
                    console.log("Result after getting profile details from DB..", result);
                    callback(null, result[0]);
                }
                else {
                    console.log("User not found");
                    callback(null, null);
                }
            });
        }
    });
};

//UserModal update_basic_information_profile
function update_basic_information_profile_request(msg, callback) {
    console.log("Inside update_basic_information_profile_request in kafkabackend UserModal", msg);
    var id = msg.id;
    var first_name = msg.first_name;
    var last_name = msg.last_name;
    var state_name = msg.state_name;
    var city = msg.city;
    var zipcode = msg.zipcode;
    var address = msg.address;
    var phone = msg.phone;

    pool.connect((err, db) => {
        if(err) {
            console.log("Error in UserModal update_basic_information_profile_request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in update_basic_information_profile_request in usermodal");
            var sql = "update user set first_name = ?, last_name = ?, address = ?, city = ?, state = ?, zipcode = ?, phone_number = ? where id=?";
            db.query(sql, [first_name, last_name, address, city, state_name, zipcode, phone, id], (err, result) => {
                if(err) {
                    console.log("Error in UserModal update_basic_information_profile_request while update query to DB");
                    errHandler(err);
                }
                else{
                    console.log("Result after updating the user..", result);
                    callback(null, result);
                }
            });
        }
    });
}

//UserModal update_email_information_profile
function update_email_profile_request(msg, callback) {
    console.log("Inside update_email_profile_request in kafkabackend UserModal", msg);
    var id = msg.id;
    var email = msg.email;

    pool.connect((err, db) => {
        if(err) {
            console.log("Error in UserModal update_email_profile_request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in update_email_profile_request in usermodal");
            var sql = "update user set email = " + mysql.escape(email) + " where id = " + mysql.escape(id);
            db.query(sql, (err, result) => {
                if(err) {
                    console.log("Error in UserModal update_email_profile_request while update query to DB");
                    errHandler(err);
                }
                else{
                    console.log("Result after updating email of the user..", result);
                    callback(null, result);
                }
            });
        }
    });
}


//UserModal update_email_information_profile
function update_password_profile_request(msg, callback) {
    console.log("Inside update_password_profile_request in kafkabackend UserModal", msg);
    var id = msg.id;
    var currentPassword = msg.currentPassword;
    var updatedPassword = msg.updatedPassword;

    var passwordObject = {
        message: '',
        code: ''
    }


    pool.connect((err, db) => {
        if(err) {
            console.log("Error in UserModal update_password_profile_request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in update_password_profile_request in usermodal");

            var sql1 = "select password from user where id = " + mysql.escape(id);
            db.query(sql1, (err, result1) => {
                if(err) {
                    console.log("Error in UserModal update_password_profile_request while getting password from DB");
                    errHandler(err);
                }
                else {
                    var hash = result1[0].password;
                    bcrypt.compare(currentPassword, hash, (err, doesMatch) => {
                        if(doesMatch) {
                            //hash the updatedPassword
                            bcrypt.hash(updatedPassword, saltRounds, (err, hash) => {
                                if(err) {
                                    console.log("Error hashing the updatedpassword");
                                }
                                else {
                                    var sql = "update user set password = " + mysql.escape(hash) + " where id = " + mysql.escape(id);
                                    db.query(sql, (err, result) => {
                                        if(err) {
                                            console.log("Error in UserModal update_password_profile_request while update query to DB");
                                            errHandler(err);
                                        }
                                        else{
                                            console.log("Result after updating password of the user..", result);
                                            passwordObject = {
                                                message: 'Updated Users Password Successfully',
                                                code: 1 //success
                                            }
                                            callback(null, passwordObject);
                                        }
                                    });
                                }
                            })
                        }
                        else {
                            passwordObject = {
                                message: 'Password do not match',
                                code: 2 //does not match
                            }
                            callback(null, passwordObject);
                        }
                    })
                }
            })


        }
    });
}

//UserModal disable_account_request
function disable_account_request( msg, callback) {
    console.log("Inside disable_account_request in kafkabackend UserModal", msg);
    var id = msg.id;
    var email = msg.email;
    pool.connect((err, db) => {
        if(err) {
            console.log("Error in UserModal disable_account_request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in disable_account_request in usermodal");
            var sql = "delete from user where id = " + mysql.escape(id);
            db.query(sql, (err, result) => {
                db.release();
                if(err) {
                    console.log("Error in UserModal disable_account_request while update query to DB");
                    errHandler(err);
                }
                else {
                    console.log("Result after disable_account_request from DB..", result);
                    callback(null, 'Account Deleted Successfully');
                    //updated the user in mysql side, now inserting into mongodb
                    // MongoClient.connect(mongoURL, function(err, db) {
                    //     if (err) { console.log("Error connecting to mongodb in disabling user..."); errHandler(err); }
                    //     else {
                    //         var dbo = db.db("fandango");
                    //         var disabledUser = { id: id, email: email };
                    //         dbo.collection("disabledusers").insertOne(disabledUser, function(err, res) {
                    //             if (err) { console.log("Error inserting in mongodb in disabledusers..."); errHandler(err); }
                    //             else {
                    //                 console.log("1 document inserted");
                    //                 db.close();
                    //                 callback(null, "Account Disabled");
                    //             }
                    //         });
                    //     }
                    // });

                }
            });
        }
    });
};

function getAllNormalUsers_request(msg, callback) {
    console.log("Inside getAllNormalUsers_request in kafkabackend UserModal", msg);

    pool.connect((err, db) => {
        if(err) {
            console.log("Error in UserModal getAllNormalUsers_request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in getAllNormalUsers_request in usermodal");
            var sql = "select * from user where role_number = 1";
            db.query(sql, (err, result) => {
                db.release();
                if(err) {
                    console.log("Error in UserModal getAllNormalUsers_request while update query to DB");
                    errHandler(err);
                }
                else {
                    console.log("Result after getAllNormalUsers_request from DB..", result);
                    callback(null, result);
                }
            });
        }
    });
}

// checkfor_existing_email
function checkfor_existing_email ( msg, callback ) {
    console.log("Inside check for_existing_email in kafkabackend UserModal", msg ) ;

    pool.connect((err, db) => {
        if(err) {
            console.log("Error in UserModal for_existing_email while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in for_existing_email_request in usermodal");
            let sql = "select * from user where email = ? ";
            let email = msg.email;
            db.query(sql, email , (err, result) => {
                db.release();
                if(err) {
                    console.log("Error in UserModal for_existing_email while query to DB");
                    errHandler(err);
                }
                else {
                    console.log("Result after for_existing_email from DB..", result);
                    callback(null, result);
                }
            });
        }
    });

}

function save_user_image ( msg, callback) {
    
    console.log("Inside check save_user_image in kafkabackend UserModal", msg ) ;

    pool.connect((err, db) => {
        if(err) {
            console.log("Error in UserModal save_user_image while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in save_user_image in usermodal");
            let sql = " update user set image_path = ? where id = ? ";
            let image_path = msg.image_path;
            let id = msg.id;
            db.query(sql, [image_path, id] , (err, result) => {
                db.release();
                if(err) {
                    console.log("Error in UserModal save_user_image while query to DB");
                    callback(null, "error");
                }
                else {
                    console.log("Result after save_user_image from DB..", result);
                    callback(null, "success");
                }
            });
        }
    });

}

//==============================================================================
/**
* Export module
*/
module.exports = {
    save_user_image:save_user_image,
    createMultiplexAdmin: createMultiplexAdmin,
    findAllMultiplexAdmins : findAllMultiplexAdmins,
    findMultiplexAdminbyId : findMultiplexAdminbyId,
    login_request: login_request,
    signup_request : signup_request,
    get_profile_request : get_profile_request ,
    update_basic_information_profile_request : update_basic_information_profile_request,
    update_email_profile_request : update_email_profile_request,
    update_password_profile_request : update_password_profile_request,
    disable_account_request : disable_account_request,
    getAllNormalUsers_request: getAllNormalUsers_request,
    checkfor_existing_email : checkfor_existing_email,
    errHandler: errHandler
    //  deleteUser: deleteUser
  };
  //==============================================================================