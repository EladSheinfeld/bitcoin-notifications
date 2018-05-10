const entities = require('../entities/AlertDirection')
const notificationRepo = require('../repository').NotificationConfigurationRepository

module.exports = function (socket) {
  socket.on('priceUpdated', function (data) {
    notificationRepo.fetchConfiguration((err, conf) => {
      if(err) {
        console.error(err.message);
      } else {
        if(conf.alertDirection === entities.AlertDirection.UP) {
          if (data.previous.price < conf.price && conf.price <= data.current.price) {
            socket.broadcast.emit('priceChanged', data);
          }
        } else if(conf.alertDirection === entities.AlertDirection.DOWN) {
          if (data.current.price <= conf.price && conf.price < data.previous.price) {
            socket.broadcast.emit('priceChanged', data);
          }
        } else {
          console.error("Unknown alert direction");
        }
    }
    });
  });
};
