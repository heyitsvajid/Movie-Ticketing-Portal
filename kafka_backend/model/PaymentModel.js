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
                    var transaction_card_id = result.insertId;
                    var sql = 'insert into billing_information(transaction_card_id, user_email, user_name, amount, tax, movie_id, movie_name, multiplex_id, multiplex_name, multiplex_address, multiplex_city, multiplex_zipcode, adult_tickets, child_tickets, disabled_tickets, student_tickets) values("' + transaction_card_id + '","' + billing_information.user_email + '","' + billing_information.user_name + '","' + billing_information.amount + '","' + billing_information.tax + '","' + billing_information.movie_id + '","'+ billing_information.movie_name + '","'+ billing_information.multiplex_id + '","'+ billing_information.multiplex_name + '","'+ billing_information.multiplex_address + '","'+ billing_information.multiplex_city + '","'+ billing_information.multiplex_zipcode + '","'+ billing_information.adult_tickets + '","'+ billing_information.child_tickets + '","'+ billing_information.disabled_tickets + '","'+ billing_information.student_tickets + '");';                              
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
    console.log("In Payment model", msg);

    pool.connect((err, db) => {
        if(err) {
            console.log("Error in PaymentModel request while connecting to DB");
            errHandler(err);
        } else {
            var billing_id = msg.data.billing_id;
            console.log(card_details)
            console.log("Connected to MYSQL in request of PaymentModel");
            var sql = 'select * from billing_information where id = "'+billing_id+'"';
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

module.exports = {
    complete_Payment : complete_Payment,
    errHandler: errHandler
    //  deleteUser: deleteUser
  };
  //==============================================================================