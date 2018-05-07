const notificationRepo = require('../repository/NotificationConfigurationRepository')

module.exports = function (socket) {
  socket.on('changeConfiguration', function (conf) {
    notificationRepo.addConfiguration((err, conf) => {
      if(err) {
        console.error(err.message);
      }
    });
  });
};
