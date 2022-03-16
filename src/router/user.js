const e = require('express');
const express = require('express');
const User = require('../db/models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/users', async (req,res) => {

    console.log(req.body)
    const user = new User(req.body);
    try{
       await user.save();
       res.status(201).send(user)
    }catch(err){
        console.log(err)
       res.status(400).send(err)
    }
     
})

router.get('/users/me',auth,(req,res) => {
    try{
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/users',async (req,res) => {

   try{
    const users =    await User.find({});
       res.send(users)
   }catch(err){
       res.status(500).send(err)
   }
}) 

router.get('/user/:id', async (req,res) => {
    console.log(req.params)
    
    try{
       const _id = req.params.id
       const user = await User.findById(_id)
       if(!user){
           return res.status(404).send({
               "errorMessage" : "User cannot be found"
           })
       }
       res.send(user)
    }catch(err){
       res.status(500).send(err)
    }
   
})

router.post('/user/login',async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken();
        res.send({user,token});
    }catch(e){
        res.status(400).send({err:e.message})
    }
})

router.patch('/user/',auth,async (req,res) => {
    const updates =  Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({
            error: 'Invalid Updates!!'
        })
    }
    try{
        
        updates.forEach(update => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    }catch(err){
       res.status(500).send(err)
    }
})

router.delete('/user/',auth, async (req,res) => {
    try{
    //    const user = await User.findByIdAndDelete(req.params.id)
    //    if(!user){
    //        return res.status(404).send()
    //    }
        await req.user.remove()
        res.send(req.user)
    }catch(err){
        console.log(err)
       res.status(500).send()
    }
})



module.exports = router;