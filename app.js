const express = require('express');
const app = express();

// user routes/middlewares
const userRoutes = require('./routes/user')
app.use('/api/v1/users',userRoutes)

// auth routes/middlewares
const authRoutes = require('./routes/auth')
app.use('/api/v1/users/auth',authRoutes)

module.exports = app