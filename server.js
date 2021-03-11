const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false
})
.then((connection)=>{
    console.log("DB ATLAS CONNECTION SUCCESSFUL!")
})
.catch((err)=>{
    console.log("connection can be done right now.",err)
})

// user routes/middlewares
const userRoutes = require('./routes/user')
app.use('/api/v1/users',userRoutes)

// auth routes/middlewares
const authRoutes = require('./routes/auth')
app.use('/api/v1/users/auth',authRoutes)



//Port
const port = 8000;
//Starting point of a server
app.listen(port,()=>{
    console.log('app is listening at 8000')
})