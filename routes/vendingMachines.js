const express = require('express');
const router = express.Router();
const {getVendingMachine,getVendingMachines,
    createVendingMachines,updateVendingMachines,
    deleteVendingMachine,
    getVendingMachinesByCoordinates} = require('../controllers/vendingMachine');

router.route('/').get(getVendingMachines).post(createVendingMachines);
router.route('/:id').get(getVendingMachine).put(updateVendingMachines).delete(deleteVendingMachine);
router.route('/coordinates/:lat/:lon/:distanceInMiles').get(getVendingMachinesByCoordinates)

module.exports = router;