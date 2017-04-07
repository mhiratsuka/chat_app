// This is a server side JS.

//import modules and build a server.
var fs = require("fs");
var server = require("http").createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/html"});
     var output = fs.readFileSync("./index.html", "utf-8");
     res.end(output);
}).listen(8080); //port is 8080.
var io = require("socket.io").listen(server);

// manage users
var userHash = {};

// define events
io.sockets.on("connection", function (socket) {

  // start chatting.This event tells users who enter the chat room.
    socket.on("connected", function (name) {
    var msg = name + " enter the chat room.";
    userHash[socket.id] = name;
    io.sockets.emit("publish", {value: msg});
  });

  // send a message
  socket.on("publish", function (data) {
    io.sockets.emit("publish", {value:data.value});
  });

});



