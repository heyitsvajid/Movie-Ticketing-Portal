var mysql = require('mysql');
var pool = require('../services/mysql')

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
                    let sql2 = 'insert into user ( first_name, last_name, email, password, address, profile_image_path, city, state, zipcode, phone_number, disable , role_number ) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ';
                    db.query( sql2 ,  [ fname, lname, email, pwd, add, pimagepath, city, state, zip, phn, disable, role ] , (err, result) => {
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
            var sql = 'select * from user where email = ' + mysql.escape(email) + 'and password = ' + mysql.escape(password);
            db.query(sql, (err, result) => {
                db.release();
                if(err) {
                    console.log("Error in UserModal login_request while retrieving user from MySQLDB");
                    errHandler(err);
                } else {
                    if(result.length > 0) {
                        console.log(result);
                        callback(null, result[0]);
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
                    let sql2 = 'insert into user ( first_name, email, password, role_number ) values ( ?, ?, ?, ? ) ';
                    db.query( sql2 ,  [ fname, email, pwd, role ] , (err, result) => {
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

    pool.connect((err, db) => {
        if(err) {
            console.log("Error in UserModal update_basic_information_profile_request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in update_basic_information_profile_request in usermodal");
            var sql = "update user set first_name = " + mysql.escape(first_name) + ", last_name = " +
                mysql.escape(last_name) + " where id = " + mysql.escape(id);
            db.query(sql, (err, result) => {
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


//==============================================================================
/**
* Export module
*/
module.exports = {
    createMultiplexAdmin: createMultiplexAdmin,
    findAllMultiplexAdmins : findAllMultiplexAdmins,
    findMultiplexAdminbyId : findMultiplexAdminbyId,
    login_request: login_request,
    signup_request : signup_request,
    get_profile_request : get_profile_request ,
    update_basic_information_profile_request : update_basic_information_profile_request,
    update_email_profile_request : update_email_profile_request,
    errHandler: errHandler
    //  deleteUser: deleteUser
  };
  //==============================================================================