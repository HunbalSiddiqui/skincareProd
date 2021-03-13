const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
exports.userSignup = (req,res) => {
    req.body ? 
    // User.create(req.body) : any one could register as admin, this was a big security flaw.
    // admins shall be created manually through mongodb compass or through separate dedicated route.
    User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })
    .then((createdUser)=>{
        return res.status(200).json({type:true,Message:"User created successfuly",createdUser})
    })
    .catch(err=>res.json({type:false,Message:"Unable to create user",err}))
    :
    res.json({type:false,Message : "Bad Request."})
}

exports.userSignin = async(req,res) => {
    try {
        const {email,password} = req.body
        // 1) check if email and password exist
        if(!email || !password)
            return res.json({Message : "Bad Request.",type:false})
        // 2) check if user exist and password is correct
        const user = await User.findOne({email: req.body.email}).select('+password'); // we will get the password in this output only because we have explicitly called it using select.
        if(!user || !(await user.correctPaasword(password, user.password)))
        {
        return res.status(401).json({Message : "Wrong credentials.",type:false})
        }
        // 3) if everything ok, send token to client
        const token = jwt.sign({_id: user._id },process.env.SIGN_TOKEN,{
            expiresIn: process.env.JWT_EXPIRES_IN
        }) 
        return res.status(200).json({type:true,Message : "Successful.",token, user:{id: user._id,name: user.name,email: user.email,role: user.role}})                
               
    } catch (error) {
        return res.status(401).json({Message : "Wrong credentials.",type:false})
    }
  

    // User.findOne({email : req.body.email},(err, user)=>{
    //     if(err || !user || user.password!==req.body.password) 
    //     {
    //         return res.json({type:false,Message : "Invalid credentials",type:false})
    //     }
    //     // sign the token using jwt
    //     // const token = jwt.sign({_id: user._id},process.env.SIGN_TOKEN) 
    //     const token = jwt.sign({_id: user._id },process.env.SIGN_TOKEN,{
    //         expiresIn: process.env.JWT_EXPIRES_IN
    //     }) 
    //     //put token in cookie
    //     res.cookie("token",token,{expire: new Date()+9999});
    //     //send response to frontend
    //     const {_id,name,email,role} = user;
    //     return res.json({type:true,token, user:{_id,name,email,role}})                
    // })
}

exports.userSignout = (req,res) => {
    res.clearCookie("token")//we have cookieParser middleware to use such methods
    res.json({
        message : "User Signout Successfully..."
    })  
}

exports.protect = async (req,res,next) => {
    // 1) check if token exist
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token)
    return res.status(401).json({type:false,message:"You are not authorized. Please login to get access."})
    // 2) Verify the token
    let decoded;
    try {
    // jwt.verify(token,secret,callbackFn)
    // to maintain our pattern of working with promises we will promisify this jwt.verify function
    decoded = await promisify(jwt.verify)(token,process.env.SIGN_TOKEN)        
    } catch (error) {
    return res.status(401).json({type:false,message:"You are not authorized. Please login to get access."})
    }

    // 3) check if user still exist
    const currentUser = await User.findById(decoded.id)
    if(!currentUser)
    return res.status(401).json({type:false,message:"This user does not exist anymore."})
    // 4) check if user changed password after the jwt was issued
    if(currentUser.changedPasswordAfter(decoded.iot))
    return res.status(401).json({type:false,message:"Your password was recently changed, please login again to continue."})
    
    // Grant access to protected route.
    req.user = currentUser // will be used somewhere in future
    next()
}