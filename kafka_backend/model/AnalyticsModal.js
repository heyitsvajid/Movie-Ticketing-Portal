/**
*Module dependencies
*/
var AnalyticsModel = require('./analytics');
//==============================================================================
/**
*Movie Model Utility functions
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


function findAllTracks(callback) {
    console.log('Inside Analytics Modal : findAllTracks');
    AnalyticsModel.find({},
        function (err, analytics) {
            if (err) {
                errHandler(err);
            } else {
                console.log(analytics);
            }
            callback(err, analytics)
        });
}

function addUserTrack(track, callback) {
    console.log('Inside Analytics Modal : addUserTrack');

    AnalyticsModel.findOne({ user_id: track.data.user_id },
        function (err, updateUserTrack) {
            if (err) {
                errHandler(err);
            }
            if (updateUserTrack) {
                console.log('Updating track')
                console.log(track.data.session)
                updateUserTrack.session.push(track.data.session[0])
                updateUserTrack.save(function (err, updatedTrack) {
                    if (err) {
                        errHandler(err);
                    } else {
                        console.log('Track updated= ', updatedTrack);
                    }
                    callback(err, updatedTrack)
                });
            } else {
                console.log('adding new  track')
                console.log(track.data.user_id)
                AnalyticsModel.create({
                    user_id: track.data.user_id,
                    email: track.data.email,
                    name:track.data.name,
                    session: track.data.session,
                }, function (err, track) {
                    if (err) {
                        console.error('There was an error creating the track for user');
                        errHandler(err);
                    } else {
                        console.log('New track successfully created...');
                        console.log(track);
                    }
                    callback(err, track);
                })
            }

        });
}



function findByUserId(id, callback) {
    console.log('Inside Analytics Modal :findByUserId');
    AnalyticsModel.findOne({ _id: id.data._id },
        function (err, userTrack) {
            if (err) {
                errHandler(err);
            }
            if (userTrack) {
                callback(err, userTrack)
            } else {
                callback(err, null)
                console.log('Track not found');
            }

        });
}

//==============================================================================
/**
* Export module
*/
module.exports = {
    addUserTrack: addUserTrack,
    findAllTracks: findAllTracks,
    findByUserId: findByUserId
    //  deleteUser: deleteUser
};
//==============================================================================