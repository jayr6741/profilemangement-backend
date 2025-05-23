const express = require('express')
const cors = require('cors')
const path = require('path')
const mongodb = require('./library/db')
const v1 = require('./routes/v1')

const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use("/v1", v1)

mongodb()

app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.listen(process.env.PORT, () => {
    console.log("start server", process.env.PORT);
})
