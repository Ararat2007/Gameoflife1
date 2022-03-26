function generator(matLen, gr, grEat,grEatEat,par,boom,par1) {
    let matrix = [];
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
        } for (let i = 0; i < par; i++) {
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
    
    let side = 25;
    
    let matrix = generator(15, 10, 10,10,10,14,17);


// var matrix = [];
// var n = 11;
// for (let y = 0; y < 50; y++) {
//     matrix[y] = [];
//     for (let x = 0; x < 50; x++) {
//         matrix[y][x] = Math.floor(Math.random() * 7);
//     }
// }

// var side = 10;

var grassArr = [];
var grassEaterArr = [];
var GrassEaterEaterArr = [];
let parasiteArr = [];
let parasite1Arr = [];
var BoomArr = [];

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let eater = new GrassEater(x, y);
                grassEaterArr.push(eater);
            }
            else if (matrix[y][x] == 3) {
                let eater1 = new Predator(x, y);
                GrassEaterEaterArr.push(eater1);
            }else if (matrix[y][x] == 4) {
                let parasite = new Parasite(x, y)
                parasiteArr.push(parasite)
            }
            else if (matrix[y][x] == 5) {
                let eater2 = new Boom(x, y)
                BoomArr.push(eater2)
            }
            else if (matrix[y][x] == 6) {
                let eater3 = new Parasite1 (x, y)
                parasite1Arr.push(eater3)
            }
         }

    }

}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("blue");
            } else if (matrix[y][x] == 5) {
                fill("grey");
            }
            else if (matrix[y][x] == 6) {
                fill("pink");
            }

            rect(x * side, y * side, side, side);
        }
    }


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
        parasiteArr[i].mul()
        parasiteArr[i].eat()

    }
    for (let i in parasite1Arr) {
        parasite1Arr[i].mul()
        parasite1Arr[i].eat()
        

    }






}
