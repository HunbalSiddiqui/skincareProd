var express = require('express')
var router = express.Router()

var {getAllUsers, createUsers, getUserDetail, updateUser, deleteUser} = require('../controllers/user')

router.route('/')
.get(getAllUsers)
.post(createUsers)

router.route('/:userId')
.get(getUserDetail)
.patch(updateUser)
.delete(deleteUser)

module.exports = router