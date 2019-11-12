const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
var Schema2 = new Schema({

    fullName: {
        type: String
    },

    emailId: {
        type: String
    },
    password: {
        type: String
    },
    mobileNumber: {
        type: Number
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    otp:{
type:String
     },
     otpVerified:{
         type:Boolean,
         default:false
     },
    friendId:{
        type:Schema.Types.ObjectId,
        ref:"bookSchema"
    },
   
},{timestamp:true});
var users=mongoose.model('userSchema',Schema2);
module.exports=users