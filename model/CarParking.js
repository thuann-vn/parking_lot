var ParkingSlot = require('./ParkingSlot');
var ParkingLotStatus = require('../constants/ParkingLotStatus');

class CarParking {
    /**
     * @param {int} totalSlot   Init car parking with slots 
     */
    constructor(totalSlot = 0){
        this.parkingSlots = [];
        this.packingLogs = [];
        for (let i = 0; i < totalSlot; i++) {
            this.parkingSlots.push(new ParkingSlot(i + 1, ParkingLotStatus.Available, null));
        }
        this.packingLogs.push(`Created parking lot with ${totalSlot} slots`);
    }

    /**
     * @param {string} carNumber   Car park register with car number
     * @return {boolean} result
     */
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

    /**
     * @param {string} carNumber   Car number to be leaving
     * @param {string} hour   Total hour parked
     * @return {boolean|float} Return false if carNumber invalid, return total fee if car number is valid
     */
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
    
    /**
     * @return {string} Return slot no and registration no list
     */
    getStatus(){ 
        let parkedSlots = this.parkingSlots
        .filter((slot) => slot.status != ParkingLotStatus.Available)
        .map((slot)=>{
            return `${slot.index}   ${slot.carNumber}`
        });

        parkedSlots.splice(0,0, 'Slot No.   Registration No');
        const result = parkedSlots.join('\n');
        this.packingLogs.push(result);
        return result;
    };
}

module.exports = CarParking;