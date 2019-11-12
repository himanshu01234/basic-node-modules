const Schema = require('../model/userModel');

const com = require('../commonFunction/commonFunction')






module.exports = {
    uploadImage: (req, res) => {
        {

            if (!req.body.userId || !req.body.profilePic)
                res.send({ responseCode: 501, responseMessage: "Parameter missing" })
            else {

                Schema.findOne({ _id: req.body.userId, status: "active" }, (err, result) => {
                    if (err) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error", err })
                    }
                    else if (result) {


                        com.uploadImage(req.body.profilePic, (error, success) => {

                            if (error) {
                                res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                            }
                            else {


                                Schema.findOneAndUpdate({ _id: req.body.userId, status: "active" }, { $set: { profilePic: success } }, { new: true }, (error1, success1) => {
                                    if (error1) {
                                        res.send({ responseCode: 500, responseMessage: "Internal Server Error" })
                                    }
                                    else {
                                        res.send({ responseCode: 200, responseMessage: "Image uploaded" })
                                    }
                                })


                            }
                        }
                        )
                    }


                    else {
                        res.send({ responseCode: 404, responseMessage: "Image Upload unsuccessful" })
                    }
                })
            }
        }
    }
}