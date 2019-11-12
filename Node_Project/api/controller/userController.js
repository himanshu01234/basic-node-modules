const Schema = require('../model/userModel');
const bcrypt = require('bcrypt-nodejs');
module.exports = {

    signUp: (req, res) => {

        try {
            if (!req.body.fullName || !req.body.emailId || !req.body.password || !req.body.mobileNumber) {
                res.send({ responseCode: 501, responseMessage: "Parameter missing" })
            }
            else {


                Schema.findOne({ $or: [{ emailId: req.body.emailId }, { mobileNumber: req.body.mobileNumber },{fullName:req.body.fullName}] }, (error, result) => {

                    if (error) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (result) {
                        if (req.body.emailId === result.emailId) {
                            res.send({ responseCode: 409, responseMessage: " Email already exists" })
                        }
                        else if(req.body.mobileNumber === result.mobileNumber){
                            res.send({ responseCode: 409, responseMessage: " Phone number already exists" })
                        }
                        else{
                            res.send({ responseCode: 409, responseMessage: " Name already exists" }) 
                        }
                    }
                    else {

                        let salt = bcrypt.genSaltSync(10);
                        req.body.password = bcrypt.hashSync(req.body.password, salt)

                        var obj = new Schema(req.body);
                        obj.save((err1, success) => {
                            if (err1) {
                                res.send({ responseCode: 500, responseMessage: "Internal server error" })
                            }
                            else if (success) {
                                res.send({ responseCode: 200, responseMessage: "Signup  successfully" })
                            }
                            else {
                                res.send({ responseCode: 403, responseMessage: "Signup  unsuccessful" })
                            }

                        })

                  
                
                
            }

         } )
            }
        }

        catch (error) {
            res.send({ responseCode: 500, responseMessage: "Internal Server Error" })
        }
    },
    login: (req, res) => {
        try {
            if (!(req.body.emailId ||req.body.fullName)|| !req.body.password) {
                res.send({ responseCode: 501 ,  responseMessage: "Parameter missing" });

            }
            else {
                Schema.findOne({ $or: [{ emailId: req.body.emailId }, { fullName: req.body.fullName }]}, (error, success) => {

                    if (error)
                        res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    else if (success) {
                        
                        
                            var checkPassword = bcrypt.compareSync(req.body.password, success.password);
                            if (checkPassword) {
                                
                                res.send({responseCode:200, responseMessage:"Login successful",success})

                            }
                            else {
                                res.send({ responseCode: 403, responseMessage: "Email or Password mismatched" });
                            }
                        
                       
                    }
                    else {
                        res.send({ responseCode: 403, responseMessage: "Login unsuccessful" })
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
        try{
            if (!req.query.userId)
            {
                res.send({ responseCode: 501, responseMessage: "Parameter missing" })
            }
            else {
                Schema.findOne({ _id: req.query.userId }, (error, success) => {
                    if (error) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (success) {
                        res.send({ responseCode: 200, responseMessage: "My Profile", success })
    
                    }
                    else {
                        res.send({ responseCode: 404, responseMessage: "User not found" })
                    }
                })
            }
    
        }
        catch(error)
        {
            res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
       
    },





    
    edit: (req, res) => {
        try{
            Schema.findOne({ emailId: req.body.emailId }, (error1, result1) => {
                if (error1) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if(result1){
                    
                        Schema.findOneAndUpdate({ emailId: req.body.emailId }, req.body, { new: true }, (error2, success2) => {
                            if (error2) {
                                res.send({ responseCode: 500, responseMessage: "Internal server error " })
                            }
                            else if (success2) {
                                res.send({ responseCode: 200, responseMessage: "User data updated" ,result1})
                            }
                            else {
                                res.send({ responseCode: 403, responseMessage: "User data not updated" })
                            }
                        })
                    
                    
                }
                else
{
    res.send({ responseCode: 404, responseMessage: "User not found" ,result})
}
            })
        }                                                                                                                                                                                                                                       
        catch(error)
        {
            res.send({ responseCode: 500, responseMessage: "Internal server error " })

        }
        }
                   

}