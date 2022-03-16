const jwt = require('jsonwebtoken')
const User = require('../db/models/user')


const auth = async (req,res,next) => {
    try{
        console.log(req.headers)
        console.log(req.headers['authorization'])
        const token = req.headers['authorization'].replace('Bearer','').trim();
        console.log(token)
        const decoded = jwt.verify(token,'webserver')
        const user = await User.findOne({_id: decoded._id})

        if(!user){
            throw new Error('Unauthorized access')
            // res.status(401).send({error: 'Unauthorized access'});
        }
        req.user = user
        next() 
    }catch(e){
        console.log(e)
        res.status(401).send({'error': 'Please do authenticate user'})
    }
}

module.exports = auth