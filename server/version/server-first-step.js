var express = require('express');
var fs = require('fs');
var app = express();

var counter = 1;

var obj = {
    greeting: 'hello world',
    from: 'local-server',
    number: 1
};

app.get('/', (req, res) => {
    fs.readFile('index.html', (err, buffer) => {
        var html = buffer.toString();
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    });
});

app.get('/data', (req, res) => {
    let jsonData = {
        counter: counter++,
        message: 'hey'
    };
    res.json(jsonData);
});

app.get('/add/:num1/:num2', (req, res) => {
    let result = parseInt(req.params.num1, 10) + parseInt(req.params.num2, 10);
    res.json(result);
});

app.listen(8080, () => {
    console.log('Server is running on port 8080...');
});
