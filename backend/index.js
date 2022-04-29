const express = require('express')
const app = express();
const connectToMongo = require('./db/conn')
var cors = require('cors')

const port = process.env.port || 5000

app.use(express.json())
app.use(cors())

// Avaible routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

connectToMongo();
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
});