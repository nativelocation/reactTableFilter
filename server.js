var express = require('express');
var app = express();

app.arguments(express.static(__dirname + '/build'));

app.listen(process.env.PORT || 8080);
