const express = require('express')
require('./db/mongoose')
const User = require('./models/users.js')
const Task = require('./models/tasks')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app