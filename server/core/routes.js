const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const {checkRegisterInputs, checkLoginInputs} = require('../utils/validators')
const UserController = require('../controllers/UserController')

const createRoutes = app => {
   app.use(cors())
   app.use(fileUpload())
   app.use(express.static('images'))
   app.use('/images', express.static(path.join(__dirname, 'images')))
   app.use(express.json({ extended: true }))
   app.enable('trust proxy')

   // Routes 
   app.post('/api/auth/register', checkRegisterInputs, UserController.register)
   app.post('/api/auth/login', checkLoginInputs, UserController.login)
   app.post('/api/auth/reset', UserController.reset)
   app.post('/api/auth/reset/finished', checkRegisterInputs, UserController.resetFinished)
}

module.exports = createRoutes