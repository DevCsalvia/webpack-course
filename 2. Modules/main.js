const {add: addNumbers, subtract} = require('./functions');

function add() {
    console.log('Hello add');
}

const output = addNumbers(1, 2);

console.log(output);