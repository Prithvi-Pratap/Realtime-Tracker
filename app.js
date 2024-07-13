const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const { disconnect } = require("process");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

// Set view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Socket.IO connection handler
io.on("connection", function (socket) {

  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
    console.log("A user connected");
});

socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
    console.log("A user disconnected");
  });

});

// Route to render index.ejs
app.get("/", function (req, res) {
  res.render("index");
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
