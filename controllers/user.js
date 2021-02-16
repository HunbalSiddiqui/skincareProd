const User = require('../models/user')
const axios = require('axios')
exports.getAllUsers = (req,res) => {
    User.find()
    .then((users)=>{
        if(!users)
        return res.json({Message : "No users found."})
        return res.status(200).json(users)
    })
    .catch(err=>res.json(err))
}

exports.createUsers = (req,res) => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then((response)=>{
        response.data.forEach(user => {
            // instead of user.save() 
            // using diff version
            User.create(user)
            .then((createdUser)=>{
                   console.log("createdUser ", createdUser)
            })
            .catch((err)=>{
                return res.json(err)
            })
        });
        return res.json({Message : "Successfully updated dummy users."})
    })
    .catch((err)=>{
        console.log(err)
    })
    
    // const user = new User({
    //     name : "John",
    //     email : "john@gmail.com",
    //     phone  : +924514443234,
    //     password : "somepassword3589"
    // })
    // user.save()
    // .then((doc)=>{
    //     console.log(doc)
    // })
    // .catch((err)=>{
    //     console.log("unable to save the user")
    // })
}

exports.getUserDetail = (req,res) => {
    User.findById(req.params.userId)
    .then((user)=>{
        if(!user)
        return res.json({Message : "User not found."})

        return res.json(user)
    })
    .catch(err=> res.json(err))
}


exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(req.params.userId,req.body,{
        new : true,
        runValidators : true
    })
    .then((user)=>{
        if(!user)
        return res.json({Message : "User not found."})

        return res.json(user)
    })
    .catch(err=> res.json(err))
}


exports.deleteUser = (req,res) =>{
    User.findByIdAndDelete(req.params.userId)
    .then((deletedUser)=>{
        return res.status(200).json(deletedUser)
    })
    .catch(err=> res.json(err))
}