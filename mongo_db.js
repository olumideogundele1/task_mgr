const mongodb = require('mongodb');
const  ObjectID = require('mongodb').ObjectId;
const mongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName  = 'task-manager'

mongoClient.connect(connectionUrl,{useNewUrlParser: true},(error,client) => {
    if(error){
        return console.log('unable to connect to database');
    }

    console.log('Databse connected successfully')

    const db = client.db(databaseName);
    // db.collection('uers').insertOne({
    //     "name": 'omotara',
    //     'age': 29
    // },(error,result) => {
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // }
    // )

    db.collection('users').findOne({'name':'omotara'},(error,user) => {
        if(error){
            return console.log('Unable to insert users')
        }
        console.log(user)
    })
    db.collection('users').find({name: 'Olumide'}).toArray((error,users) => {
        console.log(users)
    })
    db.collection('users').find().count((error,count) => {
        console.log(count)
    })

    // db.collection('users').updateOne(
    //     {_id: new ObjectID('61cdbc8885c71e5d93dcdf5c')},
    //     {
    //         $set:{
    //             name : 'Olumuyiwa'
    //         }
    //     }
    //     ).then(result => {
    //         console.log(result)
    //     }).catch(error => {
    //         console.log(error)
    // })

    // db.collection('tasks').updateMany(
    //     {
    //         completed: false
    //     },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }
    // ).then(result => {
    //     console.log(result.modifiedCount)
    // }).catch(error => {
    //     console.log(error)
    // })

    db.collection('users').deleteMany({
        name: 'Olumide'
    }).then(r => {
        console.log(r)
    }).catch(err => {
        console.log(err)
    })

    db.collection('tasks').deleteOne({
        _id: new ObjectID('61cdbda9e37da45dd7a83f10')
    }).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })



    // db.collection('tasks').insertMany([
    //     {
    //         "description": 'Clean the house',
    //         'completed': true
    //     },
    //     {
    //         "description": 'Renew DSTV description',
    //         'completed': true
    //     },
    // {
    //     "description": 'Visit Ugo',
    //     'completed': false
    // }

    // ],(error,result) => {
    //     if(error){
    //         return console.log('Unable to insert users')
    //     }
    //     console.log(result.ops)
    // }
    // )
   
})