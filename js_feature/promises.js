// Define promise with Array function, Lambda in Java world!
var action = () => {
    return new Promise((resolve, reject) => {
        reject('hello world!');
    });
};


// Call the promise
action()
    .then(word => console.log(word))
    .catch(err => console.log(err));

// Try reading file from file system module
var fs = require('fs');
var readFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./package.json', (err, file) => {
            return err ? reject(err) : resolve(file);
        });
    });
};

console.log('after read');

readFile()
    .then(file => console.log(file.toString()));
