const { connect } = require('mongodb')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL , {
    useNewUrlParser : true , 
    useCreateIndex : true , 
    useFindAndModify : true
})


// /home/sameh/mongodb/bin/mongod --dbpath=/home/sameh/mongodb-data