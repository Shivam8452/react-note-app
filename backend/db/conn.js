const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/iNotebook'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, { 
        useNewUrlParser: true, 
    useUnifiedTopology: true
    }, () => { 
        console.log('connected to database') 
    })
}

module.exports = connectToMongo