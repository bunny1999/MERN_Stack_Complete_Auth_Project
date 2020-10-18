const User = require('../modules/user')

exports.getUserByID=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                err:"User doesn't exsists!"
            });
        }
        req.profile=user;
        next();
    })
}

exports.userData=(req,res)=>{
    const {first_name,last_name,email} = req.profile;
    return  res.json({
        first_name,
        last_name,
        email
    });
}