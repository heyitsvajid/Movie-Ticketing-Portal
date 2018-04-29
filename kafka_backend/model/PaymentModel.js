var mysql = require('mysql');
var pool = require('../services/mysql')

function errHandler(err) {
    console.error('There was an error performing the operation');
    console.log(err);
    console.log(err.code);
    console.error(err.message);
}


function complete_Payment(msg, callback) {
    console.log("In Payment model", msg);
    var billing_information = msg.data.billing_details;
    var totalCount = (parseInt(billing_information.child_tickets) + parseInt(billing_information.adult_tickets)
        + parseInt(billing_information.disabled_tickets) + parseInt(billing_information.student_tickets));
    pool.connect((err, db) => {
        if (err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            var checkCountSQL = 'select show_id,sum(adult_tickets+child_tickets+disabled_tickets+student_tickets) as count from billing_information where show_id="' +billing_information.show_id +  '" group by show_id'
            var card_details = msg.data.card_details;
            db.query(checkCountSQL, (err, result) => {
                if (err) {
                    console.log("Error in PaymentModel while inserting data into MySQLDB");
                    errHandler(err);
                } else {
                    console.log('Show Id :' + billing_information.show_id)
                    console.log('Total Seats ' + billing_information.seat_count)
                    console.log('totalCount : ' + totalCount)
                    console.log(result)
                    if(result.length==1){
                    result.forEach(show => {
                        if (show.show_id == billing_information.show_id) {
                            if (billing_information.seat_count >= show.count + totalCount) {


                                console.log('Enough Seats. Allow Bookings')
                                console.log(card_details)
                                console.log("Connected to MYSQL in request of PaymentModel");
                                var sql = 'insert into user_cards_details(user_email, cardNumber, expiryMonth, expiryYear, nameOnCard, card_zipcode) values("' + card_details.user_email + '","' + card_details.cardNumber + '","' + Number(card_details.expiryMonth) + '","' + Number(card_details.expiryYear) + '","' + card_details.nameOnCard + '","' + Number(card_details.card_zipcode) + '");';
                                console.log(sql)
                                db.query(sql, (err, result) => {
                                    // db.release();
                                    console.log(result.insertId)
                                    if (err) {
                                        console.log("Error in PaymentModel while inserting data into MySQLDB");
                                        errHandler(err);
                                    } else {
                                        console.log("Printing Billing Information")
                                        console.log(billing_information)
                                        var transaction_card_id = result.insertId;
                                        var sql = 'insert into billing_information(transaction_card_id, user_email, user_name, amount, tax, movie_id, movie_name, multiplex_id, multiplex_name, multiplex_address, multiplex_city, multiplex_zipcode, adult_tickets, child_tickets, disabled_tickets, student_tickets, show_time,show_id,screen_number) values("' + transaction_card_id + '","' + billing_information.user_email + '","' + billing_information.user_name + '","' + billing_information.amount + '","' + billing_information.tax + '","' + billing_information.movie_id + '","' + billing_information.movie_name + '","' + billing_information.multiplex_id + '","' + billing_information.multiplex_name + '","' + billing_information.multiplex_address + '","' + billing_information.multiplex_city + '","' + billing_information.multiplex_zipcode + '","' + billing_information.adult_tickets + '","' + billing_information.child_tickets + '","' + billing_information.disabled_tickets + '","' + billing_information.student_tickets + '","' + billing_information.show_time + '","' + billing_information.show_id + '","' + billing_information.screen_number + '");';
                                        db.query(sql, (err, rows) => {
                                            if (rows.affectedRows > 0) {
                                                console.log(rows);
                                                var payment_successfull = { payment_successfull: true, id: rows.insertId }
                                                // callback(null, result[0]);
                                                callback(null, payment_successfull);
                                            } else {
                                                console.log("Payment has not been done");
                                                callback(null, null);
                                            }
                                        })

                                    }
                                })
                            } else {
                                console.log('Not Enough Seats. Cancel Payment')
                                var payment_successfull = { payment_successfull: false, count_left: billing_information.seat_count - show.count }
                                // callback(null, result[0]);
                                callback(null, payment_successfull);
                            }
                        }
                    });}else{
                        console.log('No seats booked yet. Allow Bookings')
                        console.log(card_details)
                        console.log("Connected to MYSQL in request of PaymentModel");
                        var sql = 'insert into user_cards_details(user_email, cardNumber, expiryMonth, expiryYear, nameOnCard, card_zipcode) values("' + card_details.user_email + '","' + card_details.cardNumber + '","' + Number(card_details.expiryMonth) + '","' + Number(card_details.expiryYear) + '","' + card_details.nameOnCard + '","' + Number(card_details.card_zipcode) + '");';
                        console.log(sql)
                        db.query(sql, (err, result) => {
                            // db.release();
                            console.log(result.insertId)
                            if (err) {
                                console.log("Error in PaymentModel while inserting data into MySQLDB");
                                errHandler(err);
                            } else {
                                console.log("Printing Billing Information")
                                console.log(billing_information)
                                var transaction_card_id = result.insertId;
                                var sql = 'insert into billing_information(transaction_card_id, user_email, user_name, amount, tax, movie_id, movie_name, multiplex_id, multiplex_name, multiplex_address, multiplex_city, multiplex_zipcode, adult_tickets, child_tickets, disabled_tickets, student_tickets, show_time,show_id,screen_number) values("' + transaction_card_id + '","' + billing_information.user_email + '","' + billing_information.user_name + '","' + billing_information.amount + '","' + billing_information.tax + '","' + billing_information.movie_id + '","' + billing_information.movie_name + '","' + billing_information.multiplex_id + '","' + billing_information.multiplex_name + '","' + billing_information.multiplex_address + '","' + billing_information.multiplex_city + '","' + billing_information.multiplex_zipcode + '","' + billing_information.adult_tickets + '","' + billing_information.child_tickets + '","' + billing_information.disabled_tickets + '","' + billing_information.student_tickets + '","' + billing_information.show_time + '","' + billing_information.show_id + '","' + billing_information.screen_number + '");';
                                db.query(sql, (err, rows) => {
                                    if (rows.affectedRows > 0) {
                                        console.log(rows);
                                        var payment_successfull = { payment_successfull: true, id: rows.insertId }
                                        callback(null, payment_successfull);
                                    } else {
                                        console.log("Payment has not been done");
                                        callback(null, null);
                                    }
                                })

                            }
                        })
                    }
                }
            })
        }
    })

}


//Fetching Billing Details

function fetchBillingDetails(msg, callback) {
    console.log("In Billing Fetching Model", msg);
    pool.connect((err, db) => {
        if (err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select * from billing_information';
            db.query(sql, (err, result) => {
                if (err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    db.release();
                    var billing_information = { billing_information: result }
                    callback(null, billing_information);

                }
            })

        }
    })
}

function fetchBillingDetailsPerUser(msg, callback) {
    console.log("In Billing Fetching Model", msg);
    pool.connect((err, db) => {
        if (err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select * from billing_information where user_email = "' + msg.data.user_email + '"';
            console.log(sql)
            db.query(sql, (err, result) => {
                if (err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else if(result.length > 0) {
                    db.release();
                    console.log("Transactions found : ", result.length);
                    var billing_information = {billing_information : result}
                    callback(null, billing_information);  
                } else{
                    db.release();
                    console.log("0 Transactions available for this user: ", result.length);
                    var billing_information = {billing_information : 0}
                    callback(null, billing_information);  
                }
            })

        }
    })
}

function getCardDetailsPerUser(msg, callback) {
    console.log("In Billing Fetching Model", msg);
    pool.connect((err, db) => {
        if (err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select * from user_cards_details where user_email = "' + msg.data.user_email + '" AND save_card=1 order by date(booking_date) DESC, time(booking_date) DESC LIMIT 1';
            // var sql = 'select * from user_cards_details where user_email = "jay1@gmail.com" order by date(booking_date) DESC, time(booking_date) DESC LIMIT 1';
            console.log(sql)
            db.query(sql, (err, result) => {
                if (err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    db.release();
                    var billing_information = { billing_information: result }
                    callback(null, billing_information);
                }
            })

        }
    })
}

function getMultiplexSoldTicketsPerMonth(msg, callback) {
    console.log("In Multiplex tickets fetching per month", msg);
    pool.connect((err, db) => {
        if (err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select month(booking_date) as month, multiplex_id, multiplex_name, sum(adult_tickets+child_tickets+student_tickets+disabled_tickets) as total_revenue from billing_information group by multiplex_id, month(booking_date) order by total_revenue DESC LIMIT 10;';
            console.log(sql)
            db.query(sql, (err, result) => {
                if (err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    db.release();
                    var billing_information = { billing_information: result }
                    callback(null, billing_information);
                }
            })

        }
    })
}

function getCityRevenuePerYear(msg, callback) {
    console.log("In fetching total revenue per city per year", msg);
    pool.connect((err, db) => {
        if (err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select multiplex_city, sum(amount) as total_revenue, year(booking_date) as year from billing_information group by multiplex_city,year(booking_date);';
            console.log(sql)
            db.query(sql, (err, result) => {
                if (err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    db.release();
                    var billing_information = { billing_information: result }
                    callback(null, billing_information);
                }
            })

        }
    })
}

function getMovieRevenuePerYear(msg, callback) {
    console.log("In fetching total revenue per city per year", msg);
    pool.connect((err, db) => {
        if (err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select movie_id,movie_name, sum(amount) as total_revenue,year(booking_date) as year from billing_information group by movie_id,year(booking_date) order by total_revenue DESC LIMIT 10;';
            console.log(sql)
            db.query(sql, (err, result) => {
                if (err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    db.release();
                    var billing_information = { billing_information: result }
                    callback(null, billing_information);
                }
            })

        }
    })
}

function getTicketConfirmation(msg, callback) {
    console.log("In fetching total revenue per city per year", msg);
    pool.connect((err, db) => {
        if (err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select * from billing_information where id = "' + msg.data.billing_id + '";';
            console.log(sql)
            db.query(sql, (err, result) => {
                if (err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    db.release();
                    console.log(result)
                    var billing_information = { billing_information: result }
                    callback(null, billing_information);
                }
            })

        }
    })
}

function getCardDetails( msg, callback ) {
    console.log("In fetching total revenue per city per year", msg);
    pool.connect((err, db) => {
        if(err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select * from user_cards_details where id = "' + msg.data.billing_id + '";';
            console.log(sql)
            db.query(sql, (err, result) => {
                if(err) {
                    console.log("Error in PaymentModel while fetching billing data into MySQLDB");
                    errHandler(err);
                    console.log("Transaction not found");
                    callback(null, null);
                } else {
                    db.release();
                    console.log(result)
                    var billing_information = {billing_information : result}
                    callback(null, billing_information);
                }
            })

        }
    })
}

function deleteBillingDetail( msg, callback ) {
    console.log("In Delete Billing  ", msg);
    pool.connect((err, db) => {
        if (err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        }
        else {
            console.log("Connected to MYSQL in request of PaymentModel");
            let id = msg.data.id;
            let sql = 'delete from billing_information where id = ? ';
            console.log(sql);
            db.query(sql, id, (err, result) => {
                if (err) {
                    console.log("Billing Details not found");
                    errHandler(err);
                    callback(null, null);
                }
                else {
                    db.release();
                    console.log(result);
                    callback(null, result);
                }
            })
        }
    })
}

function saveUserCardDetails( msg, callback ) {
    console.log("In Save User Card Details " );
    console.log(msg.data.data);
    pool.connect((err, db) => {
        if (err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        }
        else {
            var sql = 'insert into user_cards_details(user_email, cardNumber, expiryMonth, expiryYear, nameOnCard, card_zipcode, save_card) values("' + msg.data.data.card_details.user_email + '","' + msg.data.data.card_details.cardNumber + '","' + Number(msg.data.data.card_details.expiryMonth) + '","' + Number(msg.data.data.card_details.expiryYear) + '","' + msg.data.data.card_details.nameOnCard + '","' + Number(msg.data.data.card_details.card_zipcode) + '",true);';
            console.log(sql);
            db.query(sql, (err, result) => {
                // db.release();
                console.log(result.insertId)
                if (err) {
                    console.log("Error in PaymentModel while inserting data into MySQLDB");
                    errHandler(err);
                } else {
                    db.release();
                            var payment_successfull = { payment_successfull: true };
                            // callback(null, result[0]);
                            callback(null, payment_successfull);

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
    deleteBillingDetail : deleteBillingDetail,
    getCardDetails : getCardDetails,
    saveUserCardDetails : saveUserCardDetails,
    errHandler: errHandler
    //  deleteUser: deleteUser
};
  //==============================================================================
