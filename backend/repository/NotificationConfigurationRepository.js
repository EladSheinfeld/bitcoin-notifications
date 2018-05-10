const AlertDirection = require('../entities/AlertDirection');
const NotificationConfiguration =  require('../entities/NotificationConfiguration');
const { MongoClient } = require('mongodb');


class NotificationConfigurationRepository {
  fetchConfiguration(callback) {
    MongoClient.connect('mongodb://mongodb:27017/', (err, client) => {
      if (err) {
        return callback(new Error('Error connecting to mongo', err), null);
      }
      const db = client.db('bitcoin');
      db.collection("notificationConfiguration").findOne({}, {"sort": [["creationTime", "desc"]]}, (err,fetchRes) => {
        if(err) {
          return callback(new Error(`error fetching notification configuration`, err), null);
        }

        client.close();

        if(!fetchRes) {
          return callback(null, null);
        }

        return callback(null, new NotificationConfiguration(fetchRes.price, new AlertDirection(fetchRes.alertDirection)));
      });
    });
	}

  addConfiguration(configuration, callback) {
    MongoClient.connect('mongodb://mongodb:27017/', (err, client) => {
      if (err) {
        return callback(new Error('Error connecting to mongo', err), null);
      }
      const db = client.db('bitcoin');
      db.collection("notificationConfiguration").insertOne({
        price: configuration.price,
        alertDirection: configuration.alertDirection.toString(),
        creationTime: new Date().toUTCString()
      }, (err, result) => {
        if (err) {
          return callback(new Error('Error inserting configuration', err), null);
        }

        client.close();
        return callback(null, true);
      });
    });
  }
}

module.exports = NotificationConfigurationRepository;
