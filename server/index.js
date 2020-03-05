var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
const routes = require("./api");
const connect = require("./components/connect");

app.set("json spaces", 2);
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routes);

connect.init();

io.on("connection", function(socket) {
  // console.log('a user connected');
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });

  //connected user
  socket.on("user", function(msg) {
    console.log('here');
    console.log(msg + " user connected");
  });
});

http.listen(2020, function() {
  console.log("listening on *:2020");
});
