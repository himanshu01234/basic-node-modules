
const Schema = require('../model/userModel');
const bcrypt = require('bcrypt-nodejs');
const com = require('../commonFunction/commonFunction')
function generateOTP() {

    var digits = '0123456789';
    var OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
module.exports = {
    signUp: (req, res) => {
        if (!req.body.fullName || !req.body.emailId || !req.body.password || !req.body.mobileNumber) {
            res.send({ responseCode: 501, responseMessage: "Parameter missing" })
        }
        else {


            Schema.findOne({ $or: [{ emailId: req.body.emailId }, { mobileNumber: req.body.mobileNumber }] }, (error, result) => {

                if (error) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (result) {
                    if (req.body.emailId == result.emailId) {
                        res.send({ responseCode: 404, responseMessage: " Email already exists" })
                    }
                    else {
                        res.send({ responseCode: 404, responseMessage: " Phone number already exists" })
                    }
                }
                else {
                    req.body.otp = generateOTP();

                    let salt = bcrypt.genSaltSync(10);
                    req.body.password = bcrypt.hashSync(req.body.password, salt)
                    console.log("39---", req.body)
                    var obj = new Schema(req.body);
                    obj.save((error3, success3) => {
                        if (error3) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else if (success3) {
                            var link = `http://172.16.16.209:8090/user/verify?otp=${req.body.otp}&userId=${success3._id}`
                            com.mailer(req.body.emailId, "Email verification", link, (error2, success2) => {
                                if (error2) {
                                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                }
                                else if (success2) {
                                    console.log("Email Sent")
                                }
                                else {
                                    console.log("Email not sent")
                                }
                            })
                            res.send({ responseCode: 200, responseMessage: "Signup  successfully", success3 })




                        }
                        else {
                            res.send({ responseCode: 404, responseMessage: "Signup  unsuccessfully" })
                        }
                    })

                }
            })
        }
    },
    linkVerify: (req, res) => {
        console.log("78")
        Schema.findOne({ _id: req.query.userId }, (error, success) => {
            if (error) {
                console.log("76")
                res.send({ responseCode: 500, responseMessage: "Internal server error" })
            }
            else if (success) {
                console.log("82",success)
               console.log(req.query.otp, success.otp, req.query.userId)
                if (req.query.otp == success.otp) {
                    Schema.findOneAndUpdate({ _id: req.query.userId }, { $set: { otp: "NULL", otpVerified: true } }, { new: true }, (error1, success1) => {

                        if (error1) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else if(success1){
                            res.send({ responseCode: 200, responseMessage: "Otp verified" })
                        }
                        else
                        res.send({ responseCode: 404, responseMessage: "Otp not verified" })
                    })
                }
            }
            else {
                res.send({ responseCode: 404, responseMessage: "User not found" })
            }

        })
    }
}