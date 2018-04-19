var mysql = require('mysql');
var pool = require('../services/mysql');
// var pool = mysql.createPool({
//     connectionLimit : 10,
//     host : 'weserveinstance.ccecdywbwqqr.us-west-1.rds.amazonaws.com',
//     port : 3305,
//     user : 'root',
//     password : 'rootroot',
//     database : 'fandango'
// });

function errHandler(err) {
    console.error('There was an error performing the operation');
    console.log(err);
    console.log(err.code);
    console.error(err.message);
}

function createMultiplexAdmin( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));
    pool.connect((err, db) => {
        if(err) {
            console.log("Failed connection to mysql");
            callback(err,"Error connecting to database");
        } else {
            //console.log("Connected to MySQL");
                    let sql = 'insert into user ( first_name, email, password ) values ( ?, ?, ?) ';
                    let fname = msg.data.first_name;
                    let email =  msg.data.email;
                    let pwd = msg.data.password;
                    db.query( sql ,  [fname, email, pwd ] , (err, result) => {
                        db.release();
                        if(err) {
                            console.log("Error in inserting user in mysql in creating multiplex admin");
                            callback(null, 'Error in inserting user in mysql in creating multiplex admin');
                        }
                        else {
                            console.log('Created Multiplex Admin', result);
                            callback(null, 'Multiplex admin created successfully');
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

//==============================================================================
/**
* Export module
*/
module.exports = {
    createMultiplexAdmin: createMultiplexAdmin,
    login_request: login_request,
    errHandler: errHandler
    //  deleteUser: deleteUser
  };
  //==============================================================================