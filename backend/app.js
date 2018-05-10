const express = require('express');
const routes = require('./routes');
const http = require('http');
const bodyParser = require('body-parser');
const AlertDirection = require('./entities/AlertDirection');
const NotificationConfiguration =  require('./entities/NotificationConfiguration');
const notificationConfigurationRepository = require('./repository').NotificationConfigurationRepository;

var app = module.exports = express();
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));

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
app.post('/config', (req, res) => {
  console.error(req.price);
  console.error(req.alertDirection);
  var notificationConfig = new NotificationConfiguration(9000, new AlertDirection("DOWN"));

  notificationConfigurationRepository.addConfiguration(notificationConfig, (err, result) => {
    if(err) {
      console.error(err.message);
    } else {
      notificationConfigurationRepository.fetchConfiguration((err, conf) => {
        res.send(JSON.stringify(conf));
      });
    }
  });
});

const configuration = io.of('/config');
configuration.on('connection', require('./routes/configuration'));

const notifications = io.of('/notifications');
notifications.on('connection', require('./routes/notifications'));

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
