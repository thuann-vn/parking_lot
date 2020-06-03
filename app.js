const fs = require('fs');
const CarParking = require('./model/CarParking');
const ActionNames = require('./constants/ActionNames');
const filePath = `${process.cwd()}/${process.argv[2]}`;
var carPark = null;
fs.readFile(filePath, 'utf8', function read(err, action) {
    if (err) {
        throw err;
    }
    const actionList = action.split('\n');

    actionList.forEach(action => {
        const actionArr = action.split(' ');
        const actionName = actionArr[0].trim();
        switch(actionName){
            case ActionNames.CreateParkingLot:
                carPark = new CarParking(actionArr[1].trim());
                break;
            case ActionNames.Park:
                carPark.carPark(actionArr[1].trim());
                break;
            case ActionNames.UnPark:
                carPark.carLeave(actionArr[1].trim(), parseInt(actionArr[2]));
                break;
            case ActionNames.Status:
                carPark.getStatus();
                break;
        }
    });

    process.stdout.write(carPark.packingLogs.join('\n'));
});


//Keep app run
'use strict';

const express = require('express');

// Constants
const PORT = 4000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);