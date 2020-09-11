const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//use to get request and send respond
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const index_route = require('./controller/index')
const nodemon = require('nodemon')
app.use('/api', index_route)


app.listen(3000)
