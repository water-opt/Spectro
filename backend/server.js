const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
require('dotenv').config()

const app = express()
const port = process.env.PORT
const uri = process.env.URI

mongoose.connect(uri)
    .then(() => {
        app.listen(port, () => {
            console.log('listening to port '+ port +' for requests')
        })
    }) .catch((error) => {
        console.log(error)
    })
app.use(express.json())