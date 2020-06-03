// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// module.exports = app;
const fs = require('fs');

const myArgs = process.argv.slice(2);
const filePath = `${process.cwd()}/${myArgs[0]}`
const contents = fs.readFileSync(filePath, 'utf8');

fs.readFile(filePath, function read(err, data) {
    if (err) {
        throw err;
    }
    const content = data;

    // Invoke the next step here however you like
    console.log(content);   // Put all of the code here (not the best solution)
    processFile(content);   // Or put the next step in a function and invoke it
});
