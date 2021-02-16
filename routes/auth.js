var express = require('express')
var router = express.Router()

var {userSignup, userSignin, userSignout} = require('../controllers/auth')

router.route('/signup')
.post(userSignup)

router.route('/signin')
.get(userSignin)

router.route('/signout')
.get(userSignout)

module.exports = router