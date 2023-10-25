const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const taskRouter = require('./Routes/task')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/tasks', taskRouter)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology:true
})

const db = mongoose.connection
db.on('error',()=> {
  console.log('error connections')
})

db.once('open', ()=>{
  console.log('connected')
})

app.get('/', (req,res)=>{
  res.send('Hello World')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})