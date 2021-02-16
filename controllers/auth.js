const User = require('../models/user')
const jwt = require('jsonwebtoken')
exports.userSignup = (req,res) => {
    req.body ? 
    User.create(req.body)
    .then((createdUser)=>{
        return res.status(200).json(createdUser)
    })
    .catch(err=>res.json(err))
    :
    res.json({Message : "Invalid information."})
}

exports.userSignin = (req,res) => {
    req.body ? 
    User.findOne({email : req.body.email},(err, user)=>{
        if(err || !user || user.password!==req.body.password) 
        {
            return res.json({Message : "Invalid credentials"})
        }
        // sign the token using jwt
        const token = jwt.sign({_id: user._id},process.env.SIGN_TOKEN)
        //put token in cookie
        res.cookie("token",token,{expire: new Date()+9999});
        //send response to frontend
        const {_id,name,email,role} = user;
        return res.json({token, user:{_id,name,email,role}})                
    })
    :
    res.json({Message : "Invalid credentails."})
}

exports.userSignout = (req,res) => {
    res.clearCookie("token")//we have cookieParser middleware to use such methods
    res.json({
        message : "User Signout Successfully..."
    })  
}