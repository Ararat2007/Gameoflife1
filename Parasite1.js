let LivingCreature = require('./LivingCreature')

module.exports =class Parasite1 extends LivingCreature {
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
       var emptyCells = this.chooseCell(0)
       var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
       if (newCell && this.energy >= 0) {
        this.energy--
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
    // var emptyCells = this.chooseCell(0);
    // var newCell = random(emptyCells);
    let emptyCells = this.chooseCell(0)
    let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

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