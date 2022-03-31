var socket = io();
side = 15;
function setup() {
  createCanvas(15 * side, 15 * side);
  background("#acacac");
}
let weath = "winter";
socket.on("weather", function (data) {
  weath = data;
})
function nkarel(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        if (weath == "summer") {
          fill("green");
        } else if (weath == "autumn") {
          fill("#333300");
        } else if (weath == "winter") {
          fill("white");
        } else if (weath == "spring") {
          fill("#4dffa6");
        }
      } else if (matrix[y][x] == 0) {

        fill("#acacac");

      } else if (matrix[y][x] == 2) {
        if (weath == "summer") {
          fill("yellow");
        } else if (weath == "autumn") {
          fill("FFA400");
        } else if (weath == "winter") {
          fill("#CA6924");
        } else if (weath == "spring") {
          fill("#F9690E");
        }


      } else if (matrix[y][x] == 3) {

        if (weath == "summer") {
          fill("red");
        } else if (weath == "autumn") {
          fill("#DC3023");
        } else if (weath == "winter") {
          fill("#8F1D21");
        } else if (weath == "spring") {
          fill("#D24D57");
        }

      } else if (matrix[y][x] == 4) {
        if (weath == "summer") {
          fill("blue");
        } else if (weath == "autumn") {
          fill("##4B77BE");
        } else if (weath == "winter") {
          fill("#044F67");
        } else if (weath == "spring") {
          fill("#22A7F0");
        }


      } else if (matrix[y][x] == 5) {

        if (weath == "summer") {
          fill("grey");
        } else if (weath == "autumn") {
          fill("#6C7A89");
        } else if (weath == "winter") {
          fill("#757D75");
        } else if (weath == "spring") {
          fill("#95A5A6");
        }

      } else if (matrix[y][x] == 6) {

        if (weath == "summer") {
          fill("pink");
        } else if (weath == "autumn") {
          fill("#C93756");
        } else if (weath == "winter") {
          fill("#FCC9B9");
        } else if (weath == "spring") {
          fill("#F08F907");
        }

      }

      rect(x * side, y * side, side, side);
    }
  }
}
setInterval(function () {
  socket.on("send matrix", nkarel);
}, 1000);


function kill() {
  socket.emit("kill")
}
function addGrassEater() {
  socket.emit("add grass Eater")
}
function addPredator() {
  socket.emit("add Predator")
}
