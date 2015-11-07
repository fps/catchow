var express = require('express');
var crypto = require('crypto');

var app = express();

var prefix = '';

var challenge_ttl_milliseconds = 30000;
var prefix_length = 3;

var max_number_of_challenges = 1000;
var challenges = [ ];

var max_number_of_messages = 100;
var messages = [ ];

app.get(prefix + '/challenge', function(req, res) {
    if (challenges.length > max_number_of_challenges) {
        res.status(502);
        res.send('{ "error": "maximum number of challenges exceeded" }');
        return;
    }

    var shasum = crypto.createHash('sha256');
    shasum.update('' + Math.random());
    challenge = shasum.digest('base64').substring(0,  prefix_length);
    challenges.push({ "challenge": challenge, "date": new Date() });
    res.send('{ "challenge": "' + challenge + '" }');
});

var server = app.listen(9876, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('catchow example listening on %s:%s', host, port);
});



