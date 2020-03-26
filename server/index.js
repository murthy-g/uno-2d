var app = require("express")();
var http = require("http").createServer(app);
var bodyParser = require("body-parser");
var cors = require("cors");
// const routes = require("./api");
var connect = require("./components/connect");
var sockets = require("./socketio");

// app.use("/api", routes);
app.set("json spaces", 2);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var server = http.listen(2020, function() {
  console.log("listening on *:2020");
});

connect.init();
sockets.init(server);
