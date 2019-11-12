const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var schema1=new Schema(
    {
        address:{
            type:String
        }
    },{timestamps:true})
    module.exports=mongoose.model('userSchema',schema1);