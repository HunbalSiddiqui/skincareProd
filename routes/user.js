var express = require('express')
var router = express.Router()

var {getAllUsers, createUser, getUserDetail, updateUser} = require('../controllers/user')

router.route('/')
.get(getAllUsers)
.post(createUser)

router.route('/:userId')
.get(getUserDetail)
.put(updateUser)
module.exports = router