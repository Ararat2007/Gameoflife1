class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}













class Grass extends LivingCreature {

 
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        console.log(emptyCells);

        if (newCell && this.multiply >= 5) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}



class GrassEater extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
    }
   getNewCoordinates() {
       this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
   }
   mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    console.log(emptyCells);
    if (newCell && this.multiply >= 15) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 2;

        var newGrass = new GrassEater(newX, newY);
        grassEaterArr.push(newGrass);
        this.multiply = 0;
    }
}
move() {
    this.energy--
    var emptyCells = this.chooseCell(0)
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    if (newCell && this.energy >= 0) {
        console.log(newCell)
        var newX = newCell[0]
        var newY = newCell[1]
        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
    }
    else {
        if (this.energy < 0) {
            this.die()
        }
    }
}
eat() {
    var emptyCells = this.chooseCell(1)
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    if (newCell) {
        this.energy++
        var newX = newCell[0]
        var newY = newCell[1]

        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
        for (var i in grassArr) {
            if (newX == grassArr[i].x && newY == grassArr[i].y) {
                grassArr.splice(i, 1)
                break
            }
        }
    }
    else {
        this.move()
    }
}

die() {
    matrix[this.y][this.x] = 0;
    for (var i in grassEaterArr) {
        if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
            grassEaterArr.splice(i, 1);
            break;
        }
    }
}
}






















// class Grass {
//     constructor(x, y, index) {
//         this.x = x;
//         this.y = y;
//         this.index = index;
//         this.multiply = 0;


//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];

//     }
//     chooseCell(character) {
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }

//     mul() {
//         this.multiply++;
//         var emptyCells = this.chooseCell(0);
//         var newCell = random(emptyCells);

//         console.log(emptyCells);

//         if (newCell && this.multiply >= 5) {
//             var newX = newCell[0];
//             var newY = newCell[1];
//             matrix[newY][newX] = 1;

//             var newGrass = new Grass(newX, newY);
//             grassArr.push(newGrass);
//             this.multiply = 0;
//         }
//     }

// }


// class GrassEater {
//     constructor(x, y, index) {
//         this.x = x;
//         this.y = y;
//         this.index = index;
//         this.energy = 8;
//         this.multiply = 0
//         this.directions = [];
//     }
//     getNewCoordinates() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }

//     chooseCell(character) {
//         this.getNewCoordinates()
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }
//     mul() {
//         this.multiply++;
//         var emptyCells = this.chooseCell(0);
//         var newCell = random(emptyCells);

//         console.log(emptyCells);
//         if (newCell && this.multiply >= 15) {
//             var newX = newCell[0];
//             var newY = newCell[1];
//             matrix[newY][newX] = 2;

//             var newGrass = new GrassEater(newX, newY);
//             grassEaterArr.push(newGrass);
//             this.multiply = 0;
//         }
//     }
//     move() {
//         this.energy--
//         var emptyCells = this.chooseCell(0)
//         var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

//         if (newCell && this.energy >= 0) {
//             console.log(newCell)
//             var newX = newCell[0]
//             var newY = newCell[1]
//             matrix[newY][newX] = matrix[this.y][this.x]
//             matrix[this.y][this.x] = 0
//             this.x = newX
//             this.y = newY
//         }
//         else {
//             if (this.energy < 0) {
//                 this.die()
//             }
//         }
//     }
//     eat() {
//         var emptyCells = this.chooseCell(1)
//         var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

//         if (newCell) {
//             this.energy++
//             var newX = newCell[0]
//             var newY = newCell[1]

//             matrix[newY][newX] = matrix[this.y][this.x]
//             matrix[this.y][this.x] = 0
//             this.x = newX
//             this.y = newY
//             for (var i in grassArr) {
//                 if (newX == grassArr[i].x && newY == grassArr[i].y) {
//                     grassArr.splice(i, 1)
//                     break
//                 }
//             }
//         }
//         else {
//             this.move()
//         }
//     }

//     die() {
//         matrix[this.y][this.x] = 0;
//         for (var i in grassEaterArr) {
//             if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
//                 grassEaterArr.splice(i, 1);
//                 break;
//             }
//         }
//     }
// }





class Predator extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
    }
   getNewCoordinates() {
       this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
   }
   mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    console.log(emptyCells);
    if (newCell && this.multiply >= 15) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 3;

        var newGrass = new Predator(newX, newY);
        GrassEaterEaterArr.push(newGrass);
        this.multiply = 0;
    }
}
move() {
    this.energy--
    var emptyCells = this.chooseCell(0)
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    if (newCell && this.energy >= 0) {
        console.log(newCell)
        var newX = newCell[0]
        var newY = newCell[1]
        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
    }
    else {
        this.die();
    }
}
eat() {
    var emptyCells = this.chooseCell(2)
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    if (newCell) {
        this.energy++
        var newX = newCell[0]
        var newY = newCell[1]

        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
        for (var i in grassEaterArr) {
            if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1)
                break;
            }
        }
    }
    else {
        this.move()
    }
}

die() {
    matrix[this.y][this.x] = 0;
    for (var i in GrassEaterEaterArr) {
        if (this.x == GrassEaterEaterArr[i].x && this.y == GrassEaterEaterArr[i].y) {
            GrassEaterEaterArr.splice(i, 1);
            break;
        }
    }
}
}

// class Predator {
//     constructor(x, y, index) {
//         this.x = x;
//         this.y = y;
//         this.multiply = 0;
//         this.index = index;
//         this.directions = [];
//     }
//     getNewCoordinates() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }

//     chooseCell(character) {
//         this.getNewCoordinates()
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }
//     mul() {
//         this.multiply++;
//         var emptyCells = this.chooseCell(0);
//         var newCell = random(emptyCells);

//         console.log(emptyCells);
//         if (newCell && this.multiply >= 15) {
//             var newX = newCell[0];
//             var newY = newCell[1];
//             matrix[newY][newX] = 3;

//             var newGrass = new Predator(newX, newY);
//             GrassEaterEaterArr.push(newGrass);
//             this.multiply = 0;
//         }
//     }
//     move() {
//         this.energy--
//         var emptyCells = this.chooseCell(0)
//         var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

//         if (newCell && this.energy >= 0) {
//             console.log(newCell)
//             var newX = newCell[0]
//             var newY = newCell[1]
//             matrix[newY][newX] = matrix[this.y][this.x]
//             matrix[this.y][this.x] = 0
//             this.x = newX
//             this.y = newY
//         }
//         else {
//             this.die();
//         }
//     }
//     eat() {
//         var emptyCells = this.chooseCell(2)
//         var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

//         if (newCell) {
//             this.energy++
//             var newX = newCell[0]
//             var newY = newCell[1]

//             matrix[newY][newX] = matrix[this.y][this.x]
//             matrix[this.y][this.x] = 0
//             this.x = newX
//             this.y = newY
//             for (var i in grassEaterArr) {
//                 if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
//                     grassEaterArr.splice(i, 1)
//                     break;
//                 }
//             }
//         }
//         else {
//             this.move()
//         }
//     }

//     die() {
//         matrix[this.y][this.x] = 0;
//         for (var i in GrassEaterEaterArr) {
//             if (this.x == GrassEaterEaterArr[i].x && this.y == GrassEaterEaterArr[i].y) {
//                 GrassEaterEaterArr.splice(i, 1);
//                 break;
//             }
//         }
//     }
// }
class Parasite extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
    }
   getNewCoordinates() {
       this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
   }
   move() {
    this.energy--
    var emptyCells = this.chooseCell(0)
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    if (newCell && this.energy >= 0) {
        console.log(newCell)
        var newX = newCell[0]
        var newY = newCell[1]
        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
    }
    else {

        this.change();


    }
}

eat() {
    var emptyCells = this.chooseCell(2)
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    var emptyCells1 = this.chooseCell(3)
    var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
    if (newCell) {
        this.energy++
        var newX = newCell[0]
        var newY = newCell[1]

        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
        for (var i in grassEaterArr) {
            if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1)
                break;
            }
        }
    } else if (newCell1) {
        this.energy++
        var newX = newCell1[0]
        var newY = newCell1[1]

        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
        for (var i in GrassEaterEaterArr) {
            if (newX == GrassEaterEaterArr[i].x && newY == GrassEaterEaterArr[i].y) {
                GrassEaterEaterArr.splice(i, 1)
                break;
            }
        }
    }
    else {
        this.move()
    }
}

mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    console.log(emptyCells);
    if (newCell && this.multiply >= 30) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 4;

        var newGrass = new Parasite(newX, newY);
        parasiteArr.push(newGrass);
        this.multiply = 0;
    }
}


change() {

    matrix[this.y][this.x] = 5;


    for (let i in parasiteArr) {
        if (this.x == parasiteArr[i].x && this.y == parasiteArr[i].y) {
            parasiteArr.splice(i, 1);
            let eater = new Boom(this.x, this.y)
            BoomArr.push(eater)
        }

    }
}
}
// class Parasite {

//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.multiply = 0;
//         this.energy = 8;
//         this.directions = [];
//     }


//     getNewCoordinates() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }


//     chooseCell(character) {
//         this.getNewCoordinates()
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }

//     move() {
//         this.energy--
//         var emptyCells = this.chooseCell(0)
//         var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

//         if (newCell && this.energy >= 0) {
//             console.log(newCell)
//             var newX = newCell[0]
//             var newY = newCell[1]
//             matrix[newY][newX] = matrix[this.y][this.x]
//             matrix[this.y][this.x] = 0
//             this.x = newX
//             this.y = newY
//         }
//         else {

//             this.change();


//         }
//     }

//     eat() {
//         var emptyCells = this.chooseCell(2)
//         var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
//         var emptyCells1 = this.chooseCell(3)
//         var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
//         if (newCell) {
//             this.energy++
//             var newX = newCell[0]
//             var newY = newCell[1]

//             matrix[newY][newX] = matrix[this.y][this.x]
//             matrix[this.y][this.x] = 0
//             this.x = newX
//             this.y = newY
//             for (var i in grassEaterArr) {
//                 if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
//                     grassEaterArr.splice(i, 1)
//                     break;
//                 }
//             }
//         } else if (newCell1) {
//             this.energy++
//             var newX = newCell1[0]
//             var newY = newCell1[1]

//             matrix[newY][newX] = matrix[this.y][this.x]
//             matrix[this.y][this.x] = 0
//             this.x = newX
//             this.y = newY
//             for (var i in GrassEaterEaterArr) {
//                 if (newX == GrassEaterEaterArr[i].x && newY == GrassEaterEaterArr[i].y) {
//                     GrassEaterEaterArr.splice(i, 1)
//                     break;
//                 }
//             }
//         }
//         else {
//             this.move()
//         }
//     }

//     mul() {
//         this.multiply++;
//         var emptyCells = this.chooseCell(0);
//         var newCell = random(emptyCells);

//         console.log(emptyCells);
//         if (newCell && this.multiply >= 30) {
//             var newX = newCell[0];
//             var newY = newCell[1];
//             matrix[newY][newX] = 4;

//             var newGrass = new Parasite(newX, newY);
//             parasiteArr.push(newGrass);
//             this.multiply = 0;
//         }
//     }


//     change() {

//         matrix[this.y][this.x] = 5;


//         for (let i in parasiteArr) {
//             if (this.x == parasiteArr[i].x && this.y == parasiteArr[i].y) {
//                 parasiteArr.splice(i, 1);
//                 let eater = new Boom(this.x, this.y)
//                 BoomArr.push(eater)
//             }

//         }
//     }

// }




class Boom  extends LivingCreature {}

// class Boom {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }


//     chooseCell(character) {
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }




// }

class Parasite1 extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
    }
   getNewCoordinates() {
       this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
   }
   move() {
    this.energy--
    var emptyCells = this.chooseCell(0)
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    var a = Math.floor(Math.random() * 7);
    if (newCell && this.energy >= 0) {
        console.log(newCell)
        var newX = newCell[0]
        var newY = newCell[1]
        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
    }
    else {

        this.die();


    }
}

eat() {
    var emptyCells1 = this.chooseCell(5)
    var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]


    var emptyCells = this.chooseCell(4)
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]




    var a = Math.floor(Math.random() * 7);
    if (newCell) {
        this.energy++
        var newX = newCell[0]
        var newY = newCell[1]

        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
        for (var i in parasiteArr) {
            if (newX == parasiteArr[i].x && newY == parasiteArr[i].y) {
                parasiteArr.splice(i, 1)
                break;
            }
        }
    } else if (newCell1) {
        this.energy++
        var newX = newCell1[0]
        var newY = newCell1[1]

        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
        for (var i in BoomArr) {
            if (newX == BoomArr[i].x && newY == BoomArr[i].y) {
                BoomArr.splice(i, 1)
                break;
            }
        }
    }

    else {
        this.move()
    }
}

mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    console.log(emptyCells);
    if (newCell && this.multiply >= 30) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 6;

        var newGrass = new Parasite1(newX, newY);
        parasite1Arr.push(newGrass);
        this.multiply = 0;
    }
}


die() {
    matrix[this.y][this.x] = 0;
    for (var i in parasite1Arr) {
        if (this.x == parasite1Arr[i].x && this.y == parasite1Arr[i].y) {
            parasite1Arr.splice(i, 1);
            break;
        }
    }
}

}
// class Parasite1 {

//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.multiply = 0;
//         this.energy = 8;
//         this.directions = [];
//     }


//     getNewCoordinates() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }


//     chooseCell(character) {
//         this.getNewCoordinates()
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }

//     move() {
//         this.energy--
//         var emptyCells = this.chooseCell(0)
//         var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
//         var a = Math.floor(Math.random() * 7);
//         if (newCell && this.energy >= 0) {
//             console.log(newCell)
//             var newX = newCell[0]
//             var newY = newCell[1]
//             matrix[newY][newX] = matrix[this.y][this.x]
//             matrix[this.y][this.x] = 0
//             this.x = newX
//             this.y = newY
//         }
//         else {

//             this.die();


//         }
//     }

//     eat() {
//         var emptyCells1 = this.chooseCell(5)
//         var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]


//         var emptyCells = this.chooseCell(4)
//         var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]




//         var a = Math.floor(Math.random() * 7);
//         if (newCell) {
//             this.energy++
//             var newX = newCell[0]
//             var newY = newCell[1]

//             matrix[newY][newX] = matrix[this.y][this.x]
//             matrix[this.y][this.x] = 0
//             this.x = newX
//             this.y = newY
//             for (var i in parasiteArr) {
//                 if (newX == parasiteArr[i].x && newY == parasiteArr[i].y) {
//                     parasiteArr.splice(i, 1)
//                     break;
//                 }
//             }
//         } else if (newCell1) {
//             this.energy++
//             var newX = newCell1[0]
//             var newY = newCell1[1]

//             matrix[newY][newX] = matrix[this.y][this.x]
//             matrix[this.y][this.x] = 0
//             this.x = newX
//             this.y = newY
//             for (var i in BoomArr) {
//                 if (newX == BoomArr[i].x && newY == BoomArr[i].y) {
//                     BoomArr.splice(i, 1)
//                     break;
//                 }
//             }
//         }

//         else {
//             this.move()
//         }
//     }

//     mul() {
//         this.multiply++;
//         var emptyCells = this.chooseCell(0);
//         var newCell = random(emptyCells);

//         console.log(emptyCells);
//         if (newCell && this.multiply >= 30) {
//             var newX = newCell[0];
//             var newY = newCell[1];
//             matrix[newY][newX] = 6;

//             var newGrass = new Parasite1(newX, newY);
//             parasite1Arr.push(newGrass);
//             this.multiply = 0;
//         }
//     }


//     die() {
//         matrix[this.y][this.x] = 0;
//         for (var i in parasite1Arr) {
//             if (this.x == parasite1Arr[i].x && this.y == parasite1Arr[i].y) {
//                 parasite1Arr.splice(i, 1);
//                 break;
//             }
//         }
//     }

// }







