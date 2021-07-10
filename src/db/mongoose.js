const { connect } = require('mongodb')
const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api' , {
    useNewUrlParser : true , 
    useCreateIndex : true
})

const User = mongoose.model('User' , {
    name : {
        type : String,
        trim : true,
        required : true
    },
    email:{
        type : String , 
        trim : true,
        lowercase :true,
        required : true,
        validate (value){
            if (!validator.isEmail(value))
                throw new Error ('Enter a valid E-mail')
        }
    },
    age :{
        type : Number,
        default : 0,
        required : false,
        validate (value){
            if (value < 0) 
                throw new Error ("Age can't be a negative value")
        }
    },
    password : {
        type : String ,
        trim : true,
        required : true,
        minlength : 7 ,
        validate (value){
            if (value.length < 6) 
                throw new Error ('password is less than 6');
            if (value.toLowerCase().indexOf('password') != -1)
                throw new Error ('password shouldnot contain the word password');

        }
    }
})
/*
const user = new User ({
    name : 'Sameh',
    email : 'sameh@mail.com',
    password :'12345pafesword'
})
user.save().then(()=>{
    console.log('added correctly' , user)
}).catch ((error) =>{
    console.log('Error' , error)
})

*/
const Task = mongoose.model('Task' , {
    description: {
        type : String,
        trim : true,
        required : true,
    },
    completed : {
        type : Boolean,
        default : false
    }
})

const task = new Task({
    description : 'Eat luch'
})

task.save().catch(error => console.log(error))