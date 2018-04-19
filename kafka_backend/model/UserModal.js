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

//==============================================================================
/**
* Export module
*/
module.exports = {
    createMultiplexAdmin: createMultiplexAdmin,
    //  deleteUser: deleteUser
  };
  //==============================================================================