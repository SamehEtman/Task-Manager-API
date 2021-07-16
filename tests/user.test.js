const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/users')

const _id = new mongoose.Types.ObjectId()

const userOne = {
    _id,
    name : 'sameh',
    email : 'sameh2020@example.com',
    password : '12345678',
    tokens : [{
        token : jwt.sign({_id} , process.env.JWT_SECRET)
    }]
}

beforeEach(async ()=>{
    await User.deleteMany()
    await new User(userOne).save()
})

test('user creation' , async()=>{
     await request(app)
    .post('/users').send({
        name : 'sameh',
        email : 'sameh@example.com',
        password : '12345678'
    }).expect(201)
})

test ('login existing user' , async () =>{
    const response = await request(app).post('/users/login').send({
        email : userOne.email,
        password : userOne.password
    }).expect(200)
    const user = await User.findById(_id)
    expect (response.body.token).toBe(user.tokens[1].token)
})

test ('login non-existing user' , async () =>{
    await request (app).post('/users/login').send({
        email : userOne.email,
        password : userOne.password+ '1'
    }).expect(400)
})

test ('get profile for logged users' , async () =>{
    await request(app)
    .get('/users/me')
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
    .expect(200)
})

test ('not get profile for non-logged users' , async()=>{
    const fakeToken = jwt.sign({_id : new mongoose.Types.ObjectId()}, 'hello')
    await request(app).get('/users/me')
    .set('Authorization' , `Bearer ${fakeToken}`)
    .send()
    .expect(401)
})

test ('delete profile for authorized user' , async ()=>{
    const responce = await request (app)
    .delete('/users/me')
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(_id)
    expect(user).toBeNull()
})

test ('not delete profile for unauthorized user' , async ()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})