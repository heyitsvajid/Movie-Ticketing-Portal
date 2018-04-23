var
  passport = require('passport'),
  User = require('../model/user.js'),
  LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var kafka = require('../kafka/client');

// passport.serializeUser(function (user, done) {
//   done(null, user._id);
// });
//
// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     if (err) {
//       console.error('There was an error accessing the records of' +
//         ' user with id: ' + id);
//       return console.log(err.message);
//     }
//     return done(null, user);
//   })
// });


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});


/**
*Strategies
*/
// passport.use('local-signup', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// },
//   function (req, email, password, done) {
//     process.nextTick(function () {
//       User.findOne({ email: email }, function (err, user) {
//         if (err) {
//           return errHandler(err);
//         }
//         if (user) {
//           console.log('user already exists');
//           return done(null, false, { errMsg: 'email already exists' });
//         }
//         else {
//           var newUser = new User();
//           newUser.username = req.body.username;
//           newUser.email = email;
//           newUser.password = newUser.generateHash(password);
//           newUser.save(function (err) {
//             if (err) {
//               console.log(err);
//               if (err.message == 'User validation failed') {
//                 console.log(err.message);
//                 return done(null, false, { errMsg: 'Please fill all fields' });
//               }
//               return errHandler(err);
//             }
//             console.log('New user successfully created...', newUser.username);
//             console.log('email', email);
//             console.log(newUser);
//             return done(null, newUser);
//           });
//         }
//       });
//     });
//   }));
//---------------------------Local Login-------------------------------------
passport.use('local-login', new LocalStrategy(
  function (username, password, done) {
    console.log("In local login...", username, password);

    var data={
      email:username,
      password:password,
        request_code: 1 //login_request
    }

    kafka.make_request('user_request', data, function(err, result) {
      if(err) {
        console.log("In passport use err", err);
        return done(err, {});
      } else {
          // console.log("In passport use results", result);
          // console.log("In passport use results printing the result successmsg", result.successMsg);
          // console.log("In passport use results printing the result errormsg", result.errorMsg);
          // console.log("In passport use results printing the result data", result.data);

          if(result.errorMsg === '') {
              return done(null, result);
          } else {
              return done(null, false);
          }

      }
    })

    // kafka.make_request('login_request', data, function (err, results) {
    //   console.log('Kafka Response:');
    //   console.log(results);
    //   if (err) {
    //     return done(err);
    //   }
    //
    //   if (results.errorMsg != '') {
    //     console.log(results.errorMsg);
    //     return done(null, false, { errMsg: results.errorMsg })
    //   }
    //
    //   try{
    //     if (!bcrypt.compareSync(req.body.password, results.data.password)) {
    //       console.log('Invalid Password');
    //       return done(null, false, { errMsg: 'Invalid password try again' });
    //     }
    //     return done(null, results.data);
    //   }catch(e){
    //     console.log(e);
    //   }
    // });


    // User.findOne({'email': email}, function(err, user) {
    //     if(err) {
    //       return done(err);
    //       }
    //     if(!user) {
    //         console.log('User Not Found with username '+email);
    //       return done(null, false, {errMsg: 'User does not exist, please' })}
    //     if(!bcrypt.compareSync(req.body.password, user.password)) {
    //         console.log('Invalid Password');
    //       return done(null, false, {errMsg: 'Invalid password try again'});
    //       }
    //     return done(null, user);
    // });

  }));
module.exports = passport;