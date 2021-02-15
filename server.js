const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
})
.then((connection)=>{
    console.log(connection)
    console.log("DB ATLAS CONNECTION SUCCESSFUL!")
})
.catch((err)=>{
    console.log("connection can be done right now.",err)
})
//Port
const port = 8000;
//Starting point of a server
app.listen(port,()=>{
    console.log('app is listening at 8000')
})