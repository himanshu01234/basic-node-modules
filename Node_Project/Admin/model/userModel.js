const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
var Schema1 = new Schema({

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

    adminId: {
        type: String
    },

    userType: {
        type: String,
        enum: ["admin", "user", "subadmin"],
        default: "user"
    },
    status:{
        type:String,
        enum:["active","block","delete"],
        default:"active"
    },
    permission: [{
        editEmployee: {
            type: Boolean,
            default: false
        },
        addEmployee: {
            type: Boolean,
            default: false
        },
        removeEmployee: {
            type: Boolean,
            default: false
        },
        displayEmployee:{
            type:Boolean,
            default:false
        }
    }],
    address:
        [{   
            addressType: String,
            houseNumber:  String, 
            streetName:  String ,
            pinCode:  String ,
            cityName: String ,
            stateName:  String ,
            countryName:  String 
        }]
}, { timestamp: true });

module.exports = mongoose.model('userSchema', Schema1);

(function init() {
    var obj = {
        fullName: "Isha",
        emailId: "isha@gmail.com",
        userType: "admin",
        password: "1111####",
        mobileNumber: +918953675726

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