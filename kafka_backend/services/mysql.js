var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 30,
    host : 'weserveinstance.ccecdywbwqqr.us-west-1.rds.amazonaws.com',
    port : 3305,
    user : 'root',
    password : 'rootroot',
    database : 'fandango'
});

exports.connect = (callback) => {
    pool.getConnection((err, db) => {
        if(err) {
            console.log("Failed connection to mysql");
            callback(err,db);
        } else {
            //console.log("Connected to MySQL");
            callback(err, db);
        }
    })
}