// Express
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// Route
const route = require('./src/routes/indexRoute')
app.use(route)

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const cors = require("cors")
app.use(cors())

// Connect DB
const db = require('./src/config/db/connection')
db.connect()

// Morgan
const morgan = require('morgan')
app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Port
const port = 3008
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
