var user = require('../model/userModel')
var bcrypt = require('bcrypt-nodejs')
const common = require('../commonFunction/commonFun')

var jwt = require('jsonwebtoken');








// const jwt = require('')


module.exports = {
    signUp: (req, res) => {

        user.findOne({ "email": req.body.email }, (err, result) => {

            if (err) {
                res.send({ responseCode: 500, responseMessage: "Internal server error" })
            }
            else if (!result) {
                common.uploadImage(req.body.profilePic, (err11, result1) => {
                    if (err11) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else {
                        console.log("in 24 >>>>>>>>", result1)

                        req.body.profilePic = result1
        
                        req.body.mergeContact = req.body.countryCode + req.body.mobileNumber
                        var password = bcrypt.hashSync(req.body.password)



                        var token = jwt.sign({ id:result._id ,email:result.email}, 'Mobiloitte');


                        
                        req.body.password = password;
                        var obj = new user(req.body)
                        obj.save((err1, success) => {

                            if (err1) {
                                res.send({ responseCode: 500, responseMessage: "Internal server error" })
                            }
                            else {
                                res.send({ responseCode: 200, responseMessage: 'Signup successfully', success })
                            }
                        })

                    }
                })

            }
            else {

                res.send({ responseCode: 404, responseMessage: "Email already exist." })

            }

        })



    },



    'sendOTP': (req, res) => {

        var otp = '1234'


        console.log("in 65")

        common.sendSms(`ypur otp is ${otp}`, req.body.mobileNo, (err, result) => {
            console.log('in 65>>>>>.', err, result)
            if (result) {
                res.send({ responseCode: 200 }, result)
            }
        })

    },





"getAllUser":(req,res)=>{
var query={}


if(req.body.userName){
    query.name=req.body.userName
}

if(req.body.email)
{
    query.email=req.body.email
}


if(req.body.fromDate && !req.body.toDate)
{

    query.createdAt={$gte:req.body.fromDate}

}

if(!req.body.fromDate && req.body.toDate)
{
    query.createdAt={$lte:req.body.toDate}
   
}


if(req.body.fromDate && req.body.toDate)
{
    query.$and=[{createdAt:{$gte:req.body.fromDate},
              createdAt:{$lte:req.body.toDate}}]
}



console.log("In query >>>> 113",query)
var options={
    page:req.body.pageNumber || 1,
    limit:req.body.limit || 5,
    sort:{
        createdAt:-1
    }

}
 


user.paginate(query,options,(err,result)=>{
if(err)
{
   return res.send({responseCode:500,responseMessage:"Internal server error",err})
}

else if(result.docs==false)
{
    res.send({responseCode:404,responseMessage:"Data not found"})
}

else{
    res.send({responseCode:200,responseMessage:"Data found successfully",result})
}
})
},


addFriend:(req,res)=>{

user.findOneAndUpdate({'_id':req.body.userId},{friendId:req.body.friendId},{new:true},(err,result)=>{

    if(err)
    {
        res.send({responseCode:500,responseMessage:"Internal server error",err})
    }
    
    else if(!result)
    {
        res.send({responseCode:404,responseMessage:"Data not found"})
    }
    
    else{
        res.send({responseCode:200,responseMessage:"Data updated successfully",result})
    }
    })
    
    
},


getFriendDetails:(req,res)=>{



    user.findOne({'_id':req.body.userId}).populate("friendId",('name email')).exec((err,result)=>{
        console.log("dsfdsfdsf",err,result)
    if(result)
    {
        res.send({responseCode:200,responseMessage:"get Data",result})
    }
    })
}




    //.....................end exports
}
