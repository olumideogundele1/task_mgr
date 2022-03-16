require('../src/db/mongoose')
const User = require('../src/db/models/user')
const Task = require('../src/db/models/task')

// User.findByIdAndUpdate('61ce8367aef89372f001c767',{ age: 28}).then(res => {
//     console.log(res);
//     return User.countDocuments({ age: 28})
// }).then( result => {
//     console.log(result)
// }).catch(err => {
//     console.log(err)
// })


// Task.findByIdAndDelete('61ce84cd808c8873486568a7').then(res => {
//     return Task.countDocuments({completed: false})
// }).then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false})

    return count;
}

deleteTaskAndCount('61ce768555fde46e2197b65a').then(res => {
    console.log(count)
}).catch(error => {
    console.log(err)
})