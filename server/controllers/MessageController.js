const Message = require('../models/Message')
const Dialog = require('../models/Dialog')

const MessageController = {
    getMessages: async (req, res) => {
        try {
            if (req.user) {
                const { dialogId } = req.query
                let messages = await Message.find({ dialog: dialogId })
                res.json(messages)
            } else {
                res.status(401).json({ message: 'Не зарегистрирован' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
        }
    },
    sendMessage: async (req, res) => {
        try {
            if (req.user) {
                const { text, dialog } = req.body

                const message = new Message({ text, dialog, user: req.user.userId })

                const dialogFromDB = await Dialog.findOne({ _id: dialog })
                dialogFromDB.lastMessage = message._id

                await dialogFromDB.save()
                await message.save() 

                res.json({ isSended: true })
            } else {
                res.status(401).json({ message: 'Не зарегистрирован' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
        }
    }
}

module.exports = MessageController