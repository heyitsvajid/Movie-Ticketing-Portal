/**
*Module dependencies
*/
var MultiplexModel = require('./multiplex');
var pool = require('../services/mysql')
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
    console.error('Validation error for \'%s' + ': %s', k, msg);
    return res.status(404).json({
      msg: 'Please ensure required fields are filled'
    });
  });
}

function createNewMultiplex(multiplex, path, callback) {
  MultiplexModel.create({
    name: multiplex.name[0],
    address: multiplex.address[0],
    city: multiplex.city[0],
    state: multiplex.state[0],
    zipcode: multiplex.zipcode[0],
    contact_number: multiplex.contact_number[0],
    multiplex_owner_id: multiplex.multiplex_owner_id[0],
    amenities: multiplex.amenities[0],
    screens: JSON.parse(multiplex.screen),
    multiplex_logo: path
  }, function (err, multiplex) {
    if (err) {
      console.error('There was an error creating the multiplex');
      errHandler(err);
    } else {
      console.log('New multiplex successfully created...');
      console.log(multiplex);
    }
    callback(err, multiplex);
  })
}

function findMultiplex(id, callback) {
  MultiplexModel.findOne({ _id: id },
    function (err, multiplex) {
      if (err) {
        errHandler(err);
      } else {
        console.log('Multiplex successfully found...');
      }
      callback(err, multiplex);
    });
}

function findAllMultiplex(callback) {
  MultiplexModel.find({},
    function (err, multiplexes) {
      if (err) {
        errHandler(err);
      } else {
        console.log(multiplexes);
      }
      callback(err, multiplexes)
    });
}

function updateMultiplex(multiplex, path, callback) {
  MultiplexModel.findOne({ _id: multiplex._id[0] },
    function (err, updateMultiplex) {
      if (err) {
        errHandler(err);
      }
      if (updateMultiplex) {
        updateMultiplex.name = multiplex.name[0]
          updateMultiplex.address = multiplex.address[0]
          updateMultiplex.city = multiplex.city[0]
          updateMultiplex.state = multiplex.state[0]
          updateMultiplex.zipcode = multiplex.zipcode[0]
          updateMultiplex.contact_number = multiplex.contact_number[0]
          updateMultiplex.multiplex_owner_id = multiplex.multiplex_owner_id[0]
          updateMultiplex.amenities = multiplex.amenities[0]
          updateMultiplex.screens = JSON.parse(multiplex.screen[0])
          updateMultiplex.multiplex_logo = path
        updateMultiplex.save(function (err, multiplex) {
          if (err) {
            errHandler(err);
          } else {
            console.log('Multiplex updated= ', multiplex);
          }
          callback(err, updateMultiplex)
        });
      } else {
        callback(err, {})
      }

    });
}

function addShowTiming(addShow, callback) {
  console.log(addShow)

  MultiplexModel.findOne({ _id: addShow.data._id },
    function (err, updateMultiplex) {
      console.log(updateMultiplex)

      if (err) {
        errHandler(err);
      }
      if (updateMultiplex) {
        console.log('Multiplex found. Adding Show')
        updateMultiplex.show_timings.push(addShow.data.show),
          updateMultiplex.save(function (err, multiplex) {
            if (err) {
              errHandler(err);
            } else {
              console.log('Multiplex updated= ', multiplex);
            }
            callback(err, updateMultiplex)
          });
      } else {
        console.log('Multiplex not found')

        callback(err, {})
      }

    });
}
function updateShowTiming(updateShow, callback) {
  console.log('Inside MultiplexModal updateShowTiming')
  console.log(updateShow)

  MultiplexModel.findOne({ _id: updateShow.data._id },
    function (err, updateMultiplex) {
      if (err) {
        errHandler(err);
      }
      if (updateMultiplex) {
        console.log('Multiplex found. Updating Show')

        updateMultiplex.show_timings.forEach(element => {
          if(element._id==updateShow.data.show._id){
            console.log('Updating show values');
            element.price=updateShow.data.show.price;
            element.screen_number=updateShow.data.show.screen_number,
            element.date_time=updateShow.data.show.date_time,
            element.sort_field=updateShow.data.show.sort_field,
            element.seats_left=updateShow.data.show.seats_left,            
            element.movie=updateShow.data.show.movie
          }
        });
        updateMultiplex.save(function (err, multiplex) {
          if (err) {
            errHandler(err);
          } else {
            console.log('Multiplex updated= ', multiplex);
          }
          callback(err, updateMultiplex)
        });
      } else {
        console.log('Multiplex not found');
        callback(err, {})
      }

    });
}


function findMultiplexById(id, callback) {
  console.log('Inside MultiplexModal findMultiplexById');
  console.log(id.data._id);

  MultiplexModel.findOne({ _id: id.data._id },
    function (err, multiplex) {
      if (err) {
        errHandler(err);
      }
      if (multiplex) {
        console.log('Multiplex found')
        callback(err, multiplex)

      } else {
        console.log('Multiplex not found')
        callback(err, null)
      }

    });
}

function multiplexSearch(data, callback) {
    console.log('Inside MultiplexModal search');
    console.log(data);

    MultiplexModel.find({
        $or: [ { city: { $regex: data.data.searchQuery, $options:"$i" } },
               { state: { $regex: data.data.searchQuery, $options:"$i" } },
               { zipcode: { $regex: data.data.searchQuery, $options:"$i" } },
               { name: { $regex: data.data.searchQuery, $options:"$i" } },
               { "show_timings.movie.title" : { $regex: data.data.searchQuery, $options:"$i" } }
        ]
        },
        function (err, searchResults) {
            if (err) {
                console.log("Error in searching..inside multiplexSearch");
                errHandler(err);
            }
            else if (searchResults) {
                console.log('Found search results');
                console.log("Result in searching..inside multiplexSearch: ", searchResults);
                callback(err, searchResults)

            }
            else {
                console.log('Nothing found');
                callback(err, null)
            }

        });
}


function revenueByEachMovie(data, callback) {
  console.log('Inside MultiplexModal search');
  console.log(data);
  var multiplex_id = data.id;
  pool.connect((err, db) => {
      if(err) {
          console.log("error connecting to mysql in revenueByEachMovie");
          errHandler(err);
      }
      else {
          console.log("Connected to MYSQL in revenueByEachMovie in usermodal");
          let sql = "select multiplex_id, movie_name, sum(amount) as total_revenue from billing_information where movie_name != 'null' and multiplex_id = ? group by multiplex_id, movie_name";
          db.query(sql, multiplex_id, (err, result) => {
              if(err) {
                  console.log("Error in querying mysql in revenueByEachMovie");
                  errHandler(err);
              }
              else {
                  if(result.length > 0) {
                      console.log("result after querying mysql in revenueByEachMovie", result);
                      callback(null, result);
                  } else {
                      callback(null, []);
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
  revenueByEachMovie : revenueByEachMovie,
  errHandler: errHandler,
  validationErr: validationErr,
  createNewMultiplex: createNewMultiplex,
  findMultiplex: findMultiplex,
  findAllMultiplex: findAllMultiplex,
  updateMultiplex: updateMultiplex,
  addShowTiming: addShowTiming,
  updateShowTiming: updateShowTiming,
  findMultiplexById:findMultiplexById,
  multiplexSearch: multiplexSearch
};
//==============================================================================