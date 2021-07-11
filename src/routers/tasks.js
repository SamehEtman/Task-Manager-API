const express = require('express')
const Task = require('../models/tasks')

const router = new express.Router()


router.get('/tasks' , async (req , res)=>{

    try{
        const task = await Task.find({}) 
        if (!task)
            return res.status(404).send('Tasks not found')
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id' ,async (req , res) =>{
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
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

router.patch('/tasks/:id' , async (req,res) =>{
    const _id = req.params.id

    const allowed = ['description' , 'completed']
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((key)=>{
        return allowed.includes(key);
    })

    if (!isValidUpdate)
        return res.status (400).send('Unable to add this proberty')

    try{
        const task = await Task.findByIdAndUpdate(_id , req.body , {new : true  , runValidators : true})
        if (!task)
            return res.status(404).send('task not found')
        res.send(task)
    } catch (e){
        res.status(500).send(e)
    }

})

router.delete('/tasks/:id' , async (req , res) =>{
    const _id = req.params.id
    try{
        const task = await Task.findByIdAndDelete(_id);

        if (!task)
            return res.status(404).send('Task not found')

        res.send(task)
    }catch (e) {
        res.status(500).res(e)
    }
})

module.exports = router