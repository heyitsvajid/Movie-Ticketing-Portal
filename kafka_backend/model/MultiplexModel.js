/**
*Module dependencies
*/
var MultiplexModel = require('./multiplex');
//==============================================================================
/**
*User Model Utility functions
*/
function errHandler(err) {
  console.error('There was an error performing the operation');
  console.log(err);
  console.log(err.code);
  console.error(err.message);
}

function validationErr(err, res) {
  Object.keys(err.errors).forEach(function (k) {
    var msg = err.errors[k].message;
    console.error('Validation error for \'%s' +': %s', k, msg);
    return res.status(404).json({
      msg: 'Please ensure required fields are filled'});
  });
}

function createNewMultiplex(multiplex,path,callback) {
   MultiplexModel.create({
    name: multiplex.name[0],
    address: multiplex.address[0],
    city: multiplex.city[0],
    state:multiplex.state[0],
    zipcode: multiplex.zipcode[0],
    contact_number: multiplex.contact_number[0],
    multiplex_owner_id: multiplex.multiplex_owner_id[0],
    amenities: multiplex.amenities[0],
    screens: JSON.parse(multiplex.screen),
    multiplex_logo:path
}, function (err, multiplex) {
      if(err) {
        console.error('There was an error creating the multiplex');
        errHandler(err);
      }else{
        console.log('New multiplex successfully created...');
        console.log(multiplex);  
      }
      callback(err,multiplex);
  })
}

function findMultiplex(id,callback) {
   MultiplexModel.findOne({_id: id},
    function (err, multiplex) {
      if(err) {
        errHandler(err);
      }else{
        console.log('Multiplex successfully found...');
      }
      callback(err,multiplex);
  });
}

function findAllMultiplex(callback) {
   MultiplexModel.find({},
  function (err, multiplexes) {
    if(err) {
      errHandler(err);
    }else{
        console.log(multiplexes);
    }
    callback(err,multiplexes)
  });
}

function updateMultiplex(multiplex,path,callback) {
   MultiplexModel.findOne({_id: multiplex._id[0]},
  function (err, updateMultiplex) {
    if(err) {
      errHandler(err);
    }
    if(updateMultiplex){
        updateMultiplex.name= multiplex.name[0],
        updateMultiplex.address= multiplex.address[0],
        updateMultiplex.city= multiplex.city[0],
        updateMultiplex.state=multiplex.state[0],
        updateMultiplex.zipcode= multiplex.zipcode[0],
        updateMultiplex.contact_number= multiplex.contact_number[0],
        updateMultiplex.multiplex_owner_id= multiplex.multiplex_owner_id[0],
        updateMultiplex.amenities= multiplex.amenities[0],
        updateMultiplex.screens= JSON.parse(multiplex.screen[0]),
        updateMultiplex.multiplex_logo=path
        updateMultiplex.save(function (err, multiplex) {
          if(err) {
            errHandler(err);
          }else{
            console.log('Multiplex updated= ', multiplex);
          }
          callback(err,updateMultiplex)
        });
    }else{
        callback(err,{})
    }
    
  });
}

// function deleteUser(req, res) {
//    UserModel.findOneAndRemove({email: req.params.email},
//  function (err, user) {
//    if(err) {
//      return errHandler(err);
//    }
//    console.log('User deleted ', user);
//    return res.json(user);
//  });
// }

//==============================================================================
/**
* Export module
*/
module.exports = {
  errHandler: errHandler,
  validationErr: validationErr,
  createNewMultiplex: createNewMultiplex,
  findMultiplex: findMultiplex,
  findAllMultiplex: findAllMultiplex,
  updateMultiplex: updateMultiplex,
//  deleteUser: deleteUser
};
//==============================================================================