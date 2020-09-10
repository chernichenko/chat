const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const {checkRegisterInputs, checkLoginInputs} = require('../utils/validators')
const auth = require('../middleware/auth.middleware')
const lastSeen = require('../middleware/lastSeen.middleware')
const UserCtrl = require('../controllers/UserController')
const ProfileCtrl = require('../controllers/ProfileController')
const DialogCtrl = require('../controllers/DialogController')
const MessageCtrl = require('../controllers/MessageController')

const createRoutes = (app, io) => {
   const UserController = UserCtrl(io)
   const ProfileController = ProfileCtrl(io)
   const DialogController = DialogCtrl(io)
   const MessageController = MessageCtrl(io)

   app.use(cors())
   app.use(fileUpload())
   app.use(express.static('images'))
   app.use('/images', express.static(path.join(rootPath, 'images')))
   app.use(express.json({ extended: true }))
   app.enable('trust proxy')

   // Routes 
   app.post('/api/auth/register', checkRegisterInputs, UserController.register)
   app.post('/api/auth/login', checkLoginInputs, UserController.login)
   app.post('/api/auth/reset', UserController.reset)
   app.post('/api/auth/reset/finished', checkRegisterInputs, UserController.resetFinished)

   app.get('/api/user', auth, lastSeen, UserController.getUser)
   app.get('/api/users', auth, UserController.getUsers)
   app.post('/api/profile', auth, lastSeen, ProfileController.changeUserInfo)

   app.get('/api/dialog', auth, DialogController.getDialog)
   
   app.get('/api/messages', auth, MessageController.getMessages)
   app.post('/api/message', auth, MessageController.sendMessage)
   
}

module.exports = createRoutes