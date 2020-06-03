var ParkingLotStatus = require('../constants/ParkingLotStatus');
var Config = require('../constants/Config');

class ParkingSlot {
    constructor(index = 0, status = ParkingLotStatus.Available, carNumber = null) {
        this.index = index;
        this.status = status;
        this.carNumber = carNumber;
    }

    /**
     * Car parking function
     */
    carParking(carNumber = ''){
        this.status = ParkingLotStatus.Unavailable;
        this.carNumber = carNumber;
    }

    /**
     * Car leaving function
     * Return total charge fee
     */
    carLeaving(hour){
        this.status = ParkingLotStatus.Available;
        this.carNumber = null;
        return hour <= 2 ? Config.FeeFirstTwoHours : (10 + (hour - 2) * Config.ExtraFeePerHour)
    }
}

module.exports = ParkingSlot;