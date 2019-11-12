const Schema = require('../model/userModel');
const bcrypt = require('bcrypt-nodejs');
const jwt=require('jsonwebtoken')

module.exports = {

login: (req, res) => {
    try {
        if (!req.body.emailId || !req.body.password) {
            res.send({ responseCode: 500 }, { responseMessage: "Parameter missing" });

        }
        else {
            Schema.findOne({ emailId: req.body.emailId }, (error, success) => {

                if (error)
                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                else if (success) {
                    let token=jwt.sign({userId:success._id},"secretKey")
                   
                        var checkPassword = bcrypt.compareSync(req.body.password, success.password);
                        if (checkPassword) {
                            return res.send({ responseCode: 200, responseMessage: "Login successfully",userid:success._id, token });
                        }
                        else {
                            res.send({ responseCode: 404, responseMessage: "Email or Password mismatched" });
                        }
                    }
            }
            )
        }
    }
    catch (error) {
        res.send({ responseCode: 500, responseMessage: "Internal Server Error" });
    }
},
myProfile: (req, res) => {
    if (!req.headers.userid)
        res.send({ responseCode: 501, responseMessage: "Parameter missing" })
    else {
        Schema.findOne({ _id: req.headers.userid, status: "active" }, { password: 0}, (error, success) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error" })
            }
            else if (success){
                res.send({ responseCode: 200, responseMessage: "My Profile", success })

            }
            else {
                res.send({ responseCode: 404, responseMessage: "User not found" })
            }
        })
    }

},
}