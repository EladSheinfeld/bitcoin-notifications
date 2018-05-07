
const Agenda = require('agenda');
const { MongoClient } = require('mongodb');
const request = require('request');
const socket =  require('socket.io-client')('http://bitcoin-backend:7000/notifications');

async function run() {
  const db = await MongoClient.connect('mongodb://mongodb:27017/bitcoin');
  const agenda = new Agenda().processEvery('one minute').mongo(db, 'jobs');

  agenda.define('pull_price', (job, done) => {
    request('http://api.coindesk.com/v1/bpi/currentprice/USD.json', function(error, response, body){
      if (response.statusCode === 200) {
        var jsonBody = JSON.parse(body);

        var bitcoinPrice = {
          time : jsonBody.time.updatedISO,
          price : jsonBody.bpi.USD.rate
        };

        db.collection("prices").findOne({}, {"sort": [["time", "desc"]]}, (err,fetchRes) => {
          if (err) {
            throw err;
          }

          if(!fetchRes) {
            db.collection("prices").insertOne(bitcoinPrice);
          } else if(new Date(fetchRes.time).getTime() !== new Date(bitcoinPrice.time).getTime())  {
            db.collection("prices").insertOne(bitcoinPrice, function(err, res) {
              if (err) {
                throw err;
              }
              var eventData = {
                previous: fetchRes,
                current: bitcoinPrice
              };

              socket.emit('priceUpdated', eventData);

            });
          }
        });
      } else {
        console.error(error);
      }
    });
  });

  await new Promise(resolve => agenda.once('ready', resolve));

  agenda.schedule(new Date(Date.now() + 1000), 'pull_price');
  agenda.start();
}

run().catch(error => {
  console.error(error);
  process.exit(-1);
});
