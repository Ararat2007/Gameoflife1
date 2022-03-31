var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("index.html");
});
server.listen(3000, function name() {
  console.log("connected");
});

matrix = [];

function generator(matLen, gr, grEat, grEatEat, par, boom, par1) {
  for (let i = 0; i < matLen; i++) {
    matrix[i] = [];
    for (let j = 0; j < matLen; j++) {
      matrix[i][j] = 0;
    }
  }
  for (let i = 0; i < gr; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 1;
    }
  }
  for (let i = 0; i < grEat; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 2;
    }
  }
  for (let i = 0; i < grEatEat; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 3;
    }
  }
  for (let i = 0; i < par; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 4;
    }
  }
  for (let i = 0; i < boom; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 5;
    }
  }
  for (let i = 0; i < par1; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 6;
    }
  }
  return matrix;
}
io.sockets.emit("send matrix", generator(15, 10, 10, 10, 10, 14, 17));

grassArr = [];
grassEaterArr = [];
GrassEaterEaterArr = [];
parasiteArr = [];
parasite1Arr = [];
BoomArr = [];

weath = "winter";

Grass = require("./grass");
GrassEater = require("./GrassEater");
Boom = require("./Boom");
Parasite1 = require("./Parasite1");
Parasite = require("./Parasite");
Predator = require("./Predator");

function createobject(matrix) {
  for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
      if (matrix[y][x] == 1) {
        var gr = new Grass(x, y);
        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        let eater = new GrassEater(x, y);
        grassEaterArr.push(eater);
      } else if (matrix[y][x] == 3) {
        let eater1 = new Predator(x, y);
        GrassEaterEaterArr.push(eater1);
      } else if (matrix[y][x] == 4) {
        let parasite = new Parasite(x, y);
        parasiteArr.push(parasite);
      } else if (matrix[y][x] == 5) {
        let eater2 = new Boom(x, y);
        BoomArr.push(eater2);
      } else if (matrix[y][x] == 6) {
        let eater3 = new Parasite1(x, y);
        parasite1Arr.push(eater3);
      }
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function game() {
  for (var i in grassArr) {
    grassArr[i].mul();
  }
  for (var i1 in grassEaterArr) {
    grassEaterArr[i1].mul();
    grassEaterArr[i1].eat();
  }
  for (var i2 in GrassEaterEaterArr) {
    GrassEaterEaterArr[i2].mul();
    GrassEaterEaterArr[i2].eat();
  }

  for (let i in parasiteArr) {
    parasiteArr[i].mul();
    parasiteArr[i].eat();
  }
  for (let i in parasite1Arr) {
    parasite1Arr[i].mul();
    parasite1Arr[i].eat();
  }
  io.sockets.emit("send matrix", matrix);
}
setInterval(game, 1000);

function kill() {
  grassArr = [];
  GrassEaterEaterArr = []
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = 0;
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
  for (var i = 0; i < 10; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
      grassEaterArr.push( new GrassEater(x, y, 2));
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function addPredator() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 3;
      GrassEaterEaterArr.push(new Predator(x, y, 3));
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function weather() {
  if (weath == "winter") {
      weath = "spring"
  }
  else if (weath == "spring") {
      weath = "summer"
  }
  else if (weath == "summer") {
      weath = "autumn"
  }
  else if (weath == "autumn") {
      weath = "winter"
  }
  io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


io.on("connection", function (socket) {
  createobject(matrix);
  socket.on("kill", kill);
  socket.on("add grass Eater", addGrassEater);
  socket.on("add Predator", addPredator);
});
