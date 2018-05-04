module.exports = function (socket) {
console.log("connected!");
  socket.on('priceUpdated', function (data) {
    console.log("received data! " + JSON.stringify(data)  );
    socket.broadcast.emit('priceChanged', data);
  });
};
