const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
    constructor(fieldArray) {
        this._fieldArray = fieldArray;
        this._playerVerticalPosition = 0;
        this._playerHorizontalPosition = 0;
    }
    winLoseCheck() {
        if (
            this._playerVerticalPosition == this._fieldArray.length ||
            this._playerVerticalPosition < 0 ||
            this._playerHorizontalPosition < 0 ||
            this._playerHorizontalPosition > this._fieldArray[0][0].length + 1
        ) {
            return "out of bounds";
        } else if (
            this._fieldArray[this._playerVerticalPosition][
                this._playerHorizontalPosition
            ] == hat
        ) {
            return "winner";
        } else if (
            this._fieldArray[this._playerVerticalPosition][
                this._playerHorizontalPosition
            ] == hole
        ) {
            return "lose by hole";
        } else {
            return "";
        }
    }
    print() {
        for (let lines of this._fieldArray) {
            console.log(lines.join(""));
        }
    }
    promptFunction() {
        const input = prompt("Which way? ");
        return input;
    }
    drawPath(vPos, hPos) {
        if (this.winLoseCheck() == "") this._fieldArray[vPos][hPos] = "*";
    }
    movePlayer(userInput) {
        let direction = userInput.toUpperCase();
        if (
            direction != "U" &&
            direction != "D" &&
            direction != "L" &&
            direction != "R"
        ) {
            console.log("Not a proper input");
        }
        if (direction == "U") {
            this._playerVerticalPosition -= 1;
            this.drawPath(
                this._playerVerticalPosition,
                this._playerHorizontalPosition
            );
        }
        if (direction == "D") {
            this._playerVerticalPosition += 1;
            this.drawPath(
                this._playerVerticalPosition,
                this._playerHorizontalPosition
            );
        }
        if (direction == "L") {
            this._playerHorizontalPosition -= 1;
            this.drawPath(
                this._playerVerticalPosition,
                this._playerHorizontalPosition
            );
        }
        if (direction == "R") {
            this._playerHorizontalPosition += 1;
            this.drawPath(
                this._playerVerticalPosition,
                this._playerHorizontalPosition
            );
        }
    }
    static generateField(height, width) {
        let res = [];
        let horizontal = [];
        //create the height of the field
        for (let n = 0; n < width; n++) {
            horizontal.push("x");
        }
        for (let i = 0; i < height; i++) {
            res.push(horizontal);
        }
        return res;
        //append random placement of characters
    }
}

console.log("This is the static method!");
console.log(Field.generateField(3, 3));

const myField = new Field([
    ["*", "░", "░"],
    ["░", "O", "░"],
    ["░", "^", "░"],
]);

do {
    myField.print();
    let userInput = myField.promptFunction();
    myField.movePlayer(userInput);
    console.log("");
    console.log(myField.winLoseCheck());
} while (myField.winLoseCheck() == "");

//this is a test for the functions based on other fields
//const myField2 = new Field([
//  ['*', '░', 'O', '░', '░'],
//  ['░', 'O', '░', '░', '░'],
//  ['░', '░', '░', '^', '░'],
//]);
//
//myField2.print()
//myField2.hatPosition()
