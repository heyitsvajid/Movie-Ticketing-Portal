var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(queue_name, msg_payload, callback) {
	console.log('in make request');
	console.log(msg_payload);
	rpc.makeRequest(queue_name, msg_payload, function (err, response) {
		if (err) {
			console.log("Node Backend : client error");

			var resultObject = {
				successMsg: '',
				errorMsg: err.message,
				data: {}
			}
			console.error(err);
			callback(err, resultObject);
		}
		else {
			console.log("Node Backend : client success");
			console.log(response);
			callback(null, response);
		}
	});
}

exports.make_request = make_request;
