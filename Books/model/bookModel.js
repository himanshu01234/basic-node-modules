const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var Schema1 =new Schema({
    bookName:{
        type:String
    },
    bookImage:{
        type:String
    },
    status:{
        type:String,
        enum:["active","block","delete"],
        default:"active"
    },
    price:{
        type:String
    },
    standard:{
        type:String
    },
    edition:{
        type:String

    },
    ownerId:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    like:{
        type:String
    }
},{timestamp:true});
var books=mongoose.model('bookSchema',Schema1)
module.exports=books