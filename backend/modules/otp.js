const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

otpSchema.methods={
    verifyOTP:function(myotp){
        return myotp===this.otp;
    },
}

module.exports = mongoose.model("Otp",otpSchema);