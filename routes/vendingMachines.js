const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
//const (fieldValidator,v) = require("express-validator")
const {getVendingMachine,getVendingMachines,
    createVendingMachines,updateVendingMachines,
    deleteVendingMachine,
    getVendingMachinesByCoordinates} = require('../controllers/vendingMachine');

router.route('/').get(getVendingMachines).post(createVendingMachines);
router.route('/:id').get(getVendingMachine).put(updateVendingMachines).delete(deleteVendingMachine);
router.route('/coordinates/:lat/:lon/:distanceInMiles').get(getVendingMachinesByCoordinates)

module.exports = router;