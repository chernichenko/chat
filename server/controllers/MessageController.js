const Message = require('../models/Message')
const Dialog = require('../models/Dialog')

class MessageController {
    constructor(io) {
        this.io = io
    }

    getMessages = async (req, res) => {
        try {
            if (req.user) {
                const { dialogId, userToId } = req.query

                await Message.update(
                    {"dialog": dialogId, "user": userToId, "isRead": false }, 
                    {"$set":{"isRead": true}}, 
                    {"multi": true}, 
                    (err, writeResult) => {}
                )

                let messages = await Message
                    .find({ dialog: dialogId })

                messages.sort((a, b) => {
                    if (a.createdAt.getTime() > b.createdAt.getTime()) return false
                    return true
                })

                res.json(messages)
            } else {
                res.status(401).json({ message: 'Не зарегистрирован' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
        }
    }

    sendMessage = async (req, res) => {
        try {
            if (req.user) {
                const { text, dialog } = req.body

                const message = new Message({ text, dialog, user: req.user.userId, isRead: false })

                const dialogFromDB = await Dialog.findOne({ _id: dialog })
                dialogFromDB.lastMessage = message._id

                await dialogFromDB.save()
                await message.save() 

                this.io.emit('MESSAGE:NEW', { dialogId: dialog, message: message })
                res.json(message)
            } else {
                res.status(401).json({ message: 'Не зарегистрирован' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
        }
    }

    setIsReadStatus = async (req, res) => {
        try {
            if (req.user) {
                
            } else {
                res.status(401).json({ message: 'Не зарегистрирован' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
        }
    }
}

module.exports = MessageController