const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false
})



// const me = new User({
//     name: 'Andrew',
//     email: 'olumide',
//     age: 27
// })

// me.save().then((res) => {
//     console.log(res)
// }).catch(error => {
//     console.log(error.errors['email']['message'])
// })



// const task = new Task({
//     description: 'Finish React tutorial',
   
// })

// task.save().then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })