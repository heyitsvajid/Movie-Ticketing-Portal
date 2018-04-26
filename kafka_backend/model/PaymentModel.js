var mysql = require('mysql');
var pool = require('../services/mysql')

function errHandler(err) {
    console.error('There was an error performing the operation');
    console.log(err);
    console.log(err.code);
    console.error(err.message);
}


function complete_Payment( msg, callback ) {
    console.log("In Payment model", msg);

    pool.connect((err, db) => {
        if(err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            var card_details = msg.data.card_details;
            console.log(card_details)
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'insert into user_cards_details(user_email, cardNumber, expiryMonth, expiryYear, nameOnCard, card_zipcode) values("' + card_details.user_email + '","' + card_details.cardNumber + '","' + Number(card_details.expiryMonth) + '","' + Number(card_details.expiryYear) + '","' + card_details.nameOnCard + '","' + Number(card_details.card_zipcode) + '");';                             
            console.log(sql)
            db.query(sql, (err, result) => {
                // db.release();
                console.log(result.insertId)
                if(err) {
                    console.log("Error in PaymentModel while inserting data into MySQLDB");
                    errHandler(err);
                } else {
                    var billing_information = msg.data.billing_details;
                    console.log("Printing Billing Information")
                    console.log(billing_information)
                    var transaction_card_id = result.insertId;
                    var sql = 'insert into billing_information(transaction_card_id, user_email, user_name, amount, tax, movie_id, movie_name, multiplex_id, multiplex_name, multiplex_address, multiplex_city, multiplex_zipcode, adult_tickets, child_tickets, disabled_tickets, student_tickets, show_time) values("' + transaction_card_id + '","' + billing_information.user_email + '","' + billing_information.user_name + '","' + billing_information.amount + '","' + billing_information.tax + '","' + billing_information.movie_id + '","'+ billing_information.movie_name + '","'+ billing_information.multiplex_id + '","'+ billing_information.multiplex_name + '","'+ billing_information.multiplex_address + '","'+ billing_information.multiplex_city + '","'+ billing_information.multiplex_zipcode + '","'+ billing_information.adult_tickets + '","'+ billing_information.child_tickets + '","'+ billing_information.disabled_tickets + '","'+ billing_information.student_tickets + '","'+ billing_information.show_time + '");';                              
                    db.query(sql, (err, rows) => {
                        if(rows.affectedRows > 0) {
                            console.log(rows);
                            var payment_successfull = {payment_successfull : true , id : rows.insertId}
                            // callback(null, result[0]);
                            callback(null, payment_successfull);
                        } else {
                            console.log("Payment has not been done");
                            callback(null, null);
                        }
                    })
                    
                }
            })

        }
    })

}


//Fetching Billing Details

function fetchBillingDetails( msg, callback ) {
    console.log("In Billing Fetching Model", msg);
    pool.connect((err, db) => {
        if(err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select * from billing_information';
            db.query(sql, (err, result) => {
                if(err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    var billing_information = {billing_information : result}
                    callback(null, billing_information);
                    
                }
            })

        }
    })
}

function fetchBillingDetailsPerUser( msg, callback ) {
    console.log("In Billing Fetching Model", msg);
    pool.connect((err, db) => {
        if(err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select * from billing_information where user_email = "'+msg.data.user_email+'"';
            console.log(sql)
            db.query(sql, (err, result) => {
                if(err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    var billing_information = {billing_information : result}
                    callback(null, billing_information);
                    
                }
            })

        }
    })
}

function getCardDetailsPerUser( msg, callback ) {
    console.log("In Billing Fetching Model", msg);
    pool.connect((err, db) => {
        if(err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select * from user_cards_details where user_email = "'+msg.data.user_email+'"';
            console.log(sql)
            db.query(sql, (err, result) => {
                if(err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    var billing_information = {billing_information : result}
                    callback(null, billing_information);
                }
            })

        }
    })
}

function getMultiplexSoldTicketsPerMonth( msg, callback ) {
    console.log("In Multiplex tickets fetching per month", msg);
    pool.connect((err, db) => {
        if(err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select month(booking_date), multiplex_id, sum(adult_tickets+child_tickets+student_tickets+disabled_tickets) from billing_information group by multiplex_id, month(booking_date);';
            console.log(sql)
            db.query(sql, (err, result) => {
                if(err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    var billing_information = {billing_information : result}
                    callback(null, billing_information);
                }
            })

        }
    })
}

function getCityRevenuePerYear( msg, callback ) {
    console.log("In fetching total revenue per city per year", msg);
    pool.connect((err, db) => {
        if(err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select multiplex_city, sum(amount),year(booking_date) from billing_information group by multiplex_city,year(booking_date);';
            console.log(sql)
            db.query(sql, (err, result) => {
                if(err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    var billing_information = {billing_information : result}
                    callback(null, billing_information);
                }
            })

        }
    })
}

function getMovieRevenuePerYear( msg, callback ) {
    console.log("In fetching total revenue per city per year", msg);
    pool.connect((err, db) => {
        if(err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select movie_id,movie_name, sum(amount) as total_revenue,year(booking_date) as year from billing_information group by movie_id,year(booking_date);';
            console.log(sql)
            db.query(sql, (err, result) => {
                if(err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    var billing_information = {billing_information : result}
                    callback(null, billing_information);
                }
            })

        }
    })
}

function getTicketConfirmation( msg, callback ) {
    console.log("In fetching total revenue per city per year", msg);
    pool.connect((err, db) => {
        if(err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select * from billing_information where id = "' + msg.data.billing_id + '";';
            console.log(sql)
            db.query(sql, (err, result) => {
                if(err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    console.log(result)
                    var billing_information = {billing_information : result}
                    callback(null, billing_information);
                }
            })

        }
    })
}

module.exports = {
    complete_Payment : complete_Payment,
    fetchBillingDetails : fetchBillingDetails,
    fetchBillingDetailsPerUser : fetchBillingDetailsPerUser,
    getCardDetailsPerUser : getCardDetailsPerUser,
    getMultiplexSoldTicketsPerMonth : getMultiplexSoldTicketsPerMonth,
    getCityRevenuePerYear : getCityRevenuePerYear,
    getMovieRevenuePerYear : getMovieRevenuePerYear,
    getTicketConfirmation : getTicketConfirmation,
    errHandler: errHandler
    //  deleteUser: deleteUser
  };
  //==============================================================================