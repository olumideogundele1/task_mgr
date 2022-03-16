const express = require('express')
require('./db/mongoose')
const User = require('./db/models/user')
const Task = require('./db/models/task')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const port = process.env.PORT || 3000

const app = express();
 app.use(express.json())
 app.use(userRouter)
 app.use(taskRouter)

 


app.listen(port, () => {
    console.log('Server listening on ' + port)
})

// const Task = require('./db/models/task')

const main = async () => {
    // const task = await Task.findById('61d4674224080ad5fdaaff34');
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('61d466f524080ad5fdaaff33');
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()
