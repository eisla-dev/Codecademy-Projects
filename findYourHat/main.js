const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldArray) {
        this._fieldArray = fieldArray;
        this._playerVerticalPosition = 0;
        this._playerHorizontalPosition = 0;
    }
    winLoseCheck() {
        if (this._fieldArray[this._playerVerticalPosition][this._playerHorizontalPosition] == hat) {
            console.log('winner')
            return true
        } else if (this._fieldArray[this._playerVerticalPosition][this._playerHorizontalPosition] == hole) {
            console.log('lose by hole')
            return true
        } else if (this._playerVerticalPosition > this._fieldArray.length){
            console.log('out of bounds')
            return true
        } else {
            return false
        }
    }
    print() {
        for (let lines of this._fieldArray){
            console.log(lines.join(''))
        }
    }
    promptFunction() {
        const input = prompt('Which way? ');
        return input
    }
    drawPath(vPos, hPos){
        if (this._fieldArray[vPos][hPos] != "^" && this._fieldArray[vPos][hPos] != hole)
            this._fieldArray[vPos][hPos] = "*"
    }
    movePlayer(userInput) {
        let direction=userInput.toUpperCase();
        if (direction != 'U' && direction != 'D' && direction != 'L' && direction != 'R'){
            console.log('Not a proper input')
        } 
        if (direction == 'U'){
            this._playerVerticalPosition -= 1;
            this.drawPath(this._playerVerticalPosition, this._playerHorizontalPosition);
        }
        if (direction == 'D'){
            this._playerVerticalPosition += 1;
            this.drawPath(this._playerVerticalPosition, this._playerHorizontalPosition);
        }
        if (direction == 'L'){
            this._playerHorizontalPosition -= 1;
            this.drawPath(this._playerVerticalPosition, this._playerHorizontalPosition);
        }
        if (direction == 'R'){
            this._playerHorizontalPosition += 1;
            this.drawPath(this._playerVerticalPosition, this._playerHorizontalPosition);
        }
    }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);
do {
    myField.print()
    let userInput = myField.promptFunction();
    myField.movePlayer(userInput);
    //console.log(`Vertical Position: ${myField._playerVerticalPosition} \nHorizontal Position: ${myField._playerHorizontalPosition}`)
} while (myField.winLoseCheck() == false)
//this is a test for the functions based on other fields
//const myField2 = new Field([
//  ['*', '░', 'O', '░', '░'],
//  ['░', 'O', '░', '░', '░'],
//  ['░', '░', '░', '^', '░'],
//]);
//
//myField2.print()
//myField2.hatPosition()
