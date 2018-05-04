const express = require('express');
const routes = require('./routes');
const http = require('http');

console.log("HERE!")
var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 7000);


app.get('/', routes.index)

const notifications = io.of('/notifications');
notifications.on('connection', require('./routes/notifications'));

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
