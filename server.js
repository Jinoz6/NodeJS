const express = require('express')
const app = express()
app.use(express.static('public'))
const bodyParser = require('body-parser')

//use to get request and send respond
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const index_route = require('./controller/index')
app.set('views', './view')
app.set('view engine', 'pug')

app.use('/api', index_route)

// app.use(express.static('./public'))
// app.get('/', function (req, res) {
//     res.render('index', { title: 'Hey', message: 'Hello there!' })
//   })


app.listen(3000)
