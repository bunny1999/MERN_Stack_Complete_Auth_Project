const {check,validationResult} = require('express-validator')
const User = require('../modules/user');
const Otp = require('../modules/otp');
const expressJwt=require('express-jwt')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.signup=(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return  res.status(422).json({
            err:errors.errors
        });
    }
    var user = new User(req.body);
    user.save((err,userStored)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to save user data"
            });
        }
        return res.json({
            id:userStored._id,
            name:userStored.first_name,
            email:userStored.email
        });
    });
}

exports.signin=(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            err:errors.errors
        });
    }
    const {email,password} = req.body;
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return  res.json({
                err:"Email does not exists"
            });
        }
        if(!user.authenticate(password)){
            return res.json({
                err:"Password does not match"
            });
        }

        const token = jwt.sign({id:user._id},process.env.SECURE);
        res.cookie("token",token);
        return  res.json({token,user:{
            id:user._id,
            name:user.first_name+" "+user.last_name,
            email:user.email
        }});
    });
};

exports.isSignedin = expressJwt({
    secret:process.env.SECURE,
    algorithms: ['HS256'],
    userProperty:"auth"
});
exports.isAuthenticated=(req,res,next)=>{
    let check = req.profile && req.auth && req.profile._id == req.auth.id
    if(!check){
        return res.status(403).json({
            err:"ACCESS DENIED"
        });
    }
    next();
}

exports.forgot=(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return  res.status(422).json({
            err:errors.errors
        });
    }
    const {email} = req.body;
    
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return  res.json({
                err:"Email does not exsits"
            });
        }
        var myOTP = Math.floor(1000 + Math.random() * 9000);
        
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.SENDERMAIL,
                    pass: process.env.SENDERPASS
                }
            });
            transporter.sendMail({
                from: process.env.SENDERMAIL,
                to: email,
                subject: "Forgot Password OTP FoodViram",
                text: "Your OTP: "+myOTP,
            },(err,info)=>{
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        err:"Not able to send mail to your email"
                    });
                }
                
                var otp = new Otp({
                    email:email,
                    otp:myOTP,
                });
                Otp.findOne({email},(err,otpdoc)=>{
                    if(err){
                        return  res.status(400).json({
                            err:"Something went wrong"
                        });
                    }
                    if(otpdoc){
                        otpdoc.updateOne({"otp":myOTP},(err,doc)=>{
                            if(err){
                                return  res.status(400).json({
                                    err:"Something went wrong"
                                }); 
                            }
                        });     
                    }else{
                        otp.save((err,otpStored)=>{
                            if(err){
                                return  res.status(400).json({
                                    err:"Something went wrong"
                                });
                            }  
                        });
                    }
                    return  res.json({
                        msg:"OTP send succesfully to your mail id"
                    });
                })
            });
        });
    });
}

exports.verifyOtp=(req,res)=>{
    const {email,otp} = req.body;
    Otp.findOne({email},(err,otpdoc)=>{
        if(err || !otpdoc){
            return  res.json({
                err:"Email does not exsits"
            });
        }
        if(!otpdoc.verifyOTP(otp)){
            return  res.json({
                err:"OTP is not valid"
            });
        }
        return res.json({
           'msg':"OTP Verified!" 
        })
    });
}

exports.changepassword=(req,res)=>{
    console.log('entere into change');
    const {email,newpass} = req.body;
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return  res.json({
                err:"Email does not exsits"
            });
        }
        user.updateOne({"encyp_password":user.securePassword(newpass)},(err,doc)=>{
            if(err){
                return res.status(400).json({
                    err:"Password not saved in database"
                });
            }
            return  res.json({
                msg:"Password Changed Succesfull"
            });
        })
    })   
}

exports.isVerifiedOtp=(req,res,next,otp)=>{
    const {email} = req.body;
    Otp.findOne({email},(err,otpdoc)=>{
        if(err || !otpdoc){
            return  res.json({
                err:"Email does not exsits"
            });
        }
        if(!otpdoc.verifyOTP(otp)){
            return  res.json({
                err:"OTP is not valid"
            });
        }
        next();
    });
}