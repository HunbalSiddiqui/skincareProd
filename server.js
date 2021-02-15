const app = require('./app')
//Port
const port = 8000;
//Starting point of a server
app.listen(port,()=>{
    console.log('app is listening at 8000')
})
