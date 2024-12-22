const { Int32 } = require("bson");
const mongoose=require("mongoose");
const { type } = require("os");

mongoose.connect("mongodb://localhost:27017/Database")
.then(()=>{
    console.log("Connected to Database");
})
.catch((e)=>{
    console.log("Error in Connecting to Database");
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const PaymentSchema=new mongoose.Schema({
    cardname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    billingaddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zipcodeno:{
        type:Number,
        required:true
    },
    creditcardno:{
        type:Number,
        required:true
    },
    creditcardexp:{
        type:String,
        required:true
    },
    cvv:{
        type:Number,
        required:true
    },
    billingzip:{
        type:Number,
        required:true
    }
})

const users=new mongoose.model('users',logInSchema)
const paymentdata=new mongoose.model('paymentdatas',PaymentSchema)
module.exports = {
    users,
    paymentdata
}