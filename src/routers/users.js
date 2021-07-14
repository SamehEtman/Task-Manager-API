const express = require('express')
const User = require('../models/users')
const auth = require('../middleware/auth')
const Task = require ('../models/tasks')
const router = new express.Router()


router.post('/users' ,async (req , res) =>{
    try {
        const user = new User(req.body)
        const token = await user.generateAuthToken();
        await user.save()
        res.status(201).send({user , token})
    }catch (e){
        res.status(404).send(e)
    }

    
})

router.post('/users/login' , async (req , res) =>{
    try{
        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch (e){
        res.status(400).send(e)
    }
})

router.post ('/users/logout' , auth , async(req , res) =>{
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch (e){
        res.status(500).send(e)
    }
    
})

router.post('/users/logoutAll' , auth , async (req , res) =>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send()
    }catch (e){
        res.status(500).send()
    }
})
router.get('/users/me' ,auth, async (req , res) =>{
    try{
        res.send(req.user)
    }catch (e){
        res.status(500).send(e)
    }
})

router.get('/users/:id' , async (req , res) =>{
    const _id = req.params.id
    try {
        const user  = await User.findById(_id)
        if (!user)
            return res.status(404).send('user not found')
        res.send(user)
    }catch (e) {
        res.status(500).send(e)
    }

   
})

router.patch('/users/me', auth ,  async (req , res) =>{
    
    const _id = req.user._id
    const updates = Object.keys(req.body)
    const allowed = ['name' , 'age' , 'email' , 'password']
    const isValidKey = updates.every((key) =>{
        return allowed.includes(key);
    })

    if (!isValidKey)
        return res.status(400).send('This probrety is not available')
    
    try {
        const userObj = req.user.toObject()
        console.log(req.body.name)
        updates.forEach((key) =>{
            req.user[key] = req.body[key]
        })

        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.delete('/users/me' , auth , async (req , res) =>{
    try{
        await req.user.remove();
        res.send(req.user)
    } catch (e){
        res.status(500).send(e)
    }
})


module.exports = router