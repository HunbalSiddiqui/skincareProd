const mongoose = require('mongoose')
// mongoose uses native javastricpt data type.
const userSchema = new mongoose.Schema({
        name : {
            type : String,
            required: [true, 'User must have a name.']
        },
        email : {
            type : String,
            required : [true, 'User must have an email.'],
            // unique : true
        },
        phone : {
            type : String,
            required : [true, 'User must have a phone number.']
        },
        password : {
            type : String,
            default : 123456
            // required : [true, 'User must set a password.']
        },
        role : {
            type : Number,
            default : 0    
        }
})

module.exports = mongoose.model('User',userSchema)