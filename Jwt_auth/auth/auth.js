const jwt = require('jsonwebtoken')
const Schema = require('../model/userModel')
module.exports = {
    verifyToken: (req, res, next) => {
console.log("5>>>>>>>>>",req.headers,"sdsdsd"
)
        if (req.headers.token) {
            jwt.verify(req.headers.token, "secretKey", (error, success) => {
                if (error) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else {
                    if (req.headers.userid) {
                        Schema.findOne({ _id: req.headers.userid }, (error1, success1) => {
                            if (error1) {
                                res.send({ responseCode: 500, responseMessage: "Internal server error" })
                            }
                            else if (success1) {
                                var decoded = jwt.decode(req.headers.token, { complete: true });
                                console.log(decoded.header);
                                console.log(decoded.payload)
                                if(decoded.payload.userId==req.headers.userid)
                                next();
                                else
                                res.send({responseCode:404, responseMessage:"Not a valid user"})
                            }
                            else {
                                res.send({ responseCode: 404, responseMessage: "User not found" })
                            }
                        })
                    }
                    else {
                        res.send({ responseCode: 404, responseMessage: "Id needed" })
                    }
                }

            })
        }
        else {
            res.send({ responseCode: 404, responseMessage: "Token not verified" })
        }
    }
}