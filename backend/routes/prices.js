const notificationRepo = require('../repository').NotificationConfigurationRepository

module.exports = function(req, res){
  notificationRepo.fetch(10, (err, prices) => {
    if(err) {
      console.error(err.message);
    } else {
      res.send(JSON.stringify(prices));
    }
  });
};
