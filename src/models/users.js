const mongoose = require ('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    email:{
        type : String , 
        trim : true,
        unique: true,
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


userSchema.statics.findByCredentials = async (email , password) =>{
    console.log('hello')
    const user = await User.findOne({email})
    if (!user)
         throw new Error ('Unable to find user')
    const isMatch = await bcrypt.compare(password , user.password)
    if (!isMatch)
        throw new Error ('Unable to find user');
    
    return user;
}


userSchema.pre('save' , async function(next) {
    let user = this
    console
    if (user.isModified('password')){
        user['password'] = await bcrypt.hash(user['password'] , 8)
    }
    next()
})

const User = mongoose.model('User' ,userSchema )

module.exports = User
