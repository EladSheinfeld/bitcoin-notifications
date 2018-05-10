const PriceRepository = require('../repository').PriceRepository;

module.exports = function(req, res){
  PriceRepository.fetch(10, (err, prices) => {
    if(err) {
      console.error(err.message);
    } else {
      res.send(JSON.stringify(prices));
    }
  });
};
