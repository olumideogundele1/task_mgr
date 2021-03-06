const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        required: true,
        validate(value){
            if(value < 1){
                throw new Error('Age must be greater than 1')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    }

})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
}, {
    timestamps : true
})

userSchema.methods.toJSON =  function() {

    const user = this
    const userObject = user.toObject();

    delete userObject.password
    return userObject;
}

userSchema.methods.generateAuthToken = async function ()  {
    const user = this
    return jwt.sign({_id : user._id.toString()}, 'webserver')
}


userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('User does not exist')
    }
    
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user;
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        console.log({foo: user.password})
        user.password = await bcrypt.hash(user.password, 8);
       
        
    }

    next()
})

userSchema.pre('remove',async function(next) {
    const user = this
    await Task.deleteMany({owner: user._id})

    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User