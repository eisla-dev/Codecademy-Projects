// Write class below
class ShiftCipher {
  constructor(shiftNum) {
    this._shiftNum = shiftNum;
  }
  encrypt(stringInput) {
    let upperCaseString = stringInput.toUpperCase();
    let unicodeCharArray = [];
    let resArray = [];
    for (let char of upperCaseString){
      if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90){
        unicodeCharArray.push(char.charCodeAt() + this._shiftNum)
      } else {
        unicodeCharArray.push(char.charCodeAt() + this._shiftNum)
      }
    }
    console.log(unicodeCharArray);
    for (let i = 0; i<unicodeCharArray.length; i++){
        resArray.push(String.fromCharCode(unicodeCharArray[i]))
    }
    console.log(resArray)
    
  }
  decrypt(stringInput) {
  }
}
const cipher = new ShiftCipher(2);
cipher.encrypt('I love to code!'); // returns 'K NQXG VQ EQFG!'
cipher.decrypt('K <3 OA RWRRA'); // returns 'i <3 my puppy'

