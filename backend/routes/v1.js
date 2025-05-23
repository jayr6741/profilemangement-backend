const express = require('express')
const register = require('../controller/register')
const login = require('../controller/login')
const authToken = require('../middleware/authToken')
const profile = require('../controller/profile')
const updateprofile = require('../controller/update-profile')
const upload = require('../middleware/multer')

const app = express()
app.post("/register",register)
app.post("/login",login)
app.use(authToken)
app.get("/profile",profile)
app.post("/updateprofile",upload.single('avatar'),updateprofile)



module.exports = app