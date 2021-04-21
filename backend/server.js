const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const freelancerRouter = require('./routes/freelancer')
const employerRouter = require('./routes/employer')
const projectRouter = require('./routes/project')
const applyRequestRouter = require('./routes/apply-request')
const employerAuth = require('./validators/employer-verify-jwt')
const freelancerAuth = require('./validators/freelancer-verify-jwt')

require('dotenv').config()


const app = express()
const port = process.env.PORT || 4080

app.use(cors())
app.use(express.json())

const database_uri = process.env.ATLAS_URI
mongoose.connect(
    database_uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
)
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log("MongoDB connection established successfully")
})

app.use('/freelancers', freelancerRouter)
app.use('/employers', employerRouter)
app.use('/projects', employerAuth, projectRouter)
app.use('/apply', freelancerAuth, applyRequestRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})