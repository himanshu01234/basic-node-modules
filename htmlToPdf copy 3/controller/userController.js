const Schema = require('../model/userModel');
const com = require('../commonFunction/commonFunction')

module.exports={
htmlToPdf: (req, res) => {
    try {
        Schema.findOne({ emailId: req.body.emailId, status: "active" },  (error, success) => {
            console.log("119-----", error, success)
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error" })
            }
            else if (success) {

                com.pdfConverter(success,(error11, result11)=>{
                    console.log("2016======",error11, result11 )
                    if (error11) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else  {
                        res.send({ responseCode: 200, responseMessage: "Pdf converted" })
                    }
                })
                
            }
            else {
                res.send({ responseCode: 400, responseMessage: "User not found" })
            }
        })
    }
    catch (error) {
        res.send({ responseCode: 500, responseMessage: "Internal server error" })
    }

}}