const express = require('express')
require('./db/mongoose')
const User = require('./models/users.js')
const Task = require('./models/tasks')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port , ()=>{
    console.log('server is up on port ',port)
})


