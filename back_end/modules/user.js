const mongooes = require('mongoose')
const { v1: uuidv1 } = require('uuid');
const crypto = require('crypto')

const userSchema = new mongooes.Schema({
    first_name:{
        type:String,
        requied:true,
        trim:true,
    },
    last_name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    encyp_password:{
        type:String,
        required:true
    },
    salt:String
},{timestamps:true});

userSchema.virtual("password").set(function(password){
    this._password=password;
    this.salt=uuidv1();
    this.encyp_password=this.securePassword(password);
})
.get(function(){
    return this._password
});

userSchema.methods={
    authenticate:function(plainpasssword){
        return this.securePassword(plainpasssword)===this.encyp_password;
    },
    securePassword:function(plainpasssword){
        if(plainpasssword=="") return "";
        try{
            return crypto.createHmac('sha256', this.salt).update(plainpasssword).digest('hex');
        }catch(err){
            return "";
        }
    }
}

module.exports = mongooes.model("User",userSchema)