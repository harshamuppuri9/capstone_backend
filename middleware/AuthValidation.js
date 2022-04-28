const admin = require('../config/firebase-admin')
class userAuth{

    async verifyToken(req,res,next){
        const token = req.headers.authorization.split(' ')[1];
        
        try{
            const verifiedValue =  await admin.auth().verifyIdToken(token) //validate user using the token
            console.log("Verifid User",verifiedValue)
            if(verifiedValue){
                return next();
            }
    
            return res.json("message", "User is not authorized, please login to continue")
        }catch(e){
            return res.json("message", "Internal Error")
        }
    }
}

module.exports = new userAuth()