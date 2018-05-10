const express = require('express');
const path = require('path');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 4000;
var publicPath = path.resolve(__dirname, 'public');

// We point to our static assets
app.use(express.static(publicPath));
app.get('/', (req, res) => {
  res.send("Client up");
})

// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});
