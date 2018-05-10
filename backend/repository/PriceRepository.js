const { MongoClient } = require('mongodb');

class PriceRepository {

    fetch(limit, callback){
      MongoClient.connect('mongodb://mongodb:27017/', (err, client) => {
        if (err) {
          return callback(new Error('Error connecting to mongo', err), null);
        }
        const db = client.db('bitcoin');
        db.collection("prices").find({}, {"sort": [["time", "desc"]]}).toArray((err,fetchRes) => {
          if(err) {
            return callback(new Error(`error fetching prices`, err), null);
          }

          client.close();

          if(!fetchRes) {
            return callback(null, null);
          }

          return callback(null, fetchRes);
        });
      });
    }
}

module.exports = PriceRepository;
