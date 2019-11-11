const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var Schema1 =new Schema({
   
    name:{
        type:String
    },
   
    emailId:{
        type:String
    },
    employeeId:{
        type:String
    },
    mobileNumber:{
        type: Number,
    },
    address:{
        type:String
    },
    secret:{
        type:String
    }
    

});

var users=mongoose.model('userSchema',Schema1);
module.exports=users

