const app = require('../config/firebase')
const { getFirestore, collection, getDocs,query,where } = require('firebase/firestore/lite');
const vendingUnit = require('../models/vendingUnit');
const user = require("../models/users")
const errorResponse = require('../utils/ErrorResponse');
const geohash = require("ngeohash") 
const geofire = require("geofire-common")

const db = getFirestore(app)

//@desc Get all vending units
//@access public
//@route GET /api/vendingMachines
exports.getVendingMachines = async (req,res,next) =>   {
    try{
        const vendingUnitsArray=[];
        const machines = await firestore.collection('Machines');
        const data = await machines.get();
        if(data.empty){
            throw{success:false,msg:'No records found',record:data}
        }else{
            data.forEach(item =>{
                const unit = new vendingUnit(
                    item.id,
                    item.data().name,
                    item.data().machine_image,
                    item.data().locationDetails,
                    item.data().products,
                );
                vendingUnitsArray.push(unit);
            });
        }
        res.status(200).json({success:true,msg:'Records found',records:vendingUnitsArray});
    }catch(e){
        next(new errorResponse(`Error occured while retriving the units`,400)); 
    }
}

//@desc Get all vending units based on location coordinates
//@access public
//@route GET /api/vendingMachines/coordinates/:lat/:lon
exports.getVendingMachinesByCoordinates = async (req,res,next) =>   {
    try{
        console.log("Header",req.headers);
        const vendingUnitsArray=[];
        var currentLatitude = req.params.lat
        var currentLongitude = req.params.lon
        var requiredDistance = req.params.distanceInMiles
        var hash = geofire.geohashForLocation([parseFloat(currentLatitude),parseFloat(currentLongitude)])
         var location  = geohash.decode(hash)
         currentLatitude = location.latitude
         currentLongitude= location.longitude
        /*
        *Using degrees of lat and lon per single mile,
        *calculate lower and upper bounderies
        */
        const lat = 0.0144927536231884; // latitude degrees per mile
        const lon = 0.0181818181818182; // longitude degrees per mile
         var lowerlat=0,lowerlon=0,upperlat=0,upperlon = 0
        
         console.log("lan",currentLatitude);
         console.log("long",currentLongitude);
         console.log("dis",requiredDistance);

            lowerlat = currentLatitude - (lat * requiredDistance)
            lowerlon  = currentLongitude - (lon * requiredDistance)

            upperlat = currentLatitude + (lat * requiredDistance)
            upperlon = currentLongitude + (lon * requiredDistance)

        const lower = geohash.encode(parseFloat(lowerlat),parseFloat(lowerlon))
        const higher = geohash.encode(parseFloat(upperlat),parseFloat(upperlon))
        
        const machines = collection(db,"Machines")
        const queryresult = query(machines,where("locationDetails.singleLocation.hashLoc",">=",lower) && where("locationDetails.singleLocation.hashLoc","<=",higher.toString()))

        const querySnapshot = await getDocs(queryresult);

        if(querySnapshot.empty){
            throw{success:false,msg:'No records found',record:data}
        }else{
            querySnapshot.forEach(item =>{
                if(item.data().locationDetails.singleLocation){
        
                    var hashLoc = item.data().locationDetails.singleLocation.hashLoc //calculate hash for the location
                    const unit = new vendingUnit(
                        item.id,
                        item.data().name,
                        item.data().machine_image,
                        item.data().locationDetails,
                        item.data().products,
                    );
                    vendingUnitsArray.push(unit);
                }
            });
        }
       res.status(200).json({success:true,msg:`Records found ${vendingUnitsArray.length}`,records:vendingUnitsArray});
    }catch(e){
        console.log(e)
        next(new errorResponse(`Error occured while retriving the units using coordinates`,400)); 
    }
}

//@desc Get single vending unit
//@access public
//@route GET /api/vendingMachines/:id
exports.getVendingMachine = async (req,res,next) =>   {
    try{
        const id = req.params.id;
        const machine = await firestore.collection('Machines').doc(id);
        const data = await machine.get();
       
        if(data.data() && !data.empty){
            res.status(200).json({success:true,msg:`Record found`,record:data.data()});
        }else{
            throw {success:false,message:'No records found'};
        }
    }catch(e){
       next(new errorResponse(`Machine not found with id ${req.params.id}`,404)); 
    }
}

//@desc create new vending units
//@access private
//@route POST /api/vendingMachines
exports.createVendingMachines = async (req,res,next) =>   {
    try{
        const data = req.body; 
        console.log(JSON.stringify(data));
        await firestore.collection('vendingMachines').doc().set(data);
        res.status(200).json({success:true,msg:'Record saved succesfully',record:data});
    }catch(e){
        next(new errorResponse(`Error occured while adding the unit`,400)); 
    }
}

//@desc Update vending unit
//@access private
//@route PUT /api/vendingMachines/:id
exports.updateVendingMachines = async (req,res,next) =>   {
    try{
        const id = req.params.id;
        const data = req.body;
        const machine = await firestore.collection('vendingMachines').doc(id);
        await machine.update(data);
        res.status(200).json({success:true,msg:`Updated successfully`});
    }catch(e){
        next(new errorResponse(`Error occured while updating the unit`,400)); 
    }
}

//@desc Delete a vending unit
//@access private
//@route DELETE /api/vendingMachines/:id
exports.deleteVendingMachine = async (req,res,next) =>   {

    try{
        const id = req.params.id;
        await firestore.collection('vendingMachines').doc(id).delete();
        res.status(200).json({success:true,msg:`deleted vending unit with id : ${req.params.id}`});
    }catch(e){
        next(new errorResponse(`Error occured while deleting the unit`,400)); 
    }
}

//@desc Get single user
//@access public
//@route GET /api/user/:id
exports.getUser = async (req,res,next) =>   {
    try{
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
       
        if(data.data() && !data.empty){
            res.status(200).json({success:true,msg:`Record found`,record:data.data()});
        }else{
            throw {success:false,message:'No records found'};
        }
    }catch(e){
       next(new errorResponse(`User not found with id ${req.params.id}`,404)); 
    }
}