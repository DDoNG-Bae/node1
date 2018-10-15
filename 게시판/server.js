process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'production' : 'development';
'use strict';
var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var debug = require('debug');
//var ckeditor = require('@ckeditor/ckeditor5-build-classic');
var fs = require('fs');


var port = process.env.PORT || 3000;

var routes = require('./routes/index');
var board = require('./routes/board');

var app = express();
app.use(express.urlencoded());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/board', board);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.set('port', port);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
    debug('Express server listening on port ' + server.address().port);
});