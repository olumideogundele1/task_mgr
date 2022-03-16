const express = require('express');
const Task = require('../db/models/task')
const router = new express.Router()
const auth = require('../middleware/auth')


router.get('/tasks',auth, async (req,res) => {

    try{
        // const tasks = await Task.find({});
        await req.user.populate('tasks').execPopulate
        res.send(tasks)
    }catch{
        res.status(500).send(err)
    }
}) 

router.post('/tasks',auth, async (req,res) => {
    try{
        const task = await new Task({
            ...req.body,
            owner: req.user._id
        });
        task.save()
        res.send(task)
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
 })



router.get('/task/:id',auth,async (req,res) => {
    try{
        console.log(req.params)
        const _id = req.params.id
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id,owner: req.user._id})
        if(!task){
            return res.status(404).send({
                "errorMessage" : "task not  found"
            })
        }
        res.send(task)
    }catch(err){
        res.status(500).send(err)
    }
})

router.delete('/task/:id', auth,async (req,res) => {
    try{
    //    const task = await Task.findByIdAndDelete(req.params.id)
    const task = await Task.findByOneAndDelete({id: req.params.id, owner: req.user._id})
       if(!task){
           return res.status(404).send()
       }
       res.send(task)
    }catch(err){
       res.status(500).send()
    }
})

router.patch('/task/:id',auth,async (req,res) => {
    const updates =  Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({
            error: 'Invalid Updates!!'
        })
    }
    try{
        
        // const task = await Task.findById(req.params.id)
        const task = await Task.findByOne({_id:req.params.id,owner: req.user._id})

        if(!task){
            return res.status(404).send({
                "errorMessage" : "User cannot be found"
            })
        }
        updates.forEach(update => {
            user[update] = req.body[update]
        })
        await task.save()
    //    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true})
       
       res.send(task)
    }catch(err){
       
       res.status(500).send(err)
    }
})

module.exports = router