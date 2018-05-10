const express = require('express');
const routes = require('./routes');
const http = require('http');
const notificationConfigurationRepository = require('./repository').NotificationConfigurationRepository;

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 7000);


app.get('/', routes.index)

app.get('/prices', require('./routes/prices'))

app.get('/config', (req, res) => {
  notificationConfigurationRepository.fetchConfiguration((err, conf) => {
    res.send(JSON.stringify(conf));
  });
});

const configuration = io.of('/config');
configuration.on('connection', require('./routes/configuration'));

const notifications = io.of('/notifications');
notifications.on('connection', require('./routes/notifications'));

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
