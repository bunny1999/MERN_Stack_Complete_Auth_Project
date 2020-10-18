const express = require('express')
const router = express.Router()
const {check,validationResult} = require('express-validator')
const {signin,signup,forgot,verifyOtp,isVerifiedOtp,changepassword} = require('../controllers/auth')

router.post('/signup',[
    check("email","Use Proper Email Address").isEmail(),
    check("password").isLength({min:3}).withMessage("Password must be more then 3 length")
],signup);

router.post('/signin',[
    check("email","Use Authenticated Email").isEmail(),
    check("password").isLength({min:3}).withMessage("Password was more then 3 length")
],signin);

router.post('/forgot_pass',[
    check("email","Use Authenticated Email").isEmail(),
],forgot);

router.post('/verify_otp',verifyOtp);

router.post('/change_pass/:myOTP',isVerifiedOtp,changepassword)

module.exports = router;