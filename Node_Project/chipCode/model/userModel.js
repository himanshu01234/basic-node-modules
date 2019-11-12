const mongoose=require('mongoose');
//const bcrypt=require('bcrypt-nodejs');
const Schema=mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var data =new Schema({ 
    email:{
        type:String
    },
    password:{
        type:String
    },
    name:{
        type:String   
    },
    mobileNumber:{
        type: String

    },
    countryCode:{
        type: String

    },

    mergeContact:{
        type: String 
    },


    profilePic:{
        type:String
    },

    socialId:{
        type:String
    },

    socialType:{
        type:String
    },


    otp:{
        type:String
    },
    otpVerify:{
        type:Boolean,
        default:false
    },
    otpExpire:{
        type:String,
        default:Date.now()
    },

    status:{
        type:String,
        enum:["ACTIVE","BLOCK","DELETE"],
        default:"ACTIVE"
    },

    userType:{
        type:String,
        enum:["ADMIN","USER","SUBADMIN"],
        default:"USER"

    },

friendId:{
    
    type:Schema.Types.ObjectId,
    ref:'userSchema'
},



    token:{
        type:String, 
    }

},{timestamps:true}
);


data.plugin(mongoosePaginate);
var users=mongoose.model('userSchema',data);
module.exports=users

