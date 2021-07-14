const express = require('express')
const Task = require('../models/tasks')
const auth = require ('../middleware/auth')
const router = new express.Router()


router.get('/tasks' , auth ,async (req , res)=>{

    try{
        const task = await Task.find({owner : req.user._id}) 
        if (!task)
            return res.status(404).send('Tasks not found')
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id' ,auth,async (req , res) =>{
    const _id = req.params.id
    try{
        const task = await Task.findOne({_id : _id , owner : req.user._id})
        
        if (!task)
            return res.status(404).send('Tasks not found')
        
        res.send(task)

    }catch (e) {
        res.status(500).send(e)
    }
})

router.post('/tasks' , async(req , res) =>{
    const task = new Task(req.body);
    try{
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status (400).send(e)
    }
})

router.patch('/tasks/:id' ,auth , async (req,res) =>{
    const _id = req.params.id

    const allowed = ['description' , 'completed']
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((key)=>{
        return allowed.includes(key);
    })

    if (!isValidUpdate)
        return res.status (400).send('Unable to add this proberty')

    try{
        const task = await Task.findOne({_id : _id , owner : req.user._id})
        console.log('task is here')
        if (!task)
            return res.status(404).send('task not found')
        updates.forEach((key)=>{
            task[key] = req.body[key]
        })
        await task.save()

        res.send(task)
    } catch (e){
        res.status(500).send(e)
    }

})

router.delete('/tasks/:id' ,auth , async (req , res) =>{
    const _id = req.params.id
    try{
        const task = await Task.findOneAndDelete({_id : _id , owner : req.user._id});

        if (!task)
            return res.status(404).send('Task not found')

        res.send(task)
    }catch (e) {
        res.status(500).res(e)
    }
})

module.exports = router