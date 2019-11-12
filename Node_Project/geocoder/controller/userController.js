const Schema = require('../model/userModel');

const com = require('../commonFunction/commonFunction')






module.exports = {
    giveAddress:(req,res)=>{
        if(!req.body.address)
        {
            res.send({responseCode:501, responseMessage:"Parameter missing"})
        }
        else{
            
        com.geoCode(req.body.address, (error1, success1) => {
            if (error1) {
                res.send({ responseCode: 500, responseMessage: "Internal server error" })
              
            }
            else {
                
               res.send({responseCode:200, responseMessage:"Latitude & longitude are:",success1})
            }
        
        })
    }
    },
    // giveLatLong:(req,res)=>{
    //     if(!req.body.lat||!req.body.long)
    //     {
    //         res.send({responseCode:501, responseMessage:"Parameter missing"})
    //     }
    //     else{
    //         // var lat=req.body.lat
    //         // var long=req.body.long
    //     com.geoCode(req.body.lat, req.body.long, (error1, success1) => {
    //         if (error1) {
    //             res.send({ responseCode: 500, responseMessage: "Internal server error" })
                
    //         }
    //         else {
              
    //            res.send({responseCode:200, responseMessage:"Address is:",success1})
    //         }
        
    //     })
    // }
    // }
}