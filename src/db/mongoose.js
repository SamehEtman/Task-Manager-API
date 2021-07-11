const { connect } = require('mongodb')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api' , {
    useNewUrlParser : true , 
    useCreateIndex : true , 
    useFindAndModify : true
})


// /home/sameh/mongodb/bin/mongod --dbpath=/home/sameh/mongodb-data