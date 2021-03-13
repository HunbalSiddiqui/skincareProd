const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require("bcryptjs")
// mongoose uses native javastricpt data type.
const userSchema = new mongoose.Schema({
        name : {
            type : String,
            required: [true, 'User must have a name.']
        },
        email : {
            type : String,
            required : [true, 'User must have an email.'],
            unique : [true, 'This email is already occupied, please try a new one.'],
            lowercase : true,
            validate : [validator.isEmail, 'Please provide a valid email']
        },
        phone : {
            type : String,
            required : [true, 'User must have a phone number.']
        },
        password : {
            type : String,
            required : [true, 'User must set a password.'],
            minlength : [6, 'Password must be equal or greater than six characters'],
            select: false // password field will not be sent to the client.
        },
        role : {
            type : Number,
            default : 0    
        },
        photo: String,
})

// use document middleware for encrypting password
userSchema.pre('save',async function(next){
    // here this refers to the current document/ current user
    // If password is modified
    // no
    if(!this.isModified('password'))
        return next()
    // yes
    // encrypt/hash the password
    // bcrypt.hash(password, cost:the higher the cost the more cpu intensive the process will be and password will be encrypted nicely.)
    this.password = await bcrypt.hash(this.password,12)
    next()
})

// instance method: which will be available on all docs of certain collection
userSchema.methods.correctPaasword = async function (candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}
module.exports = mongoose.model('User',userSchema)