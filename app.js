require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//middlewares
app.use(bodyParser.json())//to get data in req.body
app.use(cookieParser())//to put/delete values to the cookies
app.use(cors())// to remove cors error


// user routes/middlewares
const userRoutes = require('./routes/user')
app.use('/api/v1/users',userRoutes)

// auth routes/middlewares
const authRoutes = require('./routes/auth')
app.use('/api/v1/users/auth',authRoutes)

module.exports = app