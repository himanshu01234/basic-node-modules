const Emp=require('../model/employeeModel')
const speakeasy=require('speakeasy')
var QRCode = require('qrcode');
module.exports={
   employee:(req,res)=>{
    if(!req.body.name||!req.body.emailId||!req.body.employeeId||!req.body.mobileNumber||!req.body.address)
    {
res.send({responseCode:500,responseMessage:"Parameters Missing"})
    }
else
Emp.findOne({$or:[{ emailId: req.body.emailId },{mobileNumber: req.body.mobileNumber}]},(error,result)=>
    {
        if (error) {
            res.send({ responseCode: 505, responseMessage: "Internal Server Error"})
        }
        else if (result) {
            if(req.body.emailId=== result.emailId){
                res.send({ responseCode: 404, responseMessage: " Email Already Exists" })
            }
            else{
                res.send({ responseCode: 404, responseMessage: " Phone number Already Exists" })
            }
        }
        else {
           
                var obj = new Emp(req.body)
                obj.save((err1) => {
                     if (err1) {
                        res.send({ responseCode: 500, responseMessage: "Internal Server Error"})
                     }
                     else {
                         res.send({ responseCode: 200, responseMessage: "Saved Successfully"})
                 }
    })
}
    })
},
employeeUpdate:(req,res)=>
{
    if(!req.body.emailId)
    {
        res.send({responseCode:500, responseMessage:"Email missing"})
    }
    else{
        Emp.findOne({emailId:req.body.emailId},(err1,result1)=>{
            if(err1)
            {
                res.send({responseCode:500,responseMessage:"Internal Server Error"})
            }
            else if(!result1)
            {
                res.send({responseCode:404, responseMessage:"Email Doesn't exist "})
            }
            else{
                Emp.findOneAndUpdate({email:req.body.email},{$set:{name:req.body.name, address:req.body.address}},{new:true},(err2,result2)=>{
                    if(err2)
                    {
                        res.send({ responseCode: 500, responseMessage: "Internal Server Error"})
                    }
                    else if(result2)
                    {
                        res.send({responseCode:200, responseMessage:"Updation Successful"})
                    }
                    else{
                        res.send({responseCode:404, responseMessage:"Not Updated"})
                    }
                })
          }
        })
    
    
}
},
speakEasy:(req,res)=>{
  
var secret = speakeasy.generateSecret();
console.log("77----",secret)
Emp.findOneAndUpdate({emailId:req.body.emailId},{$set:{secret:secret.otpauth_url}},{new:true},(error,success)=>{
  if(error)
  {
      res.send({responseCode:500, responseMessage:"Internal server error",error})
  }
  else{

  
    QRCode.toDataURL(secret.otpauth_url, (error, data_url)=> {
        console.log(data_url);
       
    });
   
    }
})


},
speakeasyVerify:(req,res)=>{
    
    var verified = speakeasy.totp.verify({ secret: secret,
        encoding: 'base32',
        token: req.body.token });
        console.log("85-----",verified)
        res.send({responseCode:200, responseMessage:""})
}
}
