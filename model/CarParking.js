var ParkingSlot = require('./ParkingSlot');
var ParkingLotStatus = require('../constants/ParkingLotStatus');

class CarParking {
    constructor(totalSlot = 0){
        this.parkingSlots = [];
        this.packingLogs = [];

        this.packingLogs.push(`Created parking lot with ${totalSlot} slots`);
        for (let i = 0; i < totalSlot; i++) {
            this.parkingSlots.push(new ParkingSlot(i + 1, ParkingLotStatus.Available, null));
        }
    }

    carPark(carNumber = ''){
        //Check if parking lot is available
        let firstAvailableIndex = this.parkingSlots.findIndex((slot) => slot.status == ParkingLotStatus.Available);
        if (firstAvailableIndex >= 0) {
            let slot = this.parkingSlots[firstAvailableIndex];
            slot.carParking(carNumber);
            this.packingLogs.push(`Allocated slot number: ${slot.index}`);
            return true;
        }

        //Return false if have no available slot
        this.packingLogs.push(`Sorry, parking lot is full`);
        return false;
    }

    carLeave(carNumber = '', hour = 0){
        let slot = this.parkingSlots.find((slot) => slot.carNumber == carNumber);
        if(slot){
            const slotIndex = slot.index;
            const totalCharge = slot.carLeaving(hour);
            this.packingLogs.push(`Registration number ${carNumber} with Slot Number ${slotIndex} is free with Charge ${totalCharge}`);
            return totalCharge;
        }
        this.packingLogs.push(`Registration number ${carNumber} not found`);
        return false;
    };
    getStatus(){ 
        let parkedSlots = this.parkingSlots
        .filter((slot) => slot.status != ParkingLotStatus.Available)
        .map((slot)=>{
            return `${slot.index}   ${slot.carNumber}`
        });

        parkedSlots.splice(0,0, 'Slot No.   Registration No');
        this.packingLogs.push(parkedSlots.join('\n'));
    };
}

module.exports = CarParking;