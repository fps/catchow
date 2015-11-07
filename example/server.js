var express = require('express');
var sha256 = require('crypto-js/sha256');
var base64 = require('crypto-js/enc-base64');

var app = express();

var prefix = '';

var challenge_ttl_milliseconds = 30000;
var prefix_length = 3;

var max_number_of_challenges = 10;
var challenges = [ ];

var max_number_of_messages = 100;
var messages = [ ];

app.get(prefix + '/challenge', function(req, res) {
    if (challenges.length > max_number_of_challenges) {
        res.status(502);
        res.send('{ "error": "maximum number of challenges exceeded" }');
        return;
    }

    var challenge = base64.stringify(sha256('' + Math.random()));
    var prefix = challenge.substring(0,  prefix_length); 

    challenges.push({ "uuid": challenge, "prefix": prefix, "date": new Date() });
    res.send('{ "id": "' + challenge + ', "prefix": "' + prefix + '" }');
});

var server = app.listen(9876, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('catchow example listening on %s:%s', host, port);
});



