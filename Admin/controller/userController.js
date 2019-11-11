const Schema = require('../model/userModel');
const bcrypt = require('bcrypt-nodejs');
const com = require('../commonFunction/commonFunct')
module.exports = {
    signUp: (req, res) => {
        try {
            if (!req.body.fullName || !req.body.emailId || !req.body.password || !req.body.mobileNumber || !req.body.userType || !req.body.address) {
                res.send({ responseCode: 501, responseMessage: "Parameter missing" })
            }
            else {
                Schema.findOne({ _id: req.body.adminId }, (err, result1) => {
                    if (err) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error", err })
                    }
                    else {

                        Schema.findOne({ $or: [{ emailId: req.body.emailId }, { mobileNumber: req.body.mobileNumber }] }, (error, result) => {
                            if (error) {
                                res.send({ responseCode: 500, responseMessage: "Internal server error..", error })
                            }
                            else if (result) {
                                if (req.body.emailId === result.emailId) {
                                    res.send({ responseCode: 404, responseMessage: " Email already exists" })
                                }
                                else
                                    res.send({ responseCode: 404, responseMessage: " Mobile number already exists" })
                            }
                            else
                                if (req.body.userType == "subadmin") {
                                    var pass = req.body.password
                                    let salt = bcrypt.genSaltSync(10);
                                    req.body.password = bcrypt.hashSync(req.body.password, salt)
                                    console.log("30==========>>>", req.body)
                                    var obj = new Schema(req.body);
                                    obj.save((err1, success) => {
                                        if (err1) {
                                            res.send({ responseCode: 500, responseMessage: "Internal server error...", err1 })
                                        }
                                        else {

                                            com.mailer(req.body.reciever, req.body.subject, `Your login credentials are- \n Email: ${req.body.emailId} \n Password:${pass}`, (error2, result2) => {
                                                if (error2) {
                                                    res.send({ responseCode: 500, responseMessage: "Internal server error", error2 })
                                                }
                                                else if (result2)
                                                    res.send({ responseCode: 200, responseMessage: `Signup  successfully, added by Admin ${result1.fullName} \n Credentials sent!` })
                                                else
                                                    res.send({ responseCode: 404, responseMessage: "Signup unsuccessfull", error2 })

                                            })
                                        }

                                    })
                                }
                                else
                                    res.send({ responseCode: 404, responseMessage: "Access Denied" })
                        })
                    }

                })

            }

        }

        catch (error) {
            res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
    },
    add: (req, res) => {
        console.log("56=====>>>>>")

        Schema.findOne({ _id: req.body.adminId }, (error, result) => {

            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error", error })
            }
            else if (result) {
                //console.log("59===", result, result.permission[0].addEmployee)
                if (result.userType == "admin") {
                    // console.log("62=====>>>>>", result.userType)
                    if (!req.body.fullName || !req.body.emailId || !req.body.password || !req.body.mobileNumber || !req.body.userType) {
                        res.send({ responseCode: 501, responseMessage: "Parameter missing" })
                    }
                    else {
                        Schema.findOne({ $or: [{ emailId: req.body.emailId }, { mobileNumber: req.body.mobileNumber }] }, (error1, result1) => {
                            if (error1) {
                                res.send({ responseCode: 500, responseMessage: "Internal server error", error1 })
                            }
                            else if (result1) {
                                if (req.body.emailId === result1.emailId) {
                                    res.send({ responseCode: 404, responseMessage: " Email already exists" })
                                }
                                else
                                    res.send({ responseCode: 404, responseMessage: " Mobile number already exists" })
                            }
                            else {
                                let salt = bcrypt.genSaltSync(10);
                                req.body.password = bcrypt.hashSync(req.body.password, salt)
                                var obj = new Schema(req.body);
                                obj.save((err2, success1) => {
                                    if (err2) {
                                        res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                    }
                                    else {
                                        console.log("101====", success1)
                                        res.send({ responseCode: 200, responseMessage: `Added  successfully by Admin ${result.fullName}` })
                                    }

                                })

                            }
                        })
                    }
                }

                else if (result.userType == "subadmin" && result.permission[0].addEmployee == true) {
                    Schema.findOne({ $or: [{ emailId: req.body.emailId }, { mobileNumber: req.body.mobileNumber }] }, (error2, result2) => {
                        if (error2) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error", error2 })
                        }
                        else if (result2) {
                            if (req.body.emailId === result2.emailId) {
                                res.send({ responseCode: 404, responseMessage: " Email already exists" })
                            }
                            else
                                res.send({ responseCode: 404, responseMessage: " Mobile number already exists" })
                        }
                        // console.log("82=====>>>>>", result2.userType)
                        let salt = bcrypt.genSaltSync(10);
                        req.body.password = bcrypt.hashSync(req.body.password, salt)
                        var obj = new Schema(req.body);
                        obj.save((err2, success2) => {
                            if (err2) {
                                res.send({ responseCode: 500, responseMessage: "Internal server error" })
                            }
                            else if (success2) {
                                console.log("131====", success2)
                                res.send({ responseCode: 200, responseMessage: "Added  successfully" })
                            }
                            else {
                                res.send({ responseCode: 200, responseMessage: "Data can not be added" })
                            }

                        })
                    }
                    )
                }
                else {
                    res.send({ responseCode: 404, responseMessage: "Access denied" })
                }
            }
            else {
                res.send({ responseCode: 404, responseMessage: "No such user found" })
            }
        })
    },
    remove: (req, res) => {
        Schema.findOne({ _id: req.body.adminId }, (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error " })
            }
            else if (result) {
                if (result.userType == "admin") {
                    Schema.findOne({ emailId: req.body.emailId }, (error1, result1) => {
                        if (error1) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else if (result1) {
                            Schema.findOneAndUpdate({ emailId: req.body.emailId }, { $set: { status: "delete" } }, (error2, success2) => {
                                if (error2) {
                                    res.send({ responseCode: 500, responseMessage: "Internal server error " })
                                }
                                else if (success2) {
                                    res.send({ responseCode: 200, responseMessage: "Data removed" })
                                }
                            })
                        }
                        else {
                            res.send({ responseCode: 404, responseMessage: "Access denied" })
                        }
                    })
                }
                else if (result.userType == "subadmin" && result.permission[0].removeEmployee == true) {
                    Schema.findOne({ emailId: req.body.emailId }, (error3, result3) => {
                        if (error3) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else if (result3) {
                            Schema.findOneAndUpdate({ emailId: req.body.emailId }, { $set: { status: "delete" } }, (error4, success4) => {
                                if (error4) {
                                    res.send({ responseCode: 500, responseMessage: "Internal server error " })
                                }
                                else if (success4) {
                                    res.send({ responseCode: 200, responseMessage: "Data removed" })
                                }
                                else {
                                    res.send({ responseCode: 404, responseMessage: "Data not removed" })
                                }
                            })
                        }
                        else {
                            res.send({ responseCode: 404, responseMessage: "Access denied" })
                        }
                    })
                }
            }
            else {
                res.send({ responseCode: 404, responseMessage: "No such user found" })
            }
        })

    },
    edit: (req, res) => {
        Schema.findOne({ _id: req.body.adminId }, (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error " })
            }
            else if (result) {
                if (result.userType == "admin") {
                    Schema.findOne({ emailId: req.body.emailId }, (error1, result1) => {
                        if (error1) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else {
                            if (result1.status != "delete") {
                                Schema.findOneAndUpdate({ emailId: req.body.emailId }, req.body, { new: true }, (error2, success2) => {
                                    if (error2) {
                                        res.send({ responseCode: 500, responseMessage: "Internal server error " })
                                    }
                                    else if (success2) {
                                        res.send({ responseCode: 200, responseMessage: "Data updated" })
                                    }
                                    else {
                                        res.send({ responseCode: 404, responseMessage: "Data not updated" })
                                    }
                                })
                            }
                            else {
                                res.send({ responseCode: 404, responseMessage: "User has been deleted" })
                            }
                        }

                    })
                }
                else if (result.userType == "subadmin" && result.permission[0].editEmployee == true) {
                    Schema.findOne({ emailId: req.body.emailId }, (error2, result2) => {
                        if (error2) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else {
                            if (result2.status != "delete") {
                                Schema.findOneAndUpdate({ emailId: req.body.emailId }, req.body, { new: true }, (error2, success2) => {
                                    if (error2) {
                                        res.send({ responseCode: 500, responseMessage: "Internal server error " })
                                    }
                                    else if (success2) {
                                        res.send({ responseCode: 200, responseMessage: "Data updated" })
                                    }
                                    else {
                                        res.send({ responseCode: 404, responseMessage: "Data not updated" })
                                    }
                                })
                            }
                            else {
                                res.send({ responseCode: 404, responseMessage: "User has been deleted" })
                            }
                        }

                    })
                }
                else {
                    res.send({ responseCode: 404, responseMessage: "Access denied" })
                }
            }
            else {
                res.send({ responseCode: 404, responseMessage: "No such user found" })
            }

        })

    },
    display: (req, res) => {
        Schema.findOne({ _id: req.body.adminId }, (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error" })
            }
            else if (result) {
                if (result.userType == "admin") {
                    
                        Schema.findOne({ emailId: req.body.emailId }, (error1, result1) => {
                            if (error1) {
                                res.send({ responseCode: 500, responseMessage: "Internal server error" })
                            }
                            else if (result1) {
                                if (result1.status != "delete")
                                    res.send({ responseCode: 200, responseMessage: 'Employee data', result1 })
                                    else
                                    res.send({responseCode:404,responseMessage:"User deleted"})
                            }
                            else
                                res.send({ responseCode: 404, responseMessage: 'Employee data not found' })
                        })

                    }
                   
                
                else if (result.userType == "subadmin" && result.permission[0].displayEmployee == true) {
                   
                    Schema.findOne({ emailId: req.body.emailId }, (error2, result2) => {
                        if (error2) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else if (result2) {
                            if (result2.status != "delete")
                            res.send({ responseCode: 200, responseMessage: 'Employee data', result2 })
                            else
                            res.send({responseCode:404, responseMessage:"User deleted"})
                        }
                        else
                            res.send({ responseCode: 404, responseMessage: 'Employee data not found' })
                    })
                }
           
                else {
                    res.send({ responseCode: 404, responseMessage: "Access denied" })
                }
            }
            else {
                res.send({ responseCode: 404, responseMessage: "No such user found" })
            }
        })}

    ,
    setPermission: (req, res) => {
        Schema.findOne({ _id: req.body.adminId }, (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error ", error })
            }
            else if (result) {
                if (result.userType == "admin") {
                    Schema.findOneAndUpdate({ _id: req.body.subadminId }, {
                        $set: { permission: req.body.permission }
                    }, { new: true }, (err, result) => {
                        if (err)
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        else {
                            res.send({ responseCode: 200, responseMessage: "Permission set" })
                        }
                    })
                }
                else
                    res.send({ responseCode: 500, responseMessage: "Access denied, not an admin" })
            }
            else {
                res.send({ responseCode: 404, responseMessage: "Something went wrong" })
            }
        })

    }


}



