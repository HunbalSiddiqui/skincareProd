var express = require('express')
var router = express.Router()

const { getAllBlogs, createBlogs } = require('../controllers/blog')

router.route('/')
.get(getAllBlogs)
.post(createBlogs)

module.exports = router