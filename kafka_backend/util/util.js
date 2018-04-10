exports.createPayload = function (data, res) {
    return [
        {
            topic: data.replyTo,
            messages: JSON.stringify({
                correlationId: data.correlationId,
                data: res
            }),
            partition: 0
        }
    ];
};

exports.log = function (data, err) {
    console.log(data);
    console.log("in server js -- data");
    console.log(data);

    if (err) {
        console.log(err);
    } else {
        console.log("message successfully sent by producer");
    }
};


