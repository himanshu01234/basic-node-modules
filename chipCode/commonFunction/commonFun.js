const cloudinary=require('cloudinary')
const twilio = require('twilio');
var accountSid = "ACc01dbd1c70a42704585c5a4d217703c1"
var authToken = "7e360ebefa3ef84c045026dada5de880"   // Your Auth Token from www.twilio.com/console


var client = new twilio(accountSid, authToken);

cloudinary.config({ 
    cloud_name: 'ishamobiloitte1', 
    api_key: '176929312852296', 
    api_secret: 'SezWZVqeYt5wDQKyuM-J0NdkqKY' 
  });



 


module.exports={

uploadImage:(imageData,callback)=>{
cloudinary.v2.uploader.upload(imageData,(error, result)=>{
if(error)
{
    console.log("error in uploading",error)
    callback(error,null)
}
else
{
console.log("upload image>>>>",result.secure_url)
callback(null,result.secure_url)
}

})
  

},

sendSms:(subject,mobileNo,callback)=>{
console.log("in 45>>")
client.messages.create({
    body:subject,
    to:mobileNo ,  // Text this number
    from:"" // From a valid Twilio number
},(err,success)=>{
if(err){
console.log('in errr twilio',err)
callback(err,null)
}
else{
    console.log('in send sms success>>>>>',success)
    callback(null,success)
}
})



// .then((message) => console.log(message.sid));



},
sendEmail:()=>{}






    //..................end exports
}