const assert = require('assert');
const CarParking = require('../model/CarParking');
const ParkingLotStatus = require('../constants/ParkingLotStatus');

//Car parking unit test
describe('Car Parking Service', function () {
    describe('Init Car Parking', function () {
        const carParking = new CarParking(5);
        it('Parking must be have 5 slot', ()=>{
            assert.equal(carParking.parkingSlots.length, 5);
        });

        it('Check if all slot is valid', ()=>{
            carParking.parkingSlots.map((slot, index) => {
                assert.equal(slot.index, index + 1);
                assert.equal(slot.status, ParkingLotStatus.Available);
            });
        });
    });

    describe('Park and un-park a car', function(){
        describe ('Car must be existed in list', () => {
            const carParking = new CarParking(5);
            carParking.carPark('KA-01-HH-1234');
            carParking.carPark('KB-01-HH-1234');
            carParking.carPark('KC-01-HH-1234');
    
            //Check available slot
            it('Must have 3 car in the park', ()=>{
                const count = carParking.parkingSlots.filter((slot)=>slot.status == ParkingLotStatus.Unavailable).length;
                assert.equal(count, 3);
            });          

            //Leave wrong car
            it('Return failed if try to leave a invalid car', ()=>{
                const wrongResult = carParking.carLeave('KK-01-HH-1234', 2);
                assert.equal(wrongResult, false);
            });   

            //Leave right car 1
            it('Check if leaving valid car  < 2 hour', ()=>{
                const rightResult1 = carParking.carLeave('KB-01-HH-1234', 2);
                assert.equal(rightResult1, 10);
            });   

            //Leave right car 2
            it('Check if leaving valid car > 2 hour', ()=>{
                const rightResult2 = carParking.carLeave('KC-01-HH-1234', 6);
                assert.equal(rightResult2, 50);
            });   

            //Must be one filled slot
            it('Check remain car in park', ()=>{
                const count = carParking.parkingSlots.filter((slot)=>slot.status == ParkingLotStatus.Unavailable).length;
                assert.equal(count, 1);
            });   

            //Check output log
            it('Check output log', ()=>{
                var outputLog = carParking.packingLogs.join('\n');
                var compareLog = 'Created parking lot with 5 slots\nAllocated slot number: 1\nAllocated slot number: 2\nAllocated slot number: 3\nRegistration number KK-01-HH-1234 not found\nRegistration number KB-01-HH-1234 with Slot Number 2 is free with Charge 10\nRegistration number KC-01-HH-1234 with Slot Number 3 is free with Charge 50'
                assert.equal(outputLog, compareLog);
            });   
        });
    });
});