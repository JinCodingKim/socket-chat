const express = require("express");
const socket = require("socket.io");
const app = express();
const port = 8080;

server = app.listen(port || 8080, () => {
  console.log(`Listening on: ${port}`);
});

io = socket(server);

//establishes the connection of sockets
io.on("connection", socket => {
  console.log(socket.id);

  //this will receive "SEND_MESSAGE" from front-end and push back out "RECEIVE_MESSAGE" to the front-end
  socket.on("SEND_MESSAGE", function(data) {
    io.emit("RECEIVE_MESSAGE", data);
  });
});
