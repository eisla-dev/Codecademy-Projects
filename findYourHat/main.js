const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldArrary) {
        this._fieldArray = fieldArrary;   
    }
    hatPosition(){
        for (let i = 0; i<this._fieldArray.length; i++){
            if (this._fieldArray[i].indexOf(hat) != -1){
                console.log(`${i} ${this._fieldArray[i].indexOf(hat)}`)
            }
        }
    }
    print() {
        for (let lines of this._fieldArray){
            console.log(lines.join(''))
        }
    }
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.print()
myField.hatPosition()

readline.question('Which way?', input => {
    console.log(`inputted ${input}`);
    readline.close();
});


