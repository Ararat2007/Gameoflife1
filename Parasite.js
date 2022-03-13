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