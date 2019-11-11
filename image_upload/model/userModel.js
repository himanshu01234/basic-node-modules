const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
var Schema1 =new Schema({
fullName:{
    type:String
},

emailId:{
    type:String
},
password:{
    type:String
},
userType: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
},
mobileNumber:{
    type:String
},
status:{
    type:String,
    enum:["active", "block","delete"],
default:"active"
},
profilePic:
{
    type:String
}
},{timestamp:true});
var users=mongoose.model('userSchema',Schema1);
module.exports=users;
(function init() {
    var obj = {
        fullName: "Admin",
        emailId: "admin@gmail.com",
        userType: "admin",
        password: "1111####",
        mobileNumber: +91222222222 
 
    }
    let salt = bcrypt.genSaltSync(10);
    obj.password = bcrypt.hashSync(obj.password, salt)
    mongoose.model('userSchema', Schema1).findOne({ userType: "admin" }, (err, result) => {
        if (err) {
            console.log("Error ", err);
        }
        else if (!result) {
            mongoose.model('userSchema', Schema1).create(obj, (err, success) => {
                if (err) console.log("error ", err);
                else
                    console.log("Created ", success);
            })
        } else {
            console.log("Default Admin.");
        }

    })
})();