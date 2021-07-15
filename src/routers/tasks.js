const express = require('express')
const Task = require('../models/tasks')
const auth = require ('../middleware/auth')
const router = new express.Router()
const User = require('../models/users')


// sortBy=completed:desc
router.get('/tasks' , auth ,async (req , res)=>{
    const match = {}
    const sort = {}
    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = (parts[1] === 'desc' ? -1 : 1)
    }
    try{
        await req.user.populate({
            path : 'tasks',
            match : match,
            options :{
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort : sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
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

router.post('/tasks' ,auth , async(req , res) =>{
    
    try{
        const task = new Task ({
            ...req.body , 
            owner : user._id
        })
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