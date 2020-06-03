import ParkingSlot from '../model/ParkingSlot';
import ParkingLotStatus from '../constants/ParkingLotStatus';
import * as fs from 'fs';

const ParkingService =  {
    initParkingLot: (totalSlot = 0, initCall) => {
        let result = [];
        for (let i = 0; i < totalSlot; i++) {
            result.push(new ParkingSlot(i, ParkingLotStatus.Available, null));
        }
        return result;
    },
    carPark: (carNumber = '', parkingLot = []) => {
        //Check if parking lot is available
        let firstAvailableIndex = parkingLot.findIndex((slot) => slot.status == ParkingLotStatus.Available);
        if (firstAvailableIndex >= 0) {
            parkingLot[firstAvailableIndex].carParking(carNumber);
            return true;
        }

        //Return false if have no available slot
        return false;
    },
    carLeave: (carNumber = '', hour = 0, parkingLot = []) => {
        let slot = parkingLot.find((slot) => slot.carNumber == carNumber);
        return slot.carLeaving(hour);
    },
    getStatus: (parkingLot) => { 
    },
}

module.exports = ParkingService;