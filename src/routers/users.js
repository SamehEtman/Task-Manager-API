const express = require('express')
const User = require('../models/users')

const router = new express.Router()


router.post('/users' , async (req , res) =>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    }catch (e){
        res.status(404).send(e)
    }

    
})

router.get('/users' ,async (req , res) =>{
    try{
        const user = await User.find({})
        res.send(user)
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

router.patch('/users/:id', async (req , res) =>{
    
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowed = ['name' , 'age' , 'email' , 'password']
    const isValidKey = updates.every((key) =>{
        return allowed.includes(key);
    })

    if (!isValidKey)
        return res.status(400).send('This probrety is not available')
    
    try {
        const user = await User.findByIdAndUpdate(_id , req.body , {useValidators : true , new :true})
        if (!user)
            return res.status(404).send('User not found')
        
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.delete('/users/:id' , async (req , res) =>{
    const _id = req.params.id;

    try{
        const user = await User.findByIdAndDelete(_id);
        if(!user)
            return res.status(404).send('User not found!')
        res.send(user)
    } catch (e){
        res.status(500).send(e)
    }
})

module.exports = router